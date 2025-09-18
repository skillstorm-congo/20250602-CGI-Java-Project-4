import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import type { JSX } from "react";

export function ManagerOnly({ children }: { children: JSX.Element }) {
  const { user, isManager } = useAuth();
  const loc = useLocation();

  if (!user) return <Navigate to="/login" replace state={{ from: loc }} />;
  if (!isManager) return <Navigate to="/" replace />;
  return children;
}