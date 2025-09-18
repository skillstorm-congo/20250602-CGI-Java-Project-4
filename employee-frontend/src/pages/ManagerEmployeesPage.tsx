import { useState } from "react";
import { findEmployeesByManagerId } from "../api/api";
import type { EmployeeType } from "../types/types";

export default function ManagerEmployeesPage() {
  const [managerId, setManagerId] = useState<string>("");
  const [rows, setRows] = useState<EmployeeType[]>([]);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function load() {
    setErr(null);
    setLoading(true);
    try {
      const res = await findEmployeesByManagerId(Number(managerId));
      setRows(res.data || []);
    } catch (e: any) {
      setErr(e?.response?.data?.message || e?.message || "Failed to load employees.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: "1rem" }}>
      <h1>My Team</h1>
      <div style={{ display: "flex", gap: ".5rem", alignItems: "end" }}>
        <label>
          <div>Manager ID</div>
          <input value={managerId} onChange={(e) => setManagerId(e.target.value)} />
        </label>
        <button onClick={load} disabled={!managerId || loading}>
          {loading ? "Loading..." : "Load team"}
        </button>
      </div>

      {err && <div style={{ marginTop: 12, background: "#ffe6e6", padding: 8 }}>{err}</div>}

      <table style={{ marginTop: 16, width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th align="left">ID</th>
            <th align="left">First</th>
            <th align="left">Last</th>
            <th align="left">Title</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(e => (
            <tr key={e.id}>
              <td>{e.id}</td>
              <td>{e.firstName}</td>
              <td>{e.lastName}</td>
              <td>{e.title}</td>
            </tr>
          ))}
          {rows.length === 0 && !loading && <tr><td colSpan={4}>No results.</td></tr>}
        </tbody>
      </table>
    </main>
  );
}