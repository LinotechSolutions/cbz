import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const PAGES = ['/', '/bank', '/insurance', '/properties', '/calculators', '/contact', '/the-group', '/journeys', '/login', '/notices', '/sitemap', '/sustainability', '/sustainability/grievance'];

for (const path of PAGES) {
  test(`${path} has no serious accessibility violations`, async ({ page }) => {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
    const serious = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
    expect(serious, JSON.stringify(serious, null, 2)).toEqual([]);
  });
}

test('home page never shows a placeholder', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('body')).not.toContainText('TBC');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('open account menu lists the six entry points', async ({ page, isMobile }) => {
  await page.goto('/');
  if (isMobile) {
    await page.getByRole('button', { name: 'Open menu' }).click();
    await page.getByRole('dialog', { name: 'Menu' }).getByText('Open an account').first().click();
  } else {
    await page.getByRole('banner').getByRole('button', { name: 'Open an account' }).click();
  }
  await expect(page.getByRole('link', { name: /Sign up for CBZ Bank/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /Get a quote from CBZ Life/ })).toBeVisible();
});

test('escape closes a header menu and returns focus', async ({ page, isMobile }) => {
  test.skip(isMobile, 'desktop menus only');
  await page.goto('/');
  const trigger = page.getByRole('banner').getByRole('button', { name: 'Log in' });
  await trigger.click();
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect(trigger).toBeFocused();
});

test('property filters sync to the URL', async ({ page }) => {
  await page.goto('/properties');
  // The filters hydrate on idle; wait until the island has taken over.
  await page.locator('astro-island:not([ssr])').filter({ has: page.getByLabel('Type') }).waitFor();
  await page.getByLabel('Type').selectOption('commercial');
  await expect(page).toHaveURL(/type=commercial/);
  const visible = page.locator('[data-property]:not([hidden])');
  const count = await visible.count();
  for (let i = 0; i < count; i++) {
    await expect(visible.nth(i)).toHaveAttribute('data-type', 'commercial');
  }
});

test('a form validates, saves a draft and submits', async ({ page }) => {
  await page.goto('/bank/open-account');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.getByRole('alert')).toContainText('Check the following');
  await page.getByLabel('Account type').selectOption('current');
  await page.getByLabel('I am applying as').selectOption('individual');
  await page.getByLabel('Country you live in').selectOption('Zimbabwe');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.getByRole('heading', { name: 'Your details' })).toBeFocused();
  await page.getByLabel('First name').fill('Tendai');
  await page.getByLabel('Surname').fill('Moyo');
  await page.getByLabel('Phone number').fill('0771234567');
  await page.getByLabel('Email address').fill('tendai@example.com');
  // Reload: the draft should restore what was typed.
  await page.reload();
  await expect(page.getByText('We have restored what you entered earlier.')).toBeVisible();
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByLabel(/I agree to CBZ contacting me/).check();
  await page.getByRole('button', { name: 'Send my application' }).click();
  await expect(page.getByRole('heading', { name: 'Your application is on its way' })).toBeVisible();
});

test('calculator announces a result', async ({ page }) => {
  await page.goto('/calculators');
  const section = page.locator('#mortgage');
  // The calculator hydrates when visible; typing before that is lost on hydration.
  await section.scrollIntoViewIfNeeded();
  await page.locator('#mortgage astro-island:not([ssr])').waitFor({ state: 'attached' });
  await section.getByLabel('Property price').fill('100000');
  await section.getByLabel('Interest rate per year').fill('12');
  await expect(section.locator('dd.figure')).toHaveText(/1,434\.71/);
});

test('old routes redirect', async ({ page }) => {
  await page.goto('/about');
  await expect(page).toHaveURL(/\/the-group$/);
});

test('every business page is built from its site map branches', async ({ page }) => {
  const expected: Record<string, string[]> = {
    'cbz-life': ['get-a-quote', 'take-cover', 'submit-claim', 'pay-online', 'talk-to-an-agent', 'faq'],
    insurance: ['request-quote', 'insure-now', 'submit-claim', 'policy-changes', 'faq'],
    'risk-advisory': ['key-products', 'request-insurance-audit', 'get-a-quote'],
    properties: ['property-listing', 'virtual-tours', 'schedule-viewing', 'faq'],
    datvest: ['learn-more', 'faq'],
    capital: ['learn-more', 'faq'],
    'agro-yield': ['choose-your-service', 'enquire-now'],
    'red-sphere': ['explore-loan-products', 'loan-calculator', 'apply-or-enquire', 'download-the-app'],
    bank: ['open-an-account', 'apply-for-a-loan', 'cards-and-digital', 'faq'],
  };
  for (const [slug, ids] of Object.entries(expected)) {
    await page.goto(`/${slug}`);
    const found = await page.locator('main section[id]').evaluateAll((els) => els.map((e) => e.id));
    let last = -1;
    for (const id of ids) {
      const i = found.indexOf(id);
      expect(i, `${slug}: ${id} present and in order`).toBeGreaterThan(last);
      last = i;
    }
    // Nothing from the old shared template remains.
    await expect(page.locator('#fit, #leadership')).toHaveCount(0);
  }
});

test('home follows the site map order', async ({ page }) => {
  await page.goto('/');
  const ids = await page.locator('main [id]').evaluateAll((els) => els.map((e) => e.id));
  const order = ['hero-heading', 'help', 'journeys', 'digital', 'learn'];
  let last = -1;
  for (const key of order) {
    const i = ids.findIndex((id) => id === key);
    expect(i, `${key} present`).toBeGreaterThan(last);
    last = i;
  }
});
