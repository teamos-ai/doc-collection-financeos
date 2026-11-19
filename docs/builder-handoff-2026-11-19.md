# Builder handoff · document collection

19 November 2026. Proposed specification for a manual GHL build. The board is the primary walkthrough; this document and the JSON exports carry the exact build contract.

## Build order and completion checks

### B01 · Prove the record and access model

Create synthetic concurrent loans, two applicants, one shared entity and two cards. Prove each request and file has an unambiguous owner and permitted recipient.

**Done when:** No overwrite or cross-recipient exposure. Record chosen native GHL representation and any adapter boundary.

Workflows: DC-01, DC-02, DC-03.

### B02 · Register rules, fields and tags

Use stable catalogue keys. Keep history, quantity, freshness and source/version separate. Create tags once; assign DC-07 sole writing responsibility.

**Done when:** The same person can need two different periods for two cards without adding period-specific tags.

Workflows: DC-01, DC-07.

### B03 · Build intake and issue guard

Broker selects circumstances, reviews proposed and approved requirements, records already-held evidence, ticks and confirms. Guard loan + revision before creating requests.

**Done when:** Drafts send nothing. Replaying confirmation does not duplicate requests or invitation. Unapproved selected rules block production issue.

Workflows: DC-01, DC-02.

### B04 · Build upload and reconciliation

Filter the request dropdown by authorised recipient and loan. Persist files before the receipt event. Support partial / ready-for-review and event retries.

**Done when:** Dropdown-only and failed save never remove tags. One card received retains the shared tag when the other is missing.

Workflows: DC-03, DC-07.

### B05 · Build human review and amendments

Accept, replace with a reason, withdraw or add requirements without discarding history. Reuse already-held evidence only with a review and request link.

**Done when:** Rejected evidence reopens only its request. No-longer-required items stop chasing without deleting evidence. Complete is not lender approval.

Workflows: DC-05, DC-06, DC-07.

### B06 · Connect restrained messages

Approve the draft schedule and copy; map each placeholder. Compute the current list immediately before sending. Coordinate across cases to avoid recipient collisions.

**Done when:** No unresolved placeholders, duplicate sequences or sends after pause. A reply hands control to the broker. Cap exhaustion creates an owned task.

Workflows: DC-02, DC-04, DC-06.

### B07 · Audit the manual GHL build

Run the synthetic acceptance pack in an authorised test location, then repeat after snapshot installation. Observe actual files, tags, waits and sends.

**Done when:** Builder records actual outcomes and evidence. Board checks alone never constitute GHL acceptance.

Workflows: DC-01, DC-02, DC-03, DC-04, DC-05, DC-06, DC-07.

## Proposed field schema

Logical names, not live GHL custom-field IDs. Builder must record actual fields and associations after proving the representation.

| Record | Field names | Type / values | Constraint |
| --- | --- | --- | --- |
| Request set | loan_id, revision, rule_version, owner_id | Stable reference, integer, version, staff reference | Unique issue key = loan_id + revision; not a contact email. |
| Request set | collection_status, issued_at, paused_reason | Draft / Active / Paused / Complete / Closed; datetime; text | Completion requires accepted aggregate; Closed is not Accepted. |
| Document request | request_id, request_set_id, document_key | Stable IDs; retained catalogue key | Never encode account, loan or month count into the tag. |
| Document request | subject_id, subject_type, account_id, permitted_recipient_ids | Applicant / Entity / Property / Account; linked references | Shared evidence requires explicit links and recipient access, not duplicated person fields. |
| Document request | coverage_start, coverage_end, quantity, freshness_rule | Dates, count if relevant, rule reference | Issued requirement is versioned. No broker period override. |
| Document request | status, status_reason, evidence_revision | Requested / Partial / Awaiting review / Accepted / Replacement / Withdrawn; text; revision | Withdrawn needs an owner/reason and preserves history. |
| Submission | submission_id, request_id, file_refs, saved_at, ready_for_review | Deduplication key, request reference, file references, datetime, boolean | Keep multiple files and repeat-upload history. No file data in message merge fields. |
| Review | reviewer_id, submission_revision, decision, reason, reviewed_at | Staff reference, revision, Accept / Replace, text, datetime | Do not apply an old review to a newer upload. |
| Communication | request_set_id, recipient_id, message_id, attempt, last_sent_at, next_due_at | References, integer, datetimes | Unique message-event key; cap and recipient-level spacing survive replacement or amendment. |

## Field-to-rule mapping

| Input / event | Field | Route | Guard |
| --- | --- | --- | --- |
| Loan reference + applicants | request_set.loan_id; request.subject_id | DC-01.start → DC-02.create | Never resolve solely by email. |
| Purpose + stage | purchase / refinance / construction; contract_available | R13 / R15 → DC-01.rules | Pre-approval does not chase an unavailable sale contract. |
| Income + entity role | income_sources[]; entity_id; income_route | R04–R12 / R16–R17 | Mixed income is additive; alternative routes are not. |
| Salary matching | salary_match_required | R06 → salary-statements | No blanket transaction-account request. |
| Liability + treatment | account_id; retained / refinance / consolidated | R01–R03 → locked coverage | Each card is assessed independently. |
| Document tick + held evidence | selected; evidence_link; review_status | DC-01.confirm → DC-02.create | Already held does not mean already accepted. |
| Client request + saved files | request_id; revision; submission_id; file_refs[] | DC-03.saved → DC-07.changed | Successful persistence, not dropdown change, starts reconciliation. |
| Broker review | decision; reason; reviewer; evidence_revision | DC-05.decision → DC-07.changed | Review the exact uploaded version. |

## Workflow instructions

### DC-01 · Build the right checklist

The broker selects circumstances. Fixed rules generate the checklist; the broker ticks the required items and confirms.

#### DC-01.01 / `DC-01.start` · Broker opens request form

- **Evidence:** Confirmed
- **Trigger:** Correct loan and applicant selected
- **Action:** Identify the existing loan, assigned broker, each applicant and their permitted recipients. Capture contact details without overwriting another applicant.
- **Guard:** A contact can have multiple loans. Never infer a loan from an email alone.
- **Proposed GHL mapping:** Internal form + loan context; context-safe mapping needs validation.
- **Next:** Continue → `DC-01.scenario`

#### DC-01.02 / `DC-01.scenario` · Select the circumstances

- **Evidence:** Confirmed
- **Trigger:** Purpose · income · liabilities
- **Action:** Select purchase/refinance/construction, owner-occupied/investment, stage, income sources and each debt’s treatment. Multiple selections can coexist.
- **Guard:** One consolidated card must not make every retained card a consolidation request.
- **Proposed GHL mapping:** Conditional form fields; repeated applicant/account mapping to prove.
- **Next:** Continue → `DC-01.rules`

#### DC-01.03 / `DC-01.rules` · Apply fixed scenario rules

- **Evidence:** Confirmed
- **Trigger:** Periods are read-only
- **Action:** Home-loan refinance = 6 months. Consolidated credit card = 6 months. Retained credit card = 3 months. Apply other standards only after approval.
- **Guard:** No broker period override. No blanket request for all 70 catalogue items.
- **Proposed GHL mapping:** Rules evaluation; native feasibility to prove.
- **Next:** Continue → `DC-01.supported`

#### DC-01.04 / `DC-01.supported` · Approved rule available?

- **Evidence:** Proposed
- **Trigger:** Known defaults versus unresolved cases
- **Action:** Continue with approved rules. If a selected item has no approved standard or falls outside the retained catalogue, flag it for controlled review.
- **Guard:** Unknown is not zero and not a guessed maximum period.
- **Proposed GHL mapping:** If/Else on evaluated result; rule source is to be selected.
- **Next:** Yes → `DC-01.confirm`; No → `DC-01.exception`

#### DC-01.05 / `DC-01.confirm` · Review, tick and confirm

- **Evidence:** Confirmed
- **Trigger:** Broker confirms before issue
- **Action:** Show the applicant, account, document, locked period and any exception. Broker ticks the required documents and submits.
- **Guard:** Saving a draft sends nothing. Explicit confirmation is required.
- **Proposed GHL mapping:** Broker form submission / reviewed request event.
- **Next:** Exit / handoff described above.

#### DC-01.06 / `DC-01.exception` · Resolve the rule exception

- **Evidence:** Proposed
- **Trigger:** Keep request draft
- **Action:** Route missing standards or excluded documents to the broker/policy owner. Resolve through controlled rule maintenance or handle outside this collection module.
- **Guard:** Do not silently reinstate removed financials, consents or expense documents.
- **Proposed GHL mapping:** Internal task; no client issue while selected rule remains unresolved.
- **Next:** Exit / handoff described above.

### DC-02 · Issue one request set

Request records hold the truth. Tags summarise what the contact still needs to provide.

#### DC-02.01 / `DC-02.confirmed` · Confirmed request arrives

- **Evidence:** Confirmed
- **Trigger:** DC-01 submission event
- **Action:** Receive the confirmed checklist with loan, applicants, account references and standard version.
- **Guard:** One authoritative issue event; do not independently start on both form and every document tag.
- **Proposed GHL mapping:** Form Submitted / validated event adapter.
- **Next:** Continue → `DC-02.duplicate`

#### DC-02.02 / `DC-02.duplicate` · Already issued this revision?

- **Evidence:** Proposed
- **Trigger:** Check request-set identity
- **Action:** Check a durable issue guard using loan + checklist revision, scoped to the request set.
- **Guard:** A retry must not duplicate requests, tasks or invitations.
- **Proposed GHL mapping:** Durable guard storage and atomic issue processing require proof.
- **Next:** No → `DC-02.create`; Yes → `DC-02.skip`

#### DC-02.03 / `DC-02.create` · Create document requests

- **Evidence:** Feasibility
- **Trigger:** One record per subject and requirement
- **Action:** Create selected requests with document key, applicant/entity/account, period, revision and status. Already-held evidence needs an explicit file link, matching subject/period and review state. Invite only for client-action items; accepted held evidence does not enter chasing.
- **Guard:** Never overwrite another loan’s request or previous upload.
- **Proposed GHL mapping:** Per-request storage design: native linked records if proven; otherwise adapter.
- **Request state:** Requested
- **Next:** Continue → `DC-02.tag`

#### DC-02.04 / `DC-02.tag` · Synchronise needed tags

- **Evidence:** Proposed
- **Trigger:** Recompute from open requests
- **Action:** Invoke DC-07 after request persistence. It applies needed tags and the action-needed summary from current requests; this step must not become a second tag writer.
- **Guard:** Tags are a projection; counts and periods live on requests.
- **Proposed GHL mapping:** Add Contact Tag action after correct-contact projection.
- **Request state:** Requested
- **Tag effect:** fos-doc-needed-<document-key> · fos-docs-action-needed
- **Next:** Continue → `DC-02.invite`

#### DC-02.05 / `DC-02.invite` · Send the upload invitation

- **Evidence:** Confirmed
- **Trigger:** Email/SMS with current checklist
- **Action:** Send the approved invitation with the correct recipient’s loan-scoped upload link. Start one reminder sequence for this request set.
- **Guard:** Respect allowed channel and DND. Do not send before requests persist; record delivery attempt to prevent repeat invite.
- **Proposed GHL mapping:** Send Email / SMS. Private upload-link implementation to prove.
- **Next:** Exit / handoff described above.

#### DC-02.06 / `DC-02.skip` · No duplicate issue

- **Evidence:** Proposed
- **Trigger:** Existing requests stay intact
- **Action:** Use the existing issue result; do not recreate or resend.
- **Guard:** A changed checklist is a new reviewed revision, not a replay.
- **Proposed GHL mapping:** Guarded exit.
- **Next:** Exit / handoff described above.

### DC-03 · Receive the selected document

Proposed: a saved submission marked ready for review pauses chasing that item. Receipt is separate from broker acceptance.

#### DC-03.01 / `DC-03.open` · Client opens upload link

- **Evidence:** Feasibility
- **Trigger:** Show their outstanding requests
- **Action:** Authorise the recipient and show only their actionable loan-specific requests, including the relevant account and fixed period.
- **Guard:** Do not edit global dropdown options. A bare email or loan reference is not access control.
- **Proposed GHL mapping:** Private upload page + per-request dropdown filtering.
- **Next:** Continue → `DC-03.upload`

#### DC-03.02 / `DC-03.upload` · Select request and upload

- **Evidence:** Confirmed
- **Trigger:** One or more files for this item
- **Action:** Client chooses the exact request and attaches files. A six-month requirement may be one combined PDF.
- **Guard:** Selecting a dropdown item does not mark it received.
- **Proposed GHL mapping:** File Upload field exists; dynamic scope/history and repeated submissions need proof.
- **Next:** Continue → `DC-03.saved`

#### DC-03.03 / `DC-03.saved` · Files saved and linked?

- **Evidence:** Feasibility
- **Trigger:** Verify request, access and persistence
- **Action:** Validate the submission, recipient, request revision and durable file references. Deduplicate repeated upload events.
- **Guard:** Never acknowledge a failed save or a mismatched request.
- **Proposed GHL mapping:** Validated receipt event / persistence adapter.
- **Next:** Yes → `DC-03.partial`; No → `DC-03.retry`

#### DC-03.04 / `DC-03.partial` · Ready for broker review?

- **Evidence:** Proposed
- **Trigger:** Partial versus submitted evidence
- **Action:** Support multiple files and explicit partial/ready submission. File count does not prove date coverage or document correctness.
- **Guard:** No automatic financial-content acceptance. Client declaration only signals readiness for review.
- **Proposed GHL mapping:** Submission state + broker review; partial-upload UX is proposed.
- **Next:** Ready → `DC-03.received`; Partial → `DC-03.remaining`

#### DC-03.05 / `DC-03.received` · Received · awaiting review

- **Evidence:** Proposed
- **Trigger:** Hide from actionable dropdown
- **Action:** Set Received awaiting review, keep receipt visible and create a broker review task. Ordinary chasing pauses for this request. Run DC-07 to reconcile tags.
- **Guard:** Not Verified; do not advance the loan to lender-ready.
- **Proposed GHL mapping:** Request state update + internal task; receipt pause needs owner sign-off.
- **Request state:** Received awaiting review
- **Tag effect:** Reconcile through DC-07
- **Next:** Exit / handoff described above.

#### DC-03.06 / `DC-03.retry` · Keep request outstanding

- **Evidence:** Proposed
- **Trigger:** Upload failed or invalid reference
- **Action:** Show the upload error; allow retry against the correct request. Route unmatched submissions for staff handling.
- **Guard:** No tag/status change on failure. No guess at the applicant.
- **Proposed GHL mapping:** Validation/error route.
- **Request state:** Requested
- **Next:** Exit / handoff described above.

#### DC-03.07 / `DC-03.remaining` · Keep partial evidence

- **Evidence:** Proposed
- **Trigger:** Request still needs client action
- **Action:** Preserve uploaded files and show the remaining requirement. Continue against this request without duplicating it.
- **Guard:** Do not claim the required period is covered because a file exists.
- **Proposed GHL mapping:** Partial state and request-level remaining text.
- **Request state:** Partially received
- **Tag effect:** Needed tag remains
- **Next:** Add remaining files → `DC-03.upload`

### DC-04 · Chase only what is missing

Draft cadence: invitation, then 3 business days to email, 4 more to one permitted-channel reminder, 5 more to a broker task. Cap at two reminders. Calendar, timing and copy require approval before activation.

#### DC-04.01 / `DC-04.enrol` · One reminder sequence

- **Evidence:** Proposed
- **Trigger:** Issued or reopened request set
- **Action:** Ensure a single active reminder sequence per loan/request set. Reopened requests reuse the active sequence.
- **Guard:** Do not run one uncoordinated campaign for each tag.
- **Proposed GHL mapping:** Workflow entry with durable per-request-set guard.
- **Next:** Continue → `DC-04.wait`

#### DC-04.02 / `DC-04.wait` · Wait for approved interval

- **Evidence:** Proposed
- **Trigger:** Cadence is still to be decided
- **Action:** Use the draft 3 / 4 / 5 business-day schedule only after approval. Respect recipient timezone, approved window and a proposed contact-level minimum 3-business-day gap across reminder/replacement sends. Receipt acknowledgements are events, not extra chases.
- **Guard:** No production send until cadence, cap and copy are approved.
- **Proposed GHL mapping:** Wait action supports timing/conditions; values pending.
- **Next:** Continue → `DC-04.gate`

#### DC-04.03 / `DC-04.gate` · Safe to contact now?

- **Evidence:** Proposed
- **Trigger:** Active · channel allowed · below cap
- **Action:** Recheck loan pause/closure, recent client replies, recipient permissions, DND, channel validity, last outreach and attempt cap immediately before sending. A client reply pauses the chase for broker handling; another case must not create overlapping outreach.
- **Guard:** A pause while waiting must suppress the next send.
- **Proposed GHL mapping:** If/Else + channel/DND controls + request-set status.
- **Next:** Yes → `DC-04.missing`; No → `DC-04.hold`

#### DC-04.04 / `DC-04.missing` · Any current missing items?

- **Evidence:** Feasibility
- **Trigger:** Read checklist again now
- **Action:** Read only Requested, Partially received or Replacement requested items for this loan and recipient.
- **Guard:** Never reuse the original issued list after uploads.
- **Proposed GHL mapping:** Current-list composition capability to prove.
- **Next:** Yes → `DC-04.send`; No → `DC-04.review`

#### DC-04.05 / `DC-04.send` · Send current outstanding list

- **Evidence:** Proposed
- **Trigger:** Only these items + upload link
- **Action:** Compose approved email/SMS with current required items and period wording. Record send/attempt and wait again.
- **Guard:** Final send must use a fresh revision; already queued external sends may not be cancellable.
- **Proposed GHL mapping:** Send Email / SMS with generated current content.
- **Next:** Next approved interval → `DC-04.wait`

#### DC-04.06 / `DC-04.hold` · Pause or hand to broker

- **Evidence:** Proposed
- **Trigger:** Suppressed / capped / invalid channel
- **Action:** Exit or suspend as appropriate; raise an owned task when human follow-up is required.
- **Guard:** Opt-out is not cleared by resuming a loan.
- **Proposed GHL mapping:** Guarded exit + internal task.
- **Next:** Exit / handoff described above.

#### DC-04.07 / `DC-04.review` · Stop client chase

- **Evidence:** Proposed
- **Trigger:** No client action remains
- **Action:** Stop this request set’s ordinary reminders. Route pending receipts to review; accepted requests may complete collection.
- **Guard:** No client chase for Received awaiting review.
- **Proposed GHL mapping:** Guarded exit; request-set context preserved.
- **Next:** Exit / handoff described above.

### DC-05 · Accept or request a replacement

The broker checks the evidence. Collection complete is not lending approval or permission to lodge.

#### DC-05.01 / `DC-05.queue` · Broker review task

- **Evidence:** Confirmed
- **Trigger:** Saved receipt awaiting review
- **Action:** Show the document, requested period, applicant/account, submission revision and prior files.
- **Guard:** The client-selected document type does not verify its content.
- **Proposed GHL mapping:** Task / internal notification with secure evidence access.
- **Next:** Continue → `DC-05.decision`

#### DC-05.02 / `DC-05.decision` · Broker’s decision

- **Evidence:** Confirmed
- **Trigger:** Accept · replace · more required
- **Action:** Review identity, account, date coverage and readability; record reviewer, date and reason.
- **Guard:** No automatic acceptance from file presence. Avoid applying a decision to a newer replacement upload.
- **Proposed GHL mapping:** Controlled review form/status event.
- **Next:** Accept → `DC-05.accept`; Replace / more → `DC-05.replace`

#### DC-05.03 / `DC-05.accept` · Accept this request

- **Evidence:** Proposed
- **Trigger:** Evidence verified by broker
- **Action:** Mark the request Accepted and preserve its history. Recompute request-set completion.
- **Guard:** Acceptance applies only to this request revision.
- **Proposed GHL mapping:** Request update + DC-07 reconciliation.
- **Request state:** Accepted
- **Next:** Continue → `DC-05.all`

#### DC-05.04 / `DC-05.all` · Every selected request accepted?

- **Evidence:** Proposed
- **Trigger:** Exclude cancelled/waived only by owner
- **Action:** Check all active requests across the loan’s applicants and entities.
- **Guard:** No missing request can be ignored just because its tag vanished.
- **Proposed GHL mapping:** Request-set aggregate; mapping to prove.
- **Next:** Yes → `DC-05.complete`; No → `DC-05.pending`

#### DC-05.05 / `DC-05.complete` · Collection complete

- **Evidence:** Proposed
- **Trigger:** Notify the assigned broker
- **Action:** Stop this loan’s collection chase and notify the broker that the selected collection pack is complete.
- **Guard:** No auto lender approval, loan lodgement or settlement-stage movement.
- **Proposed GHL mapping:** Internal notification + collection status.
- **Request state:** Collection complete
- **Next:** Exit / handoff described above.

#### DC-05.06 / `DC-05.replace` · Request specific replacement

- **Evidence:** Proposed
- **Trigger:** Reason and remaining requirement
- **Action:** Preserve old files. Reopen only the affected item with a clear reason; show it in the dropdown and current reminders.
- **Guard:** No new duplicate request and no reset of other accepted evidence.
- **Proposed GHL mapping:** Review form → request update → DC-07.
- **Request state:** Replacement requested
- **Tag effect:** Needed tag restored if action remains
- **Next:** Exit / handoff described above.

#### DC-05.07 / `DC-05.pending` · Keep remaining work active

- **Evidence:** Proposed
- **Trigger:** Missing or other review tasks remain
- **Action:** Leave other requests in their actual states. Chase only items still needing client action.
- **Guard:** Received items remain with the broker, not in ordinary client chasing.
- **Proposed GHL mapping:** No blanket reset.
- **Next:** Exit / handoff described above.

### DC-06 · Pause, resume and close safely

Loan controls and contact channel controls are different. Neither should inadvertently stop an unrelated loan.

#### DC-06.01 / `DC-06.event` · Control event

- **Evidence:** Proposed
- **Trigger:** Pause · resume · amend · reply · opt-out
- **Action:** Receive an owned loan-control or checklist-amendment decision, client reply, or a channel permission/delivery event.
- **Guard:** Identify exact loan and recipient before changing anything.
- **Proposed GHL mapping:** Controlled form/status + relevant channel event.
- **Next:** Continue → `DC-06.scope`

#### DC-06.02 / `DC-06.scope` · Which control applies?

- **Evidence:** Proposed
- **Trigger:** Loan status versus contact channel
- **Action:** Apply pause/closure/reply to the loan request set; apply channel restrictions to the actual recipient channel. Route reviewed checklist changes to the amendment action.
- **Guard:** A summary paused tag alone must not suppress all loans.
- **Proposed GHL mapping:** Request-set status plus native DND/channel checks.
- **Next:** Pause / close / reply → `DC-06.pause`; Resume → `DC-06.resume`; Channel event → `DC-06.channel`; Checklist change → `DC-06.amend`

#### DC-06.03 / `DC-06.pause` · Pause or close this loan

- **Evidence:** Proposed
- **Trigger:** Suppress future sends
- **Action:** Set the loan request-set state and stop/suppress its reminders. Preserve every request and file.
- **Guard:** Closing does not erase financial evidence or declare requests accepted.
- **Proposed GHL mapping:** Scoped status/exit; multi-opportunity handling must be tested.
- **Request state:** Paused / Closed
- **Next:** Continue → `DC-06.sync`

#### DC-06.04 / `DC-06.resume` · Resume after recheck

- **Evidence:** Proposed
- **Trigger:** Still eligible and still outstanding
- **Action:** Read current requirements, permission and send cap; re-enter at most one reminder sequence if appropriate.
- **Guard:** Do not resend the initial invitation or override DND.
- **Proposed GHL mapping:** Controlled re-entry + guard.
- **Next:** Continue → `DC-06.sync`

#### DC-06.05 / `DC-06.channel` · Suppress affected channel

- **Evidence:** Proposed
- **Trigger:** Opt-out or failed delivery
- **Action:** Respect DND and invalid channel state; notify broker when action is needed.
- **Guard:** Do not infer permission for another channel.
- **Proposed GHL mapping:** Native channel controls; broker task.
- **Next:** Continue → `DC-06.sync`

#### DC-06.06 / `DC-06.amend` · Amend the checklist

- **Evidence:** Proposed
- **Trigger:** Add · withdraw · link held evidence
- **Action:** Create a reviewed checklist revision. Add new scoped requests or mark withdrawn with an owner/reason; preserve accepted evidence and old files. Link already-held evidence with its review status. Notify only the changed requirements.
- **Guard:** Do not reset reminder attempts, recreate accepted requests or silently change an issued period. Newly selected unapproved rules remain draft.
- **Proposed GHL mapping:** Controlled amendment form/event → persisted revision → DC-07.
- **Next:** Continue → `DC-06.sync`

#### DC-06.07 / `DC-06.sync` · Reconcile current summary

- **Evidence:** Proposed
- **Trigger:** DC-07 recomputes state
- **Action:** Refresh display and summaries from current requests.
- **Guard:** Keep another loan’s actionable requests intact.
- **Proposed GHL mapping:** DC-07 reconciliation.
- **Next:** Exit / handoff described above.

### DC-07 · Keep tags truthful

This is the only document-tag writer. It prevents one upload clearing a tag needed by another account, applicant or loan.

#### DC-07.01 / `DC-07.changed` · Request state changed

- **Evidence:** Proposed
- **Trigger:** Issue · receipt · review · control
- **Action:** Reconcile after committed state changes; retry safely on transient failure.
- **Guard:** Use current persisted data, not decrement counters from duplicate events.
- **Proposed GHL mapping:** Reconciliation event / adapter.
- **Next:** Continue → `DC-07.read`

#### DC-07.02 / `DC-07.read` · Read all relevant requests

- **Evidence:** Feasibility
- **Trigger:** Correct contact across active loans
- **Action:** For each document key, find unresolved client-action requests belonging to this contact; include Requested, Partial and Replacement. Paused loan requests retain their needed-state evidence.
- **Guard:** Accepted, received-for-review, waived or cancelled items do not create ordinary client-action need.
- **Proposed GHL mapping:** Linked request query; a plain contact field is insufficient for concurrent loans.
- **Next:** Continue → `DC-07.any`

#### DC-07.03 / `DC-07.any` · Same document still needed?

- **Evidence:** Proposed
- **Trigger:** Check every applicable account
- **Action:** Aggregate at contact + document type. Loan A received must not clear Loan B or card B.
- **Guard:** An empty dropdown on one loan is not proof the contact needs nothing.
- **Proposed GHL mapping:** If/Else on authoritative aggregate.
- **Next:** Yes → `DC-07.keep`; No → `DC-07.remove`

#### DC-07.04 / `DC-07.keep` · Add or retain needed tag

- **Evidence:** Proposed
- **Trigger:** One or more requests need action
- **Action:** Retain the canonical needed tag. No new tag for each account, month count or loan.
- **Guard:** Period and account stay on the request, not inside tag names.
- **Proposed GHL mapping:** Add Contact Tag.
- **Tag effect:** fos-doc-needed-<document-key>
- **Next:** Continue → `DC-07.summary`

#### DC-07.05 / `DC-07.remove` · Remove needed tag

- **Evidence:** Proposed
- **Trigger:** No requests of that type need action
- **Action:** Remove only this document type’s needed tag. Keep evidence and reviewer tasks.
- **Guard:** Persist receipt first; remove tag only after successful all-request reconciliation.
- **Proposed GHL mapping:** Remove Contact Tag.
- **Tag effect:** Remove fos-doc-needed-<document-key>
- **Next:** Continue → `DC-07.summary`

#### DC-07.06 / `DC-07.summary` · Refresh summaries

- **Evidence:** Proposed
- **Trigger:** Action needed · review needed · paused
- **Action:** Recompute summary tags and loan-specific checklist text; log reconciliation. Tag changes do not issue a new request set.
- **Guard:** One writer; prevent tag-trigger feedback loops.
- **Proposed GHL mapping:** Add/Remove Tag + state projection.
- **Tag effect:** fos-docs-action-needed · fos-docs-review-needed · fos-docs-paused
- **Next:** Exit / handoff described above.

## Message sequence · draft, not approved

Invitation → 3 business days → email → 4 more business days → SMS or permitted email → 5 more business days → owned broker task. Two reminder attempts maximum. Proposed recipient-level 3-business-day minimum gap across chases and replacement requests; event receipts are acknowledgements, not chases. A reply pauses the automation. Final sending window, holiday calendar and timezone handling need approval.

### M01 · Initial document request (Email)

Step: `DC-02.invite`. After confirmed requests persist; once per issued revision.

Subject: Your document checklist

```text
Hi [First Name],

Here are the documents we need for [Loan Purpose]:

[Outstanding Items]

Upload your documents here: [Secure Upload Link]

Choose the matching item in the upload list and follow its instructions. You can send what you have now and return for the rest. Please use the upload link for documents rather than email attachments.

If an item is unclear or difficult to obtain, reply without attaching documents or call [Broker Phone].

Thanks,
[Broker Name]
[Broker Phone]
[Credit Licence Details]
```

Guard: Use only the authorised recipient’s current list. Validate private link and every required placeholder. Do not promise all file formats are accepted.

### M02 · First outstanding reminder (Email)

Step: `DC-04.send`. Draft: 3 business days after invitation, if still actionable.

Subject: Documents still needed for your application

```text
Hi [First Name],

These items are still waiting to be uploaded:

[Outstanding Items]

You can add them here: [Secure Upload Link]

Items already received for review are not included in this list. If you need help finding a document, reply without attachments or call [Broker Phone].

Thanks,
[Broker Name]
[Broker Phone]
[Credit Licence Details]
```

Guard: Fresh list at send time. No message for an empty list, paused case, recent reply or prohibited channel.

### M03 · One gentle check-in (SMS)

Step: `DC-04.send`. Draft: 4 business days after M02; SMS only if allowed.

```text
Hi [First Name], it is [Broker Name]. Your remaining document checklist is here: [Secure Upload Link]. Need help finding an item? Call [Broker Phone]. Reply STOP to stop texts.
```

Guard: Use email alternative M02 if SMS is unavailable and permitted. Never send both channels for this attempt. Check expanded length and sender identity.

### M04 · Hand back to the broker (Internal task)

Step: `DC-04.hold`. Draft: 5 business days after the second reminder, if still outstanding.

```text
Document follow-up has reached the proposed two-reminder cap. Review the current checklist, recent replies and any sensitive circumstances. Contact the client personally, pause or close the case. Do not automatically restart the sequence.
```

Guard: Assign an actual owner. Reopening an item does not reset the recipient contact budget.

### M05 · Receipt acknowledgement (Email)

Step: `DC-03.received`. After saved ready-for-review submission; deduplicate by submission.

Subject: Your upload has been received

```text
Hi [First Name],

We have received this upload:

[Received Items]

Your broker will review it and let you know if anything needs to be replaced. Your checklist shows any other items still waiting to be uploaded: [Secure Upload Link]

Thanks,
[Broker Name]
[Broker Phone]
[Credit Licence Details]
```

Guard: Receipt is not acceptance. Never say the whole pack is complete after one file. Combine rapid uploads into one acknowledgement where feasible.

### M06 · Specific replacement request (Email)

Step: `DC-05.replace`. After the broker commits a replacement decision.

Subject: A replacement document is needed

```text
Hi [First Name],

Please open your checklist for the item that needs replacing and the broker’s instructions:

[Secure Upload Link]

Your other documents keep their current status. If you need help with the request, reply without attachments or call [Broker Phone].

Thanks,
[Broker Name]
[Broker Phone]
[Credit Licence Details]
```

Guard: Show the exact request and neutral reason inside the private checklist. Avoid sensitive account details in messages. Coordinate with the next reminder.

### M07 · Selected pack accepted (Email)

Step: `DC-05.complete`. After every active selected request is accepted; once per revision.

Subject: Your document checklist is complete

```text
Hi [First Name],

Your broker has reviewed and accepted the documents on this checklist. There is nothing further to upload for this set of requests.

Your broker will contact you about the next step. This confirms document collection only; it is not a loan approval.

Thanks,
[Broker Name]
[Broker Phone]
[Credit Licence Details]
```

Guard: Only after the accepted aggregate is true. Additional requirements later create a reviewed amendment, not a false original completion.

## Placeholder mapping

Authoring tokens are not automatically executable CRM merge fields. Missing values block send.

| Token | Meaning | Mapping / proof |
| --- | --- | --- |
| [First Name] | Recipient first name | Template registry maps provisionally to {{contact.first_name}}; verify in target GHL. |
| [Broker Name] | Assigned broker display name | Registry {{user.name}} is proposed. Verify assignment is the correct broker. |
| [Broker Phone] | Approved operational contact | Verify exact CRM merge field and populated value. |
| [Credit Licence Details] | Approved sender footer | Required operational footer; no branding setup product. Mapping not yet verified. |
| [Loan Purpose] | Recipient-safe case description | Mapped from the confirmed request set; never another opportunity. |
| [Outstanding Items] | Fresh recipient + loan-scoped actionable list | Composer output, not a static contact tag or old invitation list. Include label, subject and locked period. |
| [Secure Upload Link] | Private link for this recipient and case | Existing token reused; override broad template meaning with verified request-specific scope. |
| [Received Items] | Items in this committed submission | New local token. No assumption that the full pack has arrived. |

## Manual GHL acceptance pack

These are future test cases, not completed GHL results.

1. PAYG purchase before contract: request income / selected ID; do not chase an unavailable contract.
2. Refinance: home loan 6 months, consolidated card A 6 months, retained card B 3 months; all locked.
3. Joint applicants and trust: separate personal requests, link shared entity evidence explicitly.
4. Dropdown selection only, failed save and replayed upload: no premature removal or duplicate task.
5. Partial A, then ready A, then ready B: retain shared card tag until B is also received.
6. A different loan still needs card statements: keep the shared contact tag even when this loan is complete.
7. Broker rejects A: preserve files, reopen A, restore needed state; B stays in its actual state.
8. Pause or close while waiting: suppress next send; resume never clears DND or resends invitation.
9. Add or withdraw a requirement after issue: preserve accepted evidence and revision history.
10. Already-held evidence: confirm subject, period and acceptance before excluding from client chase.
11. Client replies / reaches reminder cap: pause automated follow-up and create an owned task.
12. Copy snapshot to clean test account: prove fields, private links, sender configuration and placeholders.

Owner: Tumai approves outstanding standards and communication settings. Builder implements and records actual target-account evidence. Joint audit before client activation and after the first clean snapshot install. No live GHL work was performed in this release.
