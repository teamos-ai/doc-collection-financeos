# Perplexity research cross-check

Completed 20 November 2026. **Research reconciliation complete; lender-policy approval remains open.**

Tumai supplied *Australian Residential Mortgage Document Collection Research.md*, dated 19 November 2026, and authorised amendments to this repository and webpage. The [unchanged report](references/perplexity-australian-mortgage-research-2026-11-19.md) is secondary research, not an instruction or approved policy. SHA-256: `45fc2caf1be0b6caf869eefda92dbd029ceaf9f49df8209339d635479ec86a74`.

All eight report sections were compared with the existing catalogue, scenario rules and builder instructions. Original lender material was reopened for material changes and conflicts. This does not claim independent verification of every URL, every broker checklist or every credit-policy assertion. No accredited policy portal was accessed. Official indexed ATO text was used where the site rejected direct reads. The source register distinguishes check dates, publication/version dates and channel.

## Result

The 70 catalogue keys, excluded categories and founder defaults remain unchanged: six months for refinanced home loans, six months for each consolidated card, three months for each retained card. There is no broker period override. These are collection standards, not a claim that every bank requires those periods.

The form now asks for a self-employed evidence route before generating a tax pack. Construction requests follow the current stage. A changed requirement invalidates an old held/unticked choice; unrelated requests retain their decisions. The board also explains coverage, freshness reference events, ATO finalisation and TFN removal checks. No automatic content extraction or redaction is implemented.

## Section-by-section disposition

| Report section | Disposition in this build |
| --- | --- |
| 1. Executive summary | Adopt route separation and coverage/count/freshness distinction. Narrow statement-plus-history to cases needing a bridge and where accepted. Private collection is distinct from what is lodged with a lender. |
| 2. Primary sources | Add the February 2026 Westpac broker checklist. Scope the December 2025 ING form to existing-loan variations. Keep historical documents labelled; crawler/copyright dates are not policy dates. |
| 3. Terminology | Preserve Australian labels and stable keys. Correct BAS/IAS/account-ledger conflation. Distinguish income statement, PAYG payment summary, return and notice of assessment. |
| 4. Comparison matrix | Preserve lender/channel differences. Correct the retained-card freshness inference and do not infer one common tax-age cutoff. |
| 5. Coverage, counts and freshness | Match account identity, date coverage and accepted bridging history. Store freshness reference event separately; a 30-day cutoff does not always satisfy “under one month”. |
| 6. Alternatives and contradictions | Preserve card-purpose distinctions and contradictory public sources. Keep alternative evidence routes separate; do not infer lender eligibility from a checkbox or encode serviceability, score, LVR or LMI assertions as document rules. |
| 7. Accredited policy gaps | Preserve explicit policy gates for unresolved routes, private-channel requirements, scheme variations, formats and data access. |
| 8. Recommended baseline | Apply only within the founder's exclusions and selected scenario. Do not request every income alternative or future construction document upfront. |

## Findings and amendments

### PX01 · Fixed statement defaults — Retained

Keep founder 6m home refinance / 6m consolidated card / 3m retained card. Published alternatives do not silently override them.

Evidence: [NAB · NAB · application, page 2](https://www.nab.com.au/content/dam/nabrwd/documents/forms/loans/home-loan-application-form.pdf); [ANZ · ANZ · home loan checklist](https://www.anz.com.au/personal/home-loans/get-started/checklist/); [WBC-26 · Westpac · broker minimum documents](https://www.westpac.com.au/content/dam/public/brokers/documents/applications/wbc-minimum-required-documents-checklist.pdf).

### PX02 · Statement coverage — Amended

Add statement-plus-history guidance where needed and accepted. One combined file can cover the period; overlapping files do not prove continuity.

Evidence: [CBA-S · CommBank · statement issue frequency](https://www.commbank.com.au/home-loans/guide-to-statements.html); [NAB · NAB · application, page 2](https://www.nab.com.au/content/dam/nabrwd/documents/forms/loans/home-loan-application-form.pdf); [HLE-S · Home Loan Experts · statements guide](https://www.homeloanexperts.com.au/home-loan-documents/statements-transaction-histories/).

### PX03 · BAS, IAS and ATO ledgers — Corrected

These are different documents, not aliases. IAS and ATO account statements remain excluded; BAS stays.

Evidence: [ATO-D · ATO · definitions](https://www.ato.gov.au/Definitions/?anchor=P789-67151).

### PX04 · ATO annual versus YTD evidence — Corrected

Record financial year and finalisation status. Payment summaries still exist; Tax ready is not a blanket current-year upload requirement.

Evidence: [ATO-I · ATO · income statements](https://www.ato.gov.au/individuals-and-families/jobs-and-employment-types/working-as-an-employee/income-statements/access-your-income-statement); [ATO-STP · ATO · finalising STP data](https://www.ato.gov.au/businesses-and-organisations/hiring-and-paying-your-workers/single-touch-payroll/finalising-your-stp-data).

### PX05 · Self-employed routes — Amended

Review the route first, then preview a standard or reduced-document pack. No automatic eligibility decision or stacking of both routes.

Evidence: [WBC · Westpac · self-employed broker guide](https://www.westpac.com.au/brokers/ideas-hub/self-employed/); [ANZ · ANZ · home loan checklist](https://www.anz.com.au/personal/home-loans/get-started/checklist/); [CBA-B · CommBank · business-owner verification](https://www.commbank.com.au/business/home-loans.html).

### PX06 · ING evidence scope — Corrected

The December 2025 form concerns changes to existing ING loans. It does not validate current initial broker requirements.

Evidence: [ING-V · ING · existing home-loan variation](https://www.ing.com.au/pdf/HomeLoans/Variation/VariationFormG.pdf); [ING · ING · mortgage application checklist](https://www.ing.com.au/pdf/application_checklist.pdf).

### PX07 · Freshness reference — Corrected

Store the reference event and date boundary. Thirty days is not always less than one month. NAB’s 45-day payslip rule does not become a retained-card cutoff.

Evidence: [ING-V · ING · existing home-loan variation](https://www.ing.com.au/pdf/HomeLoans/Variation/VariationFormG.pdf); [NAB · NAB · application, page 2](https://www.nab.com.au/content/dam/nabrwd/documents/forms/loans/home-loan-application-form.pdf); [ANZ-D · ANZ · general documents guide](https://www.anz.com.au/personal/home-loans/get-started/documents-home-loan-application/).

### PX08 · Construction stages — Amended

Select the stage; request only its proposed items. Future permits, invoices and completion evidence stay out of the current chase.

Evidence: [WBC-26 · Westpac · broker minimum documents](https://www.westpac.com.au/content/dam/public/brokers/documents/applications/wbc-minimum-required-documents-checklist.pdf); [ANZ-C · ANZ · supplied construction checklist](https://www.anz.com.au/content/dam/anzcomau/documents/pdf/construction-loan-checklist.pdf).

### PX09 · Three rental purposes — Corrected

Landlord rental income, tenant rent expense and rent-as-genuine-savings are different. Do not rename them all Rental statements; excluded expense collection stays external.

Evidence: [ANZ · ANZ · home loan checklist](https://www.anz.com.au/personal/home-loans/get-started/checklist/); [WBC-P · Westpac · public broker policy](https://www.westpac.com.au/brokers/policy/).

### PX10 · TFN handling — Amended

Add removal instructions and reviewer checks for tax file numbers. No automated redaction or privacy-compliance claim is made.

Evidence: [WBC-26 · Westpac · broker minimum documents](https://www.westpac.com.au/content/dam/public/brokers/documents/applications/wbc-minimum-required-documents-checklist.pdf).

### PX11 · Credit-report / internal-account waivers — Gated

Record a verified lender-specific evidence substitution and owner. Existing customer status or a report alone must not remove requested items or tags.

Evidence: [WBC-26 · Westpac · broker minimum documents](https://www.westpac.com.au/content/dam/public/brokers/documents/applications/wbc-minimum-required-documents-checklist.pdf); [ANZ · ANZ · home loan checklist](https://www.anz.com.au/personal/home-loans/get-started/checklist/).

### PX12 · File formats — Narrowed

Broker guidance against CSV is not a universal lender rule. Preserve readable originals/all pages and record accepted formats per approved route.

Evidence: [HLE-S · Home Loan Experts · statements guide](https://www.homeloanexperts.com.au/home-loan-documents/statements-transaction-histories/); [ANZ · ANZ · home loan checklist](https://www.anz.com.au/personal/home-loans/get-started/checklist/).

### PX13 · Identity and excluded documents — Retained

No universal passport-plus-licence pack. Keep the 70-entry menu and founder exclusions; unresolved identity combinations and excluded lender needs go to the broker.

Evidence: [ANZ · ANZ · home loan checklist](https://www.anz.com.au/personal/home-loans/get-started/checklist/); [WBC-26 · Westpac · broker minimum documents](https://www.westpac.com.au/content/dam/public/brokers/documents/applications/wbc-minimum-required-documents-checklist.pdf).

### PX14 · Settlement and card closure — Narrowed

An ING Yes/No closure election does not establish a universal closure-letter rule. Payouts, discharge authorities and closure evidence remain outside this initial module.

Evidence: [ING-V · ING · existing home-loan variation](https://www.ing.com.au/pdf/HomeLoans/Variation/VariationFormG.pdf).

### PX15 · Conflicting public sources — Gated

Keep ANZ web/form and tax-age differences, and Westpac 3m/6m rental-history conflict, visible for policy-owner resolution.

Evidence: [ANZ · ANZ · home loan checklist](https://www.anz.com.au/personal/home-loans/get-started/checklist/); [ANZ-P · ANZ · paper application](https://www.anz.com.au/content/dam/anzcomau/documents/pdf/home-loan-application-form.pdf); [ANZ-D · ANZ · general documents guide](https://www.anz.com.au/personal/home-loans/get-started/documents-home-loan-application/); [WBC-P · Westpac · public broker policy](https://www.westpac.com.au/brokers/policy/).

### PX16 · Assessment claims — Not adopted

Do not encode the report’s 3.8% serviceability factor, inferred high-LVR card periods, shading, credit-score thresholds or universal LMI triggers. This module collects documents.

Basis: founder scope and unresolved secondary-report claims; no primary verification is asserted.

### PX17 · Source currency — Corrected

Check date is separate from publication date. Copyright, crawl and PDF modification dates do not prove current accredited policy. Historical forms stay historical.

Evidence: [ING · ING · mortgage application checklist](https://www.ing.com.au/pdf/application_checklist.pdf); [ANZ-C · ANZ · supplied construction checklist](https://www.anz.com.au/content/dam/anzcomau/documents/pdf/construction-loan-checklist.pdf).

### PX18 · Policy and implementation gaps — Gated

Open Banking acceptance, variable income, unusual entities, scheme/state rules and native GHL access remain owner-reviewed gates. No credit-report or CDR integration was activated.

Basis: founder scope and unresolved secondary-report claims; no primary verification is asserted.

## Specific corrections worth retaining

- NAB's July 2025 application, page 2, puts the usual 45-day freshness limit on payslips. Its retained external credit-card request says most recent statement; the payslip limit must not be copied onto cards.
- ING's IM450 12/25 is an existing-loan variation application. Its card-closure Yes/No field is not evidence that all applicants must submit a closure letter. Its presence does not establish current new-loan broker policy. Absence of construction detail does not prove that a lender offers no construction product.
- Westpac's Fast Track evidence is an eligibility-dependent income route. The warning about additional documents relates to lender submission/assessment; it does not establish that a broker can never privately hold other material. No automatic Fast Track eligibility engine is included.
- ANZ's public checklist, paper form and general documents guide are not collapsed into a single statement or tax-age rule. Westpac's public policy page mentions both three and six months of tenant rental history. Those differences need channel and purpose resolution.
- The report's assessment percentages, inferred card-history tiers, generalised identity combination and universal CSV prohibition are not adopted. Rental income, tenant expenses and rent used as genuine savings remain distinct purposes.

## Handoff and remaining ownership

The board, JSON exports, [readable handoff](builder-handoff-2026-11-19.md), [intake specification](intake-form.md) and [source/scenario register](research-validation-2026-11-19.md) share the amended rules. The raw report remains unchanged so the corrections can be audited.

- **Policy owner / Tumai:** resolve lender/channel eligibility, dates, formats, identity combinations, current initial ING detail and specialist routes before automatic issue. A public-source check is not approval.
- **Builder:** implement request-scoped records, correct recipients, explicit evidence reuse, coverage review and safe aggregate tag reconciliation. Prove GHL feasibility with synthetic cases after the manual build.
- **Tumai:** approve the proposed reminder schedule and receipt-pause behaviour before activation.

Success measure: the builder can trace each request to its scenario, subject, evidence route and source/version; only current required items are chased. Review before lender-policy activation and whenever an intake route changes. This release updates a visual specification, not a live GHL workflow.
