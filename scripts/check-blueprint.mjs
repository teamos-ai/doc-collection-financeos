import assert from "node:assert/strict";
import { readFileSync, writeFileSync } from "node:fs";
import ts from "typescript";
async function load(file) {
  const js = ts.transpileModule(readFileSync(file, "utf8"), {
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ES2022,
    },
  }).outputText;
  return import(
    "data:text/javascript;base64," + Buffer.from(js).toString("base64")
  );
}
const { recordUpload, reconcile } = await load("src/requestState.ts");
const { WORKFLOWS } = await load("src/model.ts");
const { scenarioRules, sources, namingAliases, gaps } =
  await load("src/research.ts");
const {
  messages,
  placeholders,
  buildOrder,
  acceptanceCases,
  fieldMappings,
  capabilityChecks,
  schemaFields,
  tagOperations,
  stepTagOperations,
} = await load("src/buildSpec.ts");
const catalogue = JSON.parse(readFileSync("src/catalogue.json", "utf8"));
assert.equal(catalogue.length, 70);
assert.equal(new Set(catalogue.map((d) => d.key)).size, 70);
const retained = readFileSync(
  "docs/document-collection-catalogue-and-tags-2026-11-18.md",
  "utf8",
);
for (const d of catalogue)
  assert(
    retained.includes("`" + d.tag + "`"),
    "Unapproved catalogue key " + d.key,
  );
for (const key of Object.keys(namingAliases))
  assert(catalogue.some((d) => d.key === key));
for (const rule of scenarioRules)
  for (const id of rule.sources)
    assert(
      sources.some((s) => s.id === id),
      "Missing source " + id,
    );
assert.deepEqual(
  scenarioRules
    .filter((r) => r.basis === "Founder standard")
    .map((r) => r.period),
  ["6 continuous months", "6 continuous months", "3 continuous months"],
);
for (const m of messages) {
  assert(
    WORKFLOWS.some((w) => w.steps.some((s) => w.id + "." + s.id === m.step)),
    "Unlinked message " + m.id,
  );
  for (const token of m.body.match(/\[[^\]\n]+\]/g) ?? [])
    assert(
      placeholders.some((p) => p[0] === token),
      "Unmapped authoring token " + token,
    );
}
assert.equal(stepTagOperations("DC-03", "upload")[0].op, "KEEP");
assert.equal(stepTagOperations("DC-03", "received")[0].op, "RECOMPUTE");
assert.equal(stepTagOperations("DC-07", "remove")[0].op, "REMOVE");
let requests = [
  { id: "A", loan: "L1", contact: "C1", key: "card", status: "Requested" },
  { id: "B", loan: "L1", contact: "C1", key: "card", status: "Requested" },
];
assert.strictEqual(
  recordUpload(requests, "A", false, true),
  requests,
  "Failed save must not mutate requests",
);
requests = recordUpload(requests, "A", true, false);
assert.equal(requests[0].status, "Partial");
assert(reconcile(requests, "C1", "card").needed);
requests = recordUpload(requests, "A", true, true);
assert(reconcile(requests, "C1", "card").needed, "Other account still missing");
const replay = recordUpload(requests, "A", true, true);
assert.deepEqual(replay, requests, "Replay must not advance status");
requests = recordUpload(requests, "B", true, true);
assert(!reconcile(requests, "C1", "card").needed);
assert(reconcile(requests, "C1", "card").review);
assert(
  reconcile(
    [
      ...requests,
      { id: "C", loan: "L2", contact: "C1", key: "card", status: "Requested" },
    ],
    "C1",
    "card",
  ).needed,
  "Other loan keeps shared tag",
);
assert(
  !reconcile(
    [
      ...requests,
      { id: "C", loan: "L2", contact: "C2", key: "card", status: "Requested" },
    ],
    "C1",
    "card",
  ).needed,
  "Another contact must not affect this one",
);
requests[0] = { ...requests[0], status: "Replacement" };
assert(reconcile(requests, "C1", "card").needed);
requests[0] = { ...requests[0], status: "Withdrawn" };
assert(!reconcile(requests, "C1", "card").needed);
const { previewRequests, initialIntake } = await load("src/intake.ts");
const casual = structuredClone(initialIntake);
casual.applicants[0].income = ["PAYG — casual"];
assert(previewRequests(casual).some((r) => r.key === "ato-income"));
casual.applicants[0].ytdCoversHistory = true;
assert(
  !previewRequests(casual).some((r) => r.key === "ato-income"),
  "Do not duplicate already-covered history",
);
writeFileSync(
  "builder-handoff.json",
  JSON.stringify(
    {
      version: "2026-11-19.2",
      status: "proposed specification",
      catalogue,
      scenarioRules,
      sources,
      namingAliases,
      gaps,
      buildOrder,
      fieldMappings,
      capabilityChecks,
      schemaFields,
      tagOperations,
      messages,
      placeholders,
      acceptanceCases,
    },
    null,
    2,
  ) + "\n",
);
console.log(
  "Catalogue, evidence links, locked defaults, message mapping, upload failure/replay/partial/replacement and contact/loan isolation passed.",
);
