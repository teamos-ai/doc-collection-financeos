# Presentation verification — 19 November 2026

For repository version 0.2.0, passed:

- TypeScript checking and production build.
- Seven workflows / 45 detailed steps: unique IDs, valid connectors, reachable detailed steps and decision branches.
- Intake scenario tests: separate account requests, fixed six-month refinance/consolidation and three-month retained-card rules, conditional salary matching, purchase contract stage, retained catalogue keys, entity paths and distinct applicant request IDs.
- Browser intake: locked periods, salary matching visibility, checklist/tag synchronisation, confirmation preview and navigation into DC-01.
- Folder/workflow drill-down, all seven graphs, selected-step GHL details, viewport-filling overlay and Escape.
- Two-card tag retention after one receipt, removal after both and restoration after reopening.
- Desktop and 390px mobile layout checks, including the intake form.
- Packaged HTML opened directly from disk with a working intake and workflow connectors.

Browser page-error capture was empty. Screenshots in this directory use synthetic data. Desktop intake and full-screen graph screenshots were visually inspected after the browser checks.

The earlier embedded-board verification identified an inline host SVG-sizing conflict and a partial-upload loop overlapping another branch. The scoped edge-sizing rule and corrected path remain in this version. This version's added intake form was verified in the standalone application and portable HTML; it has not been reverified in the chat's embedded renderer.

This verifies the interactive blueprint. It does not verify native GHL request storage, secure upload access, workflow execution, reminders, delivery or lender policy compliance. Those remain explicit implementation gates.
