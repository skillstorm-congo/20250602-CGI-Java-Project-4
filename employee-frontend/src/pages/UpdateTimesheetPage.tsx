import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import type { TimesheetType } from "../types/types";
import {findByIdTimesheet, findByEmployeeIdTimesheet, updateHoursTimesheet, submitTimesheet, findByEmployeeIdTimeOff} from "../api/api";
import { useUserScope } from "../context/UserScope";

/*-------------------------------------------------------------------------------------

OVERVIEW:
- x functions: 

- x effect
- x constants: 

Function #1 

Function #2 

Effect #1 

-------------------------------------------------------------------------------------*/

type Num = number | "";
type TimeOff  = {
  id: number,
  employeeId: number,
  dateStart: string,
  dateEnd: string,
  approved?: boolean | null,
  submitted?: boolean | null,
  comment?: string | null
}
const iso = (d?: string | Date | null) =>
  !d ? "" : (typeof d === "string" ? d : d.toISOString()).slice(0, 10);

//COMPONENT
export default function UpdateTimesheetPage() {

  const { scope } = useUserScope(); //SCOPE context

  const { id } = useParams(); // /timesheet/:id/update
  const routeId = id ? Number(id) : NaN;

  //SCOPE - before anything else, make sure the role is set to the employee it needs to be
  if (scope.role !== "EMPLOYEE") {
    return (
      <section style={{ padding: "1rem" }}>
        <h1>Update UNAPPROVED Timesheet</h1>
        <MsgBox kind="err">
          This page is for Employees only. Switch your scope to <strong>Employee</strong>.
        </MsgBox>
      </section>
    );
  }
  const scopedEmpId = Number(scope.id);
  if (!Number.isFinite(scopedEmpId)) {
    return (
      <section style={{ padding: "1rem" }}>
        <h1>Update UNAPPROVED Timesheet</h1>
        <MsgBox kind="err">
          Pick your <strong>Employee</strong> scope and enter your ID (top-right) to continue.
        </MsgBox>
      </section>
    );
  }

  // selection + data
  //const [employeeId, setEmployeeId] = useState<string>(""); //take out because it's set in the scope already
  const [choices, setChoices] = useState<TimesheetType[]>([]);
  const [selected, setSelected] = useState<TimesheetType | null>(null);
  const [choiceId, setChoiceId] = useState<string>("");
  const [approvedTO, setApprovedTO] = useState<TimeOff[]>([]);
  const [pendingTO, setPendingTO] = useState<TimeOff[]>([]);
  const [approvedToId, setApprovedToId] = useState<string>("");
  const [pendingToId, setPendingToId] = useState<string>("");

  // form state (hours + comment only — backend ignores totals/fiscalWeek)
  const [comment, setComment] = useState<string>("");
  const [r1, setR1] = useState<Num>("");
  const [r2, setR2] = useState<Num>("");
  const [r3, setR3] = useState<Num>("");
  const [r4, setR4] = useState<Num>("");
  const [r5, setR5] = useState<Num>("");

  const [o1, setO1] = useState<Num>("");
  const [o2, setO2] = useState<Num>("");
  const [o3, setO3] = useState<Num>("");
  const [o4, setO4] = useState<Num>("");
  const [o5, setO5] = useState<Num>("");

  const [t1, setT1] = useState<Num>("");
  const [t2, setT2] = useState<Num>("");
  const [t3, setT3] = useState<Num>("");
  const [t4, setT4] = useState<Num>("");
  const [t5, setT5] = useState<Num>("");

  // ui state
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  // load a timesheet into the form
  function hydrateForm(ts: TimesheetType) {
    setSelected(ts);
    setComment(ts.comment ?? "");

    setR1(numOrBlank(ts.regularHoursDay1));
    setR2(numOrBlank(ts.regularHoursDay2));
    setR3(numOrBlank(ts.regularHoursDay3));
    setR4(numOrBlank(ts.regularHoursDay4));
    setR5(numOrBlank(ts.regularHoursDay5));

    setO1(numOrBlank(ts.overtimeHoursDay1));
    setO2(numOrBlank(ts.overtimeHoursDay2));
    setO3(numOrBlank(ts.overtimeHoursDay3));
    setO4(numOrBlank(ts.overtimeHoursDay4));
    setO5(numOrBlank(ts.overtimeHoursDay5));

    setT1(numOrBlank(ts.timeOffHoursDay1));
    setT2(numOrBlank(ts.timeOffHoursDay2));
    setT3(numOrBlank(ts.timeOffHoursDay3));
    setT4(numOrBlank(ts.timeOffHoursDay4));
    setT5(numOrBlank(ts.timeOffHoursDay5));

    loadTimeOff(scopedEmpId, { start: ts.dateStart, end: ts.dateEnd });
  }

  // load choices for an employee (unapproved only)
  async function loadUnapproved(empIdNum: number) {
    setLoading(true);
    setError(null);
    setNotice(null);
    try {
      const res = await findByEmployeeIdTimesheet(empIdNum);
      const all: TimesheetType[] = res.data ?? [];
      const unapproved = all.filter(ts => ts.approved !== true);
      setChoices(unapproved);
      if (unapproved.length === 0) {
        setSelected(null);
        setChoiceId("");
        setNotice("No unapproved timesheets for this employee.");
      }
    } catch (e: any) {
      setError(e?.response?.data?.message || e?.message || "Failed to load timesheets.");
    } finally {
      setLoading(false);
    }
  }

  async function loadTimeOff(empIdNum: number, week?: { start?: string | Date | null; end?: string | Date | null }) {
    try {
      const res = await findByEmployeeIdTimeOff(empIdNum);
      const all: TimeOff[] = res.data ?? [];
      const overlapsWeek = (to: TimeOff) =>
        week?.start && week?.end
          ? rangesOverlap(iso(week.start), iso(week.end), to.dateStart, to.dateEnd)
          : true;
      setApprovedTO(all.filter(t => t.approved === true).filter(overlapsWeek));
      setPendingTO (all.filter(t => t.approved !== true).filter(overlapsWeek));
    } catch (e: any) {
      // don't block page if this fails—just show a note
      setNotice(prev => (prev ? prev + " " : "") + "Could not load time-off options.");
    }
  }

  //SCOPE - autoload the employees unapproved timesheet lists whenever that scope changes
  useEffect(() => {
    if (!Number.isFinite(scopedEmpId)) return;
    loadUnapproved(scopedEmpId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scopedEmpId]);


  // if URL has an id: try to load it
  useEffect(() => {
    (async () => {
      if (!Number.isFinite(routeId)) return;
      setLoading(true);
      setError(null);
      setNotice(null);

      try {
        const res = await findByIdTimesheet(routeId);
        const ts: TimesheetType = res.data;
        if (!ts) {
          setError("Timesheet not found.");
          return;
        }

        //SCOPE - making sure employee only sees their own stuff
        if (ts.employeeId !== scopedEmpId) {
          setError("You can only edit your own unapproved timesheets.");
          await loadUnapproved(scopedEmpId);
          setSelected(null);
          setChoiceId("");
          return;
        }

        if (ts.approved === true) {
          setNotice("That timesheet is already approved — choose another unapproved one.");
          //setEmployeeId(String(ts.employeeId ?? ""));
          await loadUnapproved(ts.employeeId!);
          setSelected(null);
          setChoiceId("");
        }
        //setEmployeeId(String(ts.employeeId ?? ""));
        hydrateForm(ts);
        setChoiceId(String(ts.id));

        } catch (e: any) {
          setError(e?.response?.data?.message || e?.message || "Failed to load timesheet.");
        } finally {
          setLoading(false);
        }
    })();

    //SCOPE - return based on routing ids and scope id now
  }, [routeId, scopedEmpId]);

  // when a dropdown choice changes, load that TS into the form
  useEffect(() => {
    if (!choiceId) return;
    const chosen = choices.find(c => String(c.id) === choiceId);
    if (chosen) hydrateForm(chosen);
  }, [choiceId, choices]);

  const canEdit = useMemo(() => !!selected && selected.approved !== true, [selected]);

  async function handleSave() {
    if (!selected) return;
    setSaving(true);
    setError(null);
    setNotice(null);
    try {
      const payload = {
        id: selected.id,
        comment: comment || null,

        regularHoursDay1: numOrNull(r1),
        regularHoursDay2: numOrNull(r2),
        regularHoursDay3: numOrNull(r3),
        regularHoursDay4: numOrNull(r4),
        regularHoursDay5: numOrNull(r5),

        overtimeHoursDay1: numOrNull(o1),
        overtimeHoursDay2: numOrNull(o2),
        overtimeHoursDay3: numOrNull(o3),
        overtimeHoursDay4: numOrNull(o4),
        overtimeHoursDay5: numOrNull(o5),

        timeOffHoursDay1: numOrNull(t1),
        timeOffHoursDay2: numOrNull(t2),
        timeOffHoursDay3: numOrNull(t3),
        timeOffHoursDay4: numOrNull(t4),
        timeOffHoursDay5: numOrNull(t5),
      };
      const res = await updateHoursTimesheet(payload);
    setSelected(res.data);        // reflect what DB now has
    setNotice("Saved.");
  } catch (e: any) {
    // show actual backend message if we got one
    setError(e?.response?.data?.message || e?.message || "Failed to save.");
  } finally {
    setSaving(false);
  }
  }

  async function handleSubmitTimesheet() {
    if (!selected) return;
    setSaving(true);
    setError(null);
    setNotice(null);
    try {
      await submitTimesheet(selected.id);
      setNotice("Submitted.");
      // reflect submitted=true in memory
      setSelected({ ...selected, submitted: true });
    } catch (e: any) {
      setError(e?.response?.data?.message || e?.message || "Failed to submit.");
    } finally {
      setSaving(false);
    }
  }
  function applyApprovedTimeOff() {
    if (!selected || !approvedToId) return;
    const to = approvedTO.find(t => String(t.id) === approvedToId);
    if (!to) return;

    const weekDays = weekMonToFri(iso(selected.dateStart), iso(selected.dateEnd));
    const toStart = new Date(to.dateStart);
    const toEnd   = new Date(to.dateEnd);

    const inTO = (d: Date) => d >= toStart && d <= toEnd;

    const next = [t1, t2, t3, t4, t5] as Num[];
    weekDays.forEach((d, idx) => {
      if (inTO(d)) next[idx] = 8.0; // default per-day time-off hours
    });
    [setT1, setT2, setT3, setT4, setT5].forEach((setter, i) => setter(next[i]));
    setNotice(`Applied time-off #${to.id} to this week.`);
  }

  return (
    <section style={{ padding: "1rem" }}>
      <h1>Update UNAPPROVED Timesheet</h1>

      {/* 1) Employee picker + load choices */}
      <div style={{ display: "flex", gap: ".75rem", alignItems: "end", flexWrap: "wrap" }}>
        <div style={{ fontSize: 14, opacity: 0.8 }}>
          Active scope: <strong>EMPLOYEE #{scopedEmpId}</strong>
        </div>

         {/* <label>
          <div>Employee ID</div>
          <input
            type="number"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            placeholder="Enter Employee Id"
          />
        </label>
        <button
          onClick={() => {
            const n = Number(employeeId);
            if (Number.isFinite(n)) loadUnapproved(n);
          }}
          disabled={loading || !employeeId}
        >
          Get-unapproved
        </button>*/}

        <label style={{ marginLeft: "1rem" }}>
          <div>Pick Unapproved</div>
          <select
            value={choiceId}
            onChange={(e) => setChoiceId(e.target.value)}
            disabled={loading || choices.length === 0}
          >
            <option value="">— select —</option>
            {choices.map((c) => (
              <option key={c.id} value={String(c.id)}>
                #{c.id} • {iso(c.dateStart)} → {iso(c.dateEnd)}
              </option>
            ))}
          </select>
        </label>
      </div>

      {/* NEW: Time-off helpers */}
      {selected && (
        <div style={{ marginTop: ".75rem", display: "flex", gap: "1rem", alignItems: "end", flexWrap: "wrap" }}>
          <label>
            <div>Apply approved time-off (overlapping this week)</div>
            <select value={approvedToId} onChange={(e) => setApprovedToId(e.target.value)}>
              <option value="">— pick approved —</option>
              {approvedTO.map(t => (
                <option key={t.id} value={String(t.id)}>
                  #{t.id} • {iso(t.dateStart)} → {iso(t.dateEnd)}
                </option>
              ))}
            </select>
          </label>
          <button onClick={applyApprovedTimeOff} disabled={!approvedToId}>Apply</button>

          <label>
            <div>View pending time-off (not approved)</div>
            <select value={pendingToId} onChange={(e) => setPendingToId(e.target.value)}>
              <option value="">— pick pending —</option>
              {pendingTO.map(t => (
                <option key={t.id} value={String(t.id)}>
                  #{t.id} • {iso(t.dateStart)} → {iso(t.dateEnd)}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}
      
      {/* messages */}
      {notice && <MsgBox kind="ok">{notice}</MsgBox>}
      {error && <MsgBox kind="err">{error}</MsgBox>}

      {/* 2) Edit form */}
      <div style={{ marginTop: "1rem", opacity: canEdit ? 1 : 0.6 }}>
        <h3>Hours (Monday to Friday)</h3>
        {!selected && <p>Select an unapproved timesheet above to edit.</p>}
        {selected && selected.approved === true && (
          <p style={{ color: "#b00" }}>
            This timesheet is approved and cannot be edited. Pick another above.
          </p>
        )}

        {selected && (
          <>
            <div style={{ display: "grid", gap: ".5rem", gridTemplateColumns: "repeat(3, minmax(220px, 1fr))" }}>
              <Hours label="Regular MON" value={r1} set={setR1} />
              <Hours label="Regular TUE" value={r2} set={setR2} />
              <Hours label="Regular WED" value={r3} set={setR3} />
              <Hours label="Regular THU" value={r4} set={setR4} />
              <Hours label="Regular FRI" value={r5} set={setR5} />

              <Hours label="Overtime MON" value={o1} set={setO1} />
              <Hours label="Overtime TUE" value={o2} set={setO2} />
              <Hours label="Overtime WED" value={o3} set={setO3} />
              <Hours label="Overtime THU" value={o4} set={setO4} />
              <Hours label="Overtime FRI" value={o5} set={setO5} />

              <Hours label="Time Off MON" value={t1} set={setT1} />
              <Hours label="Time Off TUE" value={t2} set={setT2} />
              <Hours label="Time Off WED" value={t3} set={setT3} />
              <Hours label="Time Off THU" value={t4} set={setT4} />
              <Hours label="Time Off FRI" value={t5} set={setT5} />
            </div>

            <div style={{ marginTop: ".75rem" }}>
              <div>Comment or Notes about Timesheet Updates</div>
              <textarea
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                style={{ width: "100%", maxWidth: 700 }}
              />
            </div>

            <div style={{ display: "flex", gap: ".5rem", marginTop: "1rem" }}>
              <button onClick={handleSave} disabled={!canEdit || saving}>
                {saving ? "Saving..." : "UPDATE timesheet"}
              </button>
              <button onClick={handleSubmitTimesheet} disabled={!selected || selected.approved === true || saving}>
                SUBMIT timesheet
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
}

//HELPERS

function numOrBlank(n: number | null | undefined): Num {
  return n == null ? "" : Number(n);
}
function numOrNull(n: Num): number | null {
  return n === "" ? null : Number(n);
}

function Hours({
  label,
  value,
  set,
}: {
  label: string;
  value: Num;
  set: (v: Num) => void;
}) {
  return (
    <label>
      <div>{label}</div>
      <input
        type="number"
        step="0.25"
        min="0"
        value={value}
        onChange={(e) => set(e.target.value === "" ? "" : Number(e.target.value))}
        placeholder="0.00"
      />
    </label>
  );
}

function MsgBox({ kind, children }: { kind: "ok" | "err"; children: React.ReactNode }) {
  const style =
    kind === "ok"
      ? { background: "#e6f7ff", border: "1px solid #b3e0ff", padding: ".75rem", marginTop: ".75rem" }
      : { background: "#ffe6e6", border: "1px solid #ffb3b3", padding: ".75rem", marginTop: ".75rem" };
  return <div style={style}>{children}</div>;
}
// date helpers for overlap + week Mon–Fri
function rangesOverlap(aStart: string, aEnd: string, bStart: string, bEnd: string) {
  const aS = new Date(aStart), aE = new Date(aEnd);
  const bS = new Date(bStart), bE = new Date(bEnd);
  return aS <= bE && bS <= aE;
}
function weekMonToFri(startISO?: string, endISO?: string) {
  // returns up to 5 Date objects across the visible week (Mon–Fri)
  const out: Date[] = [];
  if (!startISO || !endISO) return out;
  const s = new Date(startISO); const e = new Date(endISO);
  for (let d = new Date(s); d <= e && out.length < 5; d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1)) {
    out.push(new Date(d));
  }
  // pad to exactly 5 slots if the range is shorter
  while (out.length < 5) out.push(new Date(out[out.length - 1].getFullYear(), out[out.length - 1].getMonth(), out[out.length - 1].getDate() + 1));
  return out.slice(0, 5);
}