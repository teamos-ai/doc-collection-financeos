# Blueprint verification — 19 November 2026

Version 0.3.0. This records the visual specification and synthetic examples, not a live GHL installation.

## Executed checks

- `npm test`: passed. Seven workflows / 46 detailed steps have valid IDs, branches, references and reachability. Intake checks cover per-account fixed 6/3-month rules, conditional salary matching, purchase stage, applicant scope, entity routes and retained catalogue keys. Blueprint checks cover the 70-entry catalogue, source links, message mapping, failed/replayed/partial/replacement upload events and contact/loan isolation.
- `npm run build`: passed TypeScript, production bundling and homepage/compiled-asset checks.
- `npm run package`: passed the separate portable build and generated the self-contained HTML, including fonts and logo.
- Connected-browser checks against the local app: all 54 step nodes (eight overview and 46 detailed) remain mounted; opening a step or toggling tags preserves the viewport. Full-screen entry/exit preserves viewport and selection. Resource panels stay over the same canvas.
- Synthetic upload walkthrough: failed save leaves the request outstanding; receiving card A retains the shared needed tag; receiving card B removes it while review remains; requesting a replacement for A restores the tag and actionable dropdown entry.
- Intake walkthrough: fixed periods and conditional fields visible, synthetic email entry retained, already-held choices visible. Approval remains explicitly a simulation; no external form submission or document transmission.
- Catalogue search for the alias “pay stubs” returned only Recent payslips with the canonical tag. Email/SMS and build-guide panels displayed the drafts, guards, placeholders and numbered dependencies.
- Desktop and 390 × 844 mobile inspected. Mobile document width equalled viewport width. Intake panel remained usable in full-screen mode. Escape closed the resource and then full screen; keyboard Enter opened a focused workflow node.
- A fresh browser session after the final fixes logged no warnings/errors. Development hot-reload duplicate-root warnings were addressed with disposal; library attribution is visible.

Current screenshot: [unified board](unified-board.jpg). Other PNGs in this folder are historical version 0.2.0 evidence and must not be presented as this rebuild.

## Explicit boundaries

- The updated `npm run verify` Playwright script is provided for repeatable future checks; it was not executed in this turn. Rendered verification used the connected browser controller instead.
- The portable HTML was generated successfully. Direct file-URL browser inspection was blocked by the browser's protocol policy; this version was not directly rendered from disk. No workaround was attempted.
- The final clean-session check was local, not a claim about production deployment. Deployment status must be checked against the released commit.
- No screen-reader audit, full keyboard matrix, browser/device matrix, 10%-speed transition review or exhaustive hover/empty-state pass was completed. Reduced-motion handling and specific transition properties were inspected in source.
- No GHL forms, secure access, storage, workflow execution, delivery, concurrency, message timing or actual lender-policy compliance was tested. The supplied acceptance cases are for the manual build and later joint audit.
- Public lender/ATO research was checked, with historical sources and unresolved rules labelled. Perplexity's independent report remains pending retrieval and is not counted as verified evidence.

## Preserved deployment architecture

The website build emits `dist/index.html` and compiled assets. Portable library output stays in `dist-portable/`. This preserves the earlier missing-homepage repair. Existing Vercel deployment protection remains enabled.
