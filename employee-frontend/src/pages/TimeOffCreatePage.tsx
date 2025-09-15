import { useState } from "react";
import { useEffect } from "react";
import { findByIdTimeOff, getAllTimeOff} from "../api/api";
import type { timeOffType } from "../types/types";
import { useNavigate, } from "react-router-dom";
import { useForm, useFormState, type SubmitHandler } from "react-hook-form";

{/* To Do: 
- fix the employee drop down function
- fix onSubmit funciton , call on updateTimeOff
- navigate to time off page
- 'are you sure you want to submit/update request?'
- 'clear' button
*/}

export const TimeOffCreatePage = () => {

    //used to route to view a time off record
    const navigate = useNavigate();

    //variables for React Hook From
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({ mode: 'all'});

    //setting up local state for the Time Off Object we're going to send to the DB 
    const [timeOff, setTimeOff] = useState<timeOffType>(
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

    //setting up local variables to get all time off records
    const [timeOffs, setTimeOffs] = useState<timeOffType[]>();

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
        setTimeOff(timeOff); //see default value
    }, [])

        //setting up our React Hook Form
    type Inputs = {

    }

    //handles the form submission
    const onSubmit: SubmitHandler<Inputs> = formData =>
    {

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
        
        </div> {/*End of Table*/}

           {/*Begining of Form*/}
            <div> 
            <h2>Create a Time Off Request Form</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* employeeid, dateStart, dateEnd, comment, submitted, submittedDate */}

                {/* employeeid will be deleted once user log in is configured */}
                <label htmlFor = "employee id"> Employee Id: </label>
                <select name = "employeeId" id = "employee id">
                { 
                    employeeDropDown(timeOffs).map(id => 
                    {
                        return(<option>{id}</option>)
                    })    
                }
                
                </select>
                <br></br><br></br>

                <label htmlFor = "date start"> Date Start: </label>
                <input type = "date" id = "date start" name = "dateStart"></input> 
                <br></br><br></br>

                <label htmlFor = "date end"> Date End: </label> 
                <input type = "date" id = "date end" name = "dateEnd"></input> 
                <br></br><br></br>

                <label htmlFor = "comment"> Comment: </label> 
                <input type = "text" id = "comment" name = "comment" size = {100}></input>
                <br></br><br></br>

                <label htmlFor = "submitted"> Check Box to Submit: </label>
                <input type = "checkbox" id = "submitted" name = "submitted"></input> 
                <br></br><br></br>

                <label htmlFor = "submitted date"> Submitted Date: </label>
                <input type = "date" id = "submitted date" name = "submittedDate"></input> 
                <br></br><br></br>

                {/* Submit button to Update Time Off Record */}
                <div style={{ marginTop: '50px', marginBottom: '50px' }}>
                    <input style={{ backgroundColor: 'green', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px' }} type="submit" />
                </div>

            
            </form>
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

    //get all unique ids in the array
    const uniqueIds = [...new Set(allIds)];

    return uniqueIds;
}


