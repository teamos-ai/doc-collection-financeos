import type { TagOperation } from "./buildSpec";
export function Badge({ text }: { text: string }) {
  return (
    <span className={"dc-badge " + text.toLowerCase().replaceAll(" ", "-")}>
      {text}
    </span>
  );
}
export function TagChips({ operations }: { operations: TagOperation[] }) {
  return (
    <div className="dc-tag-operations">
      {operations.map((o, i) => (
        <div key={i}>
          <code>
            <b>{o.op}</b> {o.tag}
          </code>
          <p>{o.why}</p>
        </div>
      ))}
    </div>
  );
}
const paths: Record<string, string> = {
  close: "m6 6 12 12M6 18 18 6",
  arrow: "M4 12h15m-5-5 5 5-5 5",
  search: "M21 21l-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0",
  expand: "M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5",
  minimise: "M3 8h5V3m8 0v5h5M8 21v-5H3m13 5v-5h5",
  focus: "M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5M8 12h8m-4-4v8",
  branch: "M12 3v5m0 0H5v5m7-5h7v5M3 14h4v6H3zm14 0h4v6h-4z",
  person: "M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0M4 21v-3a8 8 0 0 1 16 0v3",
  check: "m5 12 4 4L19 6",
  flow: "M3 3h7v6H3zm11 12h7v6h-7zM6 9v9h8",
  form: "M5 3h14v18H5zM8 7h8M8 11h8M8 15h4",
  upload: "M12 16V3m-5 5 5-5 5 5M4 15v6h16v-6",
  document: "M5 3h9l5 5v13H5zM14 3v6h5M8 13h8M8 17h6",
  book: "M12 5v16M3 3l9 2 9-2v16l-9 2-9-2z",
  tag: "m3 3 8 0 10 10-8 8L3 11zM7 7h.01",
  mail: "M3 5h18v14H3zM3 5l9 7 9-7",
  copy: "M8 8h12v13H8zM4 16H2V2h12v2",
};
export function Icon({ name }: { name: string }) {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={paths[name] ?? paths.flow} />
    </svg>
  );
}
