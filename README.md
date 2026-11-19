# Document collection · Finance OS builder blueprint

An interactive **proposed specification**, not a borrower portal or activated CRM integration. Built for the team implementing the document-collection process manually in GoHighLevel.

[Open the board](https://doc-collection-financeos.vercel.app) · [Builder handoff](docs/builder-handoff-2026-11-19.md) · [Research validation](docs/research-validation-2026-11-19.md)

## One continuous canvas

The whole journey and all seven detailed logic areas stay mounted on the same dotted canvas. Click a step for its in-place inspector. The numbered left navigation explicitly moves to a logic area; it never swaps graphs or pages. “Whole journey” returns to the summary. “See all logic” fits the entire board. Drag to pan and use the zoom controls to read a detailed area.

“Show tags” reveals the operations on the nodes. The inspector and tag dictionary explain exact names, writers, readers and add/keep/remove conditions. Preview and full screen share graph, selection, forms and viewport state. Escape closes a resource, then the inspector, then full screen. Keyboard Enter/Space opens a focused step.

Resources open over the same canvas:

- **Broker intake:** scenario selections, account-specific treatment, locked periods, conditional salary matching, already-held evidence and resulting tag preview.
- **Upload example:** synthetic two-card case with failed save, partial receipt, broker review, replacement and another-loan tag retention.
- **Document catalogue:** all 70 retained entries, explanations, Australian aliases and stable tags.
- **Rules & research:** 18 scenario routes with coverage, count, freshness, authority, sources and gaps.
- **Email & SMS:** seven draft messages/actions, restrained proposed cadence and explicit placeholder mappings.
- **Build guide:** numbered dependencies, logical field schema, intended GHL capabilities and future acceptance cases.

## The build contract

The broker selects circumstances, reviews and ticks requirements, then confirms. Each request belongs to the correct loan, applicant/entity and account. The client selects that request and saves evidence. A dropdown selection alone does nothing to tags.

DC-07 is the only document-tag writer. Contact tags summarise all relevant requests; one upload cannot clear another account or loan’s requirement. Proposed receipt behaviour pauses ordinary chasing for ready-for-review evidence while retaining broker review. Partial or replacement requests still need client action. Collection completion requires human acceptance of every active selected request; it is not lender approval.

Fixed founder defaults, per account, with no broker override:

| Circumstance | Coverage |
| --- | --- |
| Home loan being refinanced | 6 continuous months |
| Credit card consolidated into home loan | 6 continuous months |
| Credit card retained / conduct checked | 3 continuous months |

These are Finance OS collection standards, not universal lender-policy claims. Other periods, freshness cutoffs, receipt-pause behaviour and message settings remain visibly proposed. Unapproved selected rules block production issue. Broad catalogue entries are not automatically requested by the demonstrator.

The neutral CRM template has no brokerage-branding setup product. Required sender identity, correct recipients and reviewer ownership are operational references.

## Sources and research status

Direct lender/ATO checks and three supplied Australian broker/construction PDFs informed the new matrix. Current ING detail and several specialised routes remain unresolved. Perplexity Deep Research was started in Brave, but its completed report could not be retrieved after the native window became unavailable; it is marked pending, not verified.

See [repository due diligence](docs/repository-review-2026-11-19.md) for pinned source revisions, design/component reuse, message provenance and authority conflicts. The earlier Finovate reference section was inspected at `e6f6d8d1423bd97a33a014f38f71d0a8282889b8`: AreaPage → WorkflowsPreview → CurrentAutomationMap / AutomationFlowBoard, dictionary/data/types and supporting styles. The new founder direction replaces its folder/page drill-down with one canvas. Unrelated application pages were not claimed audited.

## Files and exports

- `src/model.ts`: seven workflows / 46 detailed steps, conditions and builder instructions.
- `src/intake.ts`: illustrative main-scenario form rules.
- `src/catalogue.json`: retained 70-entry catalogue; stable keys preserved.
- `src/research.ts`: scenario/source/naming register.
- `src/buildSpec.ts`: tag contract, build order, schema, messages and acceptance cases.
- `src/requestState.ts`: synthetic upload/tag example only.
- `workflow-blueprint.json`, `builder-handoff.json`: generated builder exports, refreshed by tests.
- `document-collection-board.html`: portable single-file board, including fonts/logo.
- `docs/builder-handoff-2026-11-19.md`: readable manual implementation handoff.

No form inputs are persisted or transmitted. Synthetic examples use reserved test addresses. No credentials, live GHL access or document storage is included.

## Run and verify

```sh
npm ci
npm run dev                 # http://127.0.0.1:5319
npm test                    # model, intake, scope and state invariants; refresh JSON exports
npm run build               # website build + index/assets check
npm run package             # portable HTML with embedded assets
npm run verify              # repeatable Playwright browser suite; needs its Chromium installation
```

Current rendered checks used the connected browser controller, including desktop, 390px mobile, full screen, stable viewport, keyboard navigation, form and tag examples. The reusable Playwright script is provided separately for the builder; its execution status is recorded honestly in [verification](evidence/verification.md).

Vercel uses the normal Vite website output in `dist/`. Portable mode has a separate `dist-portable/` library output. Do not point Vercel at the library output; it has no website `index.html`. Existing deployment protection remains enabled.

## Next owner

Tumai: approve remaining policy and message defaults. Builder: prove scoped records, private upload access, dynamic checklist composition, retries and installation in the intended GHL account. Audit the manual implementation together using the synthetic acceptance pack before client activation. Board verification does not establish GHL feasibility or lending-policy approval.
