import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const PAGES = ['/', '/business', '/corporate', '/bank/current', '/red-sphere/ssb_loan', '/affluent', '/affluent/private-banking', '/affluent/loans', '/bank', '/insurance', '/properties', '/calculators', '/contact', '/the-group', '/journeys', '/login', '/notices', '/sitemap', '/sustainability', '/sustainability/grievance'];

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
    await page.getByRole('dialog', { name: 'Menu' }).getByText('Sign up').first().click();
  } else {
    await page.getByRole('banner').getByRole('button', { name: 'Sign up' }).click();
  }
  await expect(page.getByRole('link', { name: /Sign up for CBZ Bank/ })).toBeVisible();
  await expect(page.getByRole('link', { name: /Get a quote from CBZ Life/ })).toBeVisible();
});

test('the audience strip opens an audience home and the choice follows the visitor', async ({ page }) => {
  await page.goto('/bank');
  const strip = page.getByRole('navigation', { name: 'Who we serve' });
  // Before a choice, Personal: a personal card shows, a business one does not.
  await expect(strip.getByRole('link', { name: 'Personal' })).toHaveAttribute('aria-current', 'true');
  await expect(page.locator('#product-bank-student_visa')).toBeVisible();
  await expect(page.locator('#product-bank-sme_debit_card')).toBeHidden();
  // Business opens the Business home and becomes the chosen audience.
  await strip.getByRole('link', { name: 'Business' }).click();
  await expect(page).toHaveURL(/\/business$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('business');
  await expect(strip.getByRole('link', { name: 'Business' })).toHaveAttribute('aria-current', 'true');
  // The same menus now show business products on the unit pages.
  await page.goto('/bank');
  await expect(strip.getByRole('link', { name: 'Business' })).toHaveAttribute('aria-current', 'true');
  await expect(page.locator('#product-bank-sme_debit_card')).toBeVisible();
  await expect(page.locator('#product-bank-student_visa')).toBeHidden();
  await page.goto('/red-sphere');
  await expect(page.locator('#product-red-sphere-sme_working_capital')).toBeVisible();
  await expect(page.locator('#product-red-sphere-ssb_loan')).toBeHidden();
  // Property listings follow too: commercial space for Business, homes for Personal.
  await page.goto('/properties');
  await expect(page.locator('[data-property][data-type="commercial"]').first()).toBeVisible();
  await expect(page.locator('[data-property][data-type="residential"]').first()).toBeHidden();
  await strip.getByRole('link', { name: 'Personal' }).click();
  await page.goto('/properties');
  await expect(page.locator('[data-property][data-type="residential"]').first()).toBeVisible();
  await expect(page.locator('[data-property][data-type="commercial"]').first()).toBeHidden();
});

test('the Corporate home exists and corporate products show on the Bank page and in the Bank menu', async ({ page, isMobile }) => {
  await page.goto('/corporate');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('institution');
  await page.goto('/bank');
  await expect(page.locator('#product-bank-current_corporate')).toBeVisible();
  await expect(page.locator('#product-bank-smartcash_student')).toBeHidden();
  if (!isMobile) {
    const banner = page.getByRole('banner');
    await banner.getByRole('button', { name: 'Bank', exact: true }).click();
    await expect(banner.getByRole('link', { name: 'Current Account (Corporate)' })).toBeVisible();
    await expect(banner.getByRole('link', { name: 'SmartCash', exact: true })).toBeHidden();
    await expect(banner.getByText('For Corporate').first()).toBeVisible();
  }
});

test('a mega menu opens its purpose columns and search finds a product', async ({ page, isMobile }) => {
  test.skip(isMobile, 'desktop menus only');
  await page.goto('/');
  const banner = page.getByRole('banner');
  await banner.getByRole('button', { name: 'Bank', exact: true }).click();
  await expect(banner.getByRole('heading', { name: 'Choose an account' })).toBeVisible();
  await expect(banner.getByRole('link', { name: 'Current Account', exact: true })).toBeVisible();
  await expect(banner.getByText('Offered by').first()).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(banner.getByRole('heading', { name: 'Choose an account' })).toBeHidden();
  await banner.getByRole('button', { name: 'Find ways to bank better' }).click();
  // The sentence builder: "I want to: insure my car" goes to the motor cover card.
  await page.getByLabel('What do you want to do').selectOption('insure');
  await expect(page.getByRole('dialog').getByLabel('What', { exact: true })).toHaveValue(/\/insurance\/motor$/);
  await page.getByLabel('Search products and pages').fill('smartcash');
  await expect(page.getByRole('link', { name: /SmartCash Lite/ })).toBeVisible();
});

test('Affluent Banking is a Personal-only menu with the three tiers, and the tier page has its tabs', async ({ page, isMobile }) => {
  await page.goto('/');
  const banner = page.getByRole('banner');
  if (!isMobile) {
    await banner.getByRole('button', { name: 'Affluent Banking' }).click();
    await expect(banner.getByRole('heading', { name: 'Private Banking' })).toBeVisible();
    await expect(banner.getByRole('heading', { name: 'Prime Banking' })).toBeVisible();
    await expect(banner.getByRole('heading', { name: 'Wealth Management' })).toBeVisible();
    await banner.getByRole('link', { name: 'Exclusive banking for those shaping tomorrow' }).click();
  } else {
    await page.goto('/affluent/private-banking');
  }
  await expect(page).toHaveURL(/\/affluent\/private-banking$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Exclusive banking');
  // What you need to know: the Loans tab shows the income-based loan line.
  await page.getByRole('tab', { name: 'Loans' }).click();
  await expect(page.getByRole('tabpanel', { name: 'Loans' })).toContainText('$40,000 over 50 months');
  // A solution screen: Compare shows the three tiers side by side.
  await page.goto('/affluent/loans');
  await page.getByRole('tab', { name: 'Compare' }).click();
  await expect(page.getByRole('columnheader', { name: 'Wealth Management' })).toBeVisible();
  await expect(page.getByRole('cell', { name: 'Up to $30,000 over 48 months' })).toBeVisible();
  // Business visitors do not get the menu.
  await page.goto('/business');
  if (!isMobile) await expect(banner.getByRole('button', { name: 'Affluent Banking' })).toHaveCount(0);
  else {
    await banner.getByRole('button', { name: 'Open menu' }).click();
    await expect(page.getByRole('dialog', { name: 'Menu' }).getByText('Affluent Banking')).toHaveCount(0);
  }
});


test('a dropdown link opens the product page, with its tabs, and a loan page compares and calculates', async ({ page, isMobile }) => {
  await page.goto('/');
  if (!isMobile) {
    const banner = page.getByRole('banner');
    await banner.getByRole('button', { name: 'Bank', exact: true }).click();
    await banner.getByRole('link', { name: 'Current Account', exact: true }).click();
  } else {
    await page.goto('/bank/current');
  }
  await expect(page).toHaveURL(/\/bank\/current$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Current Account');
  await expect(page.getByRole('heading', { name: 'Key benefits of your Current Account' })).toBeVisible();
  await page.getByRole('tab', { name: 'Documents needed:' }).click();
  await expect(page.getByRole('tabpanel', { name: 'Documents needed:' })).toContainText('Proof of residence');
  await expect(page.getByRole('heading', { name: 'You might be interested in' })).toBeVisible();
  // A card's Tell me more goes to the same kind of page.
  await page.goto('/bank');
  await page.locator('#product-bank-current').getByRole('link', { name: 'Tell me more' }).click();
  await expect(page).toHaveURL(/\/bank\/current$/);
  // A loan page: compare cards and the instalment calculator.
  await page.goto('/red-sphere/ssb_loan');
  await expect(page.getByRole('heading', { name: 'Compare our loans' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'What could my loan instalment be?' })).toBeVisible();
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
  // The form is a React island; clicking before it hydrates is lost.
  await page.locator('astro-island:not([ssr])').filter({ has: page.getByRole('button', { name: 'Continue' }) }).waitFor();
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

test('the home finder bar opens the chosen product page', async ({ page }) => {
  await page.goto('/business');
  await expect(page.getByRole('form', { name: 'Find a product' })).toBeVisible();
  const finder = page.getByRole('form', { name: 'Find a product' });
  await finder.getByLabel('I want to').selectOption('insure');
  await finder.getByLabel('What', { exact: true }).selectOption({ label: 'my business' });
  await finder.getByRole('button', { name: 'View our products' }).click();
  await expect(page).toHaveURL(/\/insurance\/sme_shield$/);
});

test('home follows the site map order', async ({ page }) => {
  await page.goto('/');
  const ids = await page.locator('main [id]').evaluateAll((els) => els.map((e) => e.id));
  const order = ['hero-heading', 'help', 'digital', 'businesses'];
  let last = -1;
  for (const key of order) {
    const i = ids.findIndex((id) => id === key);
    expect(i, `${key} present`).toBeGreaterThan(last);
    last = i;
  }
});
