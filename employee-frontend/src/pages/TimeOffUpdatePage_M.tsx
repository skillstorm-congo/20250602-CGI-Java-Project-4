import { useState } from "react";
import { useEffect } from "react";
import { updateTimeOffRecord } from "../api/api";
import type { timeOffType } from "../types/types";
import { useNavigate} from "react-router-dom";
import { UpdateTimeOffContext} from "../context/UpdateTimeOffContext";
import { useContext } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";

export const TimeOffUpdatePage_M = () => {

    //used to route to view a time off record
    const navigate = useNavigate();

    // in this component, we're merely taking in a value from the context's state
    // useContext(<context name>) pulls in the context
    // we desconstruct the array to pull out what we want
    const updateTimeOff = useContext(UpdateTimeOffContext)?.updateTimeOff;

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
    //setting up local state for the Time Off Object we'll get from the DB 
    const [timeOff, setTimeOff] = useState<timeOffType>(
        {  
            id:  6, //Number.parseInt(params.id as string),
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
        }

    );

    // running the API call when this component loads
    useEffect(() => {
        //if updateTimeOff exists, set it on the page, else show default
        if (updateTimeOff)
            setTimeOff(updateTimeOff);
    }, [updateTimeOff])

    //setting up our React Hook Form
    type Inputs =
    {
        approved: boolean | null,
        approvedDate: string | null 
    }

    //handles the form submission
    const onSubmit: SubmitHandler<Inputs> = formData =>
    {
        //reset the time off object with new update
        timeOff.approved = formData.approved
        timeOff.approvedDate= formData.approvedDate

        //update the new time off record
        updateTimeOffRecord(timeOff.id, timeOff)
            .then(response => {
                    console.log(response)

                    //navigate to Time Off Page
                    navigate('/time-off-m')
                })
                .catch(err => {console.log(err);
                    if (err.status == 404)
                        setError('Time Off Not Updated')
                    })

    }

    //html body
    return (
        <main>
            <h1>Time Off Update Manager</h1>
            <p>A Time Off Request is created by an employee. These requests' state are: not submitted or submitted. If they have been submitted then their state are: not approved or approved.</p>
            <p>Only a manager can approve a time off and once a time off record has been submitted, an employee can no longer 'update' the request.</p>

            {/*Begining of Table*/}
            <h2>Time Off Record</h2>

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
                            
                            <tr key={timeOff.id}>
                                <Td>{timeOff.id}</Td>
                                <Td>{timeOff.employeeId}</Td>
                                <Td>{timeOff.fiscalYearFiscalWeekStart}</Td>
                                <Td>{timeOff.fiscalYearFiscalWeekEnd}</Td>
                                <Td>{timeOff.dateStart}</Td>
                                <Td>{timeOff.dateEnd}</Td>
                                <Td>{timeOff.comment}</Td>
                                <Td>{checkMark(timeOff.approved)}</Td> 
                                <Td>{checkMark(timeOff.submitted)}</Td>
                            </tr>
                        }
                    </tbody>
            </table>
            </div>
            {/*End of Table*/}

            {/*Begining of Form*/}
            <div> 
            <h2>Approve/Decline a Time Off Request</h2>
            <form onSubmit={handleSubmit(handleInitialSubmit)}>
                
                <label htmlFor = "approved"> Check Box to Approve (Uncheck Box to Decline): </label>
                <input type = "checkbox" id = "approved" {...register(`approved`, {required: false})}></input> 
                {errors.approved && <p style={{color: 'red'}}>Please Check the box</p>}
                <br></br><br></br>

                <label htmlFor = "approved date"> Approve/Decline Date: </label>
                <input type = "date" id = "approved date" {...register(`approvedDate`, {required: true})}></input> 
                {errors.approvedDate && <p style={{color: 'red'}}>Please Enter an Approved Date</p>}
                <br></br><br></br>

                {/* Clear Button that resets the form*/}
                <div style={{ marginTop: '50px', marginBottom: '50px' }}>
                    <button style={{ backgroundColor: 'yellow', color: 'black', padding: '10px 20px', border: 'none', borderRadius: '5px' , margin: '10px'}}
                        type = "button"
                        onClick={() => {reset({approvedDate: "", approved:false});}} >
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
} //end of const TimeOffUpdatePage_M


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

//data/value
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

//HELPER FUNCTION
//generate checkmarks, Xs, or null
function checkMark(v: boolean | null | undefined) 
{
  //Unicode resource -- https://unicode.org/charts//PDF/Unicode-10.0/U100-2B00.pdf
  if (v === true)
  {return "\u2705";}
  else if (v === false)
  {return "\u274C";}

 return  "";
} 


