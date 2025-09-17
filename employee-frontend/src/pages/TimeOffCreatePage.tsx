import { useState } from "react";
import { useEffect } from "react";
import type { timeOffType } from "../types/types";
import { useNavigate, } from "react-router-dom";
import { useForm, useFormState, type SubmitHandler } from "react-hook-form";
import { getAllTimeOff, createTimeOff } from "../api/api";

export const TimeOffCreatePage = () => {

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

    //setting up local state for the Time Off Object we're going to send to the DB 
    const [timeOffExample, setTimeOffExample] = useState<timeOffType>(
        {  
            id:  6,
            employeeId: 66,
            fiscalYearFiscalWeekStart: "202544",
            fiscalYearFiscalWeekEnd: "202544",
            dateStart: "2025-10-30",
            dateEnd: "2025-10-31",
            comment: "Vacation",
            approved: null,
            approvedDate: null,
            submitted: false,
            submittedDate: null    
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
        setTimeOffExample(timeOffExample); //see default value
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

    //watch the dateStart so we can validate that date start is <= date end in the form
    const startDate = watch('dateStart');

    //handles the form submission
    const onSubmit: SubmitHandler<Inputs> = formData =>
    {
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
        //console.log("New Time Off Object: " + JSON.stringify(timeOff, null, 2));

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
            <h1>Time Off Create Page</h1>
            <p>A Time Off Request is created by an employee. These requests' state are: not submitted or submitted. If they have been submitted then their state are: not approved or approved.</p>
            <p>Only a manager can approve a time off and once a time off record has been submitted, an employee can no longer 'update' the request.</p>

            {/*Begining of Table*/}
            <h2>Example of a Time Off Record</h2>

            {/* SECTION: TABLE*/}
            <div style={{ overflowX: "auto" }}>
                <table style={{
                                width: "100%",
                                borderCollapse: "collapse",
                                minWidth: 1000,}} >
                    <thead>
                        <tr>
                            <Th>Id</Th>
                            <Th>Employee Id</Th>
                            <Th> Fiscal Year Fiscal Week Start </Th>
                            <Th> Fiscal Year Fiscal Week End </Th>
                            <Th> Date Start </Th>
                            <Th> Date End </Th>
                            <Th> Comment </Th>
                            <Th> Approved</Th>
                            <Th> Submitted</Th>
                           
                        </tr>
                    </thead>

                    <tbody> 
                        {
                            
                            <tr key={timeOffExample.id}>
                                <Td>{timeOffExample.id}</Td>
                                <Td>{timeOffExample.employeeId}</Td>
                                <Td>{timeOffExample.fiscalYearFiscalWeekStart}</Td>
                                <Td>{timeOffExample.fiscalYearFiscalWeekEnd}</Td>
                                <Td>{timeOffExample.dateStart}</Td>
                                <Td>{timeOffExample.dateEnd}</Td>
                                <Td>{timeOffExample.comment}</Td>
                                <Td>{checkMark(timeOffExample.approved)}</Td> 
                                <Td>{checkMark(timeOffExample.submitted)}</Td>
                            </tr>
                        }

                    </tbody>
                </table>
        
        </div> {/*End of Table*/}

           {/*Begining of Form*/}
            <div> 
            <h2>Create a Time Off Request Form</h2>
            <form onSubmit={handleSubmit(handleInitialSubmit)}> {/* {handleSubmit(onSubmit)}> */}
                {/* employeeid, dateStart, dateEnd, comment, submitted, submittedDate */}

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
                <input type = "date" id = "date end" {...register(`dateEnd`, 
                    {required: true, validate: (value) => new Date(value) >= new Date(startDate)})}></input> 
                {errors.dateEnd && <p style={{color: 'red'}}>Please Enter a Date End or it needs to be Greater Than or Equal To Date Start</p>}
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
        valid = usedIds(timeOffs).includes(randomNum) ? true : false;
        
    }while(valid)

    return randomNum;
}




