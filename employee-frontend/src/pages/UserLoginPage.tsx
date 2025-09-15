import { useState } from "react";
import { useNavigate } from "react-router"
import type { UserType } from "../types/types";
import { login } from "../api/api";

export const UserLogin = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPw, setShowPw] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const me: UserType = await login(username.trim(), password);
            sessionStorage.setItem("user", JSON.stringify(me)); // simple persistence
            navigate("/"); // send them to your HomePage
            } catch (err: any) {
                const status = err?.response?.status;
                if (status === 401) setError("Invalid username or password.");
                else setError(err?.response?.data?.message || "Login failed. Please try again.");
            } finally {
                setLoading(false);
            }
        }

        return (
            <div style={wrap}>
                <form onSubmit={handleSubmit} style={card}>
                    <h1 style={{ marginTop: 0, marginBottom: ".75rem" }}>Sign in</h1>
                    <p style={{ marginTop: 0, color: "#666" }}>Use your project credentials. Cookies will keep you signed in.</p>
            
                     <label style={label}>
                        <span>Username</span>
                        <input style={input} 
                            autoFocus type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            placeholder="e.g. user1" 
                            required/>
                    </label>
                    <label style={label}>
                        <span>Password</span>
                        <div style={{ position: "relative" }}>
                            <input
                                style={{ ...input, paddingRight: "3rem" }}
                                type={showPw ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Your password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPw((v) => !v)}
                                style={eyeBtn}
                                aria-label={showPw ? "Hide password" : "Show password"}
                            >
                                {showPw ? "Hide" : "Show"}
                            </button>
                        </div>
                    </label>

                    {error && (
                        <div style={errBox}>
                            {error}
                        </div>
                    )}

                    <button type="submit" disabled={loading} style={primaryBtn}>
                        {loading ? "Signing in..." : "Sign in"}
                    </button>
                </form>
            </div>
        );
}

/* tiny inline styles to keep it self-contained */
const wrap: React.CSSProperties = {
  minHeight: "100vh",
  display: "grid",
  placeItems: "center",
  padding: "2rem",
  background: "linear-gradient(180deg,#f6f8fb,#eef1f5)",
};

const card: React.CSSProperties = {
  width: "100%",
  maxWidth: 420,
  background: "#fff",
  border: "1px solid #e6e9ee",
  borderRadius: 12,
  padding: "1.25rem 1.25rem 1.5rem",
  boxShadow: "0 8px 24px rgba(0,0,0,.06)",
};

const label: React.CSSProperties = {
  display: "grid",
  gap: ".4rem",
  marginBottom: ".9rem",
};

const input: React.CSSProperties = {
  border: "1px solid #cfd6e4",
  borderRadius: 8,
  padding: ".6rem .7rem",
  fontSize: "1rem",
  outline: "none",
} as const;

const eyeBtn: React.CSSProperties = {
  position: "absolute",
  right: 6,
  top: 6,
  padding: ".35rem .55rem",
  borderRadius: 6,
  border: "1px solid #d6d9e0",
  background: "#f7f8fa",
  cursor: "pointer",
};

const errBox: React.CSSProperties = {
  background: "#ffe9e9",
  border: "1px solid #ffc6c6",
  color: "#a40000",
  padding: ".6rem .7rem",
  borderRadius: 8,
  margin: ".5rem 0 .25rem",
  fontSize: ".95rem",
};

const primaryBtn: React.CSSProperties = {
  width: "100%",
  padding: ".7rem .9rem",
  borderRadius: 8,
  border: "1px solid #234",
  background: "#2b5cff",
  color: "white",
  fontWeight: 600,
  cursor: "pointer",
};