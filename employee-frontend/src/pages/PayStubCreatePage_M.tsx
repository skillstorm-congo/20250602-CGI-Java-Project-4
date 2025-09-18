import { useState } from "react";
import { useEffect } from "react";
import type { payStubType, TimesheetType} from "../types/types";
import { useNavigate, } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { createPayStub, getAllPayStub, findTimesheetsByEmployeeId } from "../api/api";

export const PayStubCreatePage_M = () => {

    //setting up local state for the timesheetTable we'll get from the DB via api call
    const [timesheetTable, setTimesheetTable] = useState(<></>)

    //setting up local state for the Pay Stub Object we'll get from the DB 
    let getTimesheets : TimesheetType[];

    const [timesheets, setTimesheets] = useState<TimesheetType[]>(
        [  
            {  
                id: 6,
                employeeId: 66,
                fiscalYearFiscalWeek: "202535",
                totalRegularHours: 40,
                totalOvertimeHours: 2,
                totalTimeOffHours: 0,
                dateStart: "2025-08-25", 
                dateEnd: "2025-08-29",
                submitted: true,
                submittedDate: "2025-08-29",
                approved: true,
                approvedDate: "2025-09-02",
                comment: null,
                timeOffId: null,
                regularHoursDay1: 8,
                regularHoursDay2: 8,
                regularHoursDay3: 8,
                regularHoursDay4: 8,
                regularHoursDay5: 8,
                overtimeHoursDay1: 0,
                overtimeHoursDay2: 0,
                overtimeHoursDay3: 2,
                overtimeHoursDay4: 0,
                overtimeHoursDay5: 0,
                timeOffHoursDay1: 0,
                timeOffHoursDay2: 0, 
                timeOffHoursDay3: 0,
                timeOffHoursDay4: 0,
                timeOffHoursDay5: 0,
            }
    ]
    );
    
    //used to route to view a time off record
    const navigate = useNavigate();

    //variables for React Hook From
    const { register, handleSubmit, watch, formState: { errors } , reset} = useForm<Inputs>({ mode: 'all'});

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

    //setting up local state for the Pay Stub Object we're going to send to the DB 
    const [payStubExample, setPayStubExample] = useState<payStubType>(
        {  
            id: 6,
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

    //setting up local variables to get all time off records for unique list of employee ids and time off request ids
    const [payStubs, setPayStubs] = useState<payStubType[]>(
        [  
            {  
                id: 6,
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
            },
            {
                id: 666,
                employeeId: 66666,
                timesheetId1: 10,
                timesheetId2: 20,
                fiscalYearFiscalWeekStart: "202531",
                fiscalYearFiscalWeekEnd: "202532",
                dateStart: "2025-07-28",
                dateEnd: "2025-08-08",
                payStubDate: "2025-28-08", //null,
                totalRegularHours: 40,
                totalOvertimeHours: 0,
                totalTimeOffHours: 0,
                totalPaid: 5698.25
            } 
            
        ]
    );

    //using our API method to retrieve all pay stub records
    function getPayStubs() 
    {
        getAllPayStub().then(response => 
            {
                setPayStubs(response.data);
            }
            ).catch(err => {console.log(err);} )
    }

    // running the API call when this component loads
    useEffect(() => {
        getPayStubs();  
        setPayStubExample(payStubExample); //see default value
    }, [])

    //setting up our React Hook Form
    type Inputs = 
    {
        employeeId: number,
        timesheetId1: number,
        timesheetId2: number,
        dateStart: string,
        dateEnd: string,
        payStubDate: string | null,
    }

    //watch the dateStart so we can validate that date start is <= date end in the form
    const startDate = watch('dateStart');

    //handles the form submission
    const onSubmit: SubmitHandler<Inputs> = formData =>
    {
        //create a pay stub object to send to DB 
        //generate an pay stub record id
        let newId = generateId(payStubs);

        //create a new pay stub object
        const payStub = 
        {
            id: newId,
            employeeId: formData.employeeId,
            timesheetId1: formData.timesheetId1,
            timesheetId2: formData.timesheetId2,
            dateStart: formData.dateStart,
            dateEnd: formData.dateEnd,
            payStubDate: formData.payStubDate,
        }

        //create a new time off record
        createPayStub(payStub)
            .then(response => {
                    console.log(response)

                    //navigate to Time Off Page
                    navigate('/pay-stub-m')
                })
                .catch(err => {console.log(err);
                    if (err.status == 404)
                        setError('Pay Stub Not Created')
                    })

    }
    
    // //call function to get all time sheet(s) associated to an employee id
    //  async function getTimeSheets(employeeId: number) 
    //  {    
    //     await findTimesheetsByEmployeeId(employeeId).then(response => 
    //                 {
    //                     console.log(response.data)
    //                     setTimesheets(response.data);
    //                 }
    //                 ).catch(err => {console.log(err);} )
    // }

    // //FUNCTION - Generate a table of time sheets based on employee id for the form
    // async function createTimesheetTbl(employeeId: string | number | undefined)
    // {
    //     console.log("employeeId out of switch:  " + employeeId)
    //     console.log("typeof:  " + typeof employeeId)

    //     switch(employeeId)
    //     {
    //         case 0: //default employee id drop down
    //                 console.log("employeeId case 0:  " + employeeId)
    //                 return ("No Timesheets Available for Pay Stub choose another Employee Id");
                
    //         case 66: //default value for example
    //                 console.log("employeeId case 66:  " + employeeId)
    //                 return ("No Timesheets Available for Pay Stub choose another Employee Id");


    //         case "0": //default employee id drop down
    //                 console.log("employeeId case string 0:  " + employeeId)
    //                 return ("No Timesheets Available for Pay Stub choose another Employee Id");

                
    //         case "66": //default value for example
    //                 console.log("employeeId case string 66:  " + employeeId)
    //                 return ("No Timesheets Available for Pay Stub choose another Employee Id");

    //         case undefined:
    //                 console.log("employeeId case undefined:  " + employeeId)
    //                 return ("No Timesheets Available for Pay Stub choose another Employee Id");

    //         default:
    //             console.log("In get time sheets. ")
    //             console.log("employeeId default:  " + employeeId)

    //             //make sure if it came in as a string to convert it to a number
    //             if (typeof employeeId === "string")
    //                 employeeId = parseInt(employeeId);

    //             //call function to get all time sheet(s) associated to an employee id
    //             await getTimeSheets(employeeId);

                

    //             //take a look at timeSheets - uses default value till the end
    //             console.log("timeSheets: " + timesheets)
    //             console.log("timeSheets length: " + timesheets.length)

    //             timesheets.forEach(t => console.log(JSON.stringify(t, null, 2)));

    //             //time sheet must be 'approved' = true, filter out
    //             const approvedTimesheets = timesheets.filter(t => t.approved); 

    //             //sort approvedTimesheets by date start ascending order(oldest at the bottom)
    //             approvedTimesheets.sort((a, b) => 
    //                 {
    //                     const dateA = new Date(a.dateStart);
    //                     const dateB = new Date(b.dateStart);

    //                     return (dateB.getTime() - dateA.getTime());
    //                 });

    //             console.log("approved timeSheets: " + approvedTimesheets)
    //             console.log("approved timeSheets length: " + approvedTimesheets.length)

    //             for (let timesheet in approvedTimesheets)
    //             {
    //                 console.log(JSON.stringify(timesheet, null, 2))
    //             }

    //             //if approvedTimeSheets is not empty, create table, else do not create table *employee id 39 has no timesheets
    //             if (approvedTimesheets.length >= 1)
    //             {
    //                 //create table
    //                 setTimesheetTable
    //                 ( <div>
    //                     <table>
    //                     <thead>
    //                     <tr>
    //                         <Th>ID</Th>
    //                         <Th>Employee</Th>
    //                         <Th>Week</Th>
    //                         <Th>Start</Th>
    //                         <Th>End</Th>
    //                         <Th>Submitted</Th>
    //                         <Th>Approved</Th>
    //                     </tr>
    //                     </thead>
    //                         <tbody>
    //                         {/* Render table rows based on myDataField */}
    //                         {approvedTimesheets.map((t) => (
    //                             <tr key={t.id}>
    //                             <Td>{t.id}</Td>
    //                             <Td>{t.employeeId}</Td>
    //                             <Td>{t.fiscalYearFiscalWeek != null ? String(t.fiscalYearFiscalWeek) : ""}</Td>
    //                             <Td>{t.dateStart}</Td>
    //                             <Td>{t.dateEnd}</Td>
    //                             <Td style={{ textAlign: "center" }}>{checkMark(t.submitted)}</Td>
    //                             <Td style={{ textAlign: "center" }}>{checkMark(t.approved)}</Td>
    //                             </tr>
    //                         ))}
    //                         </tbody>
    //                     </table>
    //                 </div>
    //                 )

    //             }
    //             else
    //                 return ("No Timesheets Available for Pay Stub choose another Employee Id");
            
    //     }
        
    // }

    //FUNCTION - Generate a table of time sheets based on employee id for the form
    async function createTimesheetTbl(employeeId: string | number | undefined)
    {
        switch(employeeId)
        {
            case "0": //default employee id drop down
                    console.log("employeeId case string 0:  " + employeeId)
                    setTimesheetTable(<p>No Timesheets Available for Pay Stub choose another Employee Id</p>)
                    break;

            case undefined:
                    console.log("employeeId case undefined:  " + employeeId)
                    setTimesheetTable(<p>No Timesheets Available for Pay Stub choose another Employee Id</p>)
                    break;

            default:
                console.log("In switch get time sheets. ")
                console.log("employeeId default:  " + employeeId)
                console.log("typeof:  " + typeof employeeId)

                //if employeeId is string, convert to a number
                if (typeof employeeId === "string")
                    employeeId = parseInt(employeeId);

                //call function to get all time sheet(s) associated to an employee id
                await findTimesheetsByEmployeeId(employeeId).then(response => 
                    {
                        setTimesheets(response.data);

                        //get the timesheet array and use immediately
                        getTimesheets = response.data;

                        //take a look at the timesheet response
                        // getTimesheets.forEach(t => console.log(JSON.stringify(t, null, 2)));

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
 
        }//end of switch statement
        
    }//end of createTimesheetTable function


    //html body
    return (
        <main>
            <h1>Pay Stub Create Page</h1>
            <p>A Pay Stub is created by a manager. The state is pay stub date. If pay stub date is null, pay stub has NOT been PAID OUT.</p>

            {/*Begining of Table*/}
            <h2>Example of a Pay Stub Record</h2>

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
                            <tr key={payStubExample.id}>
                                <Td>{payStubExample.employeeId}</Td>
                                <Td>{payStubExample.timesheetId1}</Td>
                                <Td>{payStubExample.timesheetId2}</Td>
                                <Td>{payStubExample.fiscalYearFiscalWeekStart}</Td>
                                <Td>{payStubExample.fiscalYearFiscalWeekEnd}</Td>
                                <Td>{payStubExample.dateStart}</Td>
                                <Td>{payStubExample.dateEnd}</Td>
                                <Td>{payStubExample.payStubDate}</Td>
                                <Td>{payStubExample.totalRegularHours}</Td>
                                <Td>{payStubExample.totalOvertimeHours}</Td>
                                <Td>{payStubExample.totalTimeOffHours}</Td>
                                <Td>{payStubExample.totalPaid}</Td>
                            </tr>
                        }

                    </tbody>
                </table>
        
            </div> {/*End of Table*/}

            <div>
            {/*Begining of Timesheet(s)Table*/}
            <h2>Available Timesheet(s)</h2>

            {/* create a table for available time sheets for an employee id */}
            {timesheetTable}
            </div>

           {/*Begining of Form*/}
            <div> 
            <h2>Create a Pay Stub Form</h2>
            <form onSubmit={handleSubmit(handleInitialSubmit)}> {/* {handleSubmit(onSubmit)}> */}

                {/* employeeid will be deleted once user log in is configured */}
                <label htmlFor = "employee id"> Employee Id: </label>
                <select id = "employee id" {...register(`employeeId`, 
                {
                    onChange:(e) => {
                        //setEmployeeId(e.target.value)
                        createTimesheetTbl(e.target.value)
                    }

                })}>
                { 
                    employeeDropDown(payStubs).map(id => 
                    {
                        return(<option key = {id}>{id}</option>)
                    })    
                }
                </select>
                <br></br><br></br>

                <label htmlFor = "time sheet id 1"> Time Sheet Id 1: </label> 
                <input type = "text" id = "time sheet id 1" size = {100} {...register(`timesheetId1`, {required: true, maxLength:200})}></input>
                {errors.timesheetId1 && <p style={{color: 'red'}}>Please Enter a Time Sheet Id</p>}
                <br></br><br></br>

                <label htmlFor = "time sheet id 2"> Time Sheet Id 2: </label> 
                <input type = "text" id = "time sheet id 2" size = {100} {...register(`timesheetId2`, {required: false, maxLength:200})}></input>
                {errors.timesheetId2 && <p style={{color: 'red'}}>Please Enter a Time Sheet Id</p>}
                <br></br><br></br>

                <label htmlFor = "date start"> Date Start: </label>
                <input type = "date" id = "date start" {...register(`dateStart`, {required: true})}></input> 
                {errors.dateStart && <p style={{color: 'red'}}>Please Enter a Date Start</p>}
                <br></br><br></br>

                <label htmlFor = "date end"> Date End: </label> 
                <input type = "date" id = "date end" {...register(`dateEnd`, 
                    {required: true, validate: (value) => new Date(value) >= new Date(startDate)})}></input> 
                {errors.dateEnd && <p style={{color: 'red'}}>Please Enter a Date End or it needs to be Greater Than or Equal To Date Start</p>}
                <br></br><br></br>

                <label htmlFor = "pay stub date"> Pay Stub Date: </label>
                <input type = "date" id = "pay stub date" {...register(`payStubDate`)}></input> 
                <br></br><br></br>

                {/* Clear Button that resets the form*/}
                <div style={{ marginTop: '50px', marginBottom: '50px' }}>
                <button style={{ backgroundColor: 'yellow', color: 'black', padding: '10px 20px', border: 'none', borderRadius: '5px' , margin: '10px'}}
                    type = "button"
                    onClick={() => {reset({employeeId: 0, timesheetId1: 0, timesheetId2: 0, dateEnd: "", dateStart: "", payStubDate: ""});}} >
                    Clear
                </button>
                    
                {/* Submit button to Update Time Off Record */}
                    <input style={{ backgroundColor: 'green', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', margin: '10px' }} type="submit" />
                </div>  

                {showConfirm && (
                    <div>
                    <p>Are you sure you want to submit?</p>
                    <button style={{ backgroundColor: 'orange', color: 'black', padding: '10px 20px', border: 'none', borderRadius: '5px' , margin: '10px'}}
                            onClick={handleSubmit(onSubmit)}>Yes, Submit</button>

                    <button style={{ backgroundColor: 'orange', color: 'black', padding: '10px 20px', border: 'none', borderRadius: '5px' , margin: '10px'}}
                            onClick={handleCancelConfirm}>Cancel</button>
                    </div>
                )}

                        
            </form>

            {/* using useNavigate here to take us to the home page */}
            <br></br>
            <button style={{ backgroundColor: 'red', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px' }} onClick={() => navigate(`/pay-stub-m`)}>Cancel</button>

            </div>

        </main>
    )

} //end of const TimeOffPage_E


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

//HELPER FUNCTION - Employee Id Drop Down 
function employeeDropDown(data:payStubType[])
{
    //set up an empty array
    const allIds:number[] = [];

    //add all employee id to an array
    data.forEach(element => 
    {
        allIds.push(element.employeeId);
        
    } )

    //add "0" for clear state
    allIds.push(0);

    //get all unique ids in the array
    const uniqueIds = [...new Set(allIds)];

    return uniqueIds;
}

//HELPER FUNCTION - Time Off Ids NOT AVAILABLE
function usedIds(data:payStubType[])
{
    //set up an empty array
    const allIds:number[] = [];

    //add all employee id to an array
    data.forEach(element => 
    {
        allIds.push(element.id);
    } )

    //get all unique ids in the array
    const uniqueIds = [...new Set(allIds)];

    return uniqueIds;
}

//HELPER FUNCTION - Generate a random postive integer for Time Off Id
function generateId(data:payStubType[])
{
    let valid = true;
    let randomNum = 0;

    do {
        //generate a random positive integer, returns a random integer from 1 to 500:
        randomNum = Math.floor(Math.random() * 500) + 1;

        //get time off record ids that are NOT AVAILABLE, if new random number is in the list, generate new number
        valid = usedIds(data).includes(randomNum) ? true : false;
        
    }while(valid)

    return randomNum;
}

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





