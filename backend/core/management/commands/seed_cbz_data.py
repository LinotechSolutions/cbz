from decimal import Decimal
from django.core.management.base import BaseCommand
from billers.models import Biller
from branches.models import Branch, BranchType
from countries.models import Country
from communications.models import Announcement, ContactChannel, CorporateFact
from insurance.models import AddonOption, AssetOption, CoverOption
from products.models import ProductItem
from subsidiaries.models import (
    Audience,
    Goal,
    LifecycleStage,
    LifeStage,
    Subsidiary,
)


class Command(BaseCommand):
    help = "Seeds database with comprehensive CBZ Holdings master data from frontend analysis"

    def handle(self, *args, **options):
        self.stdout.write("Seeding CBZ Holdings Master Data...")

        # 1. Countries
        countries_data = [
            {
                "code": "zw",
                "name": "Zimbabwe",
                "iso": "ZW",
                "cur": "USD / ZWG",
                "dial": "+263",
                "illustrative": False,
                "regulator": "Reserve Bank of Zimbabwe",
                "pcur": "USD",
                "rate": 1.0,
                "rates": ["USD 1 = ZWG 26.50", "USD 1 = ZAR 18.20"],
            },
            {
                "code": "zm",
                "name": "Zambia",
                "iso": "ZM",
                "cur": "ZMW",
                "dial": "+260",
                "illustrative": True,
                "regulator": "Bank of Zambia",
                "pcur": "ZMW",
                "rate": 27.5,
                "rates": ["USD 1 = ZMW 27.50"],
            },
            {
                "code": "ke",
                "name": "Kenya",
                "iso": "KE",
                "cur": "KES",
                "dial": "+254",
                "illustrative": True,
                "regulator": "Central Bank of Kenya",
                "pcur": "KES",
                "rate": 129.0,
                "rates": ["USD 1 = KES 129.00"],
            },
            {
                "code": "tz",
                "name": "Tanzania",
                "iso": "TZ",
                "cur": "TZS",
                "dial": "+255",
                "illustrative": True,
                "regulator": "Bank of Tanzania",
                "pcur": "TZS",
                "rate": 2600.0,
                "rates": ["USD 1 = TZS 2600.00"],
            },
        ]
        for c in countries_data:
            Country.objects.update_or_create(code=c["code"], defaults=c)
        self.stdout.write(self.style.SUCCESS(f"Seeded {len(countries_data)} countries."))

        # 2. Subsidiaries
        subsidiaries_data = [
            {
                "id": "bank",
                "name": "CBZ Bank Limited",
                "category": "Banking",
                "description": "Zimbabwe's largest commercial bank offering retail, corporate, treasury, and digital solutions for households and enterprises.",
                "cta": "Explore Personal & Business Banking",
                "screen": "bank",
                "tagline": "Partners for Success",
                "is_core": True,
                "image": "https://images.unsplash.com/photo-1541354329998-f4d9a9f9297f?auto=format&fit=crop&q=80&w=1200",
                "order": 1,
            },
            {
                "id": "insurance",
                "name": "CBZ Insurance",
                "category": "Insurance & Risk",
                "description": "Short-term insurance covering motor, home, business assets, engineering risks, and travel protection across Zimbabwe.",
                "cta": "Calculate Premium & Get Covered",
                "screen": "insurance",
                "tagline": "Protecting What Matters Most",
                "is_core": False,
                "image": "https://images.unsplash.com/photo-1450133064473-71024230f91b?auto=format&fit=crop&q=80&w=1200",
                "order": 2,
            },
            {
                "id": "life",
                "name": "CBZ Life Assurance",
                "category": "Life & Pensions",
                "description": "Comprehensive life assurance, funeral plans, employee pensions, and retirement annuities for family peace of mind.",
                "cta": "Secure Your Family's Future",
                "screen": "insurance",
                "tagline": "Securing Tomorrow, Today",
                "is_core": False,
                "image": "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8?auto=format&fit=crop&q=80&w=1200",
                "order": 3,
            },
            {
                "id": "datvest",
                "name": "Datvest (Asset Management)",
                "category": "Investments & Wealth",
                "description": "Pioneering investment and portfolio management, unit trusts, pension fund management, and wealth preservation.",
                "cta": "Start Investing Today",
                "screen": "investments",
                "tagline": "Growing Wealth for Generations",
                "is_core": False,
                "image": "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=1200",
                "order": 4,
            },
            {
                "id": "capital",
                "name": "CBZ Capital",
                "category": "Corporate & Advisory",
                "description": "Investment banking advisory, underwriting, corporate finance, and structured capital raising for top-tier institutions.",
                "cta": "Consult Our Advisory Team",
                "screen": "investments",
                "tagline": "Catalyst for Corporate Growth",
                "is_core": False,
                "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
                "order": 5,
            },
            {
                "id": "properties",
                "name": "CBZ Properties",
                "category": "Real Estate & Housing",
                "description": "Master-planned residential stands, commercial real estate developments, property valuations, and mortgage finance.",
                "cta": "View Stands & Developments",
                "screen": "properties",
                "tagline": "Building the Future of Living",
                "is_core": False,
                "image": "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1200",
                "order": 6,
            },
            {
                "id": "agri",
                "name": "CBZ Agro-Yield",
                "category": "Agribusiness",
                "description": "Specialized agricultural finance supporting grain production, tobacco, horticulture, livestock, and agro-processing value chains.",
                "cta": "Apply for Seasonal Finance",
                "screen": "agribusiness",
                "tagline": "Feeding the Nation, Empowering Farmers",
                "is_core": False,
                "image": "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&q=80&w=1200",
                "order": 7,
            },
            {
                "id": "risk",
                "name": "CBZ Risk Advisory",
                "category": "Risk Management",
                "description": "Enterprise risk consulting, actuarial evaluations, insurance brokerage, and cyber-risk assessment for enterprise clients.",
                "cta": "Request Risk Consultation",
                "screen": None,
                "tagline": "Navigating Uncertainty with Confidence",
                "is_core": False,
                "image": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1200",
                "order": 8,
            },
            {
                "id": "micro",
                "name": "Red Sphere Finance",
                "category": "Microfinance",
                "description": "Accessible retail micro-loans, payroll-based schemes, order financing, and capital for emerging micro-entrepreneurs.",
                "cta": "Get Instant Micro-Loan",
                "screen": None,
                "tagline": "Empowering Grassroots Enterprise",
                "is_core": False,
                "image": "https://images.unsplash.com/photo-1556742049-0a67c5574f73?auto=format&fit=crop&q=80&w=1200",
                "order": 9,
            },
        ]
        for sub in subsidiaries_data:
            Subsidiary.objects.update_or_create(id=sub["id"], defaults=sub)
        self.stdout.write(self.style.SUCCESS(f"Seeded {len(subsidiaries_data)} subsidiaries."))

        # 3. Lifecycle Stages (Bank, Agri, Investment, Property)
        lifecycle_definitions = {
            "bank": [
                ("01", "Discovery", "Account Opening & KYC", "Digital biometric account opening for individuals and corporate onboarding.", ["Digital Onboarding", "FCA & ZWG accounts", "Instant Debit Card"], None, "Step 1"),
                ("02", "Transact", "Daily Payments & Cash Flow", "Everyday digital payments via CBZ Touch, internet banking, POS terminals.", ["CBZ Touch App", "ZIPIT & RTGS", "Biller Integration"], None, "Step 2"),
                ("03", "Credit", "SME & Working Capital Loans", "Tailored financing lines to scale businesses and cover seasonal liquidity needs.", ["Overdraft Facilities", "SME Loans", "Asset Finance"], None, "Step 3"),
                ("04", "Wealth", "Treasury & FX Management", "Corporate foreign exchange desk, offshore transfers, and treasury bills.", ["Forex Bureau", "Corporate Treasury", "Trade Finance"], None, "Step 4"),
                ("05", "Preserve", "Generational Banking & Succession", "Estate planning, trust accounts, and family wealth structuring.", ["Trust Administration", "High Net Worth Services"], None, "Step 5"),
            ],
            "agri": [
                ("01", "Land Prep", "Soil Testing & Land Preparation", "Scientific soil profiling, GPS surveying, and land conditioning funding.", ["Soil Analysis", "Land Prep Finance", "Seedbed Preparation"], "CBZ Bank", "Phase 1"),
                ("02", "Inputs", "Certified Seed & Chemical Disbursal", "Guaranteed delivery of hybrid seed varieties, basal/top fertilizers.", ["Certified Hybrid Seed", "Fertilizer Delivery", "Crop Chemical Pack"], "Agro-Yield", "Phase 2"),
                ("03", "Growth", "Agronomy & Satellite Monitoring", "In-field agronomic extension services and drone/satellite field surveillance.", ["Agronomist Visits", "NDVI Crop Health Scans", "Weed/Pest Control"], "CBZ Agro-Yield", "Phase 3"),
                ("04", "Harvest", "Mechanized Reaping & Insurance", "Combine harvester lease-out and multi-peril crop insurance payout.", ["Mechanized Harvesting", "Crop Moisture Testing", "Insurance Cover"], "CBZ Insurance", "Phase 4"),
                ("05", "Market", "Grain Offtake & Settlement", "Guaranteed warehouse receipt financing and direct GMB/private market offtake.", ["Offtake Contracts", "Fast Settlement to FCA", "Loan Clearance"], "CBZ Bank", "Phase 5"),
            ],
            "properties": [
                ("01", "Selection", "Prime Stand Selection", "Explore master-planned serviced residential and commercial stands.", ["Cadastral Survey", "Zoning Verification", "Site Visits"], "CBZ Properties", "Stage 1"),
                ("02", "Assessment", "Affordability Pre-Qualification", "Verify income documentation and debt-to-income affordability.", ["Credit Clearance", "Income Verification", "Offer Letter"], "CBZ Bank", "Stage 2"),
                ("03", "Acquisition", "Stand Deposit & Title Transfer", "Pay commitment deposit and initiate deeds office transfer registration.", ["Agreement of Sale", "Conveyancing", "Escrow Account"], "CBZ Bank", "Stage 3"),
                ("04", "Building", "Building Loan Drawdowns", "Stage-certified construction mortgage loan disbursements.", ["Architectural Review", "Building Inspections", "Stage Payouts"], "CBZ Properties", "Stage 4"),
                ("05", "Completion", "Title Deed Handover", "Occupancy certificate issuance and registration of clean title deed.", ["Occupancy Certificate", "Clean Deed Handover", "Home Insurance"], "CBZ Insurance", "Stage 5"),
            ],
            "datvest": [
                ("01", "Profile", "Risk & Horizon Profiling", "Identify investment objectives, liquidity appetite, and return targets.", ["Risk Assessment", "Investment Horizon", "KYC"], "Datvest", "Step 1"),
                ("02", "Allocation", "Asset Allocation Strategy", "Craft diversified portfolio across money market, equities, and real estate.", ["Strategic Asset Mix", "Benchmark Definition"], "Datvest", "Step 2"),
                ("03", "Execution", "Fund Placement & Execution", "Direct placement into regulated Datvest unit trusts and institutional mandates.", ["Electronic Placement", "Custodian Custody"], "CBZ Bank", "Step 3"),
                ("04", "Growth", "Active Portfolio Rebalancing", "Daily yield compounding, active equity trading, and monthly distribution.", ["Quarterly Reports", "Yield Tracking", "Rebalancing"], "Datvest", "Step 4"),
                ("05", "Realization", "Target Achievement & Liquidity", "Scheduled redemption into bank accounts or rollover into private wealth.", ["Flexible Redemption", "Tax Optimization"], "CBZ Bank", "Step 5"),
            ],
        }

        LifecycleStage.objects.all().delete()
        stage_count = 0
        for sub_id, stages in lifecycle_definitions.items():
            subsidiary = Subsidiary.objects.get(id=sub_id)
            for idx, (step, phase, title, desc, deliverables, partner, tag) in enumerate(stages):
                LifecycleStage.objects.create(
                    subsidiary=subsidiary,
                    step=step,
                    phase=phase,
                    title=title,
                    description=desc,
                    deliverables=deliverables,
                    partner_entity=partner,
                    tag=tag,
                    order=idx + 1,
                )
                stage_count += 1
        self.stdout.write(self.style.SUCCESS(f"Seeded {stage_count} lifecycle stages."))

        # 4. Products across subsidiaries
        # Product catalogue. The bank, Red Sphere and life rows are generated from
        # frontend/src/data/products/*.ts, which transcribe the Retail Banking Product
        # Manual, the Red Sphere products deck and the CBZ Life catalogue. Regenerate
        # rather than editing by hand, so the API cannot drift from the site.
        #
        # NOTE: the insurance, Datvest, Properties and Agro-Yield rows below predate
        # those documents and still carry unverified figures. Replace them once the
        # product documentation for those subsidiaries is supplied.
        # Product catalogue. The bank, Red Sphere and life rows are generated from
        # frontend/src/data/products/*.ts, which transcribe the Retail Banking Product
        # Manual, the Red Sphere products deck and the CBZ Life catalogue. Regenerate
        # rather than editing by hand, so the API cannot drift from the site.
        #
        # NOTE: the insurance, Datvest, Properties and Agro-Yield rows below predate
        # those documents and still carry unverified figures. Replace them once the
        # product documentation for those subsidiaries is supplied.
        products_data = [
            # CBZ Bank - Retail Banking Product Manual
            ('bank', 'accounts', 'current', 'Current Account', 'Everyday transactional account with a Visa debit card, access to loans in line with your income, and an overdraft facility.', 'Visa debit card included', 'Landmark', 1),
            ('bank', 'accounts', 'current_joint', 'Current Account (Joint)', 'A single account for legally married couples, where signatories can sign jointly or individually.', 'For legally married couples', 'Users', 2),
            ('bank', 'accounts', 'current_corporate', 'Current Account (Corporate)', 'Transactional account for registered companies, with access to credit facilities, credit cards and overdrafts.', 'For registered corporates', 'Building2', 3),
            ('bank', 'accounts', 'fca_individual', 'Foreign Currency Account (Individual)', 'Hold and transact in USD, GBP, ZAR, BWP or EUR, with transfers in and out and cash withdrawals.', 'USD, GBP, ZAR, BWP, EUR', 'Coins', 4),
            ('bank', 'accounts', 'fca_corporate', 'Foreign Currency Account (Corporate)', 'Foreign currency account for registered companies in GBP, USD, ZAR, BWP or EUR.', 'GBP, USD, ZAR, BWP, EUR', 'Coins', 5),
            ('bank', 'accounts', 'smartcash_lite', 'SmartCash Lite', 'Instant, KYC-lite account for customers new to banking. A copy of your ID is all you need.', 'Opens instantly with your ID', 'Smartphone', 6),
            ('bank', 'accounts', 'smartcash_general', 'SmartCash General', 'Everyday account with an instant card and mobile banking, no minimum balance and no monthly service fees.', 'No monthly service fees', 'Wallet', 7),
            ('bank', 'accounts', 'smartcash_student', 'SmartCash Student', 'SmartCash account for students, with an instant card, mobile banking and no monthly service fees.', 'No monthly service fees', 'Sparkles', 8),
            ('bank', 'accounts', 'smartcash_extra', 'SmartCash Extra', 'SmartCash account with no daily limit, no transaction limit and no maximum balance, on full KYC.', 'Initial deposit US$5', 'Wallet', 9),
            ('bank', 'accounts', 'private_banking', 'Private Banking', 'A dedicated service outlet for high net worth clients, offering tailor-made wealth creation and management solutions.', 'Minimum balance $1,500 or investment $5,000', 'Award', 10),
            ('bank', 'accounts', 'school_current', 'School Current Account', 'Transactional account for schools and School Development Associations, with no monthly charges.', 'No monthly account charges', 'GraduationCap', 11),
            ('bank', 'accounts', 'church_current', 'Church Current Account', 'Account for churches and church groups, with tiered interest rates and no monthly service fees.', 'Minimum balance $50 · initial deposit $100', 'Church', 12),
            ('bank', 'savings', 'savings_individual', 'Savings Account (Individual)', 'ATM card based account that lets you deposit funds, earn interest on savings and access credit facilities.', 'Earns interest on savings', 'PiggyBank', 1),
            ('bank', 'savings', 'savings_corporate', 'Savings Account (Corporate)', 'Savings account for registered companies that earns interest on balances.', 'Earns interest on savings', 'Building2', 2),
            ('bank', 'savings', 'senior', 'Senior Citizens Savings Account', 'For customers aged 60 and above: no service charges, a free ATM card and priority service in branch.', 'No service charges', 'ShieldCheck', 3),
            ('bank', 'savings', 'simple_saver', 'Simple Saver', 'Straightforward savings account opened with your ID and US$2, with a debit card and mobile banking.', 'US$2 to open · US$5 initial deposit', 'Wallet', 4),
            ('bank', 'savings', 'fixed_deposit', 'Fixed Deposit', 'Invest a lump sum for a predefined period at a predetermined rate, in a high interest bearing account.', 'Minimum USD100,000 or ZWL1,000,000', 'Clock', 5),
            ('bank', 'savings', 'cashplus_junior', 'CashPlus Junior', 'Savings plan for children under 12, with competitive interest and no maintenance fees.', 'Interest 4% per annum', 'Sparkles', 6),
            ('bank', 'savings', 'cashplus_teen', 'CashPlus Teen', 'Savings account for teenagers with an ATM debit card, mobile banking and monthly interest.', 'No maintenance fees', 'Sparkles', 7),
            ('bank', 'savings', 'cashplus_student', 'CashPlus Student', 'Savings account for tertiary students, with mobile banking and interest paid monthly.', 'No maintenance fees', 'GraduationCap', 8),
            ('bank', 'savings', 'cashplus_business', 'CashPlus Business', 'Six-month investment account with tiered interest rates and no account maintenance fees.', '6 month investment period', 'Briefcase', 9),
            ('bank', 'savings', 'cashplus_individual', 'CashPlus Individual', 'Longer-term savings with tiered interest rates and free cash withdrawals every 90 days.', 'No withdrawals before 12 months', 'PiggyBank', 10),
            ('bank', 'savings', 'cashplus_housing', 'CashPlus Housing', 'Save towards a home and qualify for a mortgage, with tenures currently ranging from 2 to 10 years.', 'Mortgage tenure 2 to 10 years', 'Home', 11),
            ('bank', 'loans', 'civil_servant_loan', 'Civil Servant Loan', 'Personal loan for civil servants of up to 10 times net salary, repaid over 36 months by SSB deduction.', 'Up to 10x net salary', 'Banknote', 1),
            ('bank', 'loans', 'direct_debit_loan', 'Loan — Individual Direct Debit', 'Personal loan for private sector employees of up to 12 times net salary, deducted from payroll.', 'Up to 12x net salary', 'Banknote', 2),
            ('bank', 'loans', 'nostro_loan', 'Nostro Individual Loan', 'USD personal loan for nostro account holders, up to twice net salary to a maximum of US$5,000.', 'Up to US$5,000', 'Coins', 3),
            ('bank', 'loans', 'private_school_fees_loan', 'Private School Fees Loan', 'Pays school fees directly into the school account, repayable over 4 months, up to 3 times net salary.', 'Up to 3x net salary', 'GraduationCap', 4),
            ('bank', 'loans', 'student_loan_facility', 'Student Loan Facility', 'Pays tertiary fees directly into the institution account, repayable over 4 months.', 'Paid direct to the institution', 'GraduationCap', 5),
            ('bank', 'loans', 'payday_loan', 'Payday Loan', 'Short-term credit for emergencies: 50% of net salary, repayable over 30 days.', '50% of net salary', 'Clock', 6),
            ('bank', 'cards', 'visa_gold', 'Visa Gold Card', 'Internationally recognised card for ATMs and Visa POS terminals, pre-funded for local and international use.', 'Open to non-account holders', 'CreditCard', 1),
            ('bank', 'cards', 'student_visa', 'Student Visa Card', 'Pre-funded international card for registered students, including those who do not bank with CBZ.', 'Open to non-account holders', 'GraduationCap', 2),
            ('bank', 'cards', 'atm_card', 'ATM Card', 'Debit card giving access to your account through ATMs and point of sale terminals.', 'For existing account holders', 'CreditCard', 3),
            ('bank', 'cards', 'sme_debit_card', 'SME\'s Debit Card', 'Debit card issued to small companies for ATM and POS access.', 'For existing SME clients', 'Briefcase', 4),
            ('bank', 'channels', 'cbz_touch', 'CBZ Touch', 'Zero-rated mobile banking: transfers, bill payments, school fees, cardless withdrawals and card controls.', 'Zero rated', 'Smartphone', 1),
            ('bank', 'channels', 'internet_banking', 'Internet Banking', 'Web banking for balances, statements, internal and RTGS transfers, Visa card transfers and utility payments.', 'For existing account holders', 'Globe', 2),
            ('bank', 'channels', 'e_statements', 'E-statements', 'Password-protected PDF statements delivered automatically to your email address.', 'For existing customers', 'FileCheck', 3),
            ('bank', 'channels', 'visa_pos', 'Visa Point of Sale (POS)', 'Visa affiliated POS terminals for merchants in retail and services, accepting Visa Gold Card payments.', 'For existing corporate account holders', 'QrCode', 4),
            ('bank', 'channels', 'local_pos', 'Local Point of Sale (POS)', 'POS terminals accepting ATM card and ZimSwitch payments for retail and service merchants.', 'For existing corporate account holders', 'QrCode', 5),
            ('bank', 'channels', 'kleva_pos', 'Kleva POS', 'Portable POS machine for SMEs, sole traders and street vendors, free to any qualifying trader.', 'Free to qualifying traders', 'Zap', 6),
            # Red Sphere Finance - products deck
            ('micro', 'salary', 'ssb_loan', 'SSB Loan', 'Salary-based lending for government employees, with convenient access to finance and a fast turnaround.', '6% interest · up to US$2,400', 'Banknote', 1),
            ('micro', 'salary', 'pensioners', 'Pensioners Loan', 'Financial flexibility and independence for government pensioners, even after retirement.', '6% interest', 'ShieldCheck', 2),
            ('micro', 'salary', 'private_payroll', 'Private Payroll Loan', 'Convenient salary-based finance for employees of participating private employers.', '7.25% interest · 5% admin fee', 'Briefcase', 3),
            ('micro', 'salary', 'lockable_device', 'Partner Lockable Device — Chipset & Avantvest', 'Access to productive assets for salaried individuals without direct salary deductions, with built-in asset security.', '5% interest', 'Smartphone', 4),
            ('micro', 'business', 'sme_working_capital', 'SME Working Capital', 'Closes cash-flow gaps for registered enterprises so they can keep trading and fulfil customer orders.', '5% interest · 5.2% admin fee', 'Building2', 1),
            ('micro', 'business', 'tuckshop', 'SME Tuck-shop Facility', 'Short-term stock finance for tuck-shops: stock more, sell more, grow more.', '5% interest · 5.2% admin fee', 'ShoppingBag', 2),
            ('micro', 'business', 'individual_business', 'Individual Business Loans', 'Working capital for unregistered small businesses looking to increase capacity.', '5% interest · 5.2% admin fee', 'Briefcase', 3),
            ('micro', 'business', 'order_finance', 'Order Financing & Invoice Discounting', 'Turns outstanding invoices into working capital and improves supplier capacity.', '5% interest · 90 days', 'FileCheck', 4),
            ('micro', 'partners', 'partner_personal_loan', 'Agents & Partners Personal Loans', 'Personal lending for Red Sphere agents and partners: more than a partnership, a financial advantage.', '5% interest · up to US$2,000', 'HeartHandshake', 1),
            ('micro', 'partners', 'partner_car_loan', 'Agents & Partners Car Loan', 'Vehicle finance for Red Sphere agents and partners, on a 30% deposit.', '5% interest · 30% deposit', 'Car', 2),
            ('micro', 'partners', 'agency_contract', 'Agency Contract', 'Canvass loan applications for Red Sphere\'s salary-based SSB civil servant loans, and other business as agreed, and earn commission.', '5% plus a monthly once-off fee', 'Users', 3),
            ('micro', 'partners', 'partnership', 'Partnership', 'An MOU with Red Sphere that lets your retail outlets sell to civil servants and salaried staff of approved companies on credit.', '8% commission', 'HeartHandshake', 4),
            ('micro', 'agriculture', 'profeeds', 'Profeeds SSB and Farmers Product', 'Stock feed finance supporting different farming needs, for farmers and civil service employees.', '5% farmers · 6% civil service', 'Sprout', 1),
            # CBZ Life - brief product catalogue
            ('life', 'individual', 'comfortsure', 'Comfortsure Funeral Cashplan', 'A pre-defined funeral benefit paid immediately to the nominated beneficiary on the death of the life insured.', 'Individual life', 'HeartHandshake', 1),
            ('life', 'individual', 'sarapavana', 'Sarapavana Education Plan', 'A long-term savings plan that builds funds for a child\'s primary and secondary education, with life cover attached.', 'Individual life', 'GraduationCap', 2),
            ('life', 'employee', 'group_life', 'Group Life Assurance', 'Employer-sponsored life cover paying benefits to beneficiaries on the death of an employee.', 'Employee benefits', 'Users', 1),
            ('life', 'employee', 'retirement_savings', 'Retirement Savings Products', 'Products designed to help individuals and groups accumulate funds for retirement.', 'Employee benefits', 'PiggyBank', 2),
            ('life', 'employee', 'annuities', 'Annuities', 'Regular income payments to retirees, drawn from accumulated retirement savings.', 'Employee benefits', 'Coins', 3),
            ('life', 'employee', 'credit_life', 'Credit Life Insurance', 'Covers the outstanding balance of a loan in the event of death, so the debt does not pass to the family.', 'Employee benefits', 'ShieldCheck', 4),
            # CBZ Agro-Yield - divisions supplied by the business
            ('agri', 'divisions', 'agro_enterprise', 'Agro Enterprise', 'Joint venture schemes with farming enterprises.', 'Joint venture schemes', 'HeartHandshake', 1),
            ('agri', 'divisions', 'agro_farming', 'Agro Farming', 'Seasonal contract farming.', 'Seasonal contract farming', 'Sprout', 2),
            ('agri', 'divisions', 'agro_commodity_trading', 'Agro Commodity Trading', 'Market and offtake opportunities for agricultural commodities.', 'Market and offtake opportunities', 'TrendingUp', 3),
            ('agri', 'divisions', 'agro_supply_chain', 'Agro Supply Chain', 'Farm mechanisation, equipment leasing and sales, borehole drilling and combine harvesters.', 'Mechanisation and equipment', 'Tractor', 4),
            # Awaiting product documentation (figures below are unverified):
            ("insurance", "personal", "ins_motor", "Comprehensive Private Motor Cover", "All-risk protection covering accidental damage, third-party liability, fire, and theft.", "From $46/month", "Car", 1),
            ("insurance", "personal", "ins_home", "Homeowners Comprehensive", "Covers residential structures and contents against storm, burst pipes, and break-ins.", "From $25/month", "Home", 2),
            ("insurance", "personal", "ins_travel", "Worldwide Travel Insurance", "Emergency medical, trip cancellation, and baggage loss protection for travel.", "From $18 per trip", "Plane", 3),
            ("insurance", "business", "ins_fleet", "Commercial Fleet Insurance", "Tailored multi-vehicle policy with telematics tracking integration and discounts.", "Volume fleet rates", "Truck", 1),
            ("insurance", "business", "ins_assets", "Business All Risks", "Protection for computers, plant, machinery, and office assets against all hazards.", "Custom enterprise quotes", "ShieldCheck", 2),
            ("datvest", "unitTrusts", "dat_money_market", "Datvest Money Market Fund", "Preserve capital with competitive daily interest yields and instant liquidity.", "Historic yield: 8.5% p.a. | $50 min", "TrendingUp", 1),
            ("datvest", "institutional", "dat_balanced", "Datvest Balanced Growth Fund", "Equities, fixed income, and property mix for mid-to-long term wealth accumulation.", "Target yield: 12.5% p.a.", "PieChart", 2),
            ("datvest", "privateWealth", "dat_equity", "Datvest High Conviction Equity Fund", "Concentrated portfolio of premier listed counters on the Zimbabwe Stock Exchange & VFEX.", "Capital appreciation focus", "BarChart3", 3),
            ("properties", "residential", "prop_stands_harare", "Harare Prime Residential Stands", "Fully serviced residential stands with tarred roads, electricity, and water in place.", "From $35,000 | 15% deposit", "MapPin", 1),
            ("properties", "commercial", "prop_office_park", "CBZ Corporate Park Office Suites", "Grade-A sustainable corporate office space available for long-term lease or purchase.", "Inquire for floor plans", "Building", 2),
            ("properties", "advisory", "prop_valuation", "Property Valuation & Advisory", "Licensed valuation services for commercial portfolios, residential deeds, and collaterals.", "Regulated professional rates", "FileText", 3),
        ]

        ProductItem.objects.all().delete()
        for sub_id, cat, item_id, name, desc, pricing, icon, order in products_data:
            subsidiary = Subsidiary.objects.get(id=sub_id)
            ProductItem.objects.create(
                subsidiary=subsidiary,
                category=cat,
                item_id=item_id,
                name=name,
                description=desc,
                pricing=pricing,
                icon=icon,
                order=order,
            )
        self.stdout.write(self.style.SUCCESS(f"Seeded {len(products_data)} products."))

        # 5. Billers
        billers_data = [
            ("zesa", "ZESA Prepaid Electricity", "Utilities", "Zap", 1),
            ("econet", "Econet Airtime & Data", "Telecoms", "Phone", 2),
            ("netone", "NetOne OneFusion Airtime", "Telecoms", "Phone", 3),
            ("telecel", "Telecel Mobile", "Telecoms", "Phone", 4),
            ("city-harare", "City of Harare Rates", "Municipalities", "Building2", 5),
            ("city-byo", "City of Bulawayo Rates", "Municipalities", "Building2", 6),
            ("zinara", "ZINARA Tollgate & License", "Government", "Car", 7),
            ("zbc", "ZBC Radio & TV Licensing", "Government", "Tv", 8),
            ("telone", "TelOne Broadband", "Internet", "Wifi", 9),
            ("liquid", "Liquid Home Internet", "Internet", "Globe", 10),
        ]
        for bid, name, cat, icon, order in billers_data:
            Biller.objects.update_or_create(
                id=bid,
                defaults={"name": name, "category": cat, "icon_name": icon, "order": order},
            )
        self.stdout.write(self.style.SUCCESS(f"Seeded {len(billers_data)} billers."))

        # 6. Insurance Options
        assets_data = [
            ("asset-private-motor", "Private Vehicle", "Personal sedans, hatchbacks, SUVs, and family vehicles", "CBZ Insurance Limited", 1),
            ("asset-commercial-fleet", "Commercial Fleet", "Delivery trucks, corporate fleet vehicles, and light commercial vans", "CBZ Insurance Limited", 2),
            ("asset-property", "Residential Property", "Family houses, townhouses, and home structural contents", "CBZ Insurance Limited", 3),
            ("asset-agro", "Agriculture & Crops", "Maize, wheat, tobacco, and livestock multi-peril coverage", "CBZ Insurance Limited", 4),
            ("asset-business", "Business Assets", "Office equipment, factory machinery, and inventory all-risks", "CBZ Insurance Limited", 5),
            ("asset-travel", "International Travel", "Overseas medical emergencies, flight delays, and lost luggage", "CBZ Insurance Limited", 6),
        ]
        for aid, name, desc, entity, order in assets_data:
            AssetOption.objects.update_or_create(
                id=aid,
                defaults={"name": name, "description": desc, "entity": entity, "order": order},
            )

        covers_data = [
            ("thirdparty", "Third Party Only", "Basic Statutory Cover", Decimal("14.00"), 0.0, ["Statutory Legal Compliance", "Third Party Property Damage", "Third Party Injury Cover"], 1),
            ("fullthird", "Full Third Party, Fire & Theft", "Intermediate Cover", Decimal("27.00"), 0.010, ["All Third Party Benefits", "Fire & Lightning Damage", "Total Theft Protection", "Window Glass Cover"], 2),
            ("comprehensive", "Comprehensive Motor Cover", "Maximum Protection", Decimal("46.00"), 0.045, ["Accidental Collision Damage", "Fire & Theft Protection", "Third Party Liability", "Free Towing Service", "Medical Expense Allowance", "Passenger Legal Liability"], 3),
        ]
        for cid, name, tier, base_usd, rate_pct, features, order in covers_data:
            CoverOption.objects.update_or_create(
                id=cid,
                defaults={"name": name, "tier": tier, "base_price_usd": base_usd, "rate_percentage": rate_pct, "features": features, "order": order},
            )

        addons_data = [
            ("addon-roadside", "24/7 Roadside Rescue", "CBZ Insurance Limited", "Nationwide towing, emergency battery jumpstart, and flat tyre service.", Decimal("9.00"), 1),
            ("addon-passenger", "Passenger Liability Cover", "CBZ Insurance Limited", "Medical expenses and legal claims for up to 4 passengers in vehicle.", Decimal("6.00"), 2),
            ("addon-windscreen", "Windscreen Protection", "CBZ Insurance Limited", "Zero-excess windscreen replacement across authorized glass centres.", Decimal("0.00"), 3),
            ("addon-excess", "Excess Buy-Back Waiver", "CBZ Insurance Limited", "Eliminates the customer's out-of-pocket deductible in the event of an accident claim.", Decimal("18.00"), 4),
        ]
        for adid, name, entity, desc, price, order in addons_data:
            AddonOption.objects.update_or_create(
                id=adid,
                defaults={"name": name, "entity": entity, "description": desc, "price_usd": price, "order": order},
            )
        self.stdout.write(self.style.SUCCESS("Seeded insurance assets, cover tiers, and add-on options."))

        # 7. Branches and ATMs
        branches_data = [
            ("CBZ Kwame Nkrumah Branch (Main)", BranchType.BRANCH, "Harare", "Corner Kwame Nkrumah Ave & First Street, Harare", -17.8288, 31.0505, "+263 242 748050", ["Full Banking", "Forex Bureau", "Corporate Desk", "24/7 ATM", "Mortgage Advisory"]),
            ("CBZ Borrowdale Express Agency", BranchType.AGENCY, "Harare", "Shop 14, Sam Levy's Village, Borrowdale, Harare", -17.7548, 31.0851, "+263 242 882040", ["Personal Banking", "Card Collection", "Forex Exchange", "24/7 ATM"]),
            ("CBZ Avondale Branch", BranchType.BRANCH, "Harare", "Avondale Shopping Centre, King George Road, Harare", -17.7981, 31.0369, "+263 242 334511", ["Retail Banking", "SME Lending", "Touch App Support", "ATM"]),
            ("CBZ Jason Moyo Bulawayo Branch", BranchType.BRANCH, "Bulawayo", "8th Avenue & Jason Moyo Street, Bulawayo", -20.1558, 28.5833, "+263 292 884100", ["Full Banking", "Agro-Finance Desk", "Forex Bureau", "24/7 ATM"]),
            ("CBZ Gweru Main Branch", BranchType.BRANCH, "Gweru", "54 Robert Mugabe Way, Gweru", -19.4589, 29.8153, "+263 54 222301", ["Retail & Agribusiness Banking", "Western Union", "24/7 ATM"]),
            ("CBZ Mutare Main Branch", BranchType.BRANCH, "Mutare", "Corner Herbert Chitepo & 4th Street, Mutare", -18.9728, 32.6710, "+263 20 64722", ["Full Banking", "Trade Finance", "Forex", "24/7 ATM"]),
            ("CBZ Victoria Falls Agency", BranchType.AGENCY, "Victoria Falls", "Livingstone Way, Victoria Falls Centre", -17.9281, 25.8402, "+263 83 284420", ["Tourist Forex Exchange", "Visa & MasterCard ATM", "Cash Withdrawals"]),
            ("CBZ Robert Mugabe International Airport ATM", BranchType.ATM, "Harare", "International Departures Concourse, R.G. Mugabe Airport", -17.9318, 31.0928, "+263 8677004050", ["24/7 Multi-Currency ATM (USD & ZWG)"]),
        ]
        Branch.objects.all().delete()
        for name, btype, city, addr, lat, lng, phone, srvs in branches_data:
            Branch.objects.create(
                name=name,
                branch_type=btype,
                city=city,
                address=addr,
                latitude=lat,
                longitude=lng,
                phone=phone,
                services=srvs,
            )
        self.stdout.write(self.style.SUCCESS(f"Seeded {len(branches_data)} branches & ATMs."))

        # 8. Audiences, Life Stages, Goals
        audiences_data = [
            ("Personal Banking", "Comprehensive financial tools designed for everyday life and personal milestones.", "User", "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800", "Individual", 1),
            ("Business & SMEs", "Empowering small and medium enterprises with working capital, POS terminals, and advisory.", "Building2", "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800", "Enterprise", 2),
            ("Corporate & Institutional", "Tailored treasury services, syndicated debt facilities, and trade finance for industry leaders.", "Landmark", "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800", "Corporate", 3),
            ("Diaspora Banking", "World-class mortgage loans, remote investments, and low-cost remittance channels for Zimbabweans abroad.", "Globe", "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=800", "Global", 4),
        ]
        Audience.objects.all().delete()
        for title, desc, icon, img, tag, order in audiences_data:
            Audience.objects.create(
                title=title, description=desc, icon_name=icon, image=img, tag=tag, order=order
            )

        life_stages_data = [
            ("Starting Out", "First bank account, student cards, and credit basics", "GraduationCap", 1),
            ("Building Wealth", "First home stands, vehicle insurance, and career savings", "Briefcase", 2),
            ("Growing a Business", "Working capital, fleet leasing, and payroll accounts", "TrendingUp", 3),
            ("Preserving Legacy", "Retirement annuities, trust planning, and wealth transition", "Shield", 4),
        ]
        LifeStage.objects.all().delete()
        for title, subtitle, icon, order in life_stages_data:
            LifeStage.objects.create(title=title, subtitle=subtitle, icon_name=icon, order=order)

        goals_data = [
            ("Open a Personal FCA Account", "bank", "CBZ Bank Limited", 1),
            ("Insure My Vehicle Online", "insurance", "CBZ Insurance", 2),
            ("Buy a Serviced Residential Stand", "properties", "CBZ Properties", 3),
            ("Invest in Unit Trusts", "investments", "Datvest", 4),
            ("Finance Crop Farming (Agro-Yield)", "agribusiness", "CBZ Agro-Yield", 5),
            ("Bank from the Diaspora", "bank", "CBZ Bank Limited", 6),
        ]
        Goal.objects.all().delete()
        for label, route, sub, order in goals_data:
            Goal.objects.create(label=label, route=route, subsidiary=sub, order=order)

        # 9. Corporate Announcements & Disclosures
        announcements_data = [
            {
                "slug": "fy2025-results",
                "category": "shareholder",
                "title": "Audited Financial Results for the Year Ended 31 December 2025 & Final Dividend Declaration",
                "date_display": "28 March 2026",
                "summary": "The Board of Directors of CBZ Holdings Limited advises shareholders that the audited financial results have been approved, with a recommended final dividend declaration of USD 0.045 per share.",
                "circular_ref": "ZSE: CBZ / CIR-03-2026",
                "is_urgent": True,
                "file_size": "PDF · 3.4 MB",
                "tag": "Dividend & Results",
                "order": 1,
            },
            {
                "slug": "saturday-banking",
                "category": "customer",
                "title": "Customer Notice: Extended Saturday Banking Hours Across Selected Urban Branches",
                "date_display": "18 March 2026",
                "summary": "To enhance customer convenience for cash deposits, Nostro account opening, and card collection, 18 branches across Harare, Bulawayo, Mutare, and Gweru will now operate from 08:00 to 13:00 on Saturdays.",
                "circular_ref": "OPS / BNK-2026-04",
                "is_urgent": False,
                "file_size": "PDF · 420 KB",
                "tag": "Branch Notice",
                "order": 2,
            },
            {
                "slug": "agm-notice-2026",
                "category": "shareholder",
                "title": "Notice of the 37th Annual General Meeting of Shareholders",
                "date_display": "10 March 2026",
                "summary": "Notice is hereby given that the 37th AGM of members of CBZ Holdings Limited will be held virtually and physically at CBZ Training Centre, Pomona, Harare on Friday 15 May 2026 at 10:00 AM.",
                "circular_ref": "SEC / AGM-2026-01",
                "is_urgent": False,
                "file_size": "PDF · 1.2 MB",
                "tag": "Shareholder Notice",
                "order": 3,
            },
            {
                "slug": "digital-card-upgrade",
                "category": "customer",
                "title": "Service Upgrade: Enhanced 3D Secure Protection on All CBZ Visa Cards",
                "date_display": "02 March 2026",
                "summary": "All CBZ Visa Gold, Platinum, and Corporate debit cards have been upgraded with multi-factor biometric authentication for international e-commerce purchases, providing zero-liability fraud protection.",
                "circular_ref": "DIG / SEC-2026-08",
                "is_urgent": False,
                "file_size": "PDF · 650 KB",
                "tag": "Security Update",
                "order": 4,
            },
            {
                "slug": "monetary-policy-circular",
                "category": "regulatory",
                "title": "RBZ Monetary Policy Directive Alignment & Foreign Exchange Guidelines",
                "date_display": "24 February 2026",
                "summary": "Operationalization guidelines for individual Nostro retention, export surrender requirements, and revised interbank FX trading spreads in full compliance with the latest RBZ directives.",
                "circular_ref": "REG / RBZ-2026-02",
                "is_urgent": False,
                "file_size": "PDF · 1.8 MB",
                "tag": "Regulatory Circular",
                "order": 5,
            },
            {
                "slug": "cautionary-statement",
                "category": "shareholder",
                "title": "Cautionary Statement: Proposed Strategic Regional Expansion Transaction",
                "date_display": "15 February 2026",
                "summary": "Shareholders are advised that negotiations are ongoing regarding a proposed strategic transaction which, if successfully concluded, may have a material effect on the price of the company’s securities.",
                "circular_ref": "ZSE: CBZ / CAUT-2026-01",
                "is_urgent": True,
                "file_size": "PDF · 880 KB",
                "tag": "Cautionary Statement",
                "order": 6,
            },
        ]
        for item in announcements_data:
            Announcement.objects.update_or_create(slug=item["slug"], defaults=item)
        self.stdout.write(self.style.SUCCESS(f"Seeded {len(announcements_data)} corporate announcements."))

        # 10. Contact Channels
        channels_data = [
            {
                "slug": "tollfree-mobile",
                "name": "Toll-Free Line (All Networks)",
                "description": "Free of charge from Econet, NetOne, and Telecel mobile lines",
                "value": "460",
                "action_text": "Call 460 Toll-Free",
                "action_href": "tel:460",
                "badge": "Toll-Free",
                "icon_name": "PhoneCall",
                "availability": "24/7 Available",
                "order": 1,
            },
            {
                "slug": "tollfree-telone",
                "name": "Toll-Free Landline Support",
                "description": "Toll-free access for fixed landlines and alternative support",
                "value": "461",
                "action_text": "Call 461 Toll-Free",
                "action_href": "tel:461",
                "badge": "Toll-Free",
                "icon_name": "Phone",
                "availability": "24/7 Available",
                "order": 2,
            },
            {
                "slug": "whatsapp",
                "name": "Official WhatsApp Banking",
                "description": "Check balances, mini-statements, buy airtime, and chat with an agent",
                "value": "+263 774 460 460",
                "action_text": "Open WhatsApp Chat",
                "action_href": "https://wa.me/263774460460?text=Hi%20CBZ%20I%20would%20like%20assistance",
                "badge": "Instant Bot & Agents",
                "icon_name": "MessageSquare",
                "availability": "24/7 Active",
                "order": 3,
            },
            {
                "slug": "contactcentre",
                "name": "Direct Contact Centre Lines",
                "description": "Direct inquiries, card blocking, and cross-entity issue escalation",
                "value": "+263 8677 004050 / +263 24 2799 234-9",
                "action_text": "Call +263 8677 004050",
                "action_href": "tel:+2638677004050",
                "icon_name": "Phone",
                "availability": "24 Hours / 7 Days",
                "order": 4,
            },
            {
                "slug": "ussd",
                "name": "USSD Fast Banking",
                "description": "Perform transactions on any phone without data or internet connection",
                "value": "*460#",
                "action_text": "Dial *460#",
                "action_href": "tel:*460%23",
                "badge": "No Data Required",
                "icon_name": "Smartphone",
                "availability": "Always Available",
                "order": 5,
            },
            {
                "slug": "email-support",
                "name": "Client Support Email Desk",
                "description": "Formal inquiries, document submissions, and statements",
                "value": "contactcentre@cbz.co.zw",
                "action_text": "Send Email",
                "action_href": "mailto:contactcentre@cbz.co.zw",
                "icon_name": "Mail",
                "availability": "Response within 2 hours",
                "order": 6,
            },
            {
                "slug": "branch-locator",
                "name": "Branch & ATM Network",
                "description": "Over 60 branches and 800+ agency outlets nationwide",
                "value": "Branches in Harare, Bulawayo, Mutare, Gweru & Nationwide",
                "action_text": "Locate Nearest Branch",
                "action_href": "#branch-directory",
                "icon_name": "MapPin",
                "availability": "Mon - Fri 08:00 - 15:00 · Sat 08:00 - 13:00",
                "order": 7,
            },
        ]
        for ch in channels_data:
            ContactChannel.objects.update_or_create(slug=ch["slug"], defaults=ch)
        self.stdout.write(self.style.SUCCESS(f"Seeded {len(channels_data)} contact channels."))

        # 11. Corporate Verified Facts
        facts_data = [
            {"key": "years", "label": "Years in Operation", "value": "46 years", "confirmed": True, "order": 1},
            {"key": "branches", "label": "Branch Network", "value": "Over 60 branches", "confirmed": True, "order": 2},
            {"key": "zseListed", "label": "Stock Exchange Status", "value": "Listed on the Zimbabwe Stock Exchange (ZSE: CBZ)", "confirmed": True, "order": 3},
            {"key": "companies", "label": "Ecosystem Entities", "value": "9 companies", "confirmed": True, "order": 4},
            {"key": "tollFree", "label": "Toll-Free Numbers", "value": "460 / 461", "confirmed": True, "order": 5},
            {"key": "whatsapp", "label": "WhatsApp Desk", "value": "+263 774 460 460", "confirmed": True, "order": 6},
            {"key": "switchboard", "label": "Switchboard Line", "value": "+263 8677 004050", "confirmed": True, "order": 7},
            {"key": "email", "label": "Contact Centre Email", "value": "contactcentre@cbz.co.zw", "confirmed": True, "order": 8},
            {"key": "address", "label": "Corporate Headquarters", "value": "5 Campbell Road, Pomona, Harare", "confirmed": True, "order": 9},
        ]
        for f in facts_data:
            CorporateFact.objects.update_or_create(key=f["key"], defaults=f)
        self.stdout.write(self.style.SUCCESS(f"Seeded {len(facts_data)} corporate facts."))

        self.stdout.write(self.style.SUCCESS("Master data seeding completed successfully!"))

