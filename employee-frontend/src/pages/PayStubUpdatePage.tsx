import { useState } from "react";
import { useEffect } from "react";
import { updatePayStubRecord, getAllPayStub} from "../api/api";
import type { payStubType } from "../types/types";
import { useNavigate} from "react-router-dom";
import { updatePayStubContext } from "../context/updatePayStubContext";
import { useContext } from "react";
import { useForm, useFormState, type SubmitHandler } from "react-hook-form";

{/* To Do: 
- fix onSubmit funciton , call on updatePayStubRecord - pending CORS issue review with Jon 9.16.25
*/}


export const PayStubUpdatePage = () => {

    //used to route to view a time off record
    const navigate = useNavigate();

    // in this component, we're merely taking in a value from the context's state
    // useContext(<context name>) pulls in the context
    // we desconstruct the array to pull out what we want
    const [ updatePayStub ] = useContext(updatePayStubContext);

    //variables for React Hook From
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>({ mode: 'all'});

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
    
    //using our API method to retrieve all time off records
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
        getPayStubs() 

        //if updateTimeOff exists, set it on the page, else show default
        if (updatePayStub)
            setPayStub(updatePayStub);
    }, [updatePayStub])

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

    //handles the form submission
    const onSubmit: SubmitHandler<Inputs> = formData =>
    {
        console.log("We are in onSubmit - handles form submission")

        //reset the pay stub object with new update
        payStub.employeeId = formData.employeeId
        payStub.timesheetId1 = formData.timesheetId1
        payStub.timesheetId2 = formData.timesheetId2
        payStub.dateStart = formData.dateStart
        payStub.dateEnd = formData.dateEnd
        payStub.payStubDate = formData.payStubDate
        
        //check out in the console if the object is returning what is expected
        console.log("New Pay Stub Object: " + JSON.stringify(payStub, null, 2));

        //update the new time off record
       updatePayStubRecord(payStub.id)
            .then(response => {
                    console.log(response)

                    //navigate to Time Off Page
                    navigate('/time-off-e')
                })
                .catch(err => {console.log(err);
                    if (err.status == 404)
                        setError('Time Off Not Updated')
                    })

    }

    //html body
    return (
        <main>
            <h1>Pay Stub Update Page</h1>
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

            {/*Begining of Form*/}
            <div> 
            <h2>Update a Pay Stub Form</h2>
            <form onSubmit={handleSubmit(handleInitialSubmit)}>
                
                {/* employeeid will be deleted once user log in is configured */}
                <label htmlFor = "employee id"> Employee Id: </label>
                <select id = "employee id" {...register(`employeeId`)}>
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
                <input type = "date" id = "date end" {...register(`dateEnd`, {required: true})}></input> 
                {errors.dateEnd && <p style={{color: 'red'}}>Please Enter a Date End</p>}
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

             {/* using useNavigate here to take us to the pay stub manager page */}
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


