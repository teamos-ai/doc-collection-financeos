export type Applicant = {
  id: string;
  name: string;
  email: string;
  mobile: string;
  income: string[];
  salaryMatch: boolean;
  ytdCoversHistory?: boolean;
  incomeRoute?: "Review first" | "Standard two-year pack" | "Personal NOAs only" | "Company wage evidence";
  entity: string;
};
export type Liability = {
  id: string;
  applicant: string;
  label: string;
  type: "Home loan" | "Credit card";
  treatment: "Retained" | "Refinance" | "Consolidated";
};
export type Intake = {
  loan: string;
  broker: string;
  purposes: string[];
  propertyUse: string;
  contractAvailable: boolean;
  savings: boolean;
  constructionStage?: "Review first" | "Pre-approval" | "Formal application" | "Before commencement" | "Progress draw" | "Final draw";
  applicants: Applicant[];
  liabilities: Liability[];
};
export type RequestPreview = {
  id: string;
  key: string;
  subject: string;
  title: string;
  period: string;
  basis: "Confirmed" | "Proposed";
  reason: string;
};
export const initialIntake: Intake = {
  loan: "Example loan",
  broker: "Assigned broker",
  purposes: ["Refinance"],
  propertyUse: "Owner occupied",
  contractAvailable: false,
  savings: false,
  applicants: [
    {
      id: "applicant-a",
      name: "Applicant A",
      email: "",
      mobile: "",
      income: ["PAYG — permanent"],
      salaryMatch: false,
      entity: "",
    },
  ],
  liabilities: [
    {
      id: "account-a",
      applicant: "applicant-a",
      label: "Home loan A",
      type: "Home loan",
      treatment: "Refinance",
    },
    {
      id: "account-b",
      applicant: "applicant-a",
      label: "Card A",
      type: "Credit card",
      treatment: "Consolidated",
    },
    {
      id: "account-c",
      applicant: "applicant-a",
      label: "Card B",
      type: "Credit card",
      treatment: "Retained",
    },
  ],
};
export const incomeOptions = [
  "PAYG — permanent",
  "PAYG — casual",
  "Sole trader",
  "Company income",
  "Partnership income",
  "Trust income",
  "Rental income",
];
export const incomeRoutes = ["Review first", "Standard two-year pack", "Personal NOAs only", "Company wage evidence"] as const;
export const constructionStages = ["Review first", "Pre-approval", "Formal application", "Before commencement", "Progress draw", "Final draw"] as const;
export const isSelfEmployed = (a: Applicant) => a.income.some((x) => ["Sole trader", "Company income", "Partnership income", "Trust income"].includes(x));
const companyWageOnly = (a: Applicant) => a.income.includes("Company income") && !a.income.some((x) => ["Sole trader", "Partnership income", "Trust income"].includes(x));
export function reviewIssues(f: Intake): string[] {
  const issues: string[] = [];
  for (const a of f.applicants) {
    if (!isSelfEmployed(a)) continue;
    if (!a.incomeRoute || a.incomeRoute === "Review first") issues.push(`${a.name || a.id}: choose and verify an income evidence route before requesting tax or entity packs.`);
    else if (a.incomeRoute === "Company wage evidence" && !companyWageOnly(a)) issues.push(`${a.name || a.id}: the company-wage example cannot cover sole-trader, partnership or trust income; resolve the separate routes.`);
    else issues.push(`${a.name || a.id}: ${a.incomeRoute} is an illustrative route, not an eligibility decision. Record lender/channel, qualifying conditions, policy version and reviewer before production issue.`);
  }
  if (f.purposes.includes("Construction") && (!f.constructionStage || f.constructionStage === "Review first")) issues.push("Construction: select the current stage before generating its requests. Owner-builder and unusual projects require a separate review.");
  return issues;
}

// A changed period, subject or route invalidates a previous held/unticked decision.
export function unchangedRequestIds(before: Intake, after: Intake): Set<string> {
  const fingerprint = (r: RequestPreview) => JSON.stringify([r.key, r.subject, r.period, r.reason]);
  const old = new Map(previewRequests(before).map((r) => [r.id, fingerprint(r)]));
  return new Set(previewRequests(after).filter((r) => old.get(r.id) === fingerprint(r)).map((r) => r.id));
}
export function previewRequests(f: Intake): RequestPreview[] {
  const rows: RequestPreview[] = [];
  const add = (
    id: string,
    key: string,
    subject: string,
    title: string,
    period: string,
    basis: RequestPreview["basis"],
    reason: string,
  ) => rows.push({ id, key, subject, title, period, basis, reason });
  for (const a of f.applicants) {
    const subject = a.name || a.id;
    const entity = a.entity || subject;
    add(
      a.id + "-id",
      "driver-licence",
      subject,
      "Driver licence",
      "Current ID · identity combination to confirm",
      "Proposed",
      "Identity evidence selected for this applicant; passport is an alternative in the catalogue.",
    );
    const payg = a.income.some((x) => x.startsWith("PAYG"));
    const casual = a.income.includes("PAYG — casual");
    if (payg)
      add(
        a.id + "-payslips",
        "payslips",
        subject,
        "Payslips",
        "2 latest consecutive · latest within 30 days",
        "Proposed",
        "PAYG income relied upon. Ordinary pay-cycle starting standard.",
      );
    if (casual && !a.ytdCoversHistory)
      add(
        a.id + "-ato",
        "ato-income",
        subject,
        "ATO income statement",
        "Supplement to establish 6 months earnings",
        "Proposed",
        "Casual income history; broker checks whether payslip YTD already establishes it.",
      );
    if (payg && a.salaryMatch)
      add(
        a.id + "-salary",
        "salary-statements",
        subject,
        "Salary bank statements",
        casual ? "6 continuous months" : "3 continuous months",
        "Proposed",
        "Only to match payslip net payments to salary credits.",
      );
    const standard = isSelfEmployed(a) && a.incomeRoute === "Standard two-year pack";
    if (standard) {
      add(
        a.id + "-tax",
        "personal-tax-return",
        subject,
        "Personal tax returns",
        "2 latest lodged financial years",
        "Proposed",
        "Selected standard route only. Confirm lender eligibility and required financial years before issue.",
      );
      add(
        a.id + "-noa",
        "notice-of-assessment",
        subject,
        "ATO notices of assessment",
        "2 latest lodged financial years",
        "Proposed",
        "Personal assessment evidence for the selected income route.",
      );
    }
    if (isSelfEmployed(a) && a.incomeRoute === "Personal NOAs only")
      add(a.id + "-noa-route", "notice-of-assessment", subject, "ATO notices of assessment", "2 latest financial years · selected NOA-only route", "Proposed", "Eligible route example only. Do not stack personal returns, entity financials or trust deeds for income verification; other legal/identity requirements remain separate.");
    if (isSelfEmployed(a) && a.incomeRoute === "Company wage evidence" && companyWageOnly(a)) {
      add(a.id + "-company-payslip", "payslips", entity + " · " + subject, "Company-wage payslip", "1 recent payslip · selected route freshness to confirm", "Proposed", "Own-company wages route example. A payslip alone does not establish eligibility; verify the selected lender route.");
      add(a.id + "-company-ato", "ato-income", entity + " · " + subject, "ATO income statement — company wages", "At least 6 months income history · selected route", "Proposed", "Current YTD and prior financial year if needed. Tax-ready status applies to finalised completed-year evidence; do not require current-year data to be finalised.");
    }
    if (standard && a.income.includes("Company income"))
      add(
        a.id + "-company",
        "business-tax-return",
        entity,
        "Business tax returns",
        "2 latest lodged financial years",
        "Proposed",
        "Company profits pathway. Removed standalone financials remain a broker-handled exception.",
      );
    if (standard && a.income.includes("Partnership income"))
      add(
        a.id + "-partnership",
        "partnership-financials",
        entity,
        "Partnership tax returns and financials",
        "2 latest relevant financial years",
        "Proposed",
        "Retained bundled partnership catalogue item.",
      );
    if (standard && a.income.includes("Trust income")) {
      add(
        a.id + "-trust",
        "trust-financials",
        entity,
        "Trust tax returns and financials",
        "2 latest relevant financial years",
        "Proposed",
        "Retained bundled trust catalogue item.",
      );
      add(
        a.id + "-deed",
        "trust-deed",
        entity,
        "Trust deed",
        "Current deed",
        "Proposed",
        "Confirm trust role and applicable amendments; no restoration of excluded trustee evidence.",
      );
      add(
        a.id + "-amendments",
        "trust-amendments",
        entity,
        "Trust deed amendments",
        "All applicable amendments",
        "Proposed",
        "Broker unticks when there are no amendments.",
      );
    }
    if (a.income.includes("Rental income"))
      add(
        a.id + "-rent",
        "rental-statements",
        subject,
        "Rental statements",
        "Latest statement · lender-specific evidence route",
        "Proposed",
        "Landlord rental income only. Lease/statement alternatives depend on lender; tenant rental ledger and ongoing rent expenses are different purposes.",
      );
  }
  for (const l of f.liabilities) {
    const a = f.applicants.find((x) => x.id === l.applicant);
    if (!a) continue;
    const subject = `${a.name || a.id} · ${l.label || l.id}`;
    if (l.type === "Credit card")
      add(
        l.id,
        "credit-card-statements",
        subject,
        "Credit-card statements",
        l.treatment === "Consolidated"
          ? "6 continuous months"
          : "3 continuous months",
        "Confirmed",
        l.treatment === "Consolidated"
          ? "This card is consolidated into the home loan."
          : "This card is retained and its conduct checked.",
      );
    else
      add(
        l.id,
        "home-loan-statements",
        subject,
        "Home-loan statements",
        l.treatment === "Refinance"
          ? "6 continuous months"
          : "Latest statement showing repayment details",
        l.treatment === "Refinance" ? "Confirmed" : "Proposed",
        l.treatment === "Refinance"
          ? "Cover the required dates without gaps. An official statement plus a matching transaction listing may bridge the period where accepted; six months does not mean six files."
          : "This home loan is retained as an existing liability.",
      );
  }
  if (f.purposes.includes("Purchase") && f.contractAvailable)
    add(
      "loan-contract",
      "purchase-contract",
      "Loan",
      "Contract of sale — buying",
      "Complete signed current contract",
      "Proposed",
      "Purchase has reached the contract stage.",
    );
  if (f.savings)
    add(
      "loan-savings",
      "savings-statements",
      "Deposit account",
      "Savings statements",
      "3 continuous months",
      "Proposed",
      "Savings support the deposit. Account/ownership must be resolved before issue.",
    );
  const constructionPacks: Record<string, [string, string][]> = {
    "Pre-approval": [["building-contract", "Building tender / draft contract"], ["building-plans", "Draft building plans"]],
    "Formal application": [["building-contract", "Signed building contract"], ["progress-schedule", "Progress payment schedule"], ["building-plans", "Building plans"], ["building-specifications", "Building specifications"]],
    "Before commencement": [["building-approvals", "Building approvals"], ["building-plans", "Approved building plans"], ["construction-insurance", "Construction insurance"]],
    "Progress draw": [["progress-claim", "Progress payment claim"], ["builder-invoice", "Builder invoice"]],
    "Final draw": [["progress-claim", "Final progress payment claim"], ["builder-invoice", "Final builder invoice"], ["completion-evidence", "Completion / occupancy evidence"]],
  };
  if (f.purposes.includes("Construction"))
    for (const [key, title] of constructionPacks[f.constructionStage ?? "Review first"] ?? [])
      add(
        "loan-" + key,
        key,
        "Construction project",
        title,
        `${f.constructionStage} · current project version`,
        "Proposed",
        "Stage-specific proposed pack, subject to lender review. Previously held items need an explicit evidence link; later-stage requests are not due yet. Excluded insurance/authority items stay broker-managed outside this module.",
      );
  return rows;
}
