import { useState } from "react";
import { useEffect } from "react";
import { findByIdTimeOff, deleteTimeOff} from "../api/api";
import type { timeOffType } from "../types/types";
import { useNavigate, useParams} from "react-router-dom";
import { UpdateTimeOffContext } from "../context/UpdateTimeOffContext";
import { useContext } from "react";

export const TimeOffViewPage = () => {

    //used to route to view a time off record
    const navigate = useNavigate();

    //getting access to our time off with useParams()
    const params = useParams();

    // we don't need the first element in the array (updateTimeOffContext), so we skip it!
    const setUpdateTimeOff = useContext(UpdateTimeOffContext)?.setUpdateTimeOff;

    //setting up local state for the Time Off Object we'll get from the DB 
    const [timeOff, setTimeOff] = useState<timeOffType>(
        {  
            id:  Number.parseInt(params.id as string),
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

    //API Call 1 of 2 - retrieve a time off record
    function getTimeOff() 
    {
        findByIdTimeOff(timeOff.id).then(response => 
            {
                setTimeOff(response.data);

                if (setUpdateTimeOff)
                    setUpdateTimeOff(response.data);
            }
            ).catch(err => {console.log(err);} )
    }

    //API Call 2 of 2 - delete a time off record
    function deleteTimeOffRecord() 
    {
        deleteTimeOff(timeOff.id).then(response => 
            {
                setTimeOff(response.data);
                navigate(`/time-off-e`);
            }
            ).catch(err => {console.log(err);} )
    }

    // running the API call when this component loads
    useEffect(() => {
        getTimeOff();  
    }, [])

    //html body
    return (
        <main>
            <h1>Time Off View Employee</h1>
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
                            <Th> Update </Th>
                            <Th> Delete </Th>
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

                                {/* if submitted is false or null, then the record can still be updated */}
                                <td data-label="Action">
                                    { 
                                        timeOff.submitted ? 
                                            <button>{"\u{1F6D1}"}</button>
                                            : 
                                            <button onClick={() => navigate(`update`)}>{"\u279C"}</button>
                                    }
                                </td>

                                {/* if submitted is false or null, then the record can still be deleted */}
                                <td data-label="Action">
                                    { 
                                        timeOff.submitted ? 
                                            <button>{"\u{1F6D1}"}</button>
                                            : 
                                            <button onClick={() => deleteTimeOffRecord() }>{"\u279C"}</button>
                                    }
                                </td>
                                
                            </tr>
                        }

                    </tbody>
                </table>
        </div>

        </main>
    )

} //end of const TimeOffViewPage


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


