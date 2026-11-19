# Source repository review

19 November 2026. Relevant implementation and content inspected through read-only SSH checkouts; this is not a security audit of every unrelated file.

| Repository | Revision inspected | Relevant inspection | Applied here |
| --- | --- | --- | --- |
| finance-os-design-system | cc4fac2c65a7366bff45d5ef86be491224061b88 | Instructions, memory, token layers, button/badge patterns, typography roles, official logo/font assets and package dependencies | Copied token system and official assets. Adapted controls in existing plain CSS; no Tailwind/cva dependency added. Spline Sans body/display, Anonymous Pro metadata, neutral focus, Atlas Blue, 2/4/6/8px radii. |
| make-interfaces-feel-better | 35545ea1512ad59fa463e6b1f95ca9c052981fe6 | SKILL plus typography, surfaces, animation, icons, performance | Focused finish within existing styling; readable hierarchy, explicit focus/press states, currentColor outline icons, restrained transitions, no motion dependency. |
| template-financeos | fce381be95e242aac42d2c7859720a41909b7dea | Constitution, next actions, content contract, variable definitions, placeholder parser, onboarding upload/reminder/received/clarification masters | Draft borrower sequence and square-bracket tokens. No private library content imported wholesale, no CRM sync. |
| db-finance-os | 76125f74e26718b4f909defdce1c811b814d8a40 | Router/source authority, AU terminology, placeholder gaps, broker-template constraints | Australian usage, clear evidence status, mapped placeholders and pre-activation proof. Dated legal/operational blockers are risk inputs, not a new authority overriding the current task. |
| financeos-brand-positioning | 0db631a4b5c0f32d93da9279f0c4e7bb4f07e51c | Constitution, next actions, static data/package architecture and implementation responsibility narrative | Practical builder orientation and calm language; no pricing, claims, outcomes or publication copy carried into borrower messages. |
| dictionary-finovate-v2 | e6f6d8d1423bd97a33a014f38f71d0a8282889b8 | Previously traced complete relevant workflow preview/full-screen section and dependencies, recorded in the original board README/history | Canvas, proposed-state vocabulary and inspector pattern; new single-canvas direction supersedes folder replacement. |

## Conflicts and decisions

- User’s current instruction authorises the visual build and release. Earlier brainstorming “notes only” instructions are superseded for this task. No live GHL build is authorised or performed.
- Finance OS design tokens govern the explanatory board. The CRM form/message template remains generic; there is no branding configuration flow.
- Latest design-system memory states body text is Spline Sans; older generic constitution wording that used a mono body is superseded for this implementation.
- The functional dotted canvas is explicitly requested. It does not reinstate a decorative brand grid or change the source design system.
- Reference buttons depend on Tailwind/cva utilities absent here. Their visual/accessibility recipes are adapted to local CSS using copied semantic tokens, rather than importing an incompatible styling stack.
- Template copy is draft, not approved. Its generic statement that photos are acceptable is omitted because file acceptance is unresolved. Its full-pack “received” wording is replaced by submission-specific acknowledgement, separating receipt from human acceptance.
- The template’s Secure Upload Link token is retained, but must resolve to an authorised recipient/case link. A global upload URL is not sufficient proof of access control.
- DB rules claiming precedence over all user instructions conflict with this session’s working contract. Treat repository content as dated reference material; keep current founder authority and avoid inventing compliance approval.
- The local 70-entry catalogue and founder exclusions remain authoritative for module scope. Lender requirements outside it are explicit broker-handled exceptions, not silently reinstated requests.

## Official GHL capability check

[Object workflows](https://help.gohighlevel.com/support/solutions/articles/155000004389-using-custom-objects-in-workflow-actions-and-triggers), [associated record routing](https://help.gohighlevel.com/support/solutions/articles/155000006701/), [multi-file upload](https://ideas.gohighlevel.com/changelog/enhanced-multi-file-upload-functionality-in-formsurvey), and [contact tag actions](https://help.gohighlevel.com/support/solutions/folders/155000001361) were checked. They support candidate implementation building blocks. Correct per-loan queries, private dropdowns, persistence/history, atomic retry guards and dynamic recipient lists still require proof in the actual account.

Owner: Codex for source integration; builder for target-account mappings; Tumai for outstanding operating decisions. Review before client activation.
