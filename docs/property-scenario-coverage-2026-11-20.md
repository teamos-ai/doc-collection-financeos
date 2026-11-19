# Property scenario coverage — 20 November 2026

**Current build state:** the previous property-use selector did not affect request generation. It now controls the subject-property rental route, with four explicit canvas paths and synthetic examples. All paths remain a proposed manual-GHL specification; the three founder statement periods remain fixed.

## Four paths

| Scenario | Request / conditions | Tag implications | Broker review |
| --- | --- | --- | --- |
| Purchase · home to live in | Signed purchase contract when available; evidence of the actual deposit/funds source. Personal income, ID and existing liabilities remain independent. Pre-approval without a contract does not chase it. Savings are conditional on contributing savings. A retained loan is not automatically a refinance. | purchase-contract; savings-statements only if selected. No subject-property rental tag. Other owned rental properties can still need their own evidence. | First-home buyer/scheme, dwelling type, source of funds and any property being retained or sold. |
| Purchase · investment | Purchase contract/funding pack plus the approved rental route only if that income is used. Separate existing tenancy from expected future rent. For a tenanted purchase, confirm accessible lease/agent evidence or accepted tenancy details in the contract. Do not request the buyer's pre-ownership rental credits. | purchase-contract once; selected lease/rental-statements as applicable. Expected future rent creates a broker exception, not an impossible historical-statement chase. | Tenancy status, who can supply the evidence, ongoing accommodation and excluded rental estimate/valuation requirements. |
| Refinance · home to live in | Six continuous months for each refinanced home-loan account; proposed rates notice for the named existing security. Income/ID/debts remain independent. A pure refinance does not create a new purchase contract or deposit request. Retained loans use their separate rule; consolidated and retained cards keep their own periods. | home-loan-statements per required account; rates-notice if selected. Contact tags are recomputed across all requests, not removed on a purpose dropdown change. | Cash-out, debt consolidation, interest-only evidence, security ownership, change of use and broker-managed settlement requirements. |
| Refinance · investment | Refinance statements and proposed rates notice, plus selected existing-rent evidence. Vacant or newly converted investments need a future-rent review. Do not treat investment use as proof of rent or require all rental alternatives. Multiple properties and accounts need separate records and explicit shared-evidence links. | home-loan-statements + selected rates-notice / lease / rental-statements / rental-bank-statements. One receipt cannot clear another property's request. | Whether rent is relied upon, existing versus expected rent, lender evidence bundle and any change from home to investment. |

## Evidence checked for this amendment

- [ANZ checklist](https://www.anz.com.au/personal/home-loans/get-started/checklist/): property information is deferred during approval in principle; buying and building evidence differ. Rental income has a combined evidence list, while ongoing tenant rent is a different expense purpose. No universal rental-document OR is inferred.
- [CommBank application guide](https://www.commbank.com.au/home-loans/applying-for-a-home-loan.html): distinguishes existing-security evidence from a found property's sale contract. Lists alternative evidence for rental income from another property. The proposed rates-notice item is not a universal lender requirement.
- [NAB July 2025 application](https://www.nab.com.au/content/dam/nabrwd/documents/forms/loans/home-loan-application-form.pdf), pages 2–3: distinguishes refinance history, purchased property, intended use and dwelling age/type. Its six-month refinance history supports the retained founder collection standard; it does not mean a purchase automatically has refinanced debt.
- [Westpac February 2026 broker checklist](https://www.westpac.com.au/content/dam/public/brokers/documents/applications/wbc-minimum-required-documents-checklist.pdf), pages 5–7: existing-tenancy and vacant-property rent use different verification routes. Tenancy details in a purchase contract can support a relevant route. State-specific purchase and grant requirements require review. Its lender exceptions do not silently change founder defaults.

These sources were rechecked on 20 November 2026. Public evidence establishes distinctions; it does not approve every lender route or scheme. Existing catalogue exclusions take precedence for this module, with unmet lender requirements assigned to the broker externally.

## Builder implementation

1. Resolve loan, applicant, property and account IDs. Store purpose and intended property use per property; bind each debt treatment to its account.
2. Select one of the four paths for that property. Combined purchase/refinance or multiple securities require separately linked records; the single-property preview flags this limitation.
3. Add applicant income/ID and existing liabilities independently. Owner occupation does not suppress income from a different rental property; purchasing does not erase retained debts.
4. For purchases, check contract availability and actual funding sources. The savings switch applies only when savings fund purchase/construction. No pure-refinance purchase contract or deposit chase.
5. For investment, select rent not relied upon, existing tenancy or expected future rent. For existing tenancy, select the approved evidence bundle. Do not ask a purchaser for pre-ownership rental credits. Link a tenancy-bearing contract once with both evidence purposes.
6. Expected-rent evidence stays a broker exception because rental appraisals and valuations remain excluded. Do not mark the rent requirement satisfied or invent historical statements. No automatic issue while the selected route is unresolved.
7. Review and confirm the request revision. Draft form edits do not directly add/remove tags. DC-07 reconciles persisted requests across loans/properties/accounts; one received property document cannot clear another's requirement.
8. On changed use, tenancy or property, re-review affected evidence and preserve history. The preview resets affected held/unticked choices, while independent account and other-property requests survive.

## Additional staff considerations

- The base pack follows each person's income and identity route, irrespective of purchase/refinance or home/investment use.
- Link purpose and intended use to a property; link repayment evidence to an account. A purchase funded by refinancing another property needs both scoped paths, not a single global use flag.
- New to this buyer, newly built, off the plan and a construction loan are different circumstances. Building-loan documents follow the separate construction stage.
- Savings history is not the same as funds to complete or a universal genuine-savings test. Resolve gifts, sales, equity and guarantees separately within approved catalogue scope.
- First-home-buyer and scheme flags need state/territory, scheme and eligibility review. Do not generate a generic placeholder request or infer entitlement.
- If the applicant keeps renting, assess the commitment in the broker's wider application process. Expense documents remain outside this module; exclusion is not a lender waiver.
- On a change of property, use or tenancy, create a reviewed revision. Preserve accepted files, revalidate affected links and notify only genuinely changed requirements.

The demo's property reference and per-applicant other-property label are illustrative. Shared ownership, multiple rentals and a purchase funded by another security need proper linked records in the real build. Continuing rent, cash-out, bridging, valuations, insurance, discharge and excluded documents must have an owned external path; no full credit-assessment or settlement coverage is claimed.

**Owner / next action:** builder implements the four paths and scoped records; Tumai/policy owner resolves lender-specific bundles and exceptions. Success: staff can explain why each item is requested and why unavailable or irrelevant evidence is not chased. Review at the builder walkthrough and before automatic issue.
