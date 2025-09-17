import { useState } from "react";
import { useEffect } from "react";
import type { CreateTimesheetType } from "../types/types";
import { useNavigate, } from "react-router-dom";
import { useForm, useFormState, type SubmitHandler } from "react-hook-form";
import { findAllTimesheets, logHoursTimesheet } from "../api/api";

export const TimesheetCreatePage = () => {

    //used to route to view a time off record
    const navigate = useNavigate();

    //variables for React Hook From
    const { register, handleSubmit, watch, formState: { errors } , reset} = useForm<Inputs>({ mode: 'all'});

    // setting up some state to use with our error handling
    const [ , setError ] = useState<string>('');

    //setting up confirm submission
    const [showConfirm, setShowConfirm] = useState(false);

    //backend expects numbers or null
    const asNumOrNull = { setValueAs: (v: string) => (v === "" ? null : Number(v)) };
    const asInt = { setValueAs: (v: string) => Number(v) };

    //variable that calls function to set showConfirm to false - don't show 'confirm submission'
    const handleCancelConfirm = () => {
        setShowConfirm(false);
    }

    //handle the initial form by showing the 'confirm submission' dialog
    const handleInitialSubmit = () => {
        setShowConfirm(true);
    }

    //setting up local state EXAMPLE for the Timesheet Object sending to the DB 
    const [createTimesheetExample, setTimesheetExample] = useState<CreateTimesheetType>( 
        {  
            id: 2003,
            employeeId: 101013,
            dateStart: "20250707",
            dateEnd: "20250711",
            comment: "Timesheet EXAMPLE",
            timeOffId: null,
            regularHoursDay1: 8,
            regularHoursDay2: 2,
            regularHoursDay3: 4,
            regularHoursDay4: 7,
            regularHoursDay5: 8,
            overtimeHoursDay1: 2,
            overtimeHoursDay2: null,
            overtimeHoursDay3: null,
            overtimeHoursDay4: null,
            overtimeHoursDay5: 2    
        }
    );   

    //setting up local variables to get all timesheet records for unique list of employee ids and time off request ids
    const [createTimesheets, setTimesheet] = useState<CreateTimesheetType[]>(
        [  
            {  
                id: 2001,
                employeeId: 101010,
                dateStart: "20250707",
                dateEnd: "20250711",
                comment: "Timesheet TESTER EXAMPLE #2",
                timeOffId: null,
                regularHoursDay1: 8,
                regularHoursDay2: 3,
                regularHoursDay3: 5,
                regularHoursDay4: 8,
                regularHoursDay5: 8,
                overtimeHoursDay1: null,
                overtimeHoursDay2: null,
                overtimeHoursDay3: null,
                overtimeHoursDay4: 2,
                overtimeHoursDay5: 2,    
            },
            {  
                id: 2002,
                employeeId: 101012,
                dateStart: "20250707",
                dateEnd: "20250711",
                comment: "Timesheet TESTER EXAMPLE #3",
                timeOffId: null,
                regularHoursDay1: 0,
                regularHoursDay2: 3,
                regularHoursDay3: 0,
                regularHoursDay4: 8,
                regularHoursDay5: 0,
                overtimeHoursDay1: null,
                overtimeHoursDay2: null,
                overtimeHoursDay3: null,
                overtimeHoursDay4: 2,
                overtimeHoursDay5: null,    
            }
        ]
    );

    //using our API method to retrieve all timesheet records
    function getTimesheets() 
    {
        findAllTimesheets().then(response => 
            {
                setTimesheet(response.data);
            }
            ).catch(err => {console.log(err);} )
    }

    // running the API call when this component loads
    useEffect(() => {
        getTimesheets();  
        setTimesheetExample(createTimesheetExample); //see default values
    }, [])

    //setting up our React Hook Form
    type Inputs = 
    {
        id: number,
        employeeId: number,
        dateStart: string,
        dateEnd: string,
        comment: string | null,
        regularHoursDay1: number | null,
        regularHoursDay2: number | null,
        regularHoursDay3: number | null,
        regularHoursDay4: number | null,
        regularHoursDay5: number | null,
        overtimeHoursDay1: number | null,
        overtimeHoursDay2: number | null,
        overtimeHoursDay3: number | null,
        overtimeHoursDay4: number | null,
        overtimeHoursDay5: number | null, 
    }

    //watch the dateStart and dateEnd so we can validate that date start is <= date end in the form
    const startDate = watch('dateStart');

    const [submitError, setSubmitError] = useState<string>("");

    //handles the form submission
    const onSubmit: SubmitHandler<Inputs> = async(formData) => {
      setSubmitError("");
        //create a time off object to send to DB to create
        //generate an time off record id as client id since backend expects it
        const newId = generateId(createTimesheets);

        //create a new time off object
        const createTimesheet = 
        {
            id: newId,
            employeeId: formData.employeeId,
            dateStart: formData.dateStart,
            dateEnd: formData.dateEnd,
            comment: formData.comment ?? null,
            regularHoursDay1: formData.regularHoursDay1,
            regularHoursDay2: formData.regularHoursDay2,
            regularHoursDay3: formData.regularHoursDay3,
            regularHoursDay4: formData.regularHoursDay4,
            regularHoursDay5: formData.regularHoursDay5,
            overtimeHoursDay1: formData.overtimeHoursDay1,
            overtimeHoursDay2: formData.overtimeHoursDay2,
            overtimeHoursDay3: formData.overtimeHoursDay3,
            overtimeHoursDay4: formData.overtimeHoursDay4,
            overtimeHoursDay5: formData.overtimeHoursDay5,
        }

        //check out in the console if the object is returning what is expected
        //console.log("New Timesheet Object: " + JSON.stringify(timeOff, null, 2));

        try {
          const res = await logHoursTimesheet(createTimesheet); //where normal payload would be
          navigate(`/timesheet/${res.data.id}/update`);
        } catch (e: any) {
          setSubmitError(
            e?.response?.data?.message || e?.message || "Failed to create timesheet."
          );
        }
        //create a new time off record
        /*logHoursTimesheet(createTimesheet)
            .then(response => {
                    console.log(response)

                    //navigate to the create timesheet page
                    navigate('/timesheet/new')
                })
                .catch(err => {console.log(err);
                    if (err.status == 404)
                        setError('Timesheet Not Submitted')
                    }) */

    }
    const colStyle: React.CSSProperties = { 
      display: "grid", gap: "12px"
    }

    const gridStyle: React.CSSProperties = {
      display: "grid",
      gridTemplateColumns: "repeat(3, minmax(260px, 1fr))",
      gap: "24px",
      alignItems: "start",
      marginBottom: "16px",
    }

    const Field = ({ label, name }: { label: string; name: keyof Inputs }) => (
      <label style={{ display: "grid", gap: "6px" }}>
        <div>{label}</div>
        <input
          type="number"
          step="0.25"
          inputMode="decimal"
          placeholder="0.00"
          {...register(name, asNumOrNull)}
          style={{ padding: "6px 8px" }}
        />
      </label>
    )

    //html body
    return (
        <main>
            <h1>Timesheet Creation Page</h1>
            <p>A Timesheet request is created by an employee. These requests' state are: not submitted or submitted. If they have been submitted then their state are: not approved or approved.</p>
            <p>IMPORTANT NOTE: Only a manager can approve a timesheet and once a timesheet record has been submitted, an employee can no longer UPDATE the request. Reach out to your manager for timesheet requests that have an APPROVED status.</p>

            {/*Begining of Table*/}
            <h2>Example of a Timesheet Record</h2>

            {/* SECTION: TABLE*/}
            <div style={{ marginTop: "1rem" }}>
                <table style={{
                                width: "100%",
                                borderCollapse: "collapse",
                                minWidth: 1000,}} >
                    <thead>
                        <tr>
                            <Th>Id</Th>
                            <Th>Employee Id</Th>
                            <Th>Date Start</Th>
                            <Th>Date End</Th>
                            <Th>Reg Hours Mon</Th>
                            <Th>Reg Hours Tue</Th>
                            <Th>Reg Hours Wed</Th>
                            <Th>Reg Hours Thu</Th>
                            <Th>Reg Hours Fri</Th>
                            <Th>OT Hours Mon</Th>
                            <Th>OT Hours Tue</Th>
                            <Th>OT Hours Wed</Th>
                            <Th>OT Hours Thu</Th>
                            <Th>OT Hours Fri</Th>
                            <Th>Comment</Th>                          
                        </tr>
                    </thead>

                    <tbody> 
                        {
                            
                            <tr key={createTimesheetExample.id}>
                                <Td>{createTimesheetExample.id}</Td>
                                <Td>{createTimesheetExample.employeeId}</Td>
                                <Td>{createTimesheetExample.dateStart}</Td>
                                <Td>{createTimesheetExample.dateEnd}</Td>
                                <Td>{createTimesheetExample.regularHoursDay1}</Td>
                                <Td>{createTimesheetExample.regularHoursDay2}</Td>
                                <Td>{createTimesheetExample.regularHoursDay4}</Td>
                                <Td>{createTimesheetExample.regularHoursDay5}</Td>
                                <Td>{createTimesheetExample.overtimeHoursDay1}</Td>
                                <Td>{createTimesheetExample.overtimeHoursDay2}</Td>
                                <Td>{createTimesheetExample.overtimeHoursDay3}</Td>
                                <Td>{createTimesheetExample.overtimeHoursDay4}</Td>
                                <Td>{createTimesheetExample.overtimeHoursDay5}</Td>
                                <Td>{createTimesheetExample.comment}</Td>
                            </tr>
                        }

                    </tbody>
                </table>
            <br /><br />
            <form onSubmit={handleSubmit(handleInitialSubmit)}>
              {/* Employee & Dates */}
              <label>
                Employee Id 
                <select {...register("employeeId", { ...asInt, required: true })}>
                  {employeeDropDown(createTimesheets).map((id) => (
                    <option key={id} value={id}>{id}</option>
                  ))}
                </select>
              </label>

              <br /><br />

              <label>
                Date Start
                <input
                  type="date"
                  {...register("dateStart", { required: true })}
                />
              </label>

              <br /><br />

              <label>
                Date End
                <input
                  type="date"
                  {...register("dateEnd", {
                    required: true,
                    validate: (v) => new Date(v) >= new Date(startDate),
                  })}
                />
              </label>
              {errors.dateEnd && (
                <p style={{ color: "red" }}>
                  Please enter a Date End that is ≥ Date Start
                </p>
              )}

              <br /><br />

              {/* Hours grid */}
              <div style={gridStyle}>
                {/* Column 1 */}
                <div style={colStyle}>
                  <Field label="Regular MON" name="regularHoursDay1" />
                  <Field label="Regular THU" name="regularHoursDay4" />
                  <Field label="Overtime MON" name="overtimeHoursDay1" />
                  <Field label="Overtime THU" name="overtimeHoursDay4" />
                </div>

                {/* Column 2 */}
                <div style={colStyle}>
                  <Field label="Regular TUE" name="regularHoursDay2" />
                  <Field label="Regular FRI" name="regularHoursDay5" />
                  <Field label="Overtime TUE" name="overtimeHoursDay2" />
                  <Field label="Overtime FRI" name="overtimeHoursDay5" />
                </div>

                {/* Column 3 */}
                <div style={colStyle}>
                  <Field label="Regular WED" name="regularHoursDay3" />
                  <Field label="Overtime WED" name="overtimeHoursDay3" />
                  {/* (Add time-off fields here later if you decide to capture them on create) */}
                </div>
              </div>

              {/* Comment */}
              <label style={{ display: "grid", gap: "6px", marginTop: "6px" }}>
                <div>Comment or Notes about Timesheet</div>
                <textarea rows={4} {...register("comment")} style={{ width: "100%", padding: "8px" }} />
              </label>

              {/* Actions */}
              <div style={{ marginTop: "16px", display: "flex", gap: "12px" }}>
                <button type="submit" style={{ padding: "8px 14px" }}>
                  CREATE timesheet
                </button>
                <button
                  type="button"
                  onClick={() =>
                    reset({
                      employeeId: 0,
                      comment: "",
                      dateStart: "",
                      dateEnd: "",
                      regularHoursDay1: null,
                      regularHoursDay2: null,
                      regularHoursDay3: null,
                      regularHoursDay4: null,
                      regularHoursDay5: null,
                      overtimeHoursDay1: null,
                      overtimeHoursDay2: null,
                      overtimeHoursDay3: null,
                      overtimeHoursDay4: null,
                      overtimeHoursDay5: null,
                    })
                  }
                  style={{ padding: "8px 14px" }}
                >
                  Clear
                </button>
              </div>

              {showConfirm && (
                <div style={{ marginTop: 12 }}>
                  <p>Are you sure you want to submit?</p>
                  <button onClick={handleSubmit(onSubmit)} type="button" style={{ padding: "8px 14px" }}>
                    Yes, Submit
                  </button>
                  <button onClick={handleCancelConfirm} type="button" style={{ padding: "8px 14px" }}>
                    Cancel
                  </button>
                </div>
              )}   
            </form>

            {/* using useNavigate here to take us to the timesheet page */}
            <br></br>
            <button style={{ backgroundColor: 'red', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px' }} onClick={() => navigate(`/timesheet`)}>Cancel</button>

          </div>

        </main>
    )

} //end of const CreateTimesheetPage


//HELPER CONSTANT - table head
const Th = (p: any) => (
  <th
    {...p}
    style={{
      textAlign: "left",
      padding: ".2rem",
      borderBottom: "2px solid #ccc",
      background: "#babbbdff",
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
)

//HELPER FUNCTION - flag()
function checkMark(v: boolean | null | undefined) 
{
  //Unicode resource -- https://unicode.org/charts//PDF/Unicode-10.0/U100-2B00.pdf
  if (v === true)
  {return "\u2705";}
  else if (v === false)
  {return "\u274C";}

 return  "";
} 

//HELPER FUNCTION - Employee Id Drop Down 
function employeeDropDown(timesheetData :CreateTimesheetType[])
{
    //set up an empty array
    const allIds:number[] = [];

    //add all employee id to an array
    timesheetData.forEach(timesheet => 
    {
        allIds.push(timesheet.employeeId);
        
    } )

    //add "0" for clear state
    allIds.push(0);

    //get all unique ids in the array
    const uniqueIds = [...new Set(allIds)];

    return uniqueIds;
}

//HELPER FUNCTION - Time Off Ids NOT AVAILABLE
function usedIds(timesheetData :CreateTimesheetType[])
{
    //set up an empty array
    const allIds:number[] = [];

    //add all employee id to an array
    timesheetData.forEach(timesheet => 
    {
        allIds.push(timesheet.id);
    } )

    //get all unique ids in the array
    const uniqueIds = [...new Set(allIds)];

    return uniqueIds;
}

//HELPER FUNCTION - Generate a random postive integer for timesheet Id
function generateId(createTimesheets :CreateTimesheetType[])
{
    let valid = true;
    let randomNum = 0;

    do {
        //generate a random positive integer, returns a random integer from 1 to 500:
        randomNum = Math.floor(Math.random() * 500) + 1;

        //get time off record ids that are NOT AVAILABLE, if new random number is in the list, generate new number
        valid = usedIds(createTimesheets).includes(randomNum) ? true : false;
        
    }while(valid)

    return randomNum;
}