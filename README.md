# Document collection — visual builder handoff

Prepared 19 November 2026 for Tumai and the Finance OS builders. **This is a proposed build specification, not an activated CRM system.**

Open [the interactive board](document-collection-board.html) in a browser. It works without a development server; web fonts fall back to system fonts when offline. Use Broker intake form to explore the scenario-driven checklist and resulting tags. Use Preview for folder → workflow → step inspection, Workflow board for connected branches, and Full screen for presentation. Click a step for its trigger, action, guard, state/tag effect and intended GHL mapping. Escape returns to preview size. The Rules & build details view includes the fixed-period matrix, record model and an interactive two-card tag example.

## The requested experience

This adapts the inspected Finovate “New proposed” workflow section. The current remote repository was read at `e6f6d8d1423bd97a33a014f38f71d0a8282889b8` on 19 November 2026. The older local checkout used InfinityBoard; the current section routes through **CurrentAutomationMap** for preview and **AutomationFlowBoard** for full screen. The screenshot’s folder drill-down matches that newer implementation.

Reviewed the workflow entry and all relevant dependencies: `src/pages/AreaPage.tsx`, `components/previews/WorkflowsPreview.tsx`, `components/CurrentAutomationMap.tsx`, `components/AutomationFlowBoard.tsx`, `components/WorkflowDictionary.tsx`, `data/proposedWorkflows.ts`, the current workflow types, `main.tsx`, relevant theme/shell/preview/canvas styles, project instructions and memory. Also compared the superseded InfinityBoard route. This is an inspection of the complete relevant section and its dependencies, not a claim to have audited every unrelated page in the repository. The public URL did not load through the text browser; the remote source and supplied screenshot ground the adaptation.

Preserved: white/Atlas Blue proposed state, compact folder preview, progressive detail, React Flow pan/zoom, draggable nodes, minimap and viewport-filling overlay with Escape. Extended: explicit condition-labelled branch edges and loop paths, separate decision/evidence status, a GHL builder inspector and shared scenario metadata. The current source’s `status: live` on proposed records was not copied as a production claim. Its Finovate-specific two-day reminder and partner onboarding rules were not imported.

## Seven proposed workflows

| ID | Purpose | Entry and exit |
| --- | --- | --- |
| DC-01 | Build the right checklist | Broker selects scenario → approved rules → confirms; unresolved rule stays draft |
| DC-02 | Issue one request set | Confirmed revision → guard → persist requests → synchronise tags → invitation |
| DC-03 | Receive the selected document | Authorised request → upload → save check → partial or received-for-review |
| DC-04 | Chase only what is missing | Single sequence → wait → permission/loan checks → read current outstanding → send or stop |
| DC-05 | Accept or request replacement | Broker review → accepted or reopened; complete only when selected active requirements are accepted |
| DC-06 | Pause, resume and close safely | Loan controls and contact channel events → scoped suppression or guarded resume |
| DC-07 | Keep tags truthful | Request changes → aggregate all applicable requests → retain/remove type tag → summaries |

The six preview folders are navigation groups for this module, not an instruction to renumber the existing brokerage’s pipelines. The seven workflow IDs are proposed logical units; final GHL deployment may combine or split units after feasibility checks.

## Confirmed rules and proposed behaviour

Confirmed: broker selects circumstances, ticks requirements, confirms and submits; client selects a request and uploads; broker reviews. Periods cannot be edited by the broker. Home-loan refinance requires six months as the Finance OS collection standard. Credit cards consolidated into the home loan use six months; retained cards use three months. These apply per account. They are operating defaults, not universal lender-policy claims.

Proposed: stop an item’s ordinary chase when a saved submission is ready for broker review, keep partial submissions actionable, reopen a rejected item with its reason, and use a single tag writer. Proposed periods outside the three confirmed statement rules, reminder cadence/cap, time windows, copy, partial-upload interaction and receipt-pause behaviour require owner review before activation. They are labelled on the board.

The record model is logical. It does not promise that arbitrary repeated document requests can be represented by native Contact fields. The builders must prove the native GHL representation for each loan/applicant/entity/account before implementing dependent automation. A separate adapter remains an option only if native capability cannot satisfy the design; no external platform has been selected.

## Tag contract

- `fos-doc-needed-<document-key>`: at least one relevant active request for this contact/type needs client action.
- `fos-docs-action-needed`: derived contact summary of client-action work, not the authoritative recipient/loan checklist.
- `fos-docs-review-needed`: saved evidence awaits broker review.
- `fos-docs-paused`: informational summary; never use this alone to stop every loan for the contact.

Only DC-07 writes these document summaries. It reads persisted requests; it does not decrement a counter on every event. Receive card A while card B remains missing → retain `fos-doc-needed-credit-card-statements`. Receive both → remove the needed tag, while review tasks remain. Reject A → reopen A and restore needed state. A different active loan with the same missing type also retains the tag. A pause preserves request history and blocks only the relevant loan’s sends.

File count is not period coverage. One PDF can cover six months; six files can overlap. A selected dropdown option, failed upload, duplicate event or unmatched reference never clears a requirement. Do not remove options from a globally shared dropdown; filter the recipient’s request list.

## Native capability evidence and feasibility gates

Public HighLevel support documents reviewed 19 November 2026 confirm individual building blocks:

- [Contact Tag trigger](https://help.gohighlevel.com/support/solutions/articles/48001213546-workflow-trigger-contact-tag): added/removed contact tags can initiate workflows. Avoid dual entry from form and tag events.
- [Add Contact Tag](https://help.gohighlevel.com/support/solutions/articles/155000003111-workflow-action-add-contact-tag) and [Remove Contact Tag](https://help.gohighlevel.com/support/solutions/articles/155000003266-workflow-action-remove-contact-tag): apply/remove selected contact tags. Do not use Remove All Tags.
- [Wait](https://help.gohighlevel.com/support/solutions/articles/155000002470-workflow-action-wait): fixed, conditional and scheduled wait options. This does not establish the business’s approved cadence.
- [File Upload custom field](https://help.gohighlevel.com/support/solutions/articles/48001171922-adding-files-to-contacts-using-a-custom-field): contact file fields support configurable file settings and multiple files. This is not proof of private per-loan links, dynamic dropdowns or immutable upload history.

Before client activation prove: exact opportunity/request targeting; multiple simultaneous loans and applicants; private file access; history across repeated uploads; partial/complete submission behaviour; current-list message generation; pause during a wait; once-only processing; and cross-loan tag reconciliation. If any fails, revise the representation before building the chasing sequence. No live GHL account has been changed or tested in this work.

## Builder sequence and acceptance

1. Agree approved defaults, reminder schedule/cap/copy and proposed receipt behaviour with Tumai.
2. Prove request storage and authorised upload access with synthetic records.
3. Build DC-01, DC-02 and DC-07 without sending customer messages.
4. Add upload/review transitions, including retry and replacement history.
5. Add reminders and controls after current-list generation and scoped suppression pass.
6. Demonstrate two cards (one retained, one consolidated), two loans for one contact, a partial six-month submission, failed/replayed uploads, broker rejection, pause during wait, opt-out, duplicate issue and completion. Verify no wrong-account/wrong-loan tag clearance and no stale reminders.

Owner: Tumai approves business rules; building team implements and proves GHL behaviour. Success: every request has the correct account and fixed period; every reminder contains only the recipient’s currently actionable items; every tag reflects all applicable requests. Review at the next builder walkthrough and before activation. No publication or production deployment is included.

## Files and verification

- `src/model.ts`: the canonical typed workflow model (7 workflows, 45 detailed steps).
- `workflow-blueprint.json`: generated model for Claude/builders, including topology, decisions, rules and fields.
- `src/main.tsx` / `src/style.css`: preview, branch board and builder-detail presentation.
- `document-collection-board.html`: portable single-file presentation.
- `scripts/check-model.mjs`: validates identifiers, references, decision branches and reachability; exports the JSON.
- `src/intake.ts` / `src/IntakeForm.tsx`: interactive intake demonstration. See [field and behaviour specification](docs/intake-form.md).
- `scripts/verify.mjs`: desktop/mobile browser behaviour and portable-bundle checks.
- `evidence/`: rendered inspection screenshots.

Development: `npm ci`, then `npm run dev` (http://127.0.0.1:5319). Validate: `npm test` and `npm run build`. Regenerate the portable HTML: `npm run package`.

For browser checks, keep the development server running, install a test browser with `npx playwright install chromium`, then run `npm run verify`. Alternatively set `CHROME_PATH` to a local Chrome executable. `BASE_URL` can override the local server address. These checks verify the presentation and form demonstration, not a deployed CRM. See [verification record](evidence/verification.md) for checks and limits.

Source decisions: [catalogue and tags](docs/document-collection-catalogue-and-tags-2026-11-18.md), [lender research](docs/document-collection-lender-research-2026-11-18.md). The retained catalogue is unchanged at 70 entries. This board does not add specialist documents that Tumai removed.
