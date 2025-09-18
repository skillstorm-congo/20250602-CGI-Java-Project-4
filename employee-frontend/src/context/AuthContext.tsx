import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import * as api from "../api/api";

// Keep this aligned with what your backend returns at /user/employeeUser
export type User = {
  id: number;
  employeeId: number;
  username: string;
  role: string; // "USER" | "ADMIN"
};

type AuthState = {
  user: User | null;
  isManager: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthCtx = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // Optional: on refresh, see if server session/cookies exist
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const status = await api.checkLoginStatus();
        if (!status.loggedIn) return;
        const me = await api.getMe(); // /user/employeeUser
        if (mounted) setUser(me);
      } catch {
        // ignore
      }
    })();
    return () => { mounted = false; };
  }, []);

  async function login(username: string, password: string) {
    await api.login(username, password);
    const me = await api.getMe();
    setUser(me);
  }

  function logout() {
    api.logout();
    setUser(null);
  }

  const isManager = useMemo(() => (user?.role || "").toUpperCase() === "ADMIN", [user]);

  return (
    <AuthCtx.Provider value={{ user, isManager, login, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}