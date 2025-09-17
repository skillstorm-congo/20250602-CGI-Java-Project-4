import { useEffect, useState } from "react";
import type { TimesheetType } from "../types/types";
import {findAllTimesheets, findByEmployeeIdTimesheet, findByManagerIdTimesheet, findByDateTimesheet} from "../api/api";
import { Link } from "react-router-dom";

/*-------------------------------------------------------------------------------------

OVERVIEW:
- 5x functions: 
    [Logic 2x]- loadTimesheetTable(), clearTableFilters()
    [Helpers 3x Lines starting at 294] - formatDate(), formatNum(), flag()
- 1x effect
- 8x constants: employeeId, managerId, date, submitted, approved, rows, loading, error

Function #1 loadTimesheetTable() flow
- useState for loading constant is set to TRUE when the table is loaded or populated
- useState for error constant is set to NULL when table is full loaded
- to load table when opening page, use try{} where the if-else part loads all timesheets which is what you see first
 unless user applies filters which the if-conditions check for first. Submitted and Approved are boolean and use a different
 way of getting the response. This is where I used try-type for. After going through the try{} then move onto Submitted/Approved fitlers
- only apply submitted or approved filters if the employee picked a TRUE/FALSE response in the the Tri-types where
 submitted: TRUE = "submitted", FALSE = "not submitted", ANY = "any"
 approved: TRUE = "approved", FALSE = "not approved", ANY = "any"
- fill up the rows of the timesheet data response, include error catch then setLoading to false when done


Function #2 clearTableFilters() flow (only triggers with clear button)

Effect #1 
- header
- filters on Lines 116-196 where buttons found on Lines 182-195
- error handling on Lines 197-209
- table on Lines 212-260

Testing Out the Following:
- nullish coalescing operators - https://www.typescriptlang.org/play/?#code/PTAEBUAsFNQOwK4BskEsDOlQGMD2BDJadbVOAc1FwAdoAnfAF1ztA1Hzg6UfridQA3WM1AAfMQCgQoAO6RU2LHWiMEdOOlCMYoOqnKRGAWnSoAJrGgAPaivRncXVADNtuoi5NnL0sO0QUKlYEOEsXMmhzADpJP1AASS48OEYGdEYAGnExUAR0YlAXQnQATxwYbABrdGyAW2hOMkpOUGg66kZS+Iz9CmD3WEQ6gCN6UAAGOVxkc1AxnCcfeiiikuhY+IBBUHJcXDmbfA6iIpZ3dhdGtRU2LUtCZrlUHVBqfDpGVEJ43BGAK2g2EYWnkiiwkHwwlA4XwyBBchgXHwoCq0HKGDgAHJGG98A5VmRNmReHRithYFtqNQAMJOCLkdQCJygADeklAoBkABFoMV4QAuUAAIgAFHBcPBjtAAJTCgDcbQ6XVAvSeCQAyqBBI9zBypQ0hWqKPK4pyeXy4TwhcYAIyKqbsHVoPWcl7tdBC4ZjOim-UW-nW7R0BDQfX4YFCaBCkb7IicU0AXziLlCkZZCGo5iY0Cp1FFKQZQoACh8voQADx5ulwBlMr5OAB8MrZ-rAAHUXlhAkhjHhCMRSP0aPQmCx9YWDNF+A1QABeRa1qcz2AAflXIvFkpXctNnMn5Gi7rqWgXB6PvBPoHXoDte8XDOiEa+0LP9Knz6j143aVDfvNYA0uoKipKquBIAgDZwBO76Hiu87aKUtC4G457wXOGEisa5DCteD7LtKoBCmKEoGrKCowUuh7HqeiHIahsEXh686YcK3r0LhG7njRRG3valGPp+r50dAKH4YeQmwBhC7CrG4GNHAnHiU+kbQkKv7QP+XJgAAqmY-QSFQtAMMwrBgkoiyzLsX4jPgczZow+ACQRs5vlR06EYZJHbtKu7aTCuCFBKuKEEguCyGcrDCrhZDUJBznUZetHcUlOR8YqMjmIFWjBdwYURS45yOnAcWMAlKkvlJymSWlGkZWAKiheUtnmNkhCyPgpRaBpkjJvEACaMw4K0jVzHULCwPgsaQfAyBoJgiwDiQTxkIMoAAMzRAA7PMYWUNQuAZAKfjxEYjDUJ6ICWIIIx7eg0R1IodCHShjDRHgdTAF0tAkPonTAJwEpps0xjfYOf0mOtxhbcAQA

-------------------------------------------------------------------------------------*/

//Tri-State-Select: "selected", "unselected", "somewhat selected or partial"
//helpful in the for useState in the filters for constants submitted/approved
type Tri = "any" | "true" | "false";

export const Timesheet = () => {

    //CONSTANT - ROW-RECORD STATES for data being transfered for using TimesheetType 
    const [rows, setRows] = useState<TimesheetType[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    //CONSTANT - FILTER STATES for table: employeeId, managerId, date, submitted, approved
    //NOTE: will adjust for employee vs manager view, notice it's using "set" in the filters but not adding it to a record
    const [employeeId, setEmployeeId] = useState<string>("");
    const [managerId, setManagerId] = useState<string>("");
    const [date, setDate] = useState<string>(""); // yyyy-mm-dd
    const [submitted, setSubmitted] = useState<Tri>("any");
    const [approved, setApproved] = useState<Tri>("any");

    //FUNCTION 1 of 2: loadTimesheetTable() - will populate findAll() first then call endpoints from controller to filter
    async function loadTimesheetTable() {
        setLoading(true);
        setError(null);

        //the methods() come from the api.ts for filter constants date, managerId, employeeId
        try {
        let response;
        if (date) {
            response = await findByDateTimesheet(date);
        } else if (managerId) {
            response = await findByManagerIdTimesheet(Number(managerId));
        } else if (employeeId) {
            response = await findByEmployeeIdTimesheet(Number(employeeId));
        } else {
            response = await findAllTimesheets();
        }

        //assign the timesheetData with try{}'s response from the data that Axios pulled from endpoints
        //this is what will will populate the table with the response data
        let timesheetData: TimesheetType[] = Array.isArray(response.data) ? response.data : []; 
 
        //SUBMITTED-filter Boolean Response (skip if it stays on "any") - Line 156
        if (submitted !== "any") {
            const wantTrue = submitted === "true"; //local constant for drop down menu to be a boolean/tri-type, if not "submitted" it'll be FALSE
            timesheetData = timesheetData.filter(t => (t.submitted === true) === wantTrue); //set timesheet field to a true response or checkmark when true
        }
        //APPROVED-filter Boolean Response (same logic as above) - Line 168
        if (approved !== "any") {
            const wantTrue = approved === "true";
            timesheetData = timesheetData.filter(t => (t.approved === true) === wantTrue);
        }

        //the response from the filters updating rows of records/data with useState setRows
        //need to catch errors incase timesheet can't load the data from db, for now any errors
        setRows(timesheetData);
        } catch (e: any) {
        setError(
            "Failed to load timesheets"
        );
        } finally {
        setLoading(false);
        }
    }

    //FUNCTION 2 of 2: clearTableFilters() - clear filters and set to "empty" state
    function clearTableFilters() {
        setEmployeeId("");
        setManagerId("");
        setDate("");
        setSubmitted("any");
        setApproved("any");
    }

//EFFECT to call function loadTimesheetTable() 1x on mount--->Note: everything populates for now by default, look at if-statement in 1st function
//how page is styled along with table
useEffect(() => {loadTimesheetTable();}, []); //dependency array is empty bc it'll populate either way

    return (
        <section style={{ padding: "1rem" }}>

        <h1 style={{ display: "flex", alignItems: "center", gap: ".75rem" }}>
            Timesheets
            <Link to="/timesheet/new"><button>Create New Timesheet</button></Link>
            <Link to="/timesheet/${timesheetRow.id}/update"><button>Update Timesheet</button></Link>
        </h1>
        

        {/* SECTION: Filters above table */}
        <div
            style={{
            display: "grid",
            gap: ".75rem",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            alignItems: "end",
            marginBottom: "1rem",
            }}
        >
            <label>
            <div>Employee ID</div>
            <input
                type="number"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                placeholder="Enter Id"
            />
            </label>

            <label>
            <div>Manager ID</div>
            <input
                type="number"
                value={managerId}
                onChange={(e) => setManagerId(e.target.value)}
                placeholder="Enter Manager Id"
            />
            </label>

            <label>
            <div>Date</div>
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            </label>

            <label>
            <div>Submitted</div> {/* Refer to lines 75-78*/}
            <select
                value={submitted}
                onChange={(e) => setSubmitted(e.target.value as Tri)}
            >
                {/* Refer to lines 34, 75-78*/}
                <option value="any">Any</option> 
                <option value="true">Submitted</option>
                <option value="false">Not submitted</option>
            </select>
            </label>

            <label>
            <div>Approved</div> {/* Refer to lines 80-83*/}
            <select
                value={approved}
                onChange={(e) => setApproved(e.target.value as Tri)}
            >
                {/* Refer to lines 34, 80-83*/}
                <option value="any">Any</option> 
                <option value="true">Approved</option>
                <option value="false">Not approved</option>
            </select>
            </label>

            {/* BUTTONS */}
            <div style={{ display: "flex", gap: ".5rem" }}>
                {/* Apply Button that calls function loadTimesheetTable()*/}
                <button onClick={loadTimesheetTable} disabled={loading}>
                    {loading ? "Loading..." : "Apply filters"}
                </button>

                {/* Clear Button that calls function clearTableFilters()*/}
                <button onClick={() => {clearTableFilters(); 
                    setTimeout(loadTimesheetTable, 0);}} //setTimeout() reloads on loadTimesheetTabl()
                    disabled={loading}
                 >
                    Clear
                </button>
            </div>
        </div>

        {/* SECTION: Errors */}
        {error && (
            <div
            style={{
                background: "#ffe6e6",
                border: "1px solid #ffb3b3",
                padding: ".75rem",
                marginBottom: "1rem",
            }}
            >
            {error}
            </div>
        )}

        {/* SECTION: Table */}
        <div style={{ overflowX: "auto" }}>
            <table
            style={{
                width: "100%",
                borderCollapse: "collapse",
                minWidth: 900,
            }}
            >
            <thead>
                <tr>
                <Th>ID</Th>
                <Th>Employee</Th>
                <Th>Week</Th>
                <Th>Start</Th>
                <Th>End</Th>
                <Th>Submitted</Th>
                <Th>Approved</Th>
                <Th title="Sum of regular">Regular Hours</Th>
                <Th title="Sum of overtime">Overtime Hours</Th>
                <Th title="Sum of time off">Requested Time Off</Th>
                <Th>Comment</Th>
                </tr>
            </thead>
            <tbody>
                {rows.map((timesheetRow) => (
                <tr key={timesheetRow.id}>
                    <Td>{timesheetRow.id}</Td>
                    <Td>{timesheetRow.employeeId}</Td>
                    <Td>{timesheetRow.fiscalYearFiscalWeek != null ? String(timesheetRow.fiscalYearFiscalWeek) : ""}</Td>
                    <Td>{formatDate(timesheetRow.dateStart)}</Td>
                    <Td>{formatDate(timesheetRow.dateEnd)}</Td>
                    <Td style={{ textAlign: "center" }}>{checkMark(timesheetRow.submitted)}</Td>
                    <Td style={{ textAlign: "center" }}>{checkMark(timesheetRow.approved)}</Td>
                    <Td>{formatNum(timesheetRow.totalRegularHours)}</Td>
                    <Td>{formatNum(timesheetRow.totalOvertimeHours)}</Td>
                    <Td>{formatNum(timesheetRow.totalTimeOffHours)}</Td>
                    <Td>{timesheetRow.comment != null ? timesheetRow.comment : ""}</Td>
                </tr>
                ))}
                {!loading && rows.length === 0 && (
                <tr>
                    <Td colSpan={11} style={{ textAlign: "center", padding: "1rem" }}>
                    No timesheets found.
                    </Td>
                </tr>
                )}
            </tbody>
            </table>
        </div>
        </section>
    );
};

//HELPER CONSTANT - table head
const Th = (p: any) => (
  <th
    {...p}
    style={{
      textAlign: "left",
      padding: ".5rem",
      borderBottom: "2px solid #ccc",
      background: "#f6f7f8",
      ...p.style,
    }}
  />
);

//HELPER CONSTANT - data/value
const Td = (p: any) => (
  <td
    {...p}
    style={{
      padding: ".5rem",
      borderBottom: "1px solid #eee",
      ...p.style,
    }}
  />
);

//HELPER FUNCTION - formatDate()
function formatDate(d: any) {
  if (!d) return "";
  const s = typeof d === "string" ? d : new Date(d).toISOString();
  return s.slice(0, 10);
}

//HELPER FUNCTION - formatNum()
function formatNum(n: any) {
  if (n == null) return "";
  const num = typeof n === "number" ? n : Number(n);
  return Number.isFinite(num) ? num.toFixed(2) : "";
}

//HELPER FUNCTION - flag()
function checkMark(v: boolean | null | undefined) {
  //Unicode resource -- https://unicode.org/charts//PDF/Unicode-10.0/U100-2B00.pdf
  return v === true ? "\u2714" : "";
}
/*
DO NOT DELETE UNTIL CLEAN UP --save as a start over
export const Timesheet = () => {

    return (
        <main>
            <h1>Timesheet Page</h1>
            <h2>Welcome to the Employee Management TIMESHEET PAGE</h2>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quaerat corrupti ipsam minus veniam eos praesentium, perspiciatis id explicabo nobis inventore itaque fugit illum deserunt soluta officia possimus eum doloremque doloribus.</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit natus necessitatibus odit laudantium. Voluptas mollitia voluptates itaque, quis explicabo fuga ipsum eaque quibusdam dolorum, laboriosam in esse temporibus quo aperiam?</p>
        </main>
    )
} */