import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { TimesheetType } from "../types/types";
import { useUserScope } from "../context/UserScope";
import { findByManagerIdTimesheet } from "../api/api";

export default function ManagerPendingTimesheets() {
  const { scope } = useUserScope();
  const managerId = Number(scope.id);

  const [rows, setRows] = useState<TimesheetType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (scope.role !== "MANAGER" || !Number.isFinite(managerId)) return;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await findByManagerIdTimesheet(managerId);
        const all: TimesheetType[] = Array.isArray(res?.data) ? res.data : [];
        const pending = all.filter(ts => ts.submitted === true && ts.approved !== true);
        setRows(pending);
      } catch (e: any) {
        setError(e?.response?.data?.message || e?.message || "Failed to load manager pending timesheets.");
      } finally {
        setLoading(false);
      }
    })();
  }, [scope.role, managerId]);

  if (scope.role !== "MANAGER") {
    return (
      <div style={{ padding: "1rem" }}>
        <strong>This view is for Managers only.</strong>
      </div>
    );
  }
  if (!Number.isFinite(managerId)) {
    return (
      <div style={{ padding: "1rem" }}>
        Set your scope to <strong>Manager</strong> and enter your Manager ID (top-right).
      </div>
    );
  }

  return (
    <section style={{ padding: "1rem" }}>
      <h1>Pending Approvals (Your Team)</h1>
      {error && <Box kind="err">{error}</Box>}
      {loading && <Box kind="ok">Loading…</Box>}

      <div style={{ margin: ".5rem 0", fontSize: 14, opacity: 0.8 }}>
        Showing timesheets where <code>submitted = true</code> and <code>approved ≠ true</code>.
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 900 }}>
          <thead>
            <tr>
              <Th>ID</Th>
              <Th>Employee</Th>
              <Th>Week</Th>
              <Th>Start</Th>
              <Th>End</Th>
              <Th>Submitted</Th>
              <Th>Approved</Th>
              <Th></Th>
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.id}>
                <Td>{r.id}</Td>
                <Td>{r.employeeId}</Td>
                <Td>{r.fiscalYearFiscalWeek ?? ""}</Td>
                <Td>{fmtDate(r.dateStart)}</Td>
                <Td>{fmtDate(r.dateEnd)}</Td>
                <Td style={{ textAlign: "center" }}>{r.submitted ? "✓" : ""}</Td>
                <Td style={{ textAlign: "center" }}>{r.approved ? "✓" : ""}</Td>
                <Td>
                  {/* send managers to a read/approve page you already have, or your Update page if that’s where approval happens */}
                  <Link to={`/timesheet/${r.id}/update`}><button>Open</button></Link>
                </Td>
              </tr>
            ))}
            {!loading && rows.length === 0 && (
              <tr>
                <Td colSpan={8} style={{ textAlign: "center", padding: "1rem" }}>
                  No pending approvals found for your team.
                </Td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function fmtDate(d: any) {
  if (!d) return "";
  const s = typeof d === "string" ? d : new Date(d).toISOString();
  return s.slice(0, 10);
}
const Th = (p: any) => <th {...p} style={{ textAlign:"left", padding:".5rem", borderBottom:"2px solid #ccc", background:"#f6f7f8", ...p.style }} />;
const Td = (p: any) => <td {...p} style={{ padding:".5rem", borderBottom:"1px solid #eee", ...p.style }} />;
function Box({ kind, children }: { kind: "ok" | "err"; children: React.ReactNode }) {
  const style =
    kind === "ok"
      ? { background: "#e6f7ff", border: "1px solid #b3e0ff", padding: ".75rem", marginTop: ".75rem" }
      : { background: "#ffe6e6", border: "1px solid #ffb3b3", padding: ".75rem", marginTop: ".75rem" };
  return <div style={style}>{children}</div>;
}