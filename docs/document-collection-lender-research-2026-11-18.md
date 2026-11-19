# Standard document collection pack — lender research and scenario rules

Reviewed 18 November 2026. Planning handoff for Claude; no live automation configured.

## Decision and evidence boundary

**Founder decision:** build one standard Australian residential-finance initial collection pack. The broker selects circumstances and documents, confirms and submits. Periods are fixed by the scenario and cannot be overridden in the broker form. Do not require a lender selection simply to begin initial collection. Bank sources inform the standard and identify exceptions; this is not five separate application checklists or a claim that every lender requires the same evidence.

**Confirmed defaults:** home-loan refinance: six months of home-loan statements. Credit card consolidated into the home loan: six months of credit-card statements. Retained credit card checked for existing liability/conduct: three months. The last two are separate conditions, not interchangeable meanings of “refinance”. These are Finance OS operating defaults confirmed by Tumai. Public evidence does not establish them as universal lender policy.

**Proposed defaults below** are for founder review before implementation. No automated lending assessment or claim of a complete lender-ready pack. Previously removed documents stay excluded; an external requirement for an excluded document becomes a broker-handled exception.

## Primary-source findings

The following are concise paraphrases of official pages retrieved on the review date. A live URL does not establish that an old PDF remains current broker policy. Full eligibility remains with the lender.

| Source | Published evidence relevant to the pack | Reliability and implementation boundary |
| --- | --- | --- |
| [ANZ home-loan checklist](https://www.anz.com.au/personal/home-loans/get-started/checklist/) | Full/part-time: one payslip under 60 days with at least three months YTD, or two consecutive payslips if shorter YTD. Casual: six months YTD, otherwise supplementary income evidence. Existing salary credits into ANZ may substitute. Self-employed: one year personal return/NOA and business return/financials, or qualifying own-company salary evidence. Home-loan statements generally unnecessary, including refinance, subject to exceptions. | Current accessible consumer page, excludes ANZ Plus. Demonstrates alternatives and why a six-month refinance pack is our default rather than universal policy. Removed financial statements may still be required outside this module. |
| [CommBank application guide](https://www.commbank.com.au/home-loans/applying-for-a-home-loan.html) | Income section lists three months bank statements, six for casuals, recent payslip or employer evidence, with own-bank salary exception. Self-employed: latest personal return (two for sole traders), latest NOA or accountant lodgement confirmation, business tax returns and financials showing two years profit/loss. Rental statement, lease or tax return are alternatives. | Current accessible consumer guidance. PAYG sentence combines several alternatives; do not compile it as an unconditional request for every item. No precise credit-card consolidation period established here. |
| [NAB application, July 2025, page 2](https://www.nab.com.au/content/dam/nabrwd/documents/forms/loans/home-loan-application-form.pdf) | One payslip with two pay cycles YTD, or two of last three; latest payment within 45 days, 90 if pay frequency exceeds monthly. Refinance: six months transactions, evidence no older than 90 days. External retained P&I debt: scheduled repayment or at least one month repayments; evidence within six months. Other cards: most recent statement. Self-employed: two-year evidence paths. Government income: six months credits or agency evidence, within 90 days. | Dated official branch/telephone application guide. Retained debt verification differs from refinance conduct. Its generic “loans” wording does not alone prove a six-month card-consolidation rule. Broker channel policy still needs validation. |
| [Westpac consumer checklist, May 2020](https://www.westpac.com.au/docs/pdf/pb/Home_Loan_Application_Checklist.pdf) | Two most recent payslips within one month. Secured refinance: six months; unsecured refinance: three months; latest evidence within six weeks. Rental income alternatives include agent statement, lease or three-month transaction history. | Historical official PDF, still accessible. Do not activate as current policy. Supports separating debt type, history coverage and freshness. |
| [Westpac AIP-to-full-approval form, October 2020](https://www.westpac.com.au/content/dam/public/brokers/documents/applications/wbc-brokers_approval-in-principal-to-full-loan-approval.pdf) | Secured refinance: six months, with three months stated for non-mortgage-insured cases. Unsecured refinance: three months. Updated statements within six weeks. | Historical, stage-specific broker form. Conflicts with a single unconditional duration; needs current broker confirmation. |
| [Westpac self-employed guide](https://www.westpac.com.au/brokers/ideas-hub/self-employed/) | Fast Track uses two personal NOAs for eligible applicants. One-year assessment and standard two-year assessment have separate eligibility and entity evidence. Standard pathway includes financial statements. Strong year-on-year profit growth can trigger six months BAS. | Current accessible broker summary, not full policy. Page has inconsistent-looking LVR wording in Fast Track; do not encode that wording. Simpler income pathways are alternatives, not add-ons to a request-all pack. |
| [ING mortgage checklist, August 2017](https://www.ing.com.au/pdf/application_checklist.pdf) | Latest payslip under one month; two-year self-employed tax evidence. Refinance loans: six months; refinanced credit/store cards: three months. Genuine savings: three months for mortgage-insured loans. Trust deed and trustee tax evidence listed. | Historical only. Explicitly a guide, not comprehensive. Does not validate current ING requirements or universal six-month credit-card consolidation. |
| [ING self-employed verification flyer, August 2026](https://broker.ing.com.au/assets/pdf/98852_Broker_A4_Flyer_0326_WEB_SEC.pdf), linked from [ING broker home loans](https://broker.ing.com.au/home-loans.html) | Three routes: two-year company income, one-year company income and one/two-year personal tax-return income. They differ in consolidation eligibility, income treatment and entity complexity. | Current dated broker summary. PDF column layout must be checked before coding individual eligibility conditions. Confirms the need for distinct pathways rather than one compulsory bundle. |

## Standard scenario matrix

All entries are conditional; nobody receives the whole catalogue. “Latest” means available at request issue, with a refresh check before lender submission. The proposed freshness rules are collection standards, not lender guarantees.

| Scenario | Client-facing request | Fixed standard proposed for initial collection | Status / exception |
| --- | --- | --- | --- |
| Applicant needs identity evidence | Driver licence or passport; secondary ID where required | Current document; approved identity combination | Proposed: keep existing catalogue and broker verification, not automatically request both primary IDs |
| PAYG full-time or part-time | Payslips | Two latest consecutive payslips, latest within 30 days for ordinary weekly/fortnightly/monthly pay | Proposed common starting pack. Unusual pay cycles go to review; YTD can trigger supplementary evidence |
| Casual employment | Payslips + ATO income statement if needed | Two latest payslips; evidence establishing six months earnings | Proposed: six months earnings history is not six months worth of payslip files |
| Salary deposits need matching to payslips | Salary bank statements | Three months for permanent PAYG; six months for casual | Proposed, conditional only. Match net pay and deposits; discrepancies go to broker review |
| Overtime, bonus, commission or allowances relied upon | Relevant income evidence / ATO income statement | Latest completed financial year plus current YTD, pending pathway review | Proposed history baseline; no universal guarantee. Do not ask for all variable-income types |
| Newly employed / employment changed | Employment contract or employer letter; applicable payslips | Current employment terms and available current payslips | Proposed exception pathway; do not fabricate missing tenure or request impossible historic payslips |
| Sole trader | Personal tax returns + ATO notices of assessment | Two latest lodged financial years | Proposed standard; company/trust evidence not automatically applicable |
| Company owner relying on business profits | Business tax returns + personal tax returns / NOAs as applicable | Two latest lodged financial years | Proposed initial pack. Removed standalone financials may leave a lender requirement outstanding |
| Own-company salary | Payslips + ATO income statement | Two latest payslips and at least six months income history | Proposed streamlined candidate; route to broker review of eligibility rather than treat as ordinary PAYG |
| Partnership income | Partnership tax returns and financial statements; personal tax evidence | Two latest completed financial years for entity records, lodged years for returns | Proposed; retain existing bundled catalogue item |
| Trust income / trust borrowing | Trust tax returns and financial statements; trust deed and amendments when applicable | Two latest completed financial years plus current deed and all applicable amendments | Proposed; distinguish applicant income source from legal borrower; company trustee role captured |
| Business performance needs current verification | BAS | Latest two completed quarters | Proposed conditional request, not every self-employed case. Annual/monthly BAS or deteriorating trading needs broker review |
| Existing rental income relied upon | Rental statement or signed lease | Latest rental statement or current lease | Proposed alternative group; salary statement rules must not drive rental evidence |
| Rental deposits need verification | Rental bank statements | Three months | Proposed conditional evidence, not added to every rental request |
| Government benefit or pension | Government benefit or pension statement | Latest current entitlement statement | Proposed initial evidence; lender may require payment history, including six months |
| Other retained income: foreign income / child support | Relevant retained income evidence | Broker review before issue until a standard is approved | No invented universal period or reintroduction of removed receipt/translation items |
| Purchase, contract available | Contract of sale — buying | Complete signed contract plus relevant amendments | Proposed. Pre-approval without a property does not trigger an overdue contract request |
| Savings fund deposit | Savings statements | Three continuous months | Proposed; avoid duplicate savings-history/deposit requests for the same account and period |
| Gift contributes to deposit | Gift declaration | Current signed declaration | Proposed; gift transfer evidence remains outside this catalogue |
| Sale proceeds contribute to purchase | Contract of sale — selling | Current executed contract | Proposed; sale proceeds/settlement statement remain excluded |
| Home loan being refinanced | Home-loan statements | Six continuous months | Founder-confirmed standard |
| Credit card consolidated into home loan | Credit-card statements | Six continuous months, for each card being consolidated | Founder-confirmed standard; not asserted as every lender's rule |
| Credit card retained / conduct checked | Credit-card statements | Three continuous months, for each retained card | Founder-confirmed standard; separate from consolidation |
| Other retained loan / overdraft / lease liability | Relevant liability statement | Latest statement showing balance, limit where applicable and repayment | Proposed; no automatic six-month history merely because another debt is refinanced |
| Personal / asset / business loan also consolidated | Relevant liability statements | Six continuous months | Proposed extension of consolidation pack; validate before activation |
| Construction at application | Signed building contract, progress schedule, plans/specifications and approvals as applicable | Current project versions | Proposed stage-specific pack; invoices, inspections and completion evidence wait for their relevant later stage |
| First-home-buyer / scheme assistance | Relevant first-home-buyer evidence | Approved scheme/state-specific list, not a generic quantity | Existing catalogue placeholder needs decomposition before automatic requesting |

## Form and rule design for Claude

1. Identify loan, broker, applicants and recipients. Choose purchase, refinance and construction components; these may coexist. Choose owner-occupied/investment and application stage separately.
2. For each applicant capture employment/income sources, casual/permanent status, changed employment, own-company salary versus profits, entity roles and variable income relied upon. Do not expose all complex policy fields in the first screen.
3. For each liability capture type and treatment: retained, consolidated into this home loan, or otherwise closing. Never use a single contact-level “consolidation” flag to assign every card six months.
4. Capture savings/deposit sources, rental income, contract availability and construction stage. If the same account supports several requests, share evidence rather than ask twice.
5. Generate the proposed checklist. Broker ticks relevant requests, reviews and confirms. Display required history and document count as read-only. No editable period/count fields. Removing an item is not evidence that a lender requirement is waived.
6. Save the approved standard version with each issued request. A later policy change must not silently rewrite sent requests or restart reminders. A separate controlled policy-maintenance process may revise standards; it is not a broker override.
7. If a lender is known, show material exceptions for broker handling. A blank lender is allowed for the initial pack. Unknown or conflicting requirements must not be presented as verified or automatically replaced by the largest period found.

Each rule records scenario, document key, applicant/entity/account, required/alternative group, history coverage, count, document age, stage, standard version, source/evidence status and review owner. Keep these separate: six months coverage is not six files; a document within six months is not six months transaction history; two financial years is not any rolling 24 months.

## Upload and reminder implications

A request is satisfied by its evidence coverage, not a file counter alone. One PDF may contain six months; six PDFs may overlap or omit months. Allow multiple uploads against the same request. Proposed receipt state pauses that item's ordinary chase pending broker review, without claiming policy compliance. Partial submissions need a visible remaining-evidence state; broker review determines gaps and replacement requests. Exact partial-submission UX remains to agree.

Keep the existing document key and needed tag for both card scenarios. The loan-specific request stores the six/three-month requirement and account. When one card arrives, do not clear a contact-level card tag if another card still needs action. Reminder text must use that request's current period and account context. Client selection of a dropdown option alone never removes a tag.

Acceptance cases: retained card A requests three months while consolidated card B requests six; one six-month PDF can satisfy coverage; three months submitted against a six-month request stays incomplete or under review; saved drafts send nothing; company-income alternatives do not request every route; pre-approval without a contract does not chase it; removed catalogue documents produce an exception, not silent reinstatement.

## Remaining gaps and owner

This pass establishes public-source findings across all five banks, not a complete current accredited policy library. Latest broker credit-card consolidation/CCR exceptions, exact document-age cut-offs, complex entity pathways, variable/foreign income and scheme-specific requirements remain unverified. Old ING/Westpac checklists are historical evidence only. No performance percentage or claim that this completes “most” applications has been measured.

Tumai owns approval of proposed collection defaults; Codex owns the planning record; Claude is the intended implementation owner after handoff. Next action: review only the proposed defaults and unresolved upload behaviour, then test the scenario matrix with synthetic purchase, refinance, mixed-card and self-employed cases. Success: the correct conditional pack, no period override, no unnecessary duplicate request and no tag removal for another outstanding account. Review before implementation and when a lender exception changes the standard.
