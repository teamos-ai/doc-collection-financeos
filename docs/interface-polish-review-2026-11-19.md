# Interface review — 19 November 2026

Mode: full. Scope: the requested workflow board, preview/full screen, in-place resources, intake and upload simulation. Framework: React 18, React Flow 12, TypeScript/Vite; existing plain CSS with Finance OS tokens. This is an implementation review, not exhaustive accessibility certification. The CRM template itself remains generic.

## Coverage

| Category | Evidence inspected | Result |
| --- | --- | --- |
| Typography | Self-hosted Spline Sans / Anonymous Pro, heading/body/tag CSS, desktop and mobile render | Hierarchy and tag legibility improved; exact-name overflow handled. |
| Surfaces | Canvas, inspector, resource panel, controls, full-screen overlay, mobile intake | Persistent canvas and in-place details; structural borders and focus cues. |
| Animations | CSS transitions, zero-duration canvas navigation, reduced-motion override | Routine navigation avoids animated travel. 10%-speed state review not run. |
| Icons | `src/ui.tsx`, toolbar and node controls | One currentColor SVG vocabulary; labels retained for narrow navigation. |
| Performance | Shared graph/resource state, memoised node selection, production assets and build | One mounted graph; no animation library or second styling system added. Profiling not run. |

## Findings addressed

| Severity | Location | Before | After | Why |
| --- | --- | --- | --- | --- |
| HIGH | `src/main.tsx:463`, `src/main.tsx:691` | Process selection replaced the visible graph/context. | All areas remain on one graph; step details open in place; explicit area navigation pans only when requested. | Context and motion restraint: the builder keeps the journey in view. |
| HIGH | `src/main.tsx:505` | Full-screen changes could lose the working view. | Shared graph, inspector and form state; viewport captured/restored. | Interaction continuity across preview/full screen. |
| MEDIUM | `src/style.css:34`, `src/style.css:102`, `src/style.css:865` | Local visual styling and very small tag metadata. | Design-system fonts/tokens, tabular metadata and larger tag text with wrapping. | Typography and readable hierarchy for exact build instructions. |
| MEDIUM | `src/style.css:88`, `src/main.tsx:677`, `src/panels.tsx` | Node keyboard activation and panel focus were incomplete. | Enter/Space activation, visible focus, panel-heading focus and restoration, accessible narrow-navigation labels. | Focus is an explicit state; keyboard users can inspect steps without losing place. |
| MEDIUM | `src/style.css:584`, `src/style.css:1223` | Resource layout did not express the continuous-canvas model. | In-place panel, independently scrollable content, responsive width and retained form state. | Surfaces communicate a detail layer rather than page navigation. |
| MEDIUM | `src/ui.tsx:11`, `src/main.tsx:604` | Tag operations required interpreting generic descriptions. | Add/keep/remove chips with exact names, dictionary and per-step operations. | Static labels communicate state without relying on colour alone. |
| LOW | `src/ui.tsx`, `src/style.css:190` | Inconsistent control/icon treatment. | Shared outline currentColor icons, semantic button states and explicit transition properties. | Optical consistency without adding another library. |
| LOW | `src/main.tsx`, `src/style.css:1297` | Development lifecycle emitted duplicate-root warnings; motion handling needed an explicit boundary. | Dispose the development root, preserve library attribution, honour reduced motion and use instant canvas focus. | Predictable lifecycle and restrained repeated interactions. |

## Considered but rejected

| Location | Candidate | Rejected because |
| --- | --- | --- |
| Canvas navigation | Animated fly-through between areas | Repeated movement obscures the builder's location and conflicts with the continuous-map request. |
| Resource panels | Dedicated route for each resource | It recreates the page-switching confusion the founder explicitly removed. |
| Controls | Import the reference Tailwind/cva component stack | This project uses plain CSS; token-based adaptation avoids a second styling system. |
| Tags | Separate tags for every account and period | Request records hold account and period detail; summary tags must stay stable across loans. |

## Verification and verdict

`npm test`, `npm run build` and `npm run package` passed. Connected-browser walkthroughs covered viewport retention, tags, keyboard activation, failed/received/replacement upload states, intake, alias search, drafts, builder guide and 390px mobile. A fresh final local session had no warning/error logs. See [verification](../evidence/verification.md) for exact scope.

Verdict: **Approve the inspected blueprint surfaces**; no known actionable interface-polish findings remain. Unverified: exhaustive hover/focus/empty-state matrix, 10%-speed transition inspection, screen-reader audit, full browser/device matrix, performance profiling, direct-from-disk portable rendering and the supplied standalone Playwright suite. GHL execution is a separate future acceptance gate.
