import { Link } from "react-router-dom"
import { useUserScope } from "../context/UserScope";


export const Nav = () => {
    const { scope, setScope, clearScope } = useUserScope();
    
    return (

         <nav>
            {<Link to={'/'}>Home</Link>}
            {<Link to={'/timesheet'}>Timesheet</Link>}

            {<Link to={'/time-off-e'}>Time Off Employee</Link>}
            {<Link to={'/pay-stub-e'}>Pay Stub Employee</Link>}
            {<Link to={'/time-off-m'}>Time Off Manager</Link>}
            {<Link to={'/pay-stub-m'}>Pay Stub Manager</Link>}

            <div style={{ marginLeft: "auto", display: "flex", gap: ".5rem", alignItems: "center" }}>
                <label>
                Type{" "}
                <select
                    value={scope.role}
                    onChange={(e) => setScope({ role: e.target.value as any, id: "" })}
                >
                    <option value="">— pick —</option>
                    <option value="EMPLOYEE">Employee Regular</option>
                    <option value="MANAGER">Employee Manager</option>
                </select>
                </label>

                <label>
                ID{" "}
                <input
                    type="number"
                    placeholder={scope.role === "MANAGER" ? "Manager ID" : "Employee ID"}
                    value={scope.id}
                    onChange={(e) => setScope({ ...scope, id: e.target.value })}
                    disabled={!scope.role}
                    style={{ width: 120 }}
                />
                </label>

                {scope.role && scope.id && (
                <span style={{ fontSize: 12, opacity: 0.8 }}>
                    Active: {scope.role} #{scope.id}
                </span>
                )}
                <button onClick={clearScope}>Clear</button>
            </div>
        </nav>
    )

}