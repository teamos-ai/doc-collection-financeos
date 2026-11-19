import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { createRoot } from "react-dom/client";
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  Handle,
  Position,
  MarkerType,
  useReactFlow,
  useNodesState,
  type Node,
  type NodeProps,
  type Edge,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { WORKFLOWS, overview, type Step, type Workflow } from "./model";
import { tagOperations, stepTagOperations, messages } from "./buildSpec";
import { Panels, type PanelName } from "./panels";
import { Badge, Icon, TagChips } from "./ui";
import logo from "./assets/logo.png";
import "./style.css";

const TagsContext = createContext(false);
type Selected = { flow: string; step?: string };
const stageNames = [
  "Broker intake",
  "Issue requests",
  "Client uploads",
  "Follow-up",
  "Broker review",
  "Case controls",
  "Tag reconciliation",
];
const offsets = WORKFLOWS.map((_, i) => ({
  x: (i % 2) * 2260,
  y: 980 + Math.floor(i / 2) * 860,
}));
const fullId = (flow: string, step: string) => flow + "." + step;
function FlowNode({ data, selected }: NodeProps) {
  const d = data as unknown as Step & {
    flow: string;
    reference: string;
    overview?: boolean;
  };
  const showTags = useContext(TagsContext);
  const ops = d.overview
    ? (tagOperations[d.id] ?? [])
    : stepTagOperations(d.flow, d.id);
  return (
    <div
      className={"dc-node dc-kind-" + d.kind + (selected ? " dc-selected" : "")}
    >
      <Handle type="target" position={Position.Left} id="left" />
      <Handle type="target" position={Position.Right} id="right-target" />
      <Handle type="target" position={Position.Top} id="top" />
      <Handle type="target" position={Position.Bottom} id="target-bottom" />
      <Handle type="source" position={Position.Top} id="source-top" />
      <div className="dc-node-top">
        <span className="dc-mono">{d.reference}</span>
        <Icon
          name={
            d.kind === "decision"
              ? "branch"
              : d.kind === "human"
                ? "person"
                : d.kind === "stop"
                  ? "check"
                  : "flow"
          }
        />
      </div>
      <strong>{d.title}</strong>
      <p>{d.summary}</p>
      <div className="dc-node-bottom">
        {showTags ? (
          <div className="dc-node-tags">
            {ops.slice(0, 2).map((o, i) => (
              <span key={i}>
                <b>{o.op}</b> {o.tag}
              </span>
            ))}
            {ops.length === 0 && <span>NONE · collection outcome</span>}
          </div>
        ) : (
          <>
            <Badge text={d.evidence} />
            <span className="dc-node-kind">
              {d.kind === "human"
                ? "Broker / client"
                : d.kind === "decision"
                  ? "Condition"
                  : d.kind === "stop"
                    ? "Exit / handoff"
                    : "Automation"}
            </span>
          </>
        )}
      </div>
      <Handle type="source" position={Position.Right} id="right" />
      <Handle type="source" position={Position.Bottom} id="bottom" />
    </div>
  );
}
function AreaNode({ data }: NodeProps) {
  return (
    <div className="dc-area-title">
      <span>{String(data.number).padStart(2, "0")}</span>
      <div>
        <small>
          {String(data.id)} · {String(data.role)}
        </small>
        <h2>{String(data.title)}</h2>
        <p>{String(data.note)}</p>
      </div>
    </div>
  );
}
const nodeTypes = { step: FlowNode, area: AreaNode };
function createGraph() {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  function add(w: Workflow, ox: number, oy: number, isOverview = false) {
    w.steps.forEach((s, i) =>
      nodes.push({
        id: fullId(w.id, s.id),
        type: "step",
        position: { x: s.x + ox, y: s.y + oy },
        data: {
          ...s,
          flow: w.id,
          reference: isOverview
            ? s.id === "done"
              ? "OUTCOME"
              : s.id
            : w.id + "." + String(i + 1).padStart(2, "0"),
          overview: isOverview,
        },
        style: { width: 320 },
        ariaLabel: `${w.id}.${s.id}: ${s.title}`,
      }),
    );
    w.links.forEach((l, i) => {
      const a = w.steps.find((s) => s.id === l.from)!,
        b = w.steps.find((s) => s.id === l.to)!;
      const vertical = a.x === b.x;
      const back = l.loop && b.x < a.x;
      edges.push({
        id: w.id + "-" + i,
        source: fullId(w.id, l.from),
        target: fullId(w.id, l.to),
        type: "smoothstep",
        sourceHandle:
          isOverview && l.label === "Replacement"
            ? "right"
            : back
              ? b.y > a.y
                ? "bottom"
                : "source-top"
              : vertical
                ? b.y > a.y
                  ? "bottom"
                  : "source-top"
                : "right",
        targetHandle:
          isOverview && l.label === "Replacement"
            ? "right-target"
            : back
              ? b.y > a.y
                ? "right-target"
                : "top"
              : vertical
                ? b.y > a.y
                  ? "top"
                  : "target-bottom"
                : "left",
        label:
          isOverview && l.label === "Suppress / resume"
            ? "Hold / resume"
            : l.label,
        style: {
          stroke: "var(--c-border-strong)",
          strokeWidth: 1.7,
          strokeDasharray: l.loop ? "6 5" : undefined,
        },
        labelStyle: {
          fontSize: 12,
          fontWeight: 600,
          fill: "var(--c-fg-muted)",
        },
        labelBgStyle: { fill: "var(--c-surface)" },
        labelBgPadding: [7, 5],
        markerEnd: { type: MarkerType.ArrowClosed, color: "#8591BC" },
      });
    });
  }
  const places: Record<string, [number, number]> = {
    "DC-01": [0, 0],
    "DC-02": [400, 0],
    "DC-03": [800, 0],
    "DC-05": [800, 280],
    done: [800, 560],
    "DC-06": [0, 280],
    "DC-04": [400, 280],
    "DC-07": [400, 560],
  };
  add(
    {
      ...overview,
      links: overview.links.filter(
        (l) => !["Upload link", "Receipt event"].includes(l.label ?? ""),
      ),
      steps: overview.steps.map((s) => ({
        ...s,
        x: places[s.id][0],
        y: places[s.id][1],
      })),
    },
    0,
    0,
    true,
  );
  WORKFLOWS.forEach((w, i) => {
    const o = offsets[i];
    nodes.push({
      id: w.id + "-area",
      type: "area",
      position: { x: o.x, y: o.y - 100 },
      data: {
        id: w.id,
        number: i + 1,
        title: w.title,
        note: w.sub,
        role:
          i === 0
            ? "Broker"
            : i === 2
              ? "Client + automation"
              : i === 4
                ? "Broker review"
                : "Automation",
      },
      selectable: false,
      draggable: false,
      focusable: false,
      style: { width: 1900, height: 100 },
    });
    add(w, o.x, o.y);
  });
  const bridges = [
    ["DC-01.confirm", "DC-02.confirmed", "Confirmed revision"],
    ["DC-02.invite", "DC-03.open", "Private upload link"],
    ["DC-02.invite", "DC-04.enrol", "One reminder sequence"],
    ["DC-03.received", "DC-05.queue", "Awaiting review"],
    ["DC-03.received", "DC-07.changed", "Committed receipt"],
    ["DC-05.replace", "DC-03.open", "Replacement required"],
    ["DC-05.accept", "DC-07.changed", "Review committed"],
    ["DC-06.sync", "DC-07.changed", "Control changed"],
  ];
  bridges.forEach(([a, b, label], i) =>
    edges.push({
      id: "bridge-" + i,
      source: a,
      target: b,
      sourceHandle: "bottom",
      targetHandle: "top",
      type: "smoothstep",
      label,
      style: { stroke: "#ADB6D2", strokeWidth: 1.5, strokeDasharray: "8 8" },
      labelStyle: { fontSize: 12, fill: "#474E5C" },
      labelBgStyle: { fill: "#fff" },
      markerEnd: { type: MarkerType.ArrowClosed, color: "#ADB6D2" },
    }),
  );
  return { nodes, edges };
}
function Inspector({
  selected,
  close,
  onSelect,
  onFocus,
  onPanel,
}: {
  selected: Selected;
  close: () => void;
  onSelect: (s: Selected) => void;
  onFocus: (id: string) => void;
  onPanel: (p: PanelName) => void;
}) {
  const heading = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    heading.current?.focus();
  }, [selected.flow, selected.step]);
  const workflow = WORKFLOWS.find((w) => w.id === selected.flow);
  const step = selected.step
    ? workflow?.steps.find((s) => s.id === selected.step)
    : null;
  if (!workflow) return null;
  const refs = step ? workflow.links.filter((l) => l.from === step.id) : [];
  const linkedMessages = step
    ? messages.filter((m) => m.step === fullId(workflow.id, step.id))
    : [];
  return (
    <aside className="dc-inspector" aria-label="Builder inspector">
      <div className="dc-inspector-head">
        <div>
          <span className="dc-overline">
            {workflow.id} {step ? "· " + step.id : "· workflow"}
          </span>
          <h2 ref={heading} tabIndex={-1}>
            {step?.title ?? workflow.title}
          </h2>
        </div>
        <button
          className="dc-icon-button"
          onClick={close}
          aria-label="Close inspector"
        >
          <Icon name="close" />
        </button>
      </div>
      <div className="dc-inspector-body">
        {step ? (
          <>
            <Badge text={step.evidence} />
            <p className="dc-lead">{step.summary}</p>
            {[
              ["Trigger / required context", step.trigger],
              ["Builder action", step.action],
              [
                "Request status",
                step.state ??
                  "Keep the current request state unless the action explicitly changes it.",
              ],
              ["Guard / failure behaviour", step.guard],
              ["Intended GHL action · verify in account", step.ghl],
            ].map(([label, text]) => (
              <section key={label}>
                <h3>{label}</h3>
                <p>{text}</p>
              </section>
            ))}
            <section>
              <h3>Tag operations · via DC-07</h3>
              <TagChips operations={stepTagOperations(workflow.id, step.id)} />
              {step.tags && <p className="dc-mono">Step effect: {step.tags}</p>}
            </section>
            <section>
              <h3>Next path</h3>
              {refs.length ? (
                refs.map((l) => (
                  <button
                    key={l.to}
                    className="dc-next"
                    onClick={() => onSelect({ flow: workflow.id, step: l.to })}
                  >
                    <span>{l.label ?? "Continue"}</span>
                    <strong>
                      {workflow.steps.find((s) => s.id === l.to)?.title}
                    </strong>
                    <Icon name="arrow" />
                  </button>
                ))
              ) : (
                <p>
                  Exit this logical workflow. Follow the handoff described
                  above; do not restart from contact tag changes.
                </p>
              )}
            </section>
            {linkedMessages.length > 0 && (
              <section>
                <h3>Message at this step</h3>
                {linkedMessages.map((m) => (
                  <p key={m.id}>
                    <b>
                      {m.id} · {m.title}
                    </b>
                    <br />
                    {m.when}
                  </p>
                ))}
                <button
                  className="dc-button"
                  onClick={() => onPanel("messages")}
                >
                  Read exact draft copy
                </button>
              </section>
            )}
            <button
              className="dc-button"
              onClick={() => onSelect({ flow: workflow.id })}
            >
              All steps in {workflow.id}
            </button>
          </>
        ) : (
          <>
            <Badge text="Proposed workflow" />
            <p className="dc-lead">{workflow.note}</p>
            <button
              className="dc-button dc-primary"
              onClick={() => onFocus(workflow.id)}
            >
              <Icon name="focus" /> Focus this logic on canvas
            </button>
            <section>
              <h3>Build steps</h3>
              {workflow.steps.map((s, i) => (
                <button
                  className="dc-step-row"
                  key={s.id}
                  onClick={() => onSelect({ flow: workflow.id, step: s.id })}
                >
                  <span className="dc-mono">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <strong>{s.title}</strong>
                    <small>{s.summary}</small>
                  </span>
                  <Icon name="arrow" />
                </button>
              ))}
            </section>
            <section>
              <h3>Tag contract</h3>
              <TagChips operations={tagOperations[workflow.id]} />
            </section>
            {workflow.id === "DC-01" && (
              <button className="dc-button" onClick={() => onPanel("intake")}>
                Try the broker intake
              </button>
            )}
          </>
        )}
      </div>
    </aside>
  );
}
function Board() {
  const g = useMemo(createGraph, []);
  const [nodes, , onNodesChange] = useNodesState(g.nodes);
  const [selected, setSelected] = useState<Selected | null>(null);
  const selectedNodeId = selected
    ? fullId(
        selected.step ? selected.flow : "overview",
        selected.step ?? selected.flow,
      )
    : null;
  const visualNodes = useMemo(
    () =>
      nodes.map((node) => ({ ...node, selected: node.id === selectedNodeId })),
    [nodes, selectedNodeId],
  );
  const [showTags, setShowTags] = useState(false);
  const [panel, setPanel] = useState<PanelName | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [activeArea, setActiveArea] = useState("overview");
  const [search, setSearch] = useState("");
  const fullRef = useRef<HTMLButtonElement>(null);
  const { fitView, getViewport, setViewport } = useReactFlow();
  const focus = useCallback(
    (id: string) => {
      setActiveArea(id);
      if (id === "all") {
        fitView({ padding: 0.08, duration: 0 });
        return;
      }
      const wanted =
        id === "overview"
          ? g.nodes.filter((n) => n.id.startsWith("overview."))
          : g.nodes.filter((n) => n.id.startsWith(id + "."));
      fitView({ nodes: wanted, padding: 0.12, duration: 0, maxZoom: 0.85 });
    },
    [fitView, g.nodes],
  );
  const choose = (s: Selected) => {
    setSelected(s);
    setPanel(null);
  };
  const closeInspector = () => {
    const id = selected
      ? selected.step
        ? fullId(selected.flow, selected.step)
        : fullId("overview", selected.flow)
      : "";
    setSelected(null);
    requestAnimationFrame(() =>
      document.querySelector<HTMLElement>(`[data-id="${id}"]`)?.focus(),
    );
  };
  const toggleFull = () => {
    const v = getViewport();
    setExpanded((x) => !x);
    requestAnimationFrame(() => setViewport(v, { duration: 0 }));
  };
  useEffect(() => {
    if (!expanded) return;
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = old;
    };
  }, [expanded]);
  useEffect(() => {
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (panel) setPanel(null);
        else if (selected) closeInspector();
        else if (expanded) {
          setExpanded(false);
          fullRef.current?.focus();
        }
      }
    };
    document.addEventListener("keydown", key);
    return () => document.removeEventListener("keydown", key);
  }, [panel, selected, expanded]);
  const results = search.trim()
    ? WORKFLOWS.flatMap((w) => w.steps.map((s) => ({ w, s })))
        .filter(({ w, s }) =>
          (w.id + " " + s.title + " " + s.action + " " + s.tags)
            .toLowerCase()
            .includes(search.toLowerCase()),
        )
        .slice(0, 8)
    : [];
  return (
    <div className={"dc-app" + (expanded ? " dc-expanded" : "")}>
      <header className="dc-header">
        <img src={logo} alt="Finance OS" />
        <span className="dc-header-divider" />
        <span className="dc-overline">Builder blueprint</span>
        <Badge text="New proposed" />
        <span className="dc-spacer" />
        <span className="dc-header-status">Specification · not a live CRM</span>
      </header>
      <div className="dc-title">
        <div>
          <span className="dc-overline">Application / Document collection</span>
          <h1>One checklist. The whole journey.</h1>
          <p>
            Explore the logic, test the forms and see exactly what your builder
            needs to create.
          </p>
        </div>
        <div className="dc-version">
          <span>
            {WORKFLOWS.length} workflows ·{" "}
            {WORKFLOWS.reduce((n, w) => n + w.steps.length, 0)} build steps
          </span>
          <span>Research cross-checked · 20 Nov 2026</span>
        </div>
      </div>
      <main className="dc-shell">
        <div className="dc-toolbar">
          <div className="dc-search">
            <Icon name="search" />
            <input
              aria-label="Find a workflow step"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Find a step or condition…"
            />
            {search && (
              <button aria-label="Clear search" onClick={() => setSearch("")}>
                <Icon name="close" />
              </button>
            )}
            {search && (
              <div className="dc-search-results">
                {results.length ? (
                  results.map(({ w, s }) => (
                    <button
                      key={fullId(w.id, s.id)}
                      onClick={() => {
                        choose({ flow: w.id, step: s.id });
                        setSearch("");
                      }}
                    >
                      <small>{w.id}</small>
                      {s.title}
                    </button>
                  ))
                ) : (
                  <p>No matching steps. Try “upload” or “card”.</p>
                )}
              </div>
            )}
          </div>
          <label className="dc-tag-toggle">
            <input
              type="checkbox"
              checked={showTags}
              onChange={(e) => setShowTags(e.target.checked)}
            />
            <span className="dc-switch" aria-hidden="true" />
            Show tags
          </label>
          <button className="dc-button" onClick={() => focus("overview")}>
            <Icon name="focus" /> Whole journey
          </button>
          <button className="dc-button dc-all" onClick={() => focus("all")}>
            See all logic
          </button>
          <span className="dc-spacer" />
          <button ref={fullRef} className="dc-button" onClick={toggleFull}>
            <Icon name={expanded ? "minimise" : "expand"} />
            {expanded ? "Exit full screen" : "Full screen"}
          </button>
        </div>
        <div className="dc-resourcebar" aria-label="Builder resources">
          {(
            [
              ["intake", "Broker intake", "form"],
              ["upload", "Upload example", "upload"],
              ["catalogue", "Document catalogue", "document"],
              ["rules", "Rules & research", "book"],
              ["tags", "Tag dictionary", "tag"],
              ["messages", "Email & SMS", "mail"],
              ["build", "Build guide", "check"],
            ] as [PanelName, string, string][]
          ).map(([id, label, icon]) => (
            <button
              key={id}
              aria-pressed={panel === id}
              onClick={() => setPanel(id)}
            >
              <Icon name={icon} />
              {label}
            </button>
          ))}
        </div>
        <div className="dc-workspace">
          <nav className="dc-stage-nav" aria-label="Canvas areas">
            <span className="dc-overline">Jump to logic</span>
            {WORKFLOWS.map((w, i) => (
              <button
                key={w.id}
                aria-current={activeArea === w.id ? "location" : undefined}
                onClick={() => {
                  focus(w.id);
                  setSelected(null);
                  setPanel(null);
                }}
                title={w.title}
                aria-label={
                  String(i + 1).padStart(2, "0") + " " + stageNames[i]
                }
              >
                <b>{String(i + 1).padStart(2, "0")}</b>
                <span>{stageNames[i]}</span>
              </button>
            ))}
            <div className="dc-nav-note">
              Click a step to inspect it.
              <br />
              The canvas stays in place.
            </div>
          </nav>
          <div
            className="dc-canvas"
            data-testid="persistent-canvas"
            onKeyDownCapture={(e) => {
              if (e.key !== "Enter" && e.key !== " ") return;
              const node = (e.target as HTMLElement).closest<HTMLElement>(
                ".react-flow__node-step",
              );
              if (node) {
                e.preventDefault();
                e.stopPropagation();
                node.click();
              }
            }}
          >
            <TagsContext.Provider value={showTags}>
              <ReactFlow
                nodes={visualNodes}
                edges={g.edges}
                onNodesChange={onNodesChange}
                onInit={() => requestAnimationFrame(() => focus("overview"))}
                onNodeClick={(_, n) => {
                  const d = n.data as {
                    flow: string;
                    id: string;
                    overview?: boolean;
                  };
                  if (d.overview) {
                    if (d.id === "done")
                      choose({ flow: "DC-05", step: "complete" });
                    else choose({ flow: d.id });
                  } else if (d.flow) choose({ flow: d.flow, step: d.id });
                }}
                nodeTypes={nodeTypes}
                minZoom={0.08}
                maxZoom={1.8}
                nodesConnectable={false}
                nodesDraggable={false}
                autoPanOnNodeFocus={false}
                deleteKeyCode={null}
                aria-label="Connected document collection canvas"
              >
                <Background
                  variant={BackgroundVariant.Dots}
                  gap={26}
                  size={2.2}
                  color="#ADB6D2"
                />
                <Controls
                  showInteractive={false}
                  onFitView={() => focus("overview")}
                />
                <MiniMap
                  pannable
                  zoomable
                  nodeColor={(n) => (n.type === "area" ? "#fff" : "#ADB6D2")}
                  maskColor="rgba(246,247,249,.75)"
                />
                <div className="dc-map-hint">
                  <span>Drag to pan · scroll to zoom</span>
                  <span>Solid: sequence · dashed: loop / handoff</span>
                </div>
              </ReactFlow>
            </TagsContext.Provider>
          </div>
          {selected && !panel && (
            <Inspector
              selected={selected}
              close={closeInspector}
              onSelect={choose}
              onFocus={focus}
              onPanel={setPanel}
            />
          )}
          <Panels
            panel={panel}
            close={() => setPanel(null)}
            onFlow={(id) => {
              setPanel(null);
              setSelected({ flow: id });
            }}
          />
        </div>
        <div className="dc-statusbar">
          <span>
            <b>Founder standard</b> · Home loan refinance 6m / consolidated card
            6m / retained card 3m
          </span>
          <span>No broker period override</span>
        </div>
      </main>
      <footer className="dc-footer">
        <span>
          Confirmed = founder decision · Proposed = draft behaviour ·
          Feasibility = prove in GHL
        </span>
        <span>Request records hold the detail. Tags reflect it.</span>
      </footer>
    </div>
  );
}
const root = createRoot(document.getElementById("fos-document-board")!);
root.render(
  <ReactFlowProvider>
    <Board />
  </ReactFlowProvider>,
);
if (import.meta.hot) import.meta.hot.dispose(() => root.unmount());
