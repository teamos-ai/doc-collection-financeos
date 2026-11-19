import { useState } from "react";
import {
  initialIntake,
  incomeOptions,
  previewRequests,
  incomeRoutes,
  constructionStages,
  isSelfEmployed,
  reviewIssues,
  unchangedRequestIds,
  type Intake,
  type Applicant,
  type Liability,
} from "./intake";
export function IntakeForm({ openFlow }: { openFlow: (id: string) => void }) {
  const [form, setForm] = useState<Intake>(initialIntake);
  const [held, setHeld] = useState<Record<string, string>>({});
  const [excluded, setExcluded] = useState<Set<string>>(new Set());
  const [confirmed, setConfirmed] = useState(false);
  const requests = previewRequests(form);
  const issues = reviewIssues(form);
  const selected = requests.filter((r) => !excluded.has(r.id));
  const actionable = selected.filter(
    (r) => !held[r.id] || held[r.id] === "Request from client",
  );
  const tags = [...new Set(actionable.map((r) => "fos-doc-needed-" + r.key))];
  const heldReview = selected.some(
    (r) => held[r.id] === "Already held · awaiting review",
  );
  const change = (f: Intake) => {
    const retained = unchangedRequestIds(form, f);
    setHeld((old) => Object.fromEntries(Object.entries(old).filter(([id]) => retained.has(id))));
    setExcluded((old) => new Set([...old].filter((id) => retained.has(id))));
    setForm(f);
    setConfirmed(false);
  };
  const applicant = (id: string, patch: Partial<Applicant>) =>
    change({
      ...form,
      applicants: form.applicants.map((a) =>
        a.id === id ? { ...a, ...patch } : a,
      ),
    });
  const liability = (id: string, patch: Partial<Liability>) =>
    change({
      ...form,
      liabilities: form.liabilities.map((l) =>
        l.id === id ? { ...l, ...patch } : l,
      ),
    });
  const toggle = (list: string[], v: string) =>
    list.includes(v) ? list.filter((x) => x !== v) : [...list, v];
  return (
    <div className="dc-intake">
      <div className="dc-intake-intro">
        <div>
          <span className="dc-overline">DC-01 · broker intake</span>
          <h3>Request documents for this loan</h3>
          <p>
            This form demonstrates the proposed intake and resulting tags. It
            does not save client details, send messages or connect to GHL.
          </p>
        </div>
        <button className="dc-button" onClick={() => openFlow("DC-01")}>
          View intake logic →
        </button>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setConfirmed(true);
        }}
      >
        <fieldset>
          <legend>1 · Loan and scenario</legend>
          <div className="dc-form-grid">
            <label>
              Loan reference
              <input
                required
                value={form.loan}
                onChange={(e) => change({ ...form, loan: e.target.value })}
              />
            </label>
            <label>
              Assigned broker
              <input
                required
                value={form.broker}
                onChange={(e) => change({ ...form, broker: e.target.value })}
              />
            </label>
            <label>
              Property use
              <select
                value={form.propertyUse}
                onChange={(e) =>
                  change({ ...form, propertyUse: e.target.value })
                }
              >
                <option>Owner occupied</option>
                <option>Investment</option>
              </select>
            </label>
          </div>
          <div className="dc-form-checks">
            {["Purchase", "Refinance", "Construction"].map((p) => (
              <label key={p}>
                <input
                  type="checkbox"
                  checked={form.purposes.includes(p)}
                  onChange={() =>
                    change({ ...form, purposes: toggle(form.purposes, p) })
                  }
                />
                {p}
              </label>
            ))}
          </div>
          {form.purposes.includes("Purchase") && (
            <label className="dc-form-check">
              <input
                type="checkbox"
                checked={form.contractAvailable}
                onChange={(e) =>
                  change({ ...form, contractAvailable: e.target.checked })
                }
              />
              Signed purchase contract is available
            </label>
          )}
          {form.purposes.includes("Construction") && (
            <label className="dc-entity-field">
              Construction stage
              <select value={form.constructionStage ?? "Review first"} onChange={(e) => change({ ...form, constructionStage: e.target.value as Intake["constructionStage"] })}>
                {constructionStages.map((stage) => <option key={stage}>{stage}</option>)}
              </select>
              <small>Only the current stage generates requests. Owner-builder, contract age and lender-specific requirements need review.</small>
            </label>
          )}
          <label className="dc-form-check">
            <input
              type="checkbox"
              checked={form.savings}
              onChange={(e) => change({ ...form, savings: e.target.checked })}
            />
            Savings contribute to the deposit
          </label>
        </fieldset>
        <fieldset>
          <legend>2 · Applicants and income</legend>
          {form.applicants.map((a, i) => (
            <section className="dc-applicant" key={a.id}>
              <h4>Applicant {i + 1}</h4>
              <div className="dc-form-grid">
                <label>
                  Applicant name
                  <input
                    required
                    value={a.name}
                    onChange={(e) => applicant(a.id, { name: e.target.value })}
                  />
                </label>
                <label>
                  Applicant email
                  <input
                    required
                    type="email"
                    autoComplete="off"
                    placeholder="name@example.test"
                    value={a.email}
                    onChange={(e) => applicant(a.id, { email: e.target.value })}
                  />
                </label>
                <label>
                  Applicant mobile
                  <input
                    type="tel"
                    autoComplete="off"
                    value={a.mobile}
                    onChange={(e) =>
                      applicant(a.id, { mobile: e.target.value })
                    }
                  />
                </label>
              </div>
              <div className="dc-form-checks">
                {incomeOptions.map((x) => (
                  <label key={x}>
                    <input
                      type="checkbox"
                      checked={a.income.includes(x)}
                      onChange={() =>
                        applicant(a.id, { income: toggle(a.income, x) })
                      }
                    />
                    {x}
                  </label>
                ))}
              </div>
              {isSelfEmployed(a) && (
                <label className="dc-entity-field">
                  Self-employed evidence route
                  <select value={a.incomeRoute ?? "Review first"} onChange={(e) => applicant(a.id, { incomeRoute: e.target.value as Applicant["incomeRoute"] })}>
                    {incomeRoutes.map((route) => <option key={route}>{route}</option>)}
                  </select>
                  <small>Choose one illustrative route after checking the contributing entity and lender policy. This does not assess eligibility. Reduced-document routes do not stack the standard pack.</small>
                </label>
              )}
              {a.income.includes("PAYG — casual") && (
                <label className="dc-form-check">
                  <input
                    type="checkbox"
                    checked={a.ytdCoversHistory ?? false}
                    onChange={(e) =>
                      applicant(a.id, { ytdCoversHistory: e.target.checked })
                    }
                  />
                  Payslip YTD already establishes 6 months of income history
                </label>
              )}
              {a.income.some((x) => x.startsWith("PAYG")) && (
                <label className="dc-form-check">
                  <input
                    type="checkbox"
                    checked={a.salaryMatch}
                    onChange={(e) =>
                      applicant(a.id, { salaryMatch: e.target.checked })
                    }
                  />
                  Match salary deposits to payslips
                </label>
              )}
              {a.income.some((x) =>
                [
                  "Company income",
                  "Partnership income",
                  "Trust income",
                ].includes(x),
              ) && (
                <label className="dc-entity-field">
                  Company / partnership / trust name
                  <input
                    value={a.entity}
                    placeholder="Entity for this income source"
                    onChange={(e) =>
                      applicant(a.id, { entity: e.target.value })
                    }
                  />
                </label>
              )}
            </section>
          ))}
          <button
            className="dc-button"
            type="button"
            onClick={() =>
              change({
                ...form,
                applicants: [
                  ...form.applicants,
                  {
                    id: crypto.randomUUID(),
                    name: "",
                    email: "",
                    mobile: "",
                    income: [],
                    salaryMatch: false,
                    entity: "",
                  },
                ],
              })
            }
          >
            + Add applicant
          </button>
        </fieldset>
        <fieldset>
          <legend>3 · Each account, its own treatment</legend>
          <p className="dc-caption">
            Use account labels here. One card can be retained while another is
            consolidated.
          </p>
          {form.liabilities.map((l) => (
            <div className="dc-liability" key={l.id}>
              <label>
                Account label
                <input
                  required
                  value={l.label}
                  onChange={(e) => liability(l.id, { label: e.target.value })}
                />
              </label>
              <label>
                Applicant
                <select
                  value={l.applicant}
                  onChange={(e) =>
                    liability(l.id, { applicant: e.target.value })
                  }
                >
                  {form.applicants.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name || "Unnamed applicant"}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Account type
                <select
                  value={l.type}
                  onChange={(e) =>
                    liability(l.id, {
                      type: e.target.value as Liability["type"],
                      treatment: "Retained",
                    })
                  }
                >
                  <option>Home loan</option>
                  <option>Credit card</option>
                </select>
              </label>
              <label>
                Treatment
                <select
                  value={l.treatment}
                  onChange={(e) =>
                    liability(l.id, {
                      treatment: e.target.value as Liability["treatment"],
                    })
                  }
                >
                  <option>Retained</option>
                  {l.type === "Credit card" ? (
                    <option>Consolidated</option>
                  ) : (
                    <option>Refinance</option>
                  )}
                </select>
              </label>
              <button
                className="dc-button"
                type="button"
                aria-label={"Remove " + l.label}
                onClick={() =>
                  change({
                    ...form,
                    liabilities: form.liabilities.filter((x) => x.id !== l.id),
                  })
                }
              >
                ×
              </button>
            </div>
          ))}
          <button
            className="dc-button"
            type="button"
            onClick={() =>
              change({
                ...form,
                liabilities: [
                  ...form.liabilities,
                  {
                    id: crypto.randomUUID(),
                    label: "",
                    applicant: form.applicants[0].id,
                    type: "Credit card",
                    treatment: "Retained",
                  },
                ],
              })
            }
          >
            + Add account
          </button>
        </fieldset>
        <fieldset>
          <legend>4 · Review and tick the documents</legend>
          {issues.length > 0 && <div className="dc-note" role="status"><b>Review before issue</b><ul>{issues.map((issue) => <li key={issue}>{issue}</li>)}</ul></div>}
          <p className="dc-caption">
            Periods are locked. Confirmed standards are founder decisions;
            proposed standards need approval before live use. This demonstrator
            covers the main scenarios; the full 70-item catalogue is available
            on this board. Record already-held evidence only after checking
            subject, period and file linkage.
          </p>
          <p className="dc-caption">Keep coverage dates, required evidence, issue date and the freshness reference event separate. Ask for all pages and a matching transaction listing only where needed and accepted. Remove tax file numbers from copies before upload; automated redaction is not provided by this preview.</p>
          <div className="dc-tablewrap">
            <table>
              <thead>
                <tr>
                  <th>Request</th>
                  <th>Applicant / account</th>
                  <th>Locked requirement</th>
                  <th>Basis</th>
                  <th>Existing evidence</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((r) => (
                  <tr key={r.id}>
                    <td>
                      <label className="dc-form-check">
                        <input
                          type="checkbox"
                          checked={!excluded.has(r.id)}
                          onChange={() => {
                            setExcluded((old) => {
                              const n = new Set(old);
                              n.has(r.id) ? n.delete(r.id) : n.add(r.id);
                              return n;
                            });
                            setConfirmed(false);
                          }}
                        />
                        {r.title}
                      </label>
                      <small>{r.reason}</small>
                    </td>
                    <td>{r.subject}</td>
                    <td>{r.period}</td>
                    <td>
                      <span className={"dc-badge " + r.basis.toLowerCase()}>
                        {r.basis}
                      </span>
                    </td>
                    <td>
                      <label>
                        Handling for {r.title}
                        <select
                          value={held[r.id] ?? "Request from client"}
                          onChange={(e) => {
                            setHeld((v) => ({ ...v, [r.id]: e.target.value }));
                            setConfirmed(false);
                          }}
                        >
                          <option>Request from client</option>
                          <option>Already held · awaiting review</option>
                          <option>Already held · accepted</option>
                        </select>
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </fieldset>
        <div className="dc-form-footer">
          <button
            className="dc-button dc-primary"
            disabled={selected.length === 0 || form.purposes.length === 0}
            type="submit"
          >
            Confirm preview · {selected.length} requests
          </button>
          <span>No messages sent · no client data stored</span>
        </div>
      </form>
      <section className="dc-intake-result" aria-live="polite">
        <h3>
          {confirmed ? "Preview confirmed" : "Resulting workflow and tags"}
        </h3>
        <div className="dc-intake-path">
          DC-01 · Confirm intake → DC-02 · Create request set → DC-07 ·
          Reconcile tags → Invitation + DC-04 reminders
        </div>
        <p className="dc-caption">
          {confirmed
            ? "This is a preview only. A real issue stays blocked while any selected standard is unapproved. After approval, persist the scoped requests and linked held evidence; invite only for items still needing client action."
            : "The live flow begins only after broker confirmation and successful persistence. Draft changes send nothing."}
        </p>
        <div className="dc-tag-preview">
          {tags.map((tag) => (
            <code key={tag}>{tag}</code>
          ))}
          {actionable.length > 0 && <code>fos-docs-action-needed</code>}
          {heldReview && <code>fos-docs-review-needed</code>}
        </div>
        <p className="dc-caption">
          One credit-card tag can represent multiple account requests. Each
          request retains its own applicant, account, period and state.
        </p>
        <button className="dc-button" onClick={() => openFlow("DC-02")}>
          See what happens after confirmation →
        </button>
      </section>
    </div>
  );
}
