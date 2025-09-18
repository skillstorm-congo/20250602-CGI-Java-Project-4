import { useState } from "react";
import { useEffect } from "react";
import type { payStubType, TimesheetType} from "../types/types";
import { useNavigate, } from "react-router-dom";
import { useForm, type SubmitHandler } from "react-hook-form";
import { createPayStub, getAllPayStub, findTimesheetsByEmployeeId, findEmployeeIdsByManagerId } from "../api/api";

export const PayStubCreatePage_M = () => {

    //setting up local state for the timesheetTable we'll get from the DB via api call
    const [timesheetTable, setTimesheetTable] = useState(<></>)

    //setting up local state for the Pay Stub Object we'll get from the DB 
    let getTimesheets : TimesheetType[];

    //setting up local state for manager id user selection
    const [managerId, setManagerId] = useState<string>("");
    const [employeeIds, setEmployeeIds] = useState<number[]>([6, 66, 666]);

    //used to route to view a pay stub record
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

    //setting up local variables to get all pay stub records for unique list of employee ids 
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
                payStubDate: "2025-08-08", 
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
                payStubDate: "2025-28-08",
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

    //FUNCTION - get a list of employee ids associated to a manager id for employee drop down box in the form
    function getEmployeesIds( managerId: number)
    {
        findEmployeeIdsByManagerId(managerId).then(response =>
        {
            setEmployeeIds(response.data); 
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

        //create a new pay stub record
        createPayStub(payStub)
            .then(response => {
                    console.log(response)

                    //navigate to pay stub m Page
                    navigate('/pay-stub-m')
                })
                .catch(err => {console.log(err);
                    if (err.status == 404)
                        setError('Pay Stub Not Created')
                    })
    }
    
    //FUNCTION - Generate a table of time sheets based on employee id for the form
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
            <h1>Pay Stub Create Manager</h1>
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

            {/*Manager Id Selection*/}
            <div>
            <br></br>
            <label>
                <div>Manager ID</div>
                <select
                    value={managerId}
                    onChange={(e) => {setManagerId(e.target.value); getEmployeesIds(Number(e.target.value));}}
                >
                <option value="" disabled hidden>Select an Id...</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                </select>
            </label>
            <br></br><br></br>
            </div>

            <div>
            {/*Begining of Timesheet(s)Table*/}
            <h3>Available Timesheet(s) For Employee</h3>

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
                        createTimesheetTbl(e.target.value)
                    }

                })}>
                { 
                    employeeIds.map(id => 
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
                    
                {/* Submit button to submit Pay Stub Record */}
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
} //end of const PayStubCreatePage_M


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

//HELPER FUNCTION - Pay Stub Ids NOT AVAILABLE
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

//HELPER FUNCTION - Generate a random postive integer for Pay Stub Id
function generateId(data:payStubType[])
{
    let valid = true;
    let randomNum = 0;

    do {
        //generate a random positive integer, returns a random integer from 1 to 500:
        randomNum = Math.floor(Math.random() * 500) + 1;

        //get pay stub record ids that are NOT AVAILABLE, if new random number is in the list, generate new number
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





