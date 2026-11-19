export type RequestStatus =
  | "Requested"
  | "Partial"
  | "Awaiting review"
  | "Accepted"
  | "Replacement"
  | "Withdrawn";
export type DemoRequest = {
  id: string;
  loan: string;
  contact: string;
  key: string;
  label: string;
  period: string;
  status: RequestStatus;
};
export const needsAction = (status: RequestStatus) =>
  ["Requested", "Partial", "Replacement"].includes(status);
export function reconcile(
  requests: DemoRequest[],
  contact: string,
  key: string,
) {
  const relevant = requests.filter((r) => r.contact === contact);
  return {
    needed: relevant.some((r) => r.key === key && needsAction(r.status)),
    action: relevant.some((r) => needsAction(r.status)),
    review: relevant.some((r) => r.status === "Awaiting review"),
  };
}
export function recordUpload(
  requests: DemoRequest[],
  id: string,
  saved: boolean,
  ready: boolean,
) {
  if (!saved) return requests;
  return requests.map((r) =>
    r.id === id && needsAction(r.status)
      ? {
          ...r,
          status: (ready ? "Awaiting review" : "Partial") as RequestStatus,
        }
      : r,
  );
}
