import { useState } from "react";
import { useEffect } from "react";
import { updatePayStubRecord, findTimesheetsByEmployeeId} from "../api/api";
import type { payStubType, TimesheetType} from "../types/types";
import { useNavigate} from "react-router-dom";
import { UpdatePayStubContext } from "../context/UpdatePayStubContext";
import { useContext } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

export const PayStubUpdatePage = () => {

    //used to route to view pay stub record
    const navigate = useNavigate();

    //variables for React Hook From
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<Inputs>({ mode: 'all'});

    //setting up local state for the timesheetTable we'll get from the DB via api call
    const [timesheetTable, setTimesheetTable] = useState(<></>)

    //setting up local state for the Pay Stub Object we'll get from the DB 
    let getTimesheets : TimesheetType[];
    
    // setting up some state to use with our error handling
    const [ , setError ] = useState<string>('');

    //setting up confirm submission
    const [showConfirm, setShowConfirm] = useState(false);

    //variable that calls function to set showConfirm to false - don't show 'confirm submission'
    const handleCancelConfirm = () => {
        setShowConfirm(false);
    }

    //handle the initial form by showing the 'confirm submission' dialog
    const handleInitialSubmit = () => {
        setShowConfirm(true);
    }

    //setting up local state for the Pay Stub Object we'll get from the DB 
    const [payStub, setPayStub] = useState<payStubType>(
        {  
            id:  6,
            employeeId: 66,
            timesheetId1: 10,
            timesheetId2: 20,
            fiscalYearFiscalWeekStart: "202531",
            fiscalYearFiscalWeekEnd: "202532",
            dateStart: "2025-07-28",
            dateEnd: "2025-08-08",
            payStubDate: "2025-08-08", //null,
            totalRegularHours: 45,
            totalOvertimeHours: 2,
            totalTimeOffHours: 0,
            totalPaid: 5555.69  
        }
    );

    // in this component, we're merely taking in a value from the context's state
    // if updatePayStub is undefined, set it to default value of payStub
    const updatePayStub = useContext(UpdatePayStubContext)?.updatePayStub ?? payStub;

    // running the API call when this component loads, load pay stub & timesheet table
    useEffect(() => {
        setPayStub(updatePayStub);
        createTimesheetTbl(updatePayStub.employeeId)
    }, [updatePayStub])

    //setting up our React Hook Form
    type Inputs =
    {
        timesheetId1: number,
        timesheetId2: number,
        dateStart: string,
        dateEnd: string,
        payStubDate: string | null,
    }

    //watch the dateStart to validate: date start is <= date end in the form
    const startDate = watch('dateStart');

    //handles the form submission
    const onSubmit: SubmitHandler<Inputs> = formData =>
    {
        //reset the pay stub object with new update
        payStub.timesheetId1 = formData.timesheetId1 || payStub.timesheetId1
        payStub.timesheetId2 = formData.timesheetId2 || payStub.timesheetId2
        payStub.dateStart = formData.dateStart || payStub.dateStart
        payStub.dateEnd = formData.dateEnd || payStub.dateEnd
        payStub.payStubDate = formData.payStubDate

        //update the pay stub record
        updatePayStubRecord(payStub.id, payStub)
            .then(response => {
                    console.log(response)

                    //navigate to Pay Stub Page Manager
                    navigate('/pay-stub-m')
                })
                .catch(err => {console.log(err);
                    if (err.status == 404)
                        setError('Pay Stub Not Updated')
                    })
    }

    //FUNCTION 1 of 1 - Generate a table of time sheets based on employee id for the form
    async function createTimesheetTbl(employeeId: string | number | undefined)
    {
        if (employeeId)
        {
            //if employeeId is string, convert to a number
            if (typeof employeeId === "string")
                employeeId = parseInt(employeeId);

            //call function to get all time sheet(s) associated to an employee id
            await findTimesheetsByEmployeeId(employeeId).then(response => 
                {
                    //get the timesheet array and use immediately
                    getTimesheets = response.data;

                    //time sheet must be 'approved' = true, filter out
                    const approvedTimesheets = getTimesheets.filter(t => t.approved); 

                    //sort approvedTimesheets by date start ascending order(oldest at the bottom)
                    approvedTimesheets.sort((a, b) => 
                        {
                            const dateA = new Date(a.dateStart);
                            const dateB = new Date(b.dateStart);

                            return (dateB.getTime() - dateA.getTime());
                        });

                    //if approvedTimeSheets is not empty, create table, else do not create table
                    if (approvedTimesheets.length >= 1)
                    {
                        //create table
                        setTimesheetTable
                        ( <div>
                            <table>
                            <thead>
                            <tr>
                                <Th>ID</Th>
                                <Th>Employee</Th>
                                <Th>Week</Th>
                                <Th>Start</Th>
                                <Th>End</Th>
                                <Th>Submitted</Th>
                                <Th>Approved</Th>
                            </tr>
                            </thead>
                                <tbody>
                                {/* Render table rows based on timesheets data*/}
                                {approvedTimesheets.map((t) => (
                                    <tr key={t.id}>
                                    <Td>{t.id}</Td>
                                    <Td>{t.employeeId}</Td>
                                    <Td>{t.fiscalYearFiscalWeek != null ? String(t.fiscalYearFiscalWeek) : ""}</Td>
                                    <Td>{t.dateStart}</Td>
                                    <Td>{t.dateEnd}</Td>
                                    <Td style={{ textAlign: "center" }}>{checkMark(t.submitted)}</Td>
                                    <Td style={{ textAlign: "center" }}>{checkMark(t.approved)}</Td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                        )

                    }//end of if statement
                    else
                        setTimesheetTable(<p>No Timesheets Available for Pay Stub choose another Employee Id</p>);

                }//end of function
                ).catch(err => {console.log(err);} )
        }//end of ifstatement
        else
            //employee id is undefined / falsy
            setTimesheetTable(<p>No Timesheets Available for Pay Stub choose another Employee Id</p>)

    }//end of createTimesheetTable function

    //html body
    return (
        <main>
            <h1>Pay Stub Update Manager</h1>
            <p>A Pay Stub is created by a manager. The state is pay stub date. If pay stub date is null, pay stub has NOT been PAID OUT.</p>

            {/*Begining of Table*/}
            <h2>Pay Stub Record</h2>

            {/* SECTION: TABLE*/}
            <div style={{ overflowX: "auto" }}>
                <table style={{
                                width: "100%",
                                borderCollapse: "collapse",
                                minWidth: 1000,}} >
                    <thead>
                        <tr>
                            <Th> Employee Id</Th>
                            <Th> Time Sheet Id 1</Th>
                            <Th> Time Sheet Id 2</Th>
                            <Th> Fiscal Year Fiscal Week Start </Th>
                            <Th> Fiscal Year Fiscal Week End </Th>
                            <Th> Date Start </Th>
                            <Th> Date End </Th>
                            <Th> Pay Stub Date</Th>
                            <Th> Total Regular Hours</Th>
                            <Th> Total Overtime Hours</Th>
                            <Th> Total Time Off Hours</Th>
                            <Th> Total Paid</Th>
                            
                        </tr>
                    </thead>

                    <tbody> 
                        {
                            <tr key={payStub.id}>
                                <Td>{payStub.employeeId}</Td>
                                <Td>{payStub.timesheetId1}</Td>
                                <Td>{payStub.timesheetId2}</Td>
                                <Td>{payStub.fiscalYearFiscalWeekStart}</Td>
                                <Td>{payStub.fiscalYearFiscalWeekEnd}</Td>
                                <Td>{payStub.dateStart}</Td>
                                <Td>{payStub.dateEnd}</Td>
                                <Td>{payStub.payStubDate}</Td>
                                <Td>{payStub.totalRegularHours}</Td>
                                <Td>{payStub.totalOvertimeHours}</Td>
                                <Td>{payStub.totalTimeOffHours}</Td>
                                <Td>{payStub.totalPaid}</Td>
                            </tr>
                        }
                    </tbody>
            </table>
            </div>
            {/*End of Table*/}

            <div>
            {/*Begining of Timesheet(s)Table*/}
            <h2>Available Timesheet(s)</h2>

            {/* create a table for available time sheets for an employee id */}
            {timesheetTable}
            </div>

            {/*Begining of Form*/}
            <div> 
            <h2>Update a Pay Stub</h2>
            <form onSubmit={handleSubmit(handleInitialSubmit)}>
                
                <label htmlFor = "time sheet id 1"> Time Sheet Id 1: </label> 
                <input type = "text" id = "time sheet id 1" size = {100} defaultValue = {updatePayStub.timesheetId1} {...register(`timesheetId1`, {required: true, maxLength:200})}></input>
                {errors.timesheetId1 && <p style={{color: 'red'}}>Please Enter a Time Sheet Id</p>}
                <br></br><br></br>

                <label htmlFor = "time sheet id 2"> Time Sheet Id 2: </label> 
                <input type = "text" id = "time sheet id 2" size = {100} defaultValue = {updatePayStub.timesheetId2} {...register(`timesheetId2`, {required: false, maxLength:200})}></input>
                {errors.timesheetId2 && <p style={{color: 'red'}}>Please Enter a Time Sheet Id</p>}
                <br></br><br></br>

                <label htmlFor = "date start"> Date Start: </label>
                <input type = "date" id = "date start" defaultValue = {updatePayStub.dateStart} {...register(`dateStart`, {required: true})}></input> 
                {errors.dateStart && <p style={{color: 'red'}}>Please Enter a Date Start</p>}
                <br></br><br></br>

                <label htmlFor = "date end"> Date End: </label> 
                <input type = "date" id = "date end" defaultValue = {updatePayStub.dateEnd} {...register(`dateEnd`, 
                    {required: true, validate: (value) => new Date(value) >= new Date(startDate) })}></input> 
                {errors.dateEnd && <p style={{color: 'red'}}>Please Enter a Date End or it needs to be Greater Than or Equal To Date Start</p>}
                <br></br><br></br>

                <label htmlFor = "pay stub date"> Pay Stub Date: </label>
                <input type = "date" id = "pay stub date" {...register(`payStubDate`)}></input> 
                <br></br><br></br>

                {/* Clear Button that resets the form*/}
                <div style={{ marginTop: '50px', marginBottom: '50px' }}>
                    <button style={{ backgroundColor: 'yellow', color: 'black', padding: '10px 20px', border: 'none', borderRadius: '5px' , margin: '10px'}}
                        type = "button"
                        onClick={() => {reset({timesheetId1: 0, timesheetId2: 0, dateEnd: "", dateStart: "", payStubDate: ""});}} >
                        Clear
                    </button>
                        
                    {/* Submit button to Update Pay Stub Record */}
                    <button style={{ backgroundColor: 'green', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', margin: '10px' }} 
                    type= "button"
                    onClick={handleInitialSubmit}>Save/Submit</button>
                </div>

                {showConfirm && (
                    <div>
                        <p>Are you sure you want to submit?</p>
                        <button style={{ backgroundColor: 'orange', color: 'black', padding: '10px 20px', border: 'none', borderRadius: '5px' , margin: '10px'}}
                                onClick={handleSubmit(onSubmit)}>Yes, Save/Submit</button>

                        <button style={{ backgroundColor: 'orange', color: 'black', padding: '10px 20px', border: 'none', borderRadius: '5px' , margin: '10px'}}
                                onClick={handleCancelConfirm}>Cancel</button>
                    </div>
                )}
            </form>

             {/* using useNavigate here to take us to the pay stub view page */}
            <br></br>
            <button style={{ backgroundColor: 'red', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px' }} onClick={() => navigate(`/pay-stub-m/${payStub.id}`)}>Cancel</button>

            </div>
        
        </main>
    )

} //end of const TimeOffPage_E


//HELPER CONSTANT 
// table head
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

// data/value
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

//generate checkmark, Xs, or null
function checkMark(v: boolean | null | undefined) 
{
  //Unicode resource -- https://unicode.org/charts//PDF/Unicode-10.0/U100-2B00.pdf
  if (v === true)
  {return "\u2705";}
  else if (v === false)
  {return "\u274C";}

 return  "";
} 



