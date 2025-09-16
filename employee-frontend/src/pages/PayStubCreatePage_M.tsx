import { useState } from "react";
import { useEffect } from "react";
import type { payStubType, timeOffType } from "../types/types";
import { useNavigate, } from "react-router-dom";
import { useForm, useFormState, type SubmitHandler } from "react-hook-form";
import { getAllTimeOff, createTimeOff } from "../api/api";

{/* To Do: 
- fix onSubmit funciton , call on createPayStub - pending CORS issue review with Jon 9.16.25
*/}

export const PayStubCreatePage_M = () => {

    //used to route to view a time off record
    const navigate = useNavigate();

    //variables for React Hook From
    const { register, handleSubmit, formState: { errors } , reset} = useForm<Inputs>({ mode: 'all'});

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
    const [timeOffs, setTimeOffs] = useState<timeOffType[]>(
        [  
            {  
                id: 6,
                employeeId: 66,
                fiscalYearFiscalWeekStart: "202544",
                fiscalYearFiscalWeekEnd: "202544",
                dateStart: "2025-10-30",
                dateEnd: "2025-10-31",
                comment: "Vacation",
                approved: true,
                approvedDate: null,
                submitted: false,
                submittedDate: null    
            },
            {
                id: 666,
                employeeId: 6666,
                fiscalYearFiscalWeekStart: "202544",
                fiscalYearFiscalWeekEnd: "202544",
                dateStart: "2025-10-30",
                dateEnd: "2025-10-31",
                comment: "BBQ",
                approved: false,
                approvedDate: null,
                submitted: true,
                submittedDate: null   
            }
        ]
    );

    //using our API method to retrieve all time off records
    function getTimeOffs() 
    {
        getAllTimeOff().then(response => 
            {
                setTimeOffs(response.data);
            }
            ).catch(err => {console.log(err);} )
    }

    // running the API call when this component loads
    useEffect(() => {
        getTimeOffs();  
        setPayStubExample(payStubExample); //see default value
    }, [])

    //setting up our React Hook Form
    type Inputs = 
    {
        employeeId: number,
        dateStart: string,
        dateEnd: string,
        comment: string,
        submitted: boolean | null,
        submittedDate: string | null 
    }


    //handles the form submission
    const onSubmit: SubmitHandler<Inputs> = formData =>
    {
        console.log("We are in onSubmit - handles form submission")

        //create a time off object to send to DB to create
        //generate an time off record id
        let newId = generateId(timeOffs);

        //create a new time off object
        const timeOff = 
        {
            id: newId,
            employeeId:formData.employeeId,
            dateStart: formData.dateStart,
            dateEnd: formData.dateEnd,
            comment: formData.comment,
            submitted: formData.submitted,
            submittedDate: formData.submittedDate
        }

        //check out in the console if the object is returning what is expected
        console.log("New Time Off Object: " + JSON.stringify(timeOff, null, 2));

        //create a new time off record
        createTimeOff(timeOff)
            .then(response => {
                    console.log(response)

                    //navigate to Time Off Page
                    navigate('/time-off-e')
                })
                .catch(err => {console.log(err);
                    if (err.status == 404)
                        setError('Time Off Not Submitted')
                    })

    }

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

           {/*Begining of Form*/}
            <div> 
            <h2>Create a Pay Stub Form</h2>
            <form onSubmit={handleSubmit(handleInitialSubmit)}> {/* {handleSubmit(onSubmit)}> */}
                {/* 	
                public PayStub(int id, int employeeId, int timesheetId1, Integer timesheetId2, LocalDate dateStart, LocalDate dateEnd, LocalDate payStubDate) {
                super();
                this.id = id;
                this.employeeId = employeeId;
                this.timesheetId1 = timesheetId1;
                this.timesheetId2 = timesheetId2;
                this.dateStart = dateStart;
                this.dateEnd = dateEnd;
                this.payStubDate = payStubDate;
            }
*/}

                {/* employeeid will be deleted once user log in is configured */}
                <label htmlFor = "employee id"> Employee Id: </label>
                <select id = "employee id" {...register(`employeeId`)}>
                { 
                    employeeDropDown(timeOffs).map(id => 
                    {
                        return(<option key = {id}>{id}</option>)
                    })    
                }
                </select>
                <br></br><br></br>

                <label htmlFor = "date start"> Date Start: </label>
                <input type = "date" id = "date start" {...register(`dateStart`, {required: true})}></input> 
                {errors.dateStart && <p style={{color: 'red'}}>Please Enter a Date Start</p>}
                <br></br><br></br>

                <label htmlFor = "date end"> Date End: </label> 
                <input type = "date" id = "date end" {...register(`dateEnd`, {required: true})}></input> 
                {errors.dateEnd && <p style={{color: 'red'}}>Please Enter a Date End</p>}
                <br></br><br></br>

                <label htmlFor = "comment"> Comment: </label> 
                <input type = "text" id = "comment" size = {100} {...register(`comment`, {required: true, maxLength:200})}></input>
                {errors.comment && <p style={{color: 'red'}}>Please Enter a Comment, " " is valid</p>}
                <br></br><br></br>

                <label htmlFor = "submitted"> Check Box to Submit: </label>
                <input type = "checkbox" id = "submitted" {...register(`submitted`)}></input> 
                <br></br><br></br>

                <label htmlFor = "submitted date"> Submitted Date: </label>
                <input type = "date" id = "submitted date" {...register(`submittedDate`)}></input> 
                <br></br><br></br>

                {/* Clear Button that resets the form*/}
                <div style={{ marginTop: '50px', marginBottom: '50px' }}>
                <button style={{ backgroundColor: 'yellow', color: 'black', padding: '10px 20px', border: 'none', borderRadius: '5px' , margin: '10px'}}
                    type = "button"
                    onClick={() => {reset({employeeId: 0, comment: "", dateEnd: "", dateStart: "", submittedDate: "", submitted:false});}} >
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
            <button style={{ backgroundColor: 'red', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px' }} onClick={() => navigate(`/time-off-e`)}>Cancel</button>

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
function employeeDropDown(timeOffData :timeOffType[])
{
    //set up an empty array
    const allIds:number[] = [];

    //add all employee id to an array
    timeOffData.forEach(timeOff => 
    {
        allIds.push(timeOff.employeeId);
        
    } )

    //add "0" for clear state
    allIds.push(0);

    //get all unique ids in the array
    const uniqueIds = [...new Set(allIds)];

    return uniqueIds;
}

//HELPER FUNCTION - Time Off Ids NOT AVAILABLE
function usedIds(timeOffData :timeOffType[])
{
    //set up an empty array
    const allIds:number[] = [];

    //add all employee id to an array
    timeOffData.forEach(timeOff => 
    {
        allIds.push(timeOff.id);
    } )

    //get all unique ids in the array
    const uniqueIds = [...new Set(allIds)];

    return uniqueIds;
}

//HELPER FUNCTION - Generate a random postive integer for Time Off Id
function generateId(timeOffs:timeOffType[])
{
    let valid = true;
    let randomNum = 0;

    do {
        //generate a random positive integer, returns a random integer from 1 to 500:
        randomNum = Math.floor(Math.random() * 500) + 1;

        //get time off record ids that are NOT AVAILABLE, if new random number is in the list, generate new number
        usedIds(timeOffs).includes(randomNum) ? valid=true : valid = false;
        
    }while(valid)

    return randomNum;
}




