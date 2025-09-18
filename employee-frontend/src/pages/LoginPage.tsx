import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const nav = useNavigate();
  const loc = useLocation();
  const from = (loc.state as any)?.from?.pathname || "/";

  const [form, setForm] = useState({ username: "", password: "" });
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      await login(form.username.trim(), form.password);
      nav(from, { replace: true });
    } catch (ex: any) {
      setErr(ex?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: "56px auto", padding: 16 }}>
      <h1 style={{ marginBottom: 16 }}>Sign in</h1>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <label style={{ display: "grid", gap: 4 }}>
          <span>Username</span>
          <input
            value={form.username}
            onChange={(e) => setForm((s) => ({ ...s, username: e.target.value }))}
            autoComplete="username"
            required
          />
        </label>

        <label style={{ display: "grid", gap: 4 }}>
          <span>Password</span>
          <input
            type="password"
            value={form.password}
            onChange={(e) => setForm((s) => ({ ...s, password: e.target.value }))}
            autoComplete="current-password"
            required
          />
        </label>

        {err && <p style={{ color: "crimson", margin: 0 }}>{err}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}