import { useState, useRef, useEffect } from "react";
import { IntakeForm } from "./IntakeForm";
import catalogue from "./catalogue.json";
import { WORKFLOWS, fields } from "./model";
import { scenarioRules, sources, namingAliases, gaps, researchCrossCheck, crossCheckFindings } from "./research";
import {
  tagOperations,
  buildOrder,
  fieldMappings,
  capabilityChecks,
  schemaFields,
  acceptanceCases,
  messages,
  placeholders,
} from "./buildSpec";
import {
  needsAction,
  recordUpload,
  reconcile,
  type DemoRequest,
} from "./requestState";
import { Badge, Icon, TagChips } from "./ui";
export type PanelName =
  | "intake"
  | "upload"
  | "catalogue"
  | "rules"
  | "tags"
  | "messages"
  | "build";
const titles: Record<PanelName, string> = {
  intake: "Broker intake preview",
  upload: "Upload → status → tags",
  catalogue: "Australian document catalogue",
  rules: "Scenario rules & source research",
  tags: "The tagging convention",
  messages: "Follow-up copy & timing",
  build: "Builder handoff",
};

function Catalogue() {
  const [q, setQ] = useState("");
  const [group, setGroup] = useState("All groups");
  const rows = catalogue.filter(
    (d) =>
      (group === "All groups" || d.group === group) &&
      (
        d.label +
        " " +
        d.description +
        " " +
        d.key +
        " " +
        (namingAliases[d.key] ?? []).join(" ")
      )
        .toLowerCase()
        .includes(q.toLowerCase()),
  );
  return (
    <>
      <p className="dc-lead">
        70 retained document types. A selectable catalogue, never an instruction
        to request everything.
      </p>
      <div className="dc-filter-row">
        <label>
          Find a document or alias
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Payslip, NOA, salary credits…"
          />
        </label>
        <label>
          Category
          <select value={group} onChange={(e) => setGroup(e.target.value)}>
            <option>All groups</option>
            {[...new Set(catalogue.map((d) => d.group))].map((g) => (
              <option key={g}>{g}</option>
            ))}
          </select>
        </label>
        <span aria-live="polite">{rows.length} items</span>
      </div>
      <div className="dc-tablewrap">
        <table>
          <thead>
            <tr>
              <th>Document & meaning</th>
              <th>Category / aliases</th>
              <th>Canonical needed tag</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((d) => (
              <tr key={d.key}>
                <td>
                  <b>{d.label}</b>
                  <p>{d.description}</p>
                </td>
                <td>
                  {d.group}
                  <p>
                    {namingAliases[d.key]?.join(" · ") ??
                      "Use the display name above."}
                  </p>
                </td>
                <td>
                  <code>{d.tag}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!rows.length && (
          <p>No matching document. Try a broader name or choose All groups.</p>
        )}
      </div>
      <div className="dc-note">
        ATO income statement, personal tax return, notice of assessment and BAS
        are different documents. BAS is not an IAS or ATO account ledger.
        “Group certificate” is a legacy alias, not the
        preferred label. Contract of sale keeps separate buying and selling
        purposes.
      </div>
    </>
  );
}
function Rules() {
  const [filter, setFilter] = useState("All rules");
  return (
    <>
      <p className="dc-lead">
        Keep the collection standard separate from each lender’s policy. No
        broker can edit the fixed periods.
      </p>
      <section className="dc-note" aria-label="Perplexity cross-check status">
        <b>Perplexity cross-check {researchCrossCheck.status.toLowerCase()} · {researchCrossCheck.date}</b>
        <p>{researchCrossCheck.summary}</p>
        <p>Report supplied by Tumai, dated {researchCrossCheck.reportDate}. The three founder statement durations and catalogue exclusions remain in force.</p>
      </section>
      <details className="dc-source">
        <summary>What changed after cross-checking · {crossCheckFindings.length} findings</summary>
        {crossCheckFindings.map((finding) => <article className="dc-gap" key={finding.id}>
          <span>{finding.id} · {finding.outcome}</span>
          <h4>{finding.topic}</h4><p>{finding.detail}</p>
          <small>Evidence: {finding.sources.join(" · ") || "Scope / unverified assessment claim"}</small>
        </article>)}
      </details>
      <div className="dc-note">
        <b>History ≠ quantity ≠ freshness.</b> Six months may arrive in one
        combined statement. A recent file does not prove six months’ coverage.
        Where accepted, pair an official statement with a matching transaction
        history to bridge missing dates. Freshness also needs a reference event,
        such as submission or formal approval; 30 days is not always one month.
        Other periods remain draft until approved.
      </div>
      <div className="dc-filter-row">
        <label>
          Show
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            {["All rules", "Founder standard", "Proposed", "Exception"].map(
              (v) => (
                <option key={v}>{v}</option>
              ),
            )}
          </select>
        </label>
      </div>
      <div className="dc-rule-cards">
        {scenarioRules
          .filter((r) => filter === "All rules" || r.basis === filter)
          .map((r) => (
            <article className="dc-rule-card" key={r.id}>
              <div className="dc-flex">
                <span className="dc-mono">{r.id}</span>
                <Badge text={r.basis} />
              </div>
              <h3>{r.scenario}</h3>
              <p>
                <b>{r.documents}</b>
              </p>
              <dl>
                <dt>Coverage</dt>
                <dd>{r.period}</dd>
                <dt>Quantity</dt>
                <dd>{r.quantity}</dd>
                <dt>Freshness</dt>
                <dd>{r.freshness}</dd>
              </dl>
              <p>{r.condition}</p>
              <div className="dc-source-links">
                {r.sources.length ? (
                  r.sources.map((id) => (
                    <a
                      key={id}
                      href={"#source-" + id}
                      onClick={(e) => {
                        e.preventDefault();
                        document
                          .getElementById("source-" + id)
                          ?.scrollIntoView({ block: "nearest" });
                      }}
                    >
                      {id}
                    </a>
                  ))
                ) : (
                  <span>
                    Founder decision / unresolved detail; no universal-bank
                    claim.
                  </span>
                )}
              </div>
            </article>
          ))}
      </div>
      <h3>Sources checked</h3>
      <p>
        Sources reviewed on 19–20 November 2026. Historical PDFs remain
        comparison material. Source detail and the independent cross-check are
        saved with the project.
      </p>
      {sources.map((s) => (
        <article className="dc-source" id={"source-" + s.id} key={s.id}>
          <div className="dc-flex">
            <b>
              {s.id} · {s.name}
            </b>
            <Badge text={s.status} />
          </div>
          <small>{s.date}</small>
          <p>{s.finding}</p>
          <a href={s.url} target="_blank" rel="noreferrer">
            {["HG", "AUSSIE"].includes(s.id)
              ? "Publisher website (local PDF recorded in handoff)"
              : "Open original source"}{" "}
            ↗
          </a>
        </article>
      ))}
      <h3>Decisions still needed before activation</h3>
      {gaps.map(([owner, detail], i) => (
        <div className="dc-gap" key={detail}>
          <span>
            G{String(i + 1).padStart(2, "0")} · {owner}
          </span>
          <p>{detail}</p>
        </div>
      ))}
    </>
  );
}
const initialRequests: DemoRequest[] = [
  {
    id: "card-a",
    loan: "EXAMPLE-01",
    contact: "sam",
    key: "credit-card-statements",
    label: "Sam · Card A · consolidated",
    period: "6 months",
    status: "Requested",
  },
  {
    id: "card-b",
    loan: "EXAMPLE-01",
    contact: "sam",
    key: "credit-card-statements",
    label: "Sam · Card B · retained",
    period: "3 months",
    status: "Requested",
  },
];
function UploadExample() {
  const [requests, setRequests] = useState<DemoRequest[]>(initialRequests);
  const [selected, setSelected] = useState("card-a");
  const [file, setFile] = useState(false);
  const [ready, setReady] = useState(true);
  const [otherLoan, setOtherLoan] = useState(false);
  const [notice, setNotice] = useState("");
  const active = requests.filter((r) => needsAction(r.status));
  const chosen = active.find((r) => r.id === selected) ?? active[0];
  const all = otherLoan
    ? [
        ...requests,
        {
          ...initialRequests[0],
          id: "other-loan",
          loan: "EXAMPLE-02",
          label: "Other loan · retained card",
          status: "Requested" as const,
        },
      ]
    : requests;
  const projection = reconcile(all, "sam", "credit-card-statements");
  function submit(saved: boolean) {
    if (!chosen || !file) return;
    const next = recordUpload(requests, chosen.id, saved, ready);
    setRequests(next);
    setNotice(
      saved
        ? ready
          ? "Saved. This item is awaiting broker review."
          : "Saved as partial. This item remains outstanding."
        : "Save failed. The request and tag are unchanged. Retry when ready.",
    );
    if (saved) setFile(false);
  }
  return (
    <>
      <p className="dc-lead">
        Try two cards with different periods. All records and files in this
        example are fictional.
      </p>
      <Badge text="Proposed receipt-pause behaviour" />
      <div className="dc-note">
        <b>Real upload instructions:</b> include all pages and the requested date
        range for the named account. A statement and matching transaction history
        can work together where accepted; file count alone proves nothing.
        Remove tax file numbers from copies before uploading. The builder must
        prove secure handling; this example does not redact or inspect real files.
      </div>
      <div className="dc-demo-grid">
        <section className="dc-demo-card">
          <h3>1 · Client uploads</h3>
          <label>
            Outstanding document
            <select
              aria-label="Outstanding document"
              value={chosen?.id ?? ""}
              disabled={!active.length}
              onChange={(e) => {
                setSelected(e.target.value);
                setFile(false);
                setNotice(
                  "Selection only. No document status or tag has changed.",
                );
              }}
            >
              {active.length ? (
                active.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.label} · {r.period}
                  </option>
                ))
              ) : (
                <option value="">No documents awaiting upload</option>
              )}
            </select>
          </label>
          <p className="dc-caption">
            Only actionable requests appear. Partial items stay; received items
            move to review.
          </p>
          <button
            className="dc-sample-file"
            disabled={!chosen}
            onClick={() => {
              setFile(true);
              setNotice("Sample file attached. Save is still required.");
            }}
          >
            <Icon name="document" />
            {file ? "example-statement.pdf attached" : "Attach a sample PDF"}
          </button>
          <label className="dc-check">
            <input
              type="checkbox"
              checked={ready}
              onChange={(e) => setReady(e.target.checked)}
            />{" "}
            This item is ready for broker review
          </label>
          <div className="dc-flex">
            <button
              className="dc-button dc-primary"
              disabled={!chosen || !file}
              onClick={() => submit(true)}
            >
              Save sample upload
            </button>
            <button
              className="dc-button"
              disabled={!chosen || !file}
              onClick={() => submit(false)}
            >
              Simulate failed save
            </button>
          </div>
          <p className="dc-demo-notice" role="status">
            {notice ||
              "Choose an item and attach the sample. No real documents are collected."}
          </p>
        </section>
        <section className="dc-demo-card">
          <h3>2 · Broker reviews</h3>
          {requests.map((r) => (
            <article className="dc-review-row" key={r.id}>
              <strong>{r.label}</strong>
              <span>
                {r.period} · {r.status}
              </span>
              {r.status === "Awaiting review" && (
                <div className="dc-flex">
                  <button
                    className="dc-button"
                    onClick={() =>
                      setRequests((prev) =>
                        prev.map((x) =>
                          x.id === r.id ? { ...x, status: "Accepted" } : x,
                        ),
                      )
                    }
                  >
                    Accept {r.id === "card-a" ? "A" : "B"}
                  </button>
                  <button
                    className="dc-button"
                    onClick={() => {
                      setRequests((prev) =>
                        prev.map((x) =>
                          x.id === r.id ? { ...x, status: "Replacement" } : x,
                        ),
                      );
                      setNotice(
                        "Replacement requested: sample reason is missing pages. Old evidence is retained.",
                      );
                    }}
                  >
                    Replace {r.id === "card-a" ? "A" : "B"}
                  </button>
                </div>
              )}
            </article>
          ))}
          <label className="dc-check">
            <input
              type="checkbox"
              checked={otherLoan}
              onChange={(e) => setOtherLoan(e.target.checked)}
            />{" "}
            Another loan still needs card statements
          </label>
        </section>
      </div>
      <section className="dc-projection" aria-live="polite">
        <h3>3 · DC-07 reconciles the contact</h3>
        <code>
          <b>{projection.needed ? "KEEP / ADD" : "REMOVE"}</b>{" "}
          fos-doc-needed-credit-card-statements
        </code>
        <p>
          {projection.needed
            ? "At least one relevant request still needs client action. Keep the shared type tag."
            : "No relevant card request needs client action. Remove the shared type tag; review can still be pending."}
        </p>
        <div className="dc-tag-operations">
          <code>
            {projection.action ? "ADD / KEEP" : "REMOVE"} fos-docs-action-needed
          </code>
          <code>
            {projection.review ? "ADD / KEEP" : "REMOVE"} fos-docs-review-needed
          </code>
        </div>
        <p>
          Current upload list: {active.length} · Awaiting review:{" "}
          {requests.filter((r) => r.status === "Awaiting review").length} ·
          Accepted: {requests.filter((r) => r.status === "Accepted").length}
        </p>
      </section>
      <button
        className="dc-button"
        onClick={() => {
          setRequests(initialRequests);
          setSelected("card-a");
          setFile(false);
          setOtherLoan(false);
          setNotice("Example reset.");
          setReady(true);
        }}
      >
        Reset example
      </button>
    </>
  );
}
function Tags() {
  return (
    <>
      <p className="dc-lead">
        One tag writer. One stable key per document type. Account, loan and
        period stay on the request.
      </p>
      <div className="dc-note">
        <code>fos-doc-needed-&lt;document-key&gt;</code>
        <p>
          Example: <code>fos-doc-needed-credit-card-statements</code>. Never
          create separate 3-month, 6-month, Card A or loan-specific versions.
        </p>
      </div>
      <div className="dc-tablewrap">
        <table>
          <thead>
            <tr>
              <th>Summary tag</th>
              <th>Add / keep when</th>
              <th>Remove when</th>
              <th>Read by</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <code>fos-docs-action-needed</code>
              </td>
              <td>
                Any Requested, Partial or Replacement request exists for this
                contact.
              </td>
              <td>No request requires client action.</td>
              <td>
                Broker queue; reminder eligibility still checks loan state.
              </td>
            </tr>
            <tr>
              <td>
                <code>fos-docs-review-needed</code>
              </td>
              <td>Any request is awaiting review.</td>
              <td>No receipt awaits review.</td>
              <td>Broker review queue.</td>
            </tr>
            <tr>
              <td>
                <code>fos-docs-paused</code>
              </td>
              <td>Any relevant request set is paused.</td>
              <td>No relevant set is paused.</td>
              <td>Visibility only; never global send suppression.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <h3>Type tag contract</h3>
      <p>
        <b>Writer:</b> DC-07 only. <b>Readers:</b> broker views and guarded
        workflow routing. <b>Add/keep:</b> at least one relevant type request
        needs action. <b>Remove:</b> none need action after committed state.
        Request-level status remains authoritative.
      </p>
      {WORKFLOWS.map((w) => (
        <section className="dc-tag-section" key={w.id}>
          <h3>
            {w.id} · {w.title}
          </h3>
          <TagChips operations={tagOperations[w.id]} />
        </section>
      ))}
      <h3>Canonical document tags</h3>
      <div className="dc-tag-index">
        {catalogue.map((d) => (
          <div key={d.key}>
            <b>{d.label}</b>
            <code>{d.tag}</code>
          </div>
        ))}
      </div>
    </>
  );
}
function Messages() {
  const [active, setActive] = useState("M01");
  const [copied, setCopied] = useState("");
  const m = messages.find((x) => x.id === active)!;
  return (
    <>
      <p className="dc-lead">
        Neutral borrower messages adapted from the supplied template library.
        Copy and cadence are drafts for approval, not activated sequences.
      </p>
      <div className="dc-note">
        <b>Proposed rhythm:</b> invitation → wait 3 business days → email
        reminder → wait 4 business days → one SMS or permitted email → wait 5
        business days → broker task. Two automated reminders maximum. Recheck at
        every send; a reply pauses the chase.
      </div>
      <div className="dc-message-layout">
        <nav aria-label="Message templates">
          {messages.map((x) => (
            <button
              key={x.id}
              aria-pressed={x.id === active}
              onClick={() => {
                setActive(x.id);
                setCopied("");
              }}
            >
              <small>
                {x.id} · {x.channel}
              </small>
              <strong>{x.title}</strong>
            </button>
          ))}
        </nav>
        <article className="dc-message">
          <div className="dc-flex">
            <Badge text="Draft" />
            <span className="dc-mono">{m.step}</span>
          </div>
          <h3>{m.title}</h3>
          <p>{m.when}</p>
          {m.subject && (
            <div className="dc-subject">
              <span>Subject</span>
              <b>{m.subject}</b>
            </div>
          )}
          <pre>{m.body}</pre>
          <button
            className="dc-button"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(
                  (m.subject ? "Subject: " + m.subject + "\n\n" : "") + m.body,
                );
                setCopied("Copied with placeholders intact.");
              } catch {
                setCopied(
                  "Copy unavailable here. Select the message text to copy it.",
                );
              }
            }}
          >
            <Icon name="copy" />
            Copy draft
          </button>
          <span role="status" className="dc-caption">
            {copied}
          </span>
          <div className="dc-note">
            <b>Send guard</b>
            <p>{m.guard}</p>
          </div>
        </article>
      </div>
      <h3>Placeholder handoff</h3>
      <p>
        Square brackets are the authoring convention. They are not assumed to be
        live CRM merge fields. A missing required value blocks sending.
      </p>
      <div className="dc-tablewrap">
        <table>
          <thead>
            <tr>
              <th>Exact token</th>
              <th>Meaning</th>
              <th>Mapping / verification</th>
            </tr>
          </thead>
          <tbody>
            {placeholders.map((r) => (
              <tr key={r[0]}>
                {r.map((v, i) => (
                  <td key={i}>{i === 0 ? <code>{v}</code> : v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
function Build({ onFlow }: { onFlow: (id: string) => void }) {
  return (
    <>
      <p className="dc-lead">
        Build in this order. Each item has a dependency and an observable
        completion check.
      </p>
      <div className="dc-note">
        This board specifies a manual GHL build. Native storage, private uploads
        and dynamic message composition still need proof in the intended
        account.
      </div>
      {buildOrder.map((b, i) => (
        <article className="dc-build-row" key={b.id}>
          <span className="dc-build-number">{i + 1}</span>
          <div>
            <span className="dc-overline">{b.id}</span>
            <h3>{b.title}</h3>
            <p>{b.detail}</p>
            <p>
              <b>Done when:</b> {b.done}
            </p>
            <div className="dc-flex">
              {b.flows.map((id) => (
                <button
                  className="dc-button"
                  key={id}
                  onClick={() => onFlow(id)}
                >
                  {id}
                </button>
              ))}
            </div>
          </div>
        </article>
      ))}
      <h3>Field → rule → action</h3>
      <div className="dc-tablewrap">
        <table>
          <thead>
            <tr>
              <th>Intake / event</th>
              <th>Proposed field</th>
              <th>Route</th>
              <th>Guard</th>
            </tr>
          </thead>
          <tbody>
            {fieldMappings.map((r) => (
              <tr key={r[0]}>
                {r.map((v, i) => (
                  <td key={i}>{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h3>Proposed field schema</h3>
      <p>
        These are logical names for the builder to map to real GHL fields and
        associations. They are not claimed live custom-field IDs.
      </p>
      <div className="dc-tablewrap">
        <table>
          <thead>
            <tr>
              <th>Record</th>
              <th>Field names</th>
              <th>Type / values</th>
              <th>Constraint</th>
            </tr>
          </thead>
          <tbody>
            {schemaFields.map((r) => (
              <tr key={r[1]}>
                {r.map((v, i) => (
                  <td key={i}>{i === 1 ? <code>{v}</code> : v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h3>Published GHL capabilities</h3>
      <p>
        Official documentation checked 19 November 2026. Availability does not
        prove this complete design works in the target account.
      </p>
      {capabilityChecks.map(([name, detail, url]) => (
        <article className="dc-source" key={name}>
          <b>{name}</b>
          <p>{detail}</p>
          <a href={url} target="_blank" rel="noreferrer">
            Read HighLevel documentation ↗
          </a>
        </article>
      ))}
      <h3>Record ownership</h3>
      <div className="dc-tablewrap">
        <table>
          <thead>
            <tr>
              <th>Record</th>
              <th>Fields</th>
              <th>Purpose</th>
            </tr>
          </thead>
          <tbody>
            {fields.map((r) => (
              <tr key={r[0]}>
                {r.map((v, i) => (
                  <td key={i}>{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h3>Future GHL acceptance pack</h3>
      <p>
        Run these with synthetic contacts after the manual build. They are test
        instructions, not claimed results.
      </p>
      <ol className="dc-acceptance">
        {acceptanceCases.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ol>
      <div className="dc-note">
        <b>Ownership:</b> Tumai approves remaining standards and copy. Builder
        implements and records target-account evidence. Audit together before
        client activation and after the first clean snapshot install.
      </div>
    </>
  );
}
export function Panels({
  panel,
  close,
  onFlow,
}: {
  panel: PanelName | null;
  close: () => void;
  onFlow: (id: string) => void;
}) {
  const body = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  useEffect(() => {
    if (panel) {
      if (body.current) body.current.scrollTop = 0;
      if (!returnFocus.current)
        returnFocus.current = document.activeElement as HTMLElement;
      heading.current?.focus();
    } else {
      returnFocus.current?.focus();
      returnFocus.current = null;
    }
  }, [panel]);
  return (
    <aside
      hidden={!panel}
      className="dc-resource-panel"
      aria-label={panel ? titles[panel] : "Builder resources"}
    >
      <div className="dc-inspector-head">
        <div>
          <span className="dc-overline">In-place builder resource</span>
          <h2 ref={heading} tabIndex={-1}>
            {panel ? titles[panel] : ""}
          </h2>
        </div>
        <button
          className="dc-icon-button"
          onClick={close}
          aria-label="Close resource"
        >
          <Icon name="close" />
        </button>
      </div>
      <div className="dc-panel-body" ref={body}>
        <div hidden={panel !== "intake"}>
          <IntakeForm openFlow={onFlow} />
        </div>
        <div hidden={panel !== "upload"}>
          <UploadExample />
        </div>
        <div hidden={panel !== "catalogue"}>
          <Catalogue />
        </div>
        <div hidden={panel !== "rules"}>
          <Rules />
        </div>
        <div hidden={panel !== "tags"}>
          <Tags />
        </div>
        <div hidden={panel !== "messages"}>
          <Messages />
        </div>
        <div hidden={panel !== "build"}>
          <Build onFlow={onFlow} />
        </div>
      </div>
    </aside>
  );
}
