import React, { createContext, useContext, useState } from "react";

type Role = "EMPLOYEE" | "MANAGER" | "";
type Scope = { role: Role; id: string }; // id = employeeId or managerId depending on role
type Ctx = {
  scope: Scope;
  setScope: (s: Scope) => void;
  clearScope: () => void;
};

const UserScopeContext = createContext<Ctx | undefined>(undefined);

export function UserScopeProvider({ children }: { children: React.ReactNode }) {
  const [scope, setScope] = useState<Scope>({ role: "", id: "" });
  return (
    <UserScopeContext.Provider
      value={{ scope, setScope, clearScope: () => setScope({ role: "", id: "" }) }}
    >
      {children}
    </UserScopeContext.Provider>
  );
}

export function useUserScope() {
  const ctx = useContext(UserScopeContext);
  if (!ctx) throw new Error("useUserScope must be used within UserScopeProvider");
  return ctx;
}