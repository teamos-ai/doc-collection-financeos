export type Source = {
  id: string;
  name: string;
  url: string;
  date: string;
  finding: string;
  status: string;
};
export const sources: Source[] = [
  {
    id: "CBA",
    name: "CommBank · application checklist",
    url: "https://www.commbank.com.au/home-loans/applying-for-a-home-loan.html",
    date: "Web page checked 19 Nov 2026",
    status: "Primary source",
    finding:
      "Salary-credit evidence distinguishes three months from six for casual employment. Self-employed evidence and rental alternatives vary. This supports conditional requests, not a blanket bank-statement pack.",
  },
  {
    id: "ANZ",
    name: "ANZ · home loan checklist",
    url: "https://www.anz.com.au/personal/home-loans/get-started/checklist/",
    date: "Web page checked 19 Nov 2026 · excludes ANZ Plus",
    status: "Primary source",
    finding:
      "PAYG evidence depends on YTD history. Recent payslips may be up to 60 days old. Self-employed routes include one-year evidence or eligible company wages. Home-loan statements are generally unnecessary, with exceptions. Signed contracts come after approval-in-principle.",
  },
  {
    id: "NAB",
    name: "NAB · application, page 2",
    url: "https://www.nab.com.au/content/dam/nabrwd/documents/forms/loans/home-loan-application-form.pdf",
    date: "Document 79936A-0725 · July 2025 · checked 19 Nov 2026",
    status: "Dated primary PDF",
    finding:
      "Refinanced loans: six months of transactions, evidence no older than 90 days. PAYG alternatives include one YTD payslip or two of the last three, usually within 45 days; longer pay cycles differ. This separates history, quantity and freshness.",
  },
  {
    id: "WBC",
    name: "Westpac · self-employed broker guide",
    url: "https://www.westpac.com.au/brokers/ideas-hub/self-employed/",
    date: "Web page checked 19 Nov 2026",
    status: "Primary source",
    finding:
      "Separate eligible Fast Track, one-year and standard two-year routes. Fast Track uses two personal ATO notices of assessment. Other routes can require entity financials. Do not silently put excluded standalone financials back into the collection catalogue.",
  },
  {
    id: "ING",
    name: "ING · mortgage application checklist",
    url: "https://www.ing.com.au/pdf/application_checklist.pdf",
    date: "Historical 2017 checklist · re-located 19 Nov 2026",
    status: "Historical only",
    finding:
      "Useful Australian naming and older six-month loan / three-month card refinance references. Not accepted as current policy. Current detailed ING broker requirements remain an explicit gap; a newer broker-flyer URL could not be retrieved in this pass.",
  },
  {
    id: "ATO-I",
    name: "ATO · income statements",
    url: "https://www.ato.gov.au/individuals-and-families/jobs-and-employment-types/working-as-an-employee/income-statements/access-your-income-statement",
    date: "Checked 19 Nov 2026",
    status: "Terminology authority",
    finding:
      "Use ATO income statement. A PAYG payment summary is an alternative employer reporting document, not a tax return or notice of assessment. Keep the actual evidence route on the request.",
  },
  {
    id: "ATO-N",
    name: "ATO · notice of assessment",
    url: "https://www.ato.gov.au/individuals-and-families/your-tax-return/your-notice-of-assessment",
    date: "Checked 19 Nov 2026",
    status: "Terminology authority",
    finding:
      "The notice of assessment is the ATO assessment following a tax return. Request the correct financial year and keep it distinct from both the return and the ATO account statement.",
  },
  {
    id: "HG",
    name: "Hunter Galloway · supplied checklist",
    url: "https://www.huntergalloway.com.au/",
    date: "Local one-page PDF read 19 Nov 2026 · publication date unknown",
    status: "Broker comparison",
    finding:
      "Compares common income, savings, liabilities and property evidence. Its three-year self-employed / six-month savings suggestions differ from the proposed baseline. Use as gap discovery, not lender policy. Original file is recorded in the research handoff.",
  },
  {
    id: "AUSSIE",
    name: "Aussie · supplied refinance checklist",
    url: "https://www.aussie.com.au/",
    date: "Local one-page PDF ©2021 read 19 Nov 2026",
    status: "Historical comparison",
    finding:
      "Separates refinance purpose, existing debts, income and rates notices. Its older “Group Certificates” wording maps to the appropriate ATO income statement / PAYG payment summary route. Expense evidence stays outside this module.",
  },
  {
    id: "ANZ-C",
    name: "ANZ · supplied construction checklist",
    url: "https://www.anz.com.au/personal/home-loans/",
    date: "Local PDF 08.2022; internally current at 29 Apr 2020",
    status: "Historical stage comparison",
    finding:
      "Deposit, progress and final draw evidence differ. Use it to justify a construction-stage input; do not import historical payment lead times or request final-stage evidence at initial application.",
  },
];
export type ScenarioRule = {
  id: string;
  scenario: string;
  documents: string;
  period: string;
  quantity: string;
  freshness: string;
  condition: string;
  basis: "Founder standard" | "Proposed" | "Exception";
  sources: string[];
};
export const scenarioRules: ScenarioRule[] = [
  {
    id: "R01",
    scenario: "Home loan being refinanced",
    documents: "Home loan statements",
    period: "6 continuous months",
    quantity: "Enough statements to cover the period",
    freshness: "Proposed: latest evidence within 90 days; lender check",
    condition: "Per refinanced account; retained loans use a separate rule.",
    basis: "Founder standard",
    sources: ["NAB", "ANZ"],
  },
  {
    id: "R02",
    scenario: "Credit card consolidated into home loan",
    documents: "Credit card statements",
    period: "6 continuous months",
    quantity: "Enough statements to cover the period",
    freshness: "Latest available; exact cutoff unresolved",
    condition: "Only cards explicitly marked Consolidated.",
    basis: "Founder standard",
    sources: [],
  },
  {
    id: "R03",
    scenario: "Credit card retained / conduct check",
    documents: "Credit card statements",
    period: "3 continuous months",
    quantity: "Enough statements to cover the period",
    freshness: "Latest available; exact cutoff unresolved",
    condition: "Per retained card. Never inherit another card’s treatment.",
    basis: "Founder standard",
    sources: [],
  },
  {
    id: "R04",
    scenario: "Permanent PAYG income",
    documents: "Payslips",
    period: "Current pay cycles",
    quantity: "Proposed: 2 consecutive payslips",
    freshness: "Proposed: latest within 30 days",
    condition:
      "Employer and YTD details matter. Lender alternatives may reduce the pack; not a universal two-slip rule.",
    basis: "Proposed",
    sources: ["NAB", "ANZ", "CBA"],
  },
  {
    id: "R05",
    scenario: "Casual PAYG income",
    documents: "Payslips; ATO income statement if history is insufficient",
    period: "Proposed: establish 6 months income history",
    quantity: "2 latest payslips plus only the missing history",
    freshness: "Payslip cutoff proposed; history supplement per selected route",
    condition:
      "If YTD establishes history, do not request duplicate historical evidence automatically.",
    basis: "Proposed",
    sources: ["ANZ"],
  },
  {
    id: "R06",
    scenario: "Salary credits need matching",
    documents: "Salary bank statements",
    period: "Proposed: 3 months permanent / 6 months casual",
    quantity: "Enough statements for salary-credit coverage",
    freshness: "Latest available; cutoff to approve",
    condition:
      "Explicit matching need only. Match net payslip amounts and payment dates; no general transaction-account chase.",
    basis: "Proposed",
    sources: ["CBA", "ANZ"],
  },
  {
    id: "R07",
    scenario: "Sole trader standard income route",
    documents: "Personal tax returns + ATO notices of assessment",
    period: "Proposed: 2 latest lodged financial years",
    quantity: "One return and assessment per selected year",
    freshness: "Specify FY; lender age limits vary",
    condition:
      "A starting pack, not sufficient evidence for every lender or business.",
    basis: "Proposed",
    sources: ["CBA", "NAB", "ANZ"],
  },
  {
    id: "R08",
    scenario: "Company profits relied upon",
    documents: "Personal tax returns / NOAs + business tax returns",
    period: "Proposed: 2 latest lodged financial years",
    quantity: "Per person and contributing entity",
    freshness: "Confirm lender route and year-end",
    condition:
      "Standalone P&L and balance sheet excluded by founder. If required, use controlled exception outside this pack.",
    basis: "Exception",
    sources: ["WBC", "CBA"],
  },
  {
    id: "R09",
    scenario: "Regular wages from own company",
    documents: "Eligible salary / ATO income evidence route",
    period: "Lender-specific; no generic automatic shortcut",
    quantity: "Confirm eligibility first",
    freshness: "Current lender rules",
    condition:
      "Do not treat a director as ordinary PAYG solely because a payslip exists.",
    basis: "Exception",
    sources: ["ANZ", "CBA"],
  },
  {
    id: "R10",
    scenario: "Partnership or trust income",
    documents:
      "Retained entity tax-return/financials bundle + relevant personal evidence",
    period: "Proposed: 2 latest relevant financial years",
    quantity: "Per contributing entity; avoid duplicate shared evidence",
    freshness: "Confirm selected lender age limits",
    condition:
      "Trust deed and applicable amendments are separate. Identify borrower / income-provider role; no removed trustee evidence.",
    basis: "Proposed",
    sources: ["WBC", "NAB"],
  },
  {
    id: "R11",
    scenario: "Eligible streamlined self-employed route",
    documents: "Route-specific alternatives, potentially personal NOAs",
    period: "No universal default",
    quantity: "Do not stack standard and streamlined packs",
    freshness: "Confirm eligibility against current policy",
    condition:
      "Westpac publishes distinct methods. Broker/policy owner resolves route before issue.",
    basis: "Exception",
    sources: ["WBC"],
  },
  {
    id: "R12",
    scenario: "Existing rental income",
    documents: "Rental statements OR current lease",
    period: "Proposed: latest statement / current lease",
    quantity: "One approved evidence route",
    freshness: "Current evidence for named property",
    condition:
      "Prospective rent is a separate exception because rental appraisals were excluded.",
    basis: "Proposed",
    sources: ["CBA", "ANZ"],
  },
  {
    id: "R13",
    scenario: "Purchase with signed contract",
    documents: "Contract of sale — buying",
    period: "Current transaction",
    quantity: "Complete signed contract",
    freshness: "Current signed version",
    condition:
      "Pre-approval without a property must not chase an unavailable contract.",
    basis: "Proposed",
    sources: ["ANZ", "NAB"],
  },
  {
    id: "R14",
    scenario: "Savings contribute to deposit",
    documents: "Savings statements",
    period: "Proposed: 3 continuous months",
    quantity: "Per contributing savings account",
    freshness: "Latest available; lender cutoff to confirm",
    condition:
      "Not a universal genuine-savings test. Gift letter and sale contract remain separate selected sources.",
    basis: "Proposed",
    sources: ["HG", "ANZ"],
  },
  {
    id: "R15",
    scenario: "Construction application",
    documents: "Building contract, plans, specifications and approvals",
    period: "Current project",
    quantity: "Required project versions",
    freshness: "Current / signed / approved as applicable",
    condition:
      "Progress invoices and completion evidence belong to later stages; owner-builder is an exception.",
    basis: "Proposed",
    sources: ["ANZ", "ANZ-C"],
  },
  {
    id: "R16",
    scenario: "Variable income / second job",
    documents:
      "Relevant earlier payslips, bonus, overtime or commission evidence",
    period: "Unresolved by income type and lender",
    quantity: "Do not assume one generic 3-month pack",
    freshness: "Unresolved",
    condition:
      "Identify employer and income component, then resolve approved evidence route.",
    basis: "Exception",
    sources: ["ANZ", "NAB"],
  },
  {
    id: "R17",
    scenario: "Government benefit or pension / foreign income",
    documents:
      "Government benefit or pension evidence / foreign income evidence",
    period: "No approved common period",
    quantity: "Selected income source only",
    freshness: "Confirm lender and source-specific standard",
    condition:
      "Do not reinstate removed translations, annuity or other excluded categories.",
    basis: "Exception",
    sources: ["CBA", "ANZ", "NAB"],
  },
  {
    id: "R18",
    scenario: "First-home buyer, guarantor or other debt",
    documents: "Selected retained catalogue items",
    period: "Scheme / liability / lender specific",
    quantity: "Resolve named requirement, not broad placeholder",
    freshness: "Current requirement at issue",
    condition:
      "First-home buyer is a flag, not a universal extra-document pack. No automatic scheme eligibility decision.",
    basis: "Exception",
    sources: [],
  },
];
export const namingAliases: Record<string, string[]> = {
  "driver-licence": ["Australian driver licence", "driver’s licence"],
  payslips: ["pay slips", "pay stubs — avoid US wording"],
  "ato-income": [
    "ATO income statement",
    "PAYG payment summary — alternative",
    "group certificate — legacy term",
  ],
  "notice-of-assessment": ["ATO notice of assessment", "NOA"],
  "personal-tax-return": [
    "individual tax return",
    "personal income tax return",
  ],
  "business-tax-return": ["company tax return", "entity tax return"],
  bas: ["business activity statement", "BAS"],
  "salary-statements": [
    "salary-credit statements",
    "bank statements showing salary credits",
  ],
  "rental-statements": [
    "property manager rental statements",
    "rental income statements",
  ],
  "home-loan-statements": [
    "mortgage statements",
    "home loan account statements",
  ],
  "credit-card-statements": ["credit card account statements"],
  "purchase-contract": ["contract of sale — buying", "purchase contract"],
  "sale-contract": ["contract of sale — selling", "asset sale contract"],
};
export const gaps = [
  [
    "Policy owner",
    "Approve proposed periods, identity combinations and evidence alternatives. The three founder statement durations stay locked.",
  ],
  [
    "Policy owner",
    "Resolve current ING rules, retained loans, variable/foreign income, first-home schemes and other liabilities before automatic issue.",
  ],
  [
    "Builder",
    "Prove loan/applicant/entity/account records, private upload scope, saved-file events and dynamic dropdowns in the target GHL account.",
  ],
  [
    "Tumai",
    "Approve receipt-pause, partial uploads, draft message copy and the restrained reminder schedule.",
  ],
  [
    "Builder + broker",
    "Excluded expenses, standalone business financials and other lender requirements need an owned external route. This module is not a complete credit assessment.",
  ],
];
