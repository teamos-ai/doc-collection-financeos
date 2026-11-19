# Broker intake form — proposed build specification

19 November 2026. The **Broker intake form** tab is an interactive demonstrator using synthetic examples. Changes update the proposed checklist and tags. Confirmation previews the transition into DC-02; it does not persist records or send messages.

| Form area | Fields / controls | Effect |
| --- | --- | --- |
| Loan and scenario | Loan reference, assigned broker, purchase/refinance/construction, owner occupied/investment | Identify the loan and circumstances before issuing requests. Multiple purposes can coexist. |
| Purchase stage | Signed contract available | Request the purchase contract when it exists; do not chase it at pre-approval. |
| Deposit | Savings contribute | Suggest savings statements, with proposed three-month history. Account and ownership need resolution in the actual build. |
| Applicants | Repeated name, email, mobile | Bind requests to the correct person. The demo requires email and name at confirmation. |
| Income | PAYG permanent/casual, sole trader, company, partnership, trust, rental; entity label | Suggest the relevant retained income pack. Multiple income sources can coexist. |
| Salary matching | Explicit matching checkbox for PAYG | Suggest salary bank statements only when comparing payslip net payments to bank credits. |
| Liabilities | Repeat account label, applicant, account type, treatment | Each card/home loan receives a separate request even when types share a contact tag. |
| Credit-card treatment | Retained / consolidated | Fixed three / six continuous months respectively. |
| Home-loan treatment | Retained / refinance | Six continuous months for refinance; retained-loan requirement remains proposed. |
| Checklist | Tick or untick each generated item; read-only period and evidence basis | Broker reviews the scenario-generated list. Periods are not editable. |
| Confirmation | Confirm preview | Illustrates DC-01 → DC-02 → DC-07 → invitation and DC-04. Live activation remains gated by approved rules, scoped storage and successful persistence. |

The demo covers the main scenario paths. The catalogue remains the authority for all 70 selectable items. Identity alternatives, mixed or multiple businesses per applicant, shared entities, joint account ownership, a first-home-buyer-specific pack and lender exceptions require detailed mapping before implementation. The demo's single entity label is not the proposed production database.

The real intake must resolve loan, person/entity/account, document key, period, selected requirements, rule version and confirmation revision into durable request identifiers. The form must not infer that all reviewed items have approved policy merely because the broker clicked Confirm. Unresolved policy remains draft in DC-01.

No real borrower data should be entered into this illustrative board. Its form values live only in memory and reset when the view unmounts or the page reloads.
