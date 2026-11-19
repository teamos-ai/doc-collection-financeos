export type TagOperation = {
  op: "ADD" | "KEEP" | "REMOVE" | "RECOMPUTE" | "NONE";
  tag: string;
  why: string;
};
const needed = "fos-doc-needed-<document-key>";
export const tagOperations: Record<string, TagOperation[]> = {
  "DC-01": [
    {
      op: "NONE",
      tag: "Draft checklist",
      why: "Selecting or unticking a draft never changes contact tags or sends messages.",
    },
  ],
  "DC-02": [
    {
      op: "RECOMPUTE",
      tag: "DC-07 is the sole tag writer",
      why: "After requests persist, invoke reconciliation before invitation.",
    },
    {
      op: "ADD",
      tag: needed,
      why: "DC-07 adds the type tag for one or more client-action requests.",
    },
    {
      op: "ADD",
      tag: "fos-docs-action-needed",
      why: "At least one request needs client action.",
    },
  ],
  "DC-03": [
    {
      op: "KEEP",
      tag: needed,
      why: "Dropdown selection, failed save and partial evidence keep the request outstanding.",
    },
    {
      op: "RECOMPUTE",
      tag: needed,
      why: "Saved and ready for review: DC-07 removes only if no other request of this type needs action.",
    },
    {
      op: "ADD",
      tag: "fos-docs-review-needed",
      why: "One or more committed receipts await broker review.",
    },
  ],
  "DC-04": [
    {
      op: "NONE",
      tag: "Read current request state",
      why: "Tags do not store a loan’s outstanding list. Never send directly from a stale tag trigger.",
    },
  ],
  "DC-05": [
    {
      op: "RECOMPUTE",
      tag: needed,
      why: "Acceptance or replacement changes request state, then DC-07 updates summaries.",
    },
    {
      op: "ADD",
      tag: needed,
      why: "On replacement, only when the affected request requires client action again.",
    },
  ],
  "DC-06": [
    {
      op: "RECOMPUTE",
      tag: "fos-docs-paused",
      why: "At least one relevant request set is paused. The tag alone must not suppress another loan.",
    },
    {
      op: "KEEP",
      tag: needed,
      why: "Pausing stops sends; it does not erase outstanding evidence.",
    },
  ],
  "DC-07": [
    {
      op: "ADD",
      tag: needed,
      why: "Add if an actionable request exists and the tag is absent.",
    },
    {
      op: "KEEP",
      tag: needed,
      why: "Retain while any applicable account or loan still needs this document.",
    },
    {
      op: "REMOVE",
      tag: needed,
      why: "Only after committed state and a fresh query find no remaining client-action request.",
    },
    {
      op: "RECOMPUTE",
      tag: "fos-docs-action-needed · fos-docs-review-needed · fos-docs-paused",
      why: "Derive each summary independently; action and review can coexist.",
    },
  ],
};
export function stepTagOperations(flow: string, step: string): TagOperation[] {
  const none: TagOperation[] = [
    {
      op: "NONE",
      tag: "No direct tag change",
      why: "This step reads or prepares state. DC-07 writes tags only after the relevant change is committed.",
    },
  ];
  const keep: TagOperation[] = [
    {
      op: "KEEP",
      tag: needed,
      why: "Selection, incomplete evidence or failed persistence does not satisfy this request.",
    },
  ];
  const sync: TagOperation[] = [
    {
      op: "RECOMPUTE",
      tag: "DC-07 → " + needed,
      why: "Commit the request state, then aggregate all relevant accounts and loans before adding, retaining or removing tags.",
    },
  ];
  if (flow === "DC-01" || flow === "DC-04") return none;
  if (flow === "DC-02") return step === "tag" ? sync : none;
  if (flow === "DC-03")
    return step === "received"
      ? sync
      : ["upload", "retry", "remaining"].includes(step)
        ? keep
        : none;
  if (flow === "DC-05")
    return ["accept", "replace", "complete"].includes(step) ? sync : none;
  if (flow === "DC-06") return step === "sync" ? tagOperations[flow] : none;
  if (flow === "DC-07")
    return step === "keep"
      ? tagOperations[flow].slice(0, 2)
      : step === "remove"
        ? [tagOperations[flow][2]]
        : step === "summary"
          ? [tagOperations[flow][3]]
          : none;
  return none;
}
export const buildOrder = [
  {
    id: "B01",
    title: "Prove the record and access model",
    flows: ["DC-01", "DC-02", "DC-03"],
    detail:
      "Create synthetic concurrent loans, two applicants, one shared entity and two cards. Prove each request and file has an unambiguous owner and permitted recipient.",
    done: "No overwrite or cross-recipient exposure. Record chosen native GHL representation and any adapter boundary.",
  },
  {
    id: "B02",
    title: "Register rules, fields and tags",
    flows: ["DC-01", "DC-07"],
    detail:
      "Use stable catalogue keys. Keep history, quantity, freshness and source/version separate. Create tags once; assign DC-07 sole writing responsibility.",
    done: "The same person can need two different periods for two cards without adding period-specific tags.",
  },
  {
    id: "B03",
    title: "Build intake and issue guard",
    flows: ["DC-01", "DC-02"],
    detail:
      "Broker selects circumstances, reviews proposed and approved requirements, records already-held evidence, ticks and confirms. Guard loan + revision before creating requests.",
    done: "Drafts send nothing. Replaying confirmation does not duplicate requests or invitation. Unapproved selected rules block production issue.",
  },
  {
    id: "B04",
    title: "Build upload and reconciliation",
    flows: ["DC-03", "DC-07"],
    detail:
      "Filter the request dropdown by authorised recipient and loan. Persist files before the receipt event. Support partial / ready-for-review and event retries.",
    done: "Dropdown-only and failed save never remove tags. One card received retains the shared tag when the other is missing.",
  },
  {
    id: "B05",
    title: "Build human review and amendments",
    flows: ["DC-05", "DC-06", "DC-07"],
    detail:
      "Accept, replace with a reason, withdraw or add requirements without discarding history. Reuse already-held evidence only with a review and request link.",
    done: "Rejected evidence reopens only its request. No-longer-required items stop chasing without deleting evidence. Complete is not lender approval.",
  },
  {
    id: "B06",
    title: "Connect restrained messages",
    flows: ["DC-02", "DC-04", "DC-06"],
    detail:
      "Approve the draft schedule and copy; map each placeholder. Compute the current list immediately before sending. Coordinate across cases to avoid recipient collisions.",
    done: "No unresolved placeholders, duplicate sequences or sends after pause. A reply hands control to the broker. Cap exhaustion creates an owned task.",
  },
  {
    id: "B07",
    title: "Audit the manual GHL build",
    flows: ["DC-01", "DC-02", "DC-03", "DC-04", "DC-05", "DC-06", "DC-07"],
    detail:
      "Run the synthetic acceptance pack in an authorised test location, then repeat after snapshot installation. Observe actual files, tags, waits and sends.",
    done: "Builder records actual outcomes and evidence. Board checks alone never constitute GHL acceptance.",
  },
];
export const fieldMappings = [
  [
    "Loan reference + applicants",
    "request_set.loan_id; request.subject_id",
    "DC-01.start → DC-02.create",
    "Never resolve solely by email.",
  ],
  [
    "Purpose + stage",
    "purchase / refinance / construction; contract_available",
    "R13 / R15 → DC-01.rules",
    "Pre-approval does not chase an unavailable sale contract.",
  ],
  [
    "Income + entity role",
    "income_sources[]; entity_id; income_route",
    "R04–R12 / R16–R17",
    "Mixed income is additive; alternative routes are not.",
  ],
  [
    "Salary matching",
    "salary_match_required",
    "R06 → salary-statements",
    "No blanket transaction-account request.",
  ],
  [
    "Liability + treatment",
    "account_id; retained / refinance / consolidated",
    "R01–R03 → locked coverage",
    "Each card is assessed independently.",
  ],
  [
    "Document tick + held evidence",
    "selected; evidence_link; review_status",
    "DC-01.confirm → DC-02.create",
    "Already held does not mean already accepted.",
  ],
  [
    "Client request + saved files",
    "request_id; revision; submission_id; file_refs[]",
    "DC-03.saved → DC-07.changed",
    "Successful persistence, not dropdown change, starts reconciliation.",
  ],
  [
    "Broker review",
    "decision; reason; reviewer; evidence_revision",
    "DC-05.decision → DC-07.changed",
    "Review the exact uploaded version.",
  ],
];
export const capabilityChecks = [
  [
    "Object workflows",
    "HighLevel documents object-created/changed events, associated-record updates, If/Else and Wait. Candidate for request records; prove the exact associations and query behaviour.",
    "https://help.gohighlevel.com/support/solutions/articles/155000004389-using-custom-objects-in-workflow-actions-and-triggers",
  ],
  [
    "Associated record targeting",
    "Published Find Object Record and associated-record workflow actions support scoped lookup/routing. They do not prove correct loan targeting or atomic issue guards in this build.",
    "https://help.gohighlevel.com/support/solutions/articles/155000006701/",
  ],
  [
    "Multiple file uploads",
    "HighLevel documents multiple file links from form/survey uploads. Private request filtering, file history and validated persistence events still require a target-account proof.",
    "https://ideas.gohighlevel.com/changelog/enhanced-multi-file-upload-functionality-in-formsurvey",
  ],
  [
    "Contact tags",
    "Add Contact Tag and Remove Contact Tag are published actions. The builder must connect them to the authoritative request aggregate, not the selected dropdown value.",
    "https://help.gohighlevel.com/support/solutions/folders/155000001361",
  ],
];
export const schemaFields = [
  [
    "Request set",
    "loan_id, revision, rule_version, owner_id",
    "Stable reference, integer, version, staff reference",
    "Unique issue key = loan_id + revision; not a contact email.",
  ],
  [
    "Request set",
    "collection_status, issued_at, paused_reason",
    "Draft / Active / Paused / Complete / Closed; datetime; text",
    "Completion requires accepted aggregate; Closed is not Accepted.",
  ],
  [
    "Document request",
    "request_id, request_set_id, document_key",
    "Stable IDs; retained catalogue key",
    "Never encode account, loan or month count into the tag.",
  ],
  [
    "Document request",
    "subject_id, subject_type, account_id, permitted_recipient_ids",
    "Applicant / Entity / Property / Account; linked references",
    "Shared evidence requires explicit links and recipient access, not duplicated person fields.",
  ],
  [
    "Document request",
    "coverage_start, coverage_end, quantity, freshness_rule",
    "Dates, count if relevant, rule reference",
    "Issued requirement is versioned. No broker period override.",
  ],
  [
    "Document request",
    "status, status_reason, evidence_revision",
    "Requested / Partial / Awaiting review / Accepted / Replacement / Withdrawn; text; revision",
    "Withdrawn needs an owner/reason and preserves history.",
  ],
  [
    "Submission",
    "submission_id, request_id, file_refs, saved_at, ready_for_review",
    "Deduplication key, request reference, file references, datetime, boolean",
    "Keep multiple files and repeat-upload history. No file data in message merge fields.",
  ],
  [
    "Review",
    "reviewer_id, submission_revision, decision, reason, reviewed_at",
    "Staff reference, revision, Accept / Replace, text, datetime",
    "Do not apply an old review to a newer upload.",
  ],
  [
    "Communication",
    "request_set_id, recipient_id, message_id, attempt, last_sent_at, next_due_at",
    "References, integer, datetimes",
    "Unique message-event key; cap and recipient-level spacing survive replacement or amendment.",
  ],
];
export const acceptanceCases = [
  "PAYG purchase before contract: request income / selected ID; do not chase an unavailable contract.",
  "Refinance: home loan 6 months, consolidated card A 6 months, retained card B 3 months; all locked.",
  "Joint applicants and trust: separate personal requests, link shared entity evidence explicitly.",
  "Dropdown selection only, failed save and replayed upload: no premature removal or duplicate task.",
  "Partial A, then ready A, then ready B: retain shared card tag until B is also received.",
  "A different loan still needs card statements: keep the shared contact tag even when this loan is complete.",
  "Broker rejects A: preserve files, reopen A, restore needed state; B stays in its actual state.",
  "Pause or close while waiting: suppress next send; resume never clears DND or resends invitation.",
  "Add or withdraw a requirement after issue: preserve accepted evidence and revision history.",
  "Already-held evidence: confirm subject, period and acceptance before excluding from client chase.",
  "Client replies / reaches reminder cap: pause automated follow-up and create an owned task.",
  "Copy snapshot to clean test account: prove fields, private links, sender configuration and placeholders.",
];
export type Message = {
  id: string;
  title: string;
  step: string;
  when: string;
  channel: "Email" | "SMS" | "Internal task";
  subject?: string;
  body: string;
  guard: string;
};
const signature = "[Broker Name]\n[Broker Phone]\n[Credit Licence Details]";
export const messages: Message[] = [
  {
    id: "M01",
    title: "Initial document request",
    step: "DC-02.invite",
    when: "After confirmed requests persist; once per issued revision",
    channel: "Email",
    subject: "Your document checklist",
    body:
      "Hi [First Name],\n\nHere are the documents we need for [Loan Purpose]:\n\n[Outstanding Items]\n\nUpload your documents here: [Secure Upload Link]\n\nChoose the matching item in the upload list and follow its instructions. You can send what you have now and return for the rest. Please use the upload link for documents rather than email attachments.\n\nIf an item is unclear or difficult to obtain, reply without attaching documents or call [Broker Phone].\n\nThanks,\n" +
      signature,
    guard:
      "Use only the authorised recipient’s current list. Validate private link and every required placeholder. Do not promise all file formats are accepted.",
  },
  {
    id: "M02",
    title: "First outstanding reminder",
    step: "DC-04.send",
    when: "Draft: 3 business days after invitation, if still actionable",
    channel: "Email",
    subject: "Documents still needed for your application",
    body:
      "Hi [First Name],\n\nThese items are still waiting to be uploaded:\n\n[Outstanding Items]\n\nYou can add them here: [Secure Upload Link]\n\nItems already received for review are not included in this list. If you need help finding a document, reply without attachments or call [Broker Phone].\n\nThanks,\n" +
      signature,
    guard:
      "Fresh list at send time. No message for an empty list, paused case, recent reply or prohibited channel.",
  },
  {
    id: "M03",
    title: "One gentle check-in",
    step: "DC-04.send",
    when: "Draft: 4 business days after M02; SMS only if allowed",
    channel: "SMS",
    body: "Hi [First Name], it is [Broker Name]. Your remaining document checklist is here: [Secure Upload Link]. Need help finding an item? Call [Broker Phone]. Reply STOP to stop texts.",
    guard:
      "Use email alternative M02 if SMS is unavailable and permitted. Never send both channels for this attempt. Check expanded length and sender identity.",
  },
  {
    id: "M04",
    title: "Hand back to the broker",
    step: "DC-04.hold",
    when: "Draft: 5 business days after the second reminder, if still outstanding",
    channel: "Internal task",
    body: "Document follow-up has reached the proposed two-reminder cap. Review the current checklist, recent replies and any sensitive circumstances. Contact the client personally, pause or close the case. Do not automatically restart the sequence.",
    guard:
      "Assign an actual owner. Reopening an item does not reset the recipient contact budget.",
  },
  {
    id: "M05",
    title: "Receipt acknowledgement",
    step: "DC-03.received",
    when: "After saved ready-for-review submission; deduplicate by submission",
    channel: "Email",
    subject: "Your upload has been received",
    body:
      "Hi [First Name],\n\nWe have received this upload:\n\n[Received Items]\n\nYour broker will review it and let you know if anything needs to be replaced. Your checklist shows any other items still waiting to be uploaded: [Secure Upload Link]\n\nThanks,\n" +
      signature,
    guard:
      "Receipt is not acceptance. Never say the whole pack is complete after one file. Combine rapid uploads into one acknowledgement where feasible.",
  },
  {
    id: "M06",
    title: "Specific replacement request",
    step: "DC-05.replace",
    when: "After the broker commits a replacement decision",
    channel: "Email",
    subject: "A replacement document is needed",
    body:
      "Hi [First Name],\n\nPlease open your checklist for the item that needs replacing and the broker’s instructions:\n\n[Secure Upload Link]\n\nYour other documents keep their current status. If you need help with the request, reply without attachments or call [Broker Phone].\n\nThanks,\n" +
      signature,
    guard:
      "Show the exact request and neutral reason inside the private checklist. Avoid sensitive account details in messages. Coordinate with the next reminder.",
  },
  {
    id: "M07",
    title: "Selected pack accepted",
    step: "DC-05.complete",
    when: "After every active selected request is accepted; once per revision",
    channel: "Email",
    subject: "Your document checklist is complete",
    body:
      "Hi [First Name],\n\nYour broker has reviewed and accepted the documents on this checklist. There is nothing further to upload for this set of requests.\n\nYour broker will contact you about the next step. This confirms document collection only; it is not a loan approval.\n\nThanks,\n" +
      signature,
    guard:
      "Only after the accepted aggregate is true. Additional requirements later create a reviewed amendment, not a false original completion.",
  },
];
export const placeholders = [
  [
    "[First Name]",
    "Recipient first name",
    "Template registry maps provisionally to {{contact.first_name}}; verify in target GHL.",
  ],
  [
    "[Broker Name]",
    "Assigned broker display name",
    "Registry {{user.name}} is proposed. Verify assignment is the correct broker.",
  ],
  [
    "[Broker Phone]",
    "Approved operational contact",
    "Verify exact CRM merge field and populated value.",
  ],
  [
    "[Credit Licence Details]",
    "Approved sender footer",
    "Required operational footer; no branding setup product. Mapping not yet verified.",
  ],
  [
    "[Loan Purpose]",
    "Recipient-safe case description",
    "Mapped from the confirmed request set; never another opportunity.",
  ],
  [
    "[Outstanding Items]",
    "Fresh recipient + loan-scoped actionable list",
    "Composer output, not a static contact tag or old invitation list. Include label, subject and locked period.",
  ],
  [
    "[Secure Upload Link]",
    "Private link for this recipient and case",
    "Existing token reused; override broad template meaning with verified request-specific scope.",
  ],
  [
    "[Received Items]",
    "Items in this committed submission",
    "New local token. No assumption that the full pack has arrived.",
  ],
];
