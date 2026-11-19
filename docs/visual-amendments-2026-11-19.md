# Visual amendments — founder conversation, 19 November 2026

Status: captured direction for a later build. No UI changes made during this review.

## Confirmed direction

- Keep the complete document-collection journey visible as one connected organism on a single canvas.
- Clicking a process, logic branch or journey component must reveal its detail in place rather than replacing the map with another workflow/page.
- Preserve orientation, surrounding context and the user's pan/zoom position while inspecting detail. An inspector or inline expansion is a candidate implementation, not a final chosen layout.
- Use a dotted infinite-board background with pan/zoom. Carry the same behaviour into preview and full-screen modes.
- Use the Finance OS design-system code and tokens, with its shared components and official assets. Source: https://github.com/teamos-ai/finance-os-design-system ; showcase: https://ds.financeos.au/#overview .
- Use the supplied interface-polish skill to improve interaction clarity and finish. Source: https://github.com/teamos-ai/make-interfaces-feel-better . Inspected via SSH at revision 35545ea1512ad59fa463e6b1f95ca9c052981fe6.
- Capture the discussion now; implementation follows the later build instruction. Keep the workflow logic, conditions, tags and broker intake available within the unified experience.

## Skill review

The skill is available as readable Markdown and can be applied directly without running an installer. It covers typography, surfaces, animation, icons, hit areas and performance. It explicitly uses the existing styling system and respects existing design-system constraints. Its generic radius/motion suggestions must stay subordinate to Finance OS tokens and the approved radius ceiling.

Use it for the polish pass. The single-canvas navigation requirement is a product interaction decision and must be implemented explicitly; the skill alone does not provide an infinite-board architecture.

## Later build acceptance

1. Inspect any workflow step without replacing the complete journey.
2. Closing detail restores attention to the selected step; pan/zoom context remains stable.
3. Preview and full screen share the same connected journey and selection model.
4. Dots, connectors, branch labels and controls remain legible at useful zoom levels.
5. Design-system tokens/components govern colours, type, spacing, controls, radii and assets.
6. Keyboard focus, touch targets, reduced motion and mobile layout remain usable.
7. Broker intake, upload, receipt/review, reminders, tag reconciliation and stop conditions remain discoverable in the same overall journey.

Owner: Tumai for further visual direction; builder for implementation after the later instruction. Review: next design/build session.

## Further conversation — collection and reminder content

- Continue recording notes; execute the amendments once Tumai finishes the discussion.
- The builder needs plain, explicit instructions for reproducing the full process inside GoHighLevel.
- Broker form selections establish the requested documents and related tagging for the client/loan opportunity.
- Email and SMS follow-up must show the currently outstanding list and stop when no client-action requirements remain.
- Client chooses the requested document in the upload dropdown. Successful saved upload against that request drives receipt and tag reconciliation. Selection alone is not proof of receipt; multiple same-type accounts/loans must retain their shared summary tag until all applicable requests cease needing action.
- Reminders should be spaced and restrained, not sent repeatedly for each individual outstanding document. Exact cadence, sequence cap and channel mix are not yet approved.
- Tumai offered a Finance OS repository containing existing email sequences, placeholders and templates as context for drafting collection follow-ups. The repository link is pending. Use its established placeholder conventions and tone once supplied; do not invent integration mappings.
- Potential content scope: first request, spaced outstanding-document reminders, receipt acknowledgement, replacement request and completion message. These are candidates for the later drafting step, not an approved schedule.

## Due diligence instruction

Before the later implementation, inspect each supplied repository sufficiently to understand its purpose, instructions, current source, relevant components/content, dependencies and reuse boundaries. Trace the relevant behaviour through its dependencies rather than relying on README summaries. Identify which repository governs design tokens, interaction polish, message content/placeholders and this board's workflow logic. Record source revisions and unresolved conflicts. The incoming email-content repository remains pending. Tumai will finish providing context before requesting execution.

## Additional repositories supplied

- https://github.com/teamos-ai/template-financeos — intended template/content reference; README API lookup returned 404, SSH access check pending. Do not describe its contents as inspected yet.
- https://github.com/teamos-ai/db-finance-os — README accessible; structured Finance OS knowledge base with source tiers, voice/messaging, content banks, operational context and decisions. Full task-specific due diligence remains for the later build.
- https://github.com/teamos-ai/financeos-brand-positioning — intended positioning reference; README API lookup returned 404, SSH access check pending. Do not describe its contents as inspected yet.

A missing README response is not by itself proof that the repository is inaccessible. Verify Git access and actual file trees before escalating.

SSH access confirmed for both remaining repositories: template-financeos HEAD fce381be95e242aac42d2c7859720a41909b7dea; financeos-brand-positioning HEAD 0db631a4b5c0f32d93da9279f0c4e7bb4f07e51c. The earlier README lookup failures do not block source inspection.

## Research gap raised — Australian document terminology and scenario coverage

Notes/brainstorming only; Tumai explicitly confirms no execution yet.

Before implementation, compare the retained catalogue and scenario matrix with Australian mortgage-broker document checklists, including publicly available PDFs, and cross-check relevant lender primary sources. Objectives:

- Find missing circumstance-to-document mappings and unnecessary requests, not simply enlarge the catalogue.
- Standardise client-facing names in Australian usage. Record common aliases separately so familiar broker terms map to one stable document key. Distinguish personal tax returns, ATO notices of assessment, ATO income statements, BAS and account statements by actual purpose.
- Organise evidence by applicant/income structure, loan purpose, existing liability treatment, document period/quantity and acceptable alternatives.
- Mark source, date, lender-specific exceptions and whether a rule is a confirmed Finance OS standard or a proposal. A broker checklist is a useful comparison, not proof of a universal requirement.
- Preserve explicit catalogue exclusions and fixed founder periods; flag newly discovered external requirements for review rather than silently reinstate excluded items.
- Produce a coverage/gap table and Australian naming/alias table for founder review before changing the board or automation.

Potential missing input distinctions to investigate, not approved mandatory form fields: permanent/casual PAYG, variable income, self-employed/company/partnership/trust income, joint applicants, purchase/pre-approval versus signed contract, refinance, debt consolidation versus retained liabilities, owner occupied/investment, deposit source and construction stage.

Existing-source readiness scan completed; findings and staged deep-research plan saved in `research-readiness-and-plan-2026-11-19.md`. Main conclusion: enough structure to design the register and branches, insufficient approved/current reconciled detail to freeze every automatic document rule. Existing local Australian broker/lender PDFs should be reconciled before broad new searching. PDF contents and newly supplied repositories are not fully reviewed yet.

Founder scope correction: CRM document-collection template is neutral/generic, without per-brokerage branding or custom tailoring. Focus on forms, conditional rules, upload/receipt, tag reconciliation and follow-up/review. Do not expand into a branding or brokerage-personalisation setup layer. Finance OS design-system reference continues to apply to the explanatory board.

## Builder communication improvements — proposed

- Organise the single connected canvas into labelled swimlanes: broker, client, automation, and broker review. Use boundaries/labels without replacing the complete graph on selection.
- Give every step a stable reference and a plain-language purpose. Expand in place or via inspector to show: entry trigger, required inputs, exact condition, action, field/status changes, tag additions/removals, next branch and failure/stop behaviour.
- Show explicit tag-operation chips next to relevant actions: ADD, KEEP and REMOVE plus the exact canonical tag. Do not rely on colour alone. Distinguish contact summary tags from loan/request statuses and from client-facing document labels.
- Include an on-board tag dictionary: exact tag, meaning, writer workflow, addition condition, removal condition and workflows that read it. Include a worked mixed-card example showing why one upload can retain the shared needed tag.
- Label every condition connector with the actual branch outcome. Include failed save, partial evidence, replacement, paused and no-outstanding paths.
- Map each intake field to its rule, generated request and downstream state/tag effect. Provide a sample completed intake and resulting checklist beside its route through the board.
- Provide a builder action list linked to stable step references: proposed GHL trigger/action, exact field/tag references, branch checks, wait/exit conditions and dependencies. Clearly mark native capability not yet proven; do not invent exact GHL configurations.
- Show build order/dependencies and a concise definition of done per workflow. Distinguish confirmed business decisions from proposed behaviour and capability needing proof.
- Include approved email/SMS copy with exact placeholders at the send steps once the source repositories have been reviewed and the copy drafted.
- Keep details progressively disclosed so the whole journey remains understandable. No wall of text on every node; selection preserves pan/zoom and surrounding context.

These are presentation/handoff proposals saved for later implementation, not changes already made to the live board.

## Tag visibility control — founder request

Add a toggle for showing/hiding tag operations and tagging conventions within the same board. It should reveal exact ADD / KEEP / REMOVE operations, tag meanings and reconciliation conditions without changing pages or losing the selected step/viewport. Keep basic journey labels readable when the overlay is off. The tag dictionary and mixed-card example can appear in the in-place detail surface.

## Execution gate and staged order — final conversation notes

Tumai confirms that research validation comes first. Tonight's intended work is staged; he will leave voice mode, adjust settings and provide the next execution instruction. This conversation authorises finishing/saving notes, not beginning the rebuild or Perplexity run now.

1. Review supplied repositories and existing source material; produce a gap register and Australian naming register.
2. Conduct targeted source validation and independent Perplexity cross-check through Brave if available. Verify cited original sources; preserve explicit standards/exclusions and identify unresolved policy.
3. Reconcile evidence into one scenario-to-document matrix. Obtain only necessary founder decisions before treating proposed rules as approved; unresolved branches remain visibly draft.
4. Build the unified dotted workflow canvas, in-place inspector and tag visibility toggle using Finance OS design-system tokens/components and the interface-polish guidance. Carry confirmed intake, upload, reminder and review logic across the same journey; label unresolved items.
5. Add detailed builder mappings, tag dictionary, numbered build order, field-to-rule links, worked examples and repository-grounded draft email/SMS sequences. Cadence and copy remain proposed until approved.
6. Verify the visual specification in preview/full-screen/mobile and complete the builder handoff. Subsequent manual GHL implementation is owned by the builder; audit its actual operation together later with authorised access and synthetic records.

Detailed companion notes: `research-readiness-and-plan-2026-11-19.md` and `reusable-template-gaps-2026-11-19.md`. No changes to the live board, CRM or deployed template were made during this brainstorming session.
