# Reusable brokerage template — improvement proposals

19 November 2026. Brainstorming notes, not approved implementation scope.

Founder objective: reusable document-collection forms and automation for complex Australian finance brokerages, with minimal setup per brokerage. The existing project defines the main collection lifecycle; native GHL feasibility and repeatable installation are not yet proven.

## Recommended approach

Build one standard core with a controlled brokerage configuration layer. Preserve the fixed Finance OS document periods; local configuration must not become a broker period override. Strongest alternative: fork a bespoke workflow per brokerage. That permits individual exceptions but creates duplicated maintenance and makes updates harder to validate.

## Priority gaps

1. **Installation and configuration.** Brokerage identity, sender details, assigned brokers/reviewers, permitted channels, approved cadence and escalation owner. Explicit install checklist covering fields, forms, tags, workflow entry points and links. Inventory what copies via snapshot and what requires reconnecting or replacement; prove in a clean target account.
2. **Authoritative case/request model.** Separate brokerage, loan, applicant, entity, account and document request. Tags summarise that state. Joint applicants/shared accounts and concurrent loans must be demonstrable before scaling.
3. **Complete exception journey.** Missing/outdated/unreadable/wrong-person evidence, partial periods, no-longer-required requests, additions after issue, broker handoff and manual pause/resume. Existing paths cover some of these; specify the remaining transitions, reasons and reviewer ownership rather than create more standalone campaigns.
4. **Client experience.** Clear scoped checklist with plain Australian labels, examples/instructions, required period, multiple uploads, progress and visible receipt/review states. Show exactly what remains. Never clear a request from dropdown selection alone.
5. **Reminder coordination.** One coordinated sequence per case/recipient, current missing list at send time, spacing, cap, quiet hours/timezone, pause after receipt pending review as proposed, and escalation to a human when repeated reminders fail. Exact schedule remains unapproved. Respect contact channel preferences and avoid overlapping messages for multiple cases.
6. **Broker control and operational visibility.** Queue for waiting-on-client versus awaiting-review versus exception; assigned reviewer, elapsed time, next action and pause state. Proposed measures: outstanding count, upload-to-review delay, replacement reasons and case completion. No claimed savings or delivery outcomes.
7. **Evidence access and lifecycle.** Prove correct-recipient access, file/history behaviour, authorised staff visibility, necessary-data handling, retention/export/deletion ownership and sensitive identifier handling. Reuse the supplied secure-document material and obtain appropriate review rather than assume platform settings establish policy.
8. **Versioning and repeatable release.** Stable keys, rule/template version per issued request, change log, safe update/migration process, test mode, rollback and synthetic acceptance pack. Do not silently rewrite active client requests after a template update.

## First proof before expanding scope

Use two clean test brokerage configurations and synthetic cases: PAYG purchase; refinance with retained/consolidated cards; joint self-employed/trust case. Demonstrate correct checklist/periods, scoped uploads, tag retention across accounts/loans, review/replacement and current-list reminders. Record manual setup steps and remove avoidable dependencies before describing the template as plug and play.

Owner: Tumai prioritises scope and approves standards; building team proves native storage/installation and operates the test. Next action after the notes phase: settle representation and installation contract before expanding sequences. Success: the same core runs both test brokerage configurations without workflow forks, wrong-recipient requests, premature tag clearing or stale reminders. Review at builder walkthrough and before any client activation.

## Founder correction — generic build only

Tumai excludes per-brokerage branding and custom tailoring. Build one neutral generic template inside the CRM. Remove branding/personalisation setup from the proposed gap list; do not build a brokerage onboarding/configuration product. Necessary operational references such as correct case, recipient and review owner remain implementation requirements, not a customisation offering.

Prioritise the build itself: scenario-to-document rules; correct loan/applicant/account linkage; safe upload-to-status/tag transitions; current-list reminders and stop conditions; broker review/replacement; repeatable installation and synthetic acceptance checks. The earlier Finance OS design-system direction concerns the explanatory visual board and remains separate from generic CRM template content.

## Additional focused build improvements — proposed

- Existing evidence: let the broker record already-held documents before issuing the pack, with correct subject/period and review status, to avoid requesting duplicates. Existing-file presence alone does not establish acceptance.
- Checklist amendments: define how to add or withdraw a requirement after issue, preserve history, reconcile tags and notify the client only about the change. Do not restart the whole sequence or lose received evidence.
- Reminder exhaustion: set an approved reminder cap and route to the responsible broker for manual follow-up, pause or closure rather than chase indefinitely. Exact timing/cap remains undecided.
- Progress and next action: show client-action items separately from awaiting-review items, so receipt progress does not imply the full pack has been accepted.
- Upload/event replay: retries and duplicate submissions must not create duplicate requests, notifications or reminder enrolments; failed saves never clear needed state.

These are proposed acceptance cases for the generic build, not executed features or approved reminder settings.

## Final usability and release proposals

- Each request should explain the exact document, relevant account/person, required dates/coverage, and completeness expectations such as all statement pages. Distinguish statement PDFs from screenshots where the approved evidence rule requires it; avoid inventing a blanket format rule.
- Put one clear upload link/action in each reminder and explain upload failures in plain language with a retry path. Keep the outstanding list current.
- Before activation, run a synthetic complete journey: issue, partial upload, successful upload, failed/duplicate event, review, replacement, completion and no further reminder. Include mixed cards and joint applicants, and repeat after installing into a clean test account.

Scope discipline: these complete the core acceptance criteria. Avoid adding more feature categories before the request model, upload transitions and reminder guards are proven.

## Audit sequence clarified by founder

The builder will manually implement the system in GHL. The present deliverable is a clear visual specification and builder handoff, including future acceptance cases. After the manual build, Tumai and Codex can audit it together with access to the intended GHL account/browser session. No live GHL access or testing is established by the current discussion. Start the future audit with synthetic contacts and sample documents; actual customer messaging and real financial records require the appropriate explicit scope. Distinguish static build inspection from observed successful workflow execution and delivery.
