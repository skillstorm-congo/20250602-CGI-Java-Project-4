import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";
import type { JSX } from "react";

export function Protected({ children }: { children: JSX.Element }) {
  const { user } = useAuth();
  const loc = useLocation();

  if (!user) {
    return <Navigate to="/login" replace state={{ from: loc }} />;
  }
  return children;
}