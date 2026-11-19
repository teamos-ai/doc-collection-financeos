# Document collection catalogue and tagging handoff

**Visual builder handoff, 19 November:** [interactive workflow board](../document-collection-board.html) and [builder guide](../README.md) map the confirmed scope into seven proposed workflows. Preview and full-screen views share the same model. Proposed decisions and native-feasibility gaps remain explicit; no GHL workflow is activated.


18 November 2026. Working handoff for Tumai and Claude. Catalogue incorporates all explicit removals and renames from the voice review. Naming and tag design below are recommendations prepared at Tumai's request; final form rules and receipt behaviour remain to be agreed. No GHL configuration has been changed.

## Current scope

70 request entries in 12 groups. Names are simplified without removing further requirements. Two contract-of-sale rows remain because one concerns an asset being sold and the other the property being bought. They can share a display component later while preserving their separate purposes. Existing-debt statements remain even though new vehicle/business transaction categories were removed. Construction remains in the catalogue; its later-stage items can be filtered out of an initial request.

The master list is a selectable catalogue, not a mandatory pack. Required quantities, dates, financial years, applicant/entity, property/account and acceptable alternatives belong on each actual request. Government benefit or pension and the bundled partnership/trust financials retain the meanings approved in the conversation. Broad evidence entries need broker instructions. The first-home-buyer placeholder is not ready for automatic issue until its specific documents are defined.

## Catalogue

The tag column gives the proposed contact-level **needed** tag. Stable lowercase keys use the same prefix and hyphenated spelling throughout. User-facing labels may change without changing keys.

| # | Group | Simple document name | What the client supplies | Needed tag |
| --- | --- | --- | --- | --- |
| 1 | Identity | Driver licence | Licence supplied through the approved identity process. | `fos-doc-needed-driver-licence` |
| 2 | Identity | Passport | Passport supplied through the approved identity process. | `fos-doc-needed-passport` |
| 3 | Identity | Secondary ID | Additional identification selected by the broker. | `fos-doc-needed-secondary-id` |
| 4 | Identity | Name change evidence | Evidence connecting different names on records. | `fos-doc-needed-name-change` |
| 5 | Identity | Citizenship or residency evidence | Evidence of relevant citizenship or residency status; visa requests excluded. | `fos-doc-needed-residency` |
| 6 | Identity | Verified ID evidence | Certified ID or the result of an approved digital identity check. | `fos-doc-needed-verified-id` |
| 7 | Employment | Recent payslips | Latest payslips for the selected employer and requested quantity. | `fos-doc-needed-payslips` |
| 8 | Employment | Earlier payslips | Earlier payslips covering the specified history or dates. | `fos-doc-needed-earlier-payslips` |
| 9 | Employment | Employment contract | Contract confirming the relevant employment terms. | `fos-doc-needed-employment-contract` |
| 10 | Employment | Employer letter | Employer confirmation of role, income, hours or employment status. | `fos-doc-needed-employer-letter` |
| 11 | Employment | ATO income statement | ATO income statement or PAYG payment summary for the selected year. | `fos-doc-needed-ato-income` |
| 12 | Employment | Salary bank statements | Statements showing salary credits for the requested period. | `fos-doc-needed-salary-statements` |
| 13 | Employment | Overtime evidence | Evidence supporting overtime income being considered. | `fos-doc-needed-overtime` |
| 14 | Employment | Commission evidence | Evidence supporting employment commission income. | `fos-doc-needed-commission` |
| 15 | Employment | Bonus evidence | Evidence supporting bonus income. | `fos-doc-needed-bonus` |
| 16 | Employment | Allowance evidence | Evidence supporting employment allowances. | `fos-doc-needed-allowances` |
| 17 | Employment | Salary packaging details | Salary packaging or novated lease documents relevant to deductions. | `fos-doc-needed-salary-packaging` |
| 18 | Employment | Second job evidence | Requested employment evidence for another job; identify employer and required files. | `fos-doc-needed-second-job` |
| 19 | Employment | Employment history | Evidence of casual, temporary or contract employment history. | `fos-doc-needed-employment-history` |
| 20 | Personal tax | Personal tax return | Individual return and required schedules for the selected year. | `fos-doc-needed-personal-tax-return` |
| 21 | Personal tax | Notice of Assessment | ATO assessment for the selected person and year. | `fos-doc-needed-notice-of-assessment` |
| 22 | Personal tax | Tax lodgement confirmation | Confirmation that the relevant return was lodged, where accepted. | `fos-doc-needed-tax-lodgement` |
| 23 | Business income | Business tax return | Return for the named business and financial year. | `fos-doc-needed-business-tax-return` |
| 24 | Business income | BAS | Business Activity Statements for the specified periods. | `fos-doc-needed-bas` |
| 25 | Business income | Business bank statements | Statements for the named business account and period. | `fos-doc-needed-business-statements` |
| 26 | Business income | Accountant letter and contact details | Requested accountant confirmation with their contact details. | `fos-doc-needed-accountant-letter` |
| 27 | Partnerships and trusts | Partnership tax return and financials | Selected partnership return and financial statements; record the required components and years. | `fos-doc-needed-partnership-financials` |
| 28 | Partnerships and trusts | Trust deed | Deed for the named trust. | `fos-doc-needed-trust-deed` |
| 29 | Partnerships and trusts | Trust deed amendments | Variations or amendments to that trust deed. | `fos-doc-needed-trust-amendments` |
| 30 | Partnerships and trusts | Trust tax return and financials | Selected trust return and financial statements; record required components and years. | `fos-doc-needed-trust-financials` |
| 31 | Rental income | Lease agreement | Current tenancy agreement for the relevant rental property. | `fos-doc-needed-lease` |
| 32 | Rental income | Rental statements | Rental statements for the named property and period. | `fos-doc-needed-rental-statements` |
| 33 | Rental income | Rental bank statements | Bank statements showing rental credits for the relevant property. | `fos-doc-needed-rental-bank-statements` |
| 34 | Other income | Government benefit or pension | Entitlement statement for the relevant benefit or pension. | `fos-doc-needed-benefit-pension` |
| 35 | Other income | Benefit or pension bank statements | Statements showing benefit or pension credits. | `fos-doc-needed-benefit-statements` |
| 36 | Other income | Child support agreement | Child support assessment, agreement or court order. | `fos-doc-needed-child-support` |
| 37 | Other income | Foreign income evidence | Broker-specified evidence supporting overseas income. | `fos-doc-needed-foreign-income` |
| 38 | Accounts and assets | Savings statements | Statements for the relevant savings account and period. | `fos-doc-needed-savings-statements` |
| 39 | Accounts and assets | Term deposit statements | Statements confirming the relevant term deposit. | `fos-doc-needed-term-deposit` |
| 40 | Accounts and assets | Super balance statement | Superannuation balance evidence where requested; distinct from the removed pension-income item. | `fos-doc-needed-super-balance` |
| 41 | Accounts and assets | Rates notice | Rates notice for the named property. | `fos-doc-needed-rates-notice` |
| 42 | Accounts and assets | Asset ownership evidence | Broker-specified evidence for another relevant declared asset. | `fos-doc-needed-asset-ownership` |
| 43 | Liabilities | Home loan statements | Statements for the named existing home loan. | `fos-doc-needed-home-loan-statements` |
| 44 | Liabilities | Investment loan statements | Statements for the named investment-property loan. | `fos-doc-needed-investment-loan-statements` |
| 45 | Liabilities | Credit card statements | Statements showing the relevant credit card balance and limit. | `fos-doc-needed-credit-card-statements` |
| 46 | Liabilities | Personal loan statements | Statements for an existing personal loan. | `fos-doc-needed-personal-loan-statements` |
| 47 | Liabilities | Vehicle or equipment loan statements | Statements for existing debt; this does not restore the removed vehicle-finance transaction category. | `fos-doc-needed-asset-loan-statements` |
| 48 | Liabilities | Business loan statements | Statements for relevant existing business debt. | `fos-doc-needed-business-loan-statements` |
| 49 | Liabilities | Overdraft statements | Statements for an overdraft or line of credit, including its limit. | `fos-doc-needed-overdraft-statements` |
| 50 | Liabilities | Buy now pay later statements | Statements showing relevant buy now pay later commitments. | `fos-doc-needed-bnpl-statements` |
| 51 | Liabilities | Student loan evidence | Evidence of HELP or another relevant student loan. | `fos-doc-needed-student-loan` |
| 52 | Liabilities | Lease or hire purchase agreement | Agreement for a relevant existing finance commitment. | `fos-doc-needed-finance-lease` |
| 53 | Deposit and funds | Deposit funds statements | Statements evidencing the deposit or funds to complete. | `fos-doc-needed-deposit-statements` |
| 54 | Deposit and funds | Savings history | Evidence covering the specified savings history. | `fos-doc-needed-savings-history` |
| 55 | Deposit and funds | Gift declaration | Gift declaration or selected lender gift form. | `fos-doc-needed-gift-declaration` |
| 56 | Deposit and funds | Contract of sale — selling | Contract for a property or asset being sold to contribute funds. | `fos-doc-needed-sale-contract` |
| 57 | Property transaction | Contract of sale — buying | Contract for the property being purchased. | `fos-doc-needed-purchase-contract` |
| 58 | Property transaction | Contract amendments | Variations or amendments to the purchase contract. | `fos-doc-needed-contract-amendments` |
| 59 | Property transaction | Conveyancer details | Solicitor or conveyancer details; information entry rather than mandatory file upload. | `fos-doc-needed-conveyancer-details` |
| 60 | Property transaction | First home buyer documents | Placeholder for scheme-specific requests; exact items must be defined before activation. | `fos-doc-needed-first-home-buyer` |
| 61 | Construction | Building contract | Signed contract for the construction project. | `fos-doc-needed-building-contract` |
| 62 | Construction | Progress payment schedule | Agreed construction draw or progress-payment schedule. | `fos-doc-needed-progress-schedule` |
| 63 | Construction | Building plans | Plans for the relevant project and revision. | `fos-doc-needed-building-plans` |
| 64 | Construction | Building specifications | Specifications describing the proposed build. | `fos-doc-needed-building-specifications` |
| 65 | Construction | Building approvals | Applicable project approvals or permits. | `fos-doc-needed-building-approvals` |
| 66 | Construction | Construction insurance | Required builder or construction insurance evidence. | `fos-doc-needed-construction-insurance` |
| 67 | Construction | Progress payment claim | Claim or instruction for the relevant construction draw. | `fos-doc-needed-progress-claim` |
| 68 | Construction | Builder invoice | Invoice supporting the relevant progress payment. | `fos-doc-needed-builder-invoice` |
| 69 | Construction | Stage inspection evidence | Inspection or valuation evidence for the relevant construction stage. | `fos-doc-needed-stage-inspection` |
| 70 | Construction | Completion evidence | Completion or occupancy evidence for the relevant final stage. | `fos-doc-needed-completion-evidence` |

## Recommended tagging convention

Use `fos-doc-needed-<document-key>` for each requested document type. Do not create four copies of every document tag for received, reviewed and accepted; store those states against the actual loan-specific request instead. Reuse or map compatible existing Finance OS Dictionary tags before creating new ones. These proposed names are not verified existing account tags.

Suggested summary contact tags:
- `fos-docs-action-needed`: at least one issued, unresolved request needs this contact's action.
- `fos-docs-review-needed`: at least one received request awaits broker review.
- `fos-docs-paused`: at least one collection case involving this contact is paused. This is visibility only, never a blanket stop rule for all their loans.

Each individual needed tag means at least one issued request of that type remains unresolved for this contact. Keep it during a pause; use the case pause field to suppress sending. Remove it only when no relevant request of that type remains in Requested, Partial or Replacement requested state. Counts and summaries are derived from request records, not manually decremented on uploads. Review-needed and action-needed may coexist.

A contact-level tag is a summary, not proof of which loan or applicant is involved. The authoritative request needs: loan reference, request reference, checklist revision, document key, subject/applicant/entity, intended uploader/recipient, period or quantity, status, file references, receipt date and review decision. The exact native GHL representation is still a feasibility question. Do not solve concurrent loans by generating unlimited tags containing personal names or loan IDs.

## Draft broker form logic for the next discussion

**Founder confirmation, voice 18 November:** the broker selects/ticks scenario inputs, reviews/confirms and submits. Submission applies the required document tags and starts the collection workflow. Email and SMS reminders follow up current outstanding documents. Exact cadence, limits, pause/stop rules and approved message copy remain open; “continually” is not interpreted as unlimited sending. The handoff must include a scenario rules database before Claude starts the project.

### Scenario rules database — initial working rows

**Latest founder clarification:** one standard initial collection pack, no broker period override. Six months for home-loan refinance and cards consolidated into the home loan; three months for retained credit cards. See [lender research and expanded scenario matrix](document-collection-lender-research-2026-11-18.md) for source findings, proposed other defaults and exceptions. This supersedes earlier editable-period wording.

These rows capture the founder's examples and proposed interpretation. They are not universal lender policy. Combine transaction rules with per-applicant income rules; do not request payslips from every self-employed applicant merely because the transaction is a purchase or refinance.

| Rule | Condition | Document keys | Period or quantity | Basis/status |
| --- | --- | --- | --- | --- |
| TX-PURCHASE | Buying a home at the contract stage | purchase-contract; deposit-statements; savings-history as relevant | Fixed standard coverage; see research matrix | Founder example: contract plus savings evidence. Exact combination/alternatives pending |
| TX-REFINANCE | Refinancing an existing home loan | home-loan-statements | Six months | Founder-confirmed fixed collection standard, not a universal lender rule |
| INCOME-PAYG | Applicant has PAYG income relied upon | payslips; salary-statements where required | Payslip quantity and statement period pending | Founder purchase/refinance examples; conditional on employment |
| ID-APPLICANT | Applicant needs identity evidence for this request | driver-licence OR passport, plus secondary-id only if needed | Approved identity combination selected by broker | Founder examples require identification; alternative handling proposed |
| BANK-SALARY | Broker selects verification of salary deposits against payslips | salary-statements | Broker identifies account; scenario fixes period | Founder confirmed: match relevant payslip net payments to corresponding deposits; differences go to broker review, not automatic rejection |
| BANK-SAVINGS | Savings/deposit evidence selected | savings-statements; deposit-statements or savings-history as relevant | Scenario fixes coverage | Founder confirmed salary and savings statements stay; general personal transaction statements remain excluded. Avoid duplicate requests for the same evidence |

### Business-owner and trust scenarios — research additions

Official ANZ and Westpac pages reviewed 18 November 2026 support distinguishing the following circumstances. These are proposed rule families for the initial collection form, not approved lender profiles. Broker confirms the selected evidence pathway before sending; periods are fixed by the approved collection standard.

| Scenario | Form distinction | Candidate retained catalogue items | Important boundary |
| --- | --- | --- | --- |
| Sole trader | Personal business income | personal-tax-return; notice-of-assessment; other retained business evidence if explicitly selected | Do not automatically require every business document |
| Company owner receiving regular wages | Own-company wages versus unrelated PAYG employment | payslips; ato-income for an eligible selected pathway; otherwise personal/business tax evidence | A payslip from one's own company does not alone establish ordinary PAYG treatment |
| Company owner relying on profits or other company income | Income sources relied upon and ownership | personal-tax-return; notice-of-assessment; business-tax-return | Some lender pathways require financial statements removed from this catalogue; flag a broker-handled exception rather than claim the initial pack is sufficient |
| Partnership income | Named partnership and relevant applicant | personal-tax-return; notice-of-assessment; partnership-financials | Exact years and ownership-related requirements vary |
| Trust income | Trust is an income source versus borrower | personal-tax-return; notice-of-assessment; trust-financials; trust-deed/amendments when selected | No automatic restoration of removed trust-distribution requests |
| Company acting as trustee | Identify company, trust and individual roles separately | trust-deed; trust-amendments; trust-financials; applicable personal/business tax records | Corporate trustee and operating business are not necessarily the same role. Additional structural evidence stays a broker exception outside this initial menu |
| Mixed incomes or joint applicants | Multiple income selections per applicant | Combine relevant approved request groups | Deduplicate shared evidence while preserving applicant/entity, period and loan scope |

Sources: [ANZ business-owner home loans](https://www.anz.com.au/personal/home-loans/buying-home/home-loans-business-owners/) describes a conditional company-wage pathway and structure-dependent evidence. [Westpac broker self-employed guide](https://www.westpac.com.au/brokers/ideas-hub/self-employed/) describes different streamlined and standard pathways and recognises mixed-income/joint-applicant cases. These support the distinctions, not a universal fixed pack. Full eligibility and current accredited policy must be checked before using a named lender rule. The fetched Macquarie guideline showed 19 November 2026, later than this session date, despite a search listing for an older version; it is not used to establish current rules in this handoff.

**Founder clarification:** salary statements are requested specifically when evidence of salary deposits is needed alongside payslips. Savings statements remain for savings/deposit evidence. The founder's broader comment on how often brokers request statements is an operating preference, not independently verified industry-wide practice. Existing business/rental/benefit and liability statements are unaffected by this clarification. Catalogue remains 70 entries.

Each eventual database row needs a stable rule ID, scenario conditions, applicable applicant/entity, document key, required/optional or alternative-group status, quantity/period, stage, locked period/count rules, provenance and approval status. Changing a scenario recomputes the proposed list; it must not silently erase previously received evidence or start duplicate reminders. The initial pack is standardised across lenders; known lender exceptions are flagged separately.

Additional rule families to map next: owner-occupied/investment; first-home-buyer circumstances; PAYG/casual/contract/self-employed; partnership/trust; rental and other income; existing liabilities; and construction stage. These are candidate selectors drawn from the retained catalogue, not an approved request-all rule.

1. Open or identify the correct loan and broker; identify applicants/entities and recipients.
2. Select transaction purpose separately from property use and first-home-buyer status. Purchase/refinance/construction, owner-occupied/investment and first-home-buyer status are overlapping dimensions, not one mutually exclusive dropdown.
3. For each applicant, select all relevant income sources: PAYG, self-employed, partnership/trust, rental and other supported income. Capture relevant accounts/liabilities and transaction facts needed to choose documents.
4. Rules propose a checklist from this catalogue. Rule-to-document mappings are the next planning task, not approved lender policy. Avoid interpreting examples such as three months as universal requirements.
5. Confirmed preview lets the broker select/tick relevant documents, review and submit. Periods and quantities are supplied by the approved standard and are read-only; no broker override.
6. Issuing creates loan-specific request records, synchronises needed tags and sends the correct upload link. Saving an unfinished broker form should not send requests.

## Draft upload and tag-removal logic for the next discussion

1. Resolve the authorised recipient and loan-specific request set. A bare reference or email alone is not access control.
2. Show only requests needing action in the upload dropdown. An uploaded file must be saved and linked to the selected request before status or tags change.
3. Recommended transition: successful complete submission becomes Received awaiting review, is removed from the upload dropdown, and stops that item's ordinary reminders. Keep its receipt visible. Quantity/partial-upload behaviour must be agreed; one file does not automatically satisfy a request for several files.
4. Recompute needed tags from all relevant requests for that contact. Remove the selected document's needed tag only if no other request of the same type still needs action. For example, receipt for loan A must not clear the same outstanding type on loan B.
5. Set review-needed and notify the correct broker once. Selecting a document type, failed uploads or repeated events must not falsely complete requests or duplicate tasks.
6. Broker acceptance finishes that request. Rejection with a reason reopens only the affected request and restores its needed tag. Preserve prior files/history. Removal of replacement requests from the catalogue did not decide against this review behaviour.
7. Before each reminder, read the current loan-specific checklist and recipient permissions. Include only current items needing that recipient's action; pause/closed cases suppress sends. An empty client-action list goes to broker review, not another client chase.

One reminder sequence per loan/request set is recommended. Cadence, channels, sending windows, escalation and reply behaviour remain undecided. Do not drive final loan approval or stage advancement solely from tags or uploads.

## Required feasibility checks

The earlier research established basic GHL forms, tags and workflow features, not this entire working flow. Check dynamic dropdown filtering on return visits; exact loan/request targeting; file access and repeated-upload preservation; partial/multiple uploads; opportunity or supporting-record fields; custom-object/snapshot portability; and context-safe tag synchronisation. Use synthetic records in an authorised test account. Existing CLI defaults may target another client.

Acceptance examples: five items requested/two received leaves three in the reminder; repeat upload has no duplicate effect; receipt for one loan leaves another loan's request untouched; all received produces review work; rejection reopens one item; pause during a wait suppresses the send; wrong/missing request reference goes to staff rather than a guessed loan.

## Decisions still needed

Next discussion: approve proposed standard defaults and exact form selectors, joint applicants and concurrent loans, upload receipt/partial behaviour, review/replacement behaviour, reminder cadence, storage/access and target account. Catalogue exclusions are settled as recorded; they need not be re-asked.

Owner: Tumai for business rules; Codex for planning; Claude intended for later project creation and implementation. Success: agreed input-to-checklist rules and upload-to-status/tag transitions with testable examples. Review at the next conversation before implementation.

Source and decision history: founder interview of 18 November 2026, consolidated here and in the linked lender research. The original discovery record remains in the private Finance OS knowledge hub. The current table supersedes the earlier untrimmed chat table. This file is part of the handoff, not a claim of implemented capability.
