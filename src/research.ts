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
      "Useful Australian naming and older six-month loan / three-month card refinance references. Not accepted as current policy. Current initial broker requirements remain a gap. ING-V is a newer variation form, not a replacement initial-application checklist.",
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
    url: "https://www.anz.com.au/content/dam/anzcomau/documents/pdf/construction-loan-checklist.pdf",
    date: "Local PDF 08.2022; internally current at 29 Apr 2020",
    status: "Historical stage comparison",
    finding:
      "Deposit, progress and final draw evidence differ. Use it to justify a construction-stage input; do not import historical payment lead times or request final-stage evidence at initial application.",
  },
  {"id": "WBC-26", "name": "Westpac · broker minimum documents", "url": "https://www.westpac.com.au/content/dam/public/brokers/documents/applications/wbc-minimum-required-documents-checklist.pdf", "date": "WBC22133 0226 · February 2026 · checked 20 Nov 2026", "status": "Broker PDF · channel-specific", "finding": "Pages 1, 3–8: TFN removal, PAYG alternatives, CCR-based liability/refinance evidence, staged building documents. Exceptions still refer to credit policy; a waiver is not automatic."},
  {"id": "ING-V", "name": "ING · existing home-loan variation", "url": "https://www.ing.com.au/pdf/HomeLoans/Variation/VariationFormG.pdf", "date": "IM450 12/25 · December 2025 · checked 20 Nov 2026", "status": "Existing-loan variations only", "finding": "Pages 1/10/19: applies to existing ING loan changes; applicable Section I uses a payslip under one month and salary-credit evidence if ABN is absent. Closure Yes/No is an election, not proof of a universal closure-letter requirement."},
  {"id": "CBA-S", "name": "CommBank · statement issue frequency", "url": "https://www.commbank.com.au/home-loans/guide-to-statements.html", "date": "Checked 20 Nov 2026", "status": "Primary source", "finding": "Home-loan statements issue in January and July. Request date coverage, not six monthly files. A statement closing balance is not a payout figure."},
  {"id": "HLE-S", "name": "Home Loan Experts · statements guide", "url": "https://www.homeloanexperts.com.au/home-loan-documents/statements-transaction-histories/", "date": "Checked 20 Nov 2026 · publication date not independently established", "status": "Broker practice, not universal policy", "finding": "Distinguishes official statements from transaction histories and recommends pairing when ownership details/history are missing. Its CSV restriction is broker guidance, not a verified all-lender upload-format ban."},
  {"id": "ATO-D", "name": "ATO · definitions", "url": "https://www.ato.gov.au/Definitions/?anchor=P789-67151", "date": "Official indexed definition checked 20 Nov 2026; direct page returned 403", "status": "Official indexed terminology", "finding": "IAS is similar to BAS but excludes GST and some other taxes. BAS, IAS and ATO account ledgers are not aliases; only BAS remains in this catalogue."},
  {"id": "ATO-STP", "name": "ATO · finalising STP data", "url": "https://www.ato.gov.au/businesses-and-organisations/hiring-and-paying-your-workers/single-touch-payroll/finalising-your-stp-data", "date": "Official indexed guidance checked 20 Nov 2026", "status": "Terminology authority", "finding": "Payment summaries remain relevant for payments not reported/finalised through STP. Keep completed-year finalisation distinct from current YTD evidence; do not require an unfinished financial year to be Tax ready."},
  {"id": "WBC-P", "name": "Westpac · public broker policy", "url": "https://www.westpac.com.au/brokers/policy/", "date": "Checked 20 Nov 2026", "status": "Conflicting public guidance", "finding": "The page mentions both three and six months of rental history for genuine savings. Keep this purpose separate from landlord rental income; resolve the applicable route before issue."},
  {"id": "ANZ-P", "name": "ANZ · paper application", "url": "https://www.anz.com.au/content/dam/anzcomau/documents/pdf/home-loan-application-form.pdf", "date": "Page 2 · checked 20 Nov 2026", "status": "Channel-specific form", "finding": "Lists three months of home-loan statements if applicable. The web checklist generally does not require them. Do not erase this conditional channel difference."},
  {"id": "ANZ-D", "name": "ANZ · general documents guide", "url": "https://www.anz.com.au/personal/home-loans/get-started/documents-home-loan-application/", "date": "Checked 20 Nov 2026", "status": "General guide / differing freshness", "finding": "Mentions self-employed tax evidence under 18 months; the detailed checklist uses different limits. No universal tax-age cutoff is adopted."},
  {"id": "CBA-B", "name": "CommBank · business-owner verification", "url": "https://www.commbank.com.au/business/home-loans.html", "date": "Checked 20 Nov 2026", "status": "Primary source · eligible routes", "finding": "Simplified verification pairs salary evidence with business-profit evidence or an accepted accountant letter. It is not the same as ANZ’s company-wage route or Westpac’s NOA-only route."},
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
    quantity: "Enough non-overlapping evidence for the dates; a matching transaction listing may bridge a statement gap where accepted",
    freshness: "Proposed: latest evidence within 90 days; lender check",
    condition: "Per refinanced account; retained loans use a separate rule.",
    basis: "Founder standard",
    sources: ["NAB", "ANZ", "WBC-26", "CBA-S"],
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
      "Generate only after selecting the standard route. Review first generates no tax pack; a reduced-document route must not stack this pack.",
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
    sources: ["ANZ", "CBA-B"],
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
      "Westpac publishes distinct methods. Broker/policy owner verifies eligibility first. The form now previews a mutually exclusive NOA-only or company-wage route; selecting it does not approve it.",
    basis: "Exception",
    sources: ["WBC"],
  },
  {
    id: "R12",
    scenario: "Existing rental income",
    documents: "Approved rental evidence route: statement, lease and/or required supporting evidence",
    period: "Proposed: latest statement / current lease",
    quantity: "Selected lender route; one or several items, not a universal OR",
    freshness: "Current evidence for named property",
    condition:
      "Landlord income only; not a tenant ledger. Alternatives are lender-specific: ANZ lists multiple evidence items. Prospective rent and excluded rental appraisals remain separate exceptions.",
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
    documents: "Current-stage contract / plans / schedule, or stage-specific draw evidence",
    period: "Current project",
    quantity: "Required project versions",
    freshness: "Stage and lender determine current / signed / approved requirements",
    condition:
      "Select a stage first. Pre-approval does not chase permits or final invoices; progress and final draws generate separate proposed packs. Owner-builder and excluded property-insurance documents need an external broker route.",
    basis: "Proposed",
    sources: ["WBC-26", "ANZ-C"],
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
export const propertyScenarios = [
  { id:"P01", step:"purchase-home", title:"Purchase · home to live in", purpose:"Purchase", use:"Owner occupied",
    documents:"Signed purchase contract when available; evidence of the actual deposit/funds source. Personal income, ID and existing liabilities remain independent.",
    conditions:"Pre-approval without a contract does not chase it. Savings are conditional on contributing savings. A retained loan is not automatically a refinance.",
    tags:"purchase-contract; savings-statements only if selected. No subject-property rental tag. Other owned rental properties can still need their own evidence.",
    review:"First-home buyer/scheme, dwelling type, source of funds and any property being retained or sold.", sources:["ANZ","NAB","CBA"] },
  { id:"P02", step:"purchase-investment", title:"Purchase · investment", purpose:"Purchase", use:"Investment",
    documents:"Purchase contract/funding pack plus the approved rental route only if that income is used. Separate existing tenancy from expected future rent.",
    conditions:"For a tenanted purchase, confirm accessible lease/agent evidence or accepted tenancy details in the contract. Do not request the buyer's pre-ownership rental credits.",
    tags:"purchase-contract once; selected lease/rental-statements as applicable. Expected future rent creates a broker exception, not an impossible historical-statement chase.",
    review:"Tenancy status, who can supply the evidence, ongoing accommodation and excluded rental estimate/valuation requirements.", sources:["WBC-26","ANZ","NAB"] },
  { id:"P03", step:"refinance-home", title:"Refinance · home to live in", purpose:"Refinance", use:"Owner occupied",
    documents:"Six continuous months for each refinanced home-loan account; proposed rates notice for the named existing security. Income/ID/debts remain independent.",
    conditions:"A pure refinance does not create a new purchase contract or deposit request. Retained loans use their separate rule; consolidated and retained cards keep their own periods.",
    tags:"home-loan-statements per required account; rates-notice if selected. Contact tags are recomputed across all requests, not removed on a purpose dropdown change.",
    review:"Cash-out, debt consolidation, interest-only evidence, security ownership, change of use and broker-managed settlement requirements.", sources:["NAB","CBA","ANZ"] },
  { id:"P04", step:"refinance-investment", title:"Refinance · investment", purpose:"Refinance", use:"Investment",
    documents:"Refinance statements and proposed rates notice, plus selected existing-rent evidence. Vacant or newly converted investments need a future-rent review.",
    conditions:"Do not treat investment use as proof of rent or require all rental alternatives. Multiple properties and accounts need separate records and explicit shared-evidence links.",
    tags:"home-loan-statements + selected rates-notice / lease / rental-statements / rental-bank-statements. One receipt cannot clear another property's request.",
    review:"Whether rent is relied upon, existing versus expected rent, lender evidence bundle and any change from home to investment.", sources:["WBC-26","ANZ","CBA","NAB"] },
];
export const propertyConsiderations = [
  "The base pack follows each person's income and identity route, irrespective of purchase/refinance or home/investment use.",
  "Link purpose and intended use to a property; link repayment evidence to an account. A purchase funded by refinancing another property needs both scoped paths, not a single global use flag.",
  "New to this buyer, newly built, off the plan and a construction loan are different circumstances. Building-loan documents follow the separate construction stage.",
  "Savings history is not the same as funds to complete or a universal genuine-savings test. Resolve gifts, sales, equity and guarantees separately within approved catalogue scope.",
  "First-home-buyer and scheme flags need state/territory, scheme and eligibility review. Do not generate a generic placeholder request or infer entitlement.",
  "If the applicant keeps renting, assess the commitment in the broker's wider application process. Expense documents remain outside this module; exclusion is not a lender waiver.",
  "On a change of property, use or tenancy, create a reviewed revision. Preserve accepted files, revalidate affected links and notify only genuinely changed requirements.",
];
export const namingAliases: Record<string, string[]> = {
  "driver-licence": ["Australian driver licence", "driver’s licence"],
  payslips: ["pay slips", "pay advice", "wage slip", "pay stubs — avoid US wording"],
  "ato-income": [
    "ATO income statement",
    "PAYG payment summary — alternative",
    "group certificate — legacy term",
  ],
  "notice-of-assessment": ["ATO notice of assessment", "NOA"],
  "personal-tax-return": [
    "individual tax return",
    "personal income tax return",
    "individual income tax return",
    "ITR",
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
  "rates-notice": ["council rates notice"],
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


export const researchCrossCheck = {
  status: "Completed",
  date: "20 November 2026",
  reportDate: "19 November 2026",
  reportFile: "docs/references/perplexity-australian-mortgage-research-2026-11-19.md",
  sha256: "45fc2caf1be0b6caf869eefda92dbd029ceaf9f49df8209339d635479ec86a74",
  summary: "All eight report sections were reconciled against this module. Material changes were checked against original sources. Completed cross-check does not mean every lender route is approved or that every linked source was independently audited.",
};
export const crossCheckFindings = [
  { id: "PX01", topic: "Fixed statement defaults", outcome: "Retained", detail: "Keep founder 6m home refinance / 6m consolidated card / 3m retained card. Published alternatives do not silently override them.", sources: ["NAB", "ANZ", "WBC-26"] },
  { id: "PX02", topic: "Statement coverage", outcome: "Amended", detail: "Add statement-plus-history guidance where needed and accepted. One combined file can cover the period; overlapping files do not prove continuity.", sources: ["CBA-S", "NAB", "HLE-S"] },
  { id: "PX03", topic: "BAS, IAS and ATO ledgers", outcome: "Corrected", detail: "These are different documents, not aliases. IAS and ATO account statements remain excluded; BAS stays.", sources: ["ATO-D"] },
  { id: "PX04", topic: "ATO annual versus YTD evidence", outcome: "Corrected", detail: "Record financial year and finalisation status. Payment summaries still exist; Tax ready is not a blanket current-year upload requirement.", sources: ["ATO-I", "ATO-STP"] },
  { id: "PX05", topic: "Self-employed routes", outcome: "Amended", detail: "Review the route first, then preview a standard or reduced-document pack. No automatic eligibility decision or stacking of both routes.", sources: ["WBC", "ANZ", "CBA-B"] },
  { id: "PX06", topic: "ING evidence scope", outcome: "Corrected", detail: "The December 2025 form concerns changes to existing ING loans. It does not validate current initial broker requirements.", sources: ["ING-V", "ING"] },
  { id: "PX07", topic: "Freshness reference", outcome: "Corrected", detail: "Store the reference event and date boundary. Thirty days is not always less than one month. NAB’s 45-day payslip rule does not become a retained-card cutoff.", sources: ["ING-V", "NAB", "ANZ-D"] },
  { id: "PX08", topic: "Construction stages", outcome: "Amended", detail: "Select the stage; request only its proposed items. Future permits, invoices and completion evidence stay out of the current chase.", sources: ["WBC-26", "ANZ-C"] },
  { id: "PX09", topic: "Three rental purposes", outcome: "Corrected", detail: "Landlord rental income, tenant rent expense and rent-as-genuine-savings are different. Do not rename them all Rental statements; excluded expense collection stays external.", sources: ["ANZ", "WBC-P"] },
  { id: "PX10", topic: "TFN handling", outcome: "Amended", detail: "Add removal instructions and reviewer checks for tax file numbers. No automated redaction or privacy-compliance claim is made.", sources: ["WBC-26"] },
  { id: "PX11", topic: "Credit-report / internal-account waivers", outcome: "Gated", detail: "Record a verified lender-specific evidence substitution and owner. Existing customer status or a report alone must not remove requested items or tags.", sources: ["WBC-26", "ANZ"] },
  { id: "PX12", topic: "File formats", outcome: "Narrowed", detail: "Broker guidance against CSV is not a universal lender rule. Preserve readable originals/all pages and record accepted formats per approved route.", sources: ["HLE-S", "ANZ"] },
  { id: "PX13", topic: "Identity and excluded documents", outcome: "Retained", detail: "No universal passport-plus-licence pack. Keep the 70-entry menu and founder exclusions; unresolved identity combinations and excluded lender needs go to the broker.", sources: ["ANZ", "WBC-26"] },
  { id: "PX14", topic: "Settlement and card closure", outcome: "Narrowed", detail: "An ING Yes/No closure election does not establish a universal closure-letter rule. Payouts, discharge authorities and closure evidence remain outside this initial module.", sources: ["ING-V"] },
  { id: "PX15", topic: "Conflicting public sources", outcome: "Gated", detail: "Keep ANZ web/form and tax-age differences, and Westpac 3m/6m rental-history conflict, visible for policy-owner resolution.", sources: ["ANZ", "ANZ-P", "ANZ-D", "WBC-P"] },
  { id: "PX16", topic: "Assessment claims", outcome: "Not adopted", detail: "Do not encode the report’s 3.8% serviceability factor, inferred high-LVR card periods, shading, credit-score thresholds or universal LMI triggers. This module collects documents.", sources: [] },
  { id: "PX17", topic: "Source currency", outcome: "Corrected", detail: "Check date is separate from publication date. Copyright, crawl and PDF modification dates do not prove current accredited policy. Historical forms stay historical.", sources: ["ING", "ANZ-C"] },
  { id: "PX18", topic: "Policy and implementation gaps", outcome: "Gated", detail: "Open Banking acceptance, variable income, unusual entities, scheme/state rules and native GHL access remain owner-reviewed gates. No credit-report or CDR integration was activated.", sources: [] },
];
