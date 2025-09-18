import { useState } from "react";
import { useEffect } from "react";
import { getAllTimeOff, findByDateTimeOff, findByEmployeeIdTimeOff} from "../api/api";
import type { timeOffType } from "../types/types";
import { useNavigate} from "react-router-dom";


//Tri-State-Select: "selected", "unselected", "somewhat selected or partial"
//helpful in the for useState in the filters for constants submitted/approved
type Tri = "any" | "true" | "false";

export const TimeOffPage_E = () => {

    //setting up navigation to view a time off record
    const navigate = useNavigate();

    //setting up local state for the Time Off Object we'll get from the DB 
    const [timeOff, setTimeOff] = useState<timeOffType[]>(
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

    //CONSTANT - ROW-RECORD STATES for data being transfered for using time off Type 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    //CONSTANT - FILTER STATES for table: employeeId, date, submitted, approved
    const [employeeId, setEmployeeId] = useState<string>("");
    const [date, setDate] = useState<string>(""); // yyyy-mm-dd
    const [submitted, setSubmitted] = useState<Tri>("any");
    const [approved, setApproved] = useState<Tri>("any");

    //FUNCTION 1 of 2: loadTimeOffTable() - will populate findAll() first then call endpoints from controller to filter
    async function loadTimeOffTable() {
        setLoading(true);
        setError(null);

        //the methods() come from the api.ts for filter constants date, managerId, employeeId
        try {
                let response;
                if (date) 
                {response = await findByDateTimeOff(date);} 
                else if (employeeId) 
                {response = await findByEmployeeIdTimeOff(Number(employeeId));} 
                else 
                {response = await getAllTimeOff();}

                //assign the timeOffData with try{}'s response from the data that Axios pulled from endpoints
                //this is what will will populate the table with the response data
                let timeOffData: timeOffType[] = Array.isArray(response.data) ? response.data : []; 
            
                //SUBMITTED-filter Boolean Response (skip if it stays on "any") - Line 156
                if (submitted !== "any") 
                {
                    const wantTrue = (submitted === "true"); //local constant for drop down menu to be a boolean/tri-type, if not "submitted" it'll be FALSE
                    timeOffData = timeOffData.filter(t => (t.submitted === true) === wantTrue); //set time off field to a true response or checkmark when true
                }
                //APPROVED-filter Boolean Response (same logic as above) 
                if (approved !== "any") 
                {
                    const wantTrue = (approved === "true");
                    timeOffData = timeOffData.filter(t => (t.approved === true) === wantTrue);
                }
        
                //the response from the filters updating rows of records/data with useState setRows
                //need to catch errors incase time off can't load the data from db, for now any errors
                setTimeOff(timeOffData);
            }
        catch (e: any) 
        {setError("Failed to load time off");} 
        finally {setLoading(false);}

    }//end of loadTimeOfTable

    //FUNCTION 2 of 2: clearTableFilters() - clear filters and set to "empty" state
    function clearTableFilters() {
        setEmployeeId("");
        setDate("");
        setSubmitted("any");
        setApproved("any");
    }

    //API Call 1 of 1 - retrieve all time off records
    function getTimeOff() 
    {
        getAllTimeOff().then(response => 
            {
                setTimeOff(response.data);
            }
            ).catch(err => {console.log(err);} )
    }

    // running the API call when this component loads
    useEffect(() => {
        loadTimeOffTable(); 
    }, [])

    //html body
    return (
        <main>
            <h1>Time Off Employee</h1>
            <p>A Time Off Request is created by an employee. These requests' state are: not submitted or submitted. If they have been submitted then their state are: not approved or approved.</p>
            <p>Only a manager can approve a time off and once a time off record has been submitted, an employee can no longer 'update' the request.</p>

            {/*Begining of Table*/}
            <h2>Time Off Records</h2>

            {/* BUTTON */}
            <div style={{ display: "flex", gap: ".5rem" }}>
                {/*Create a New Time Off Record */}
                <button onClick={() => navigate(`/time-off/create`)}
                    disabled={loading}>
                    Create a New Time Off Request
                </button>
            </div>
            <br></br><br></br>

            {/* SECTION: Filters above table */}
            <div
                style={{
                display: "grid",
                gap: ".75rem",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                alignItems: "end",
                marginBottom: "1rem",
                }}
            >
                
                <label>
                <div>Employee ID</div>
                <select
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                >
                { 
                    employeeDropDown(timeOff).map(id => 
                    {
                        return(<option key = {id}>{id}</option>)
                    })
                        
                }
                </select>
                </label>

                <label>
                <div>Date</div>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                </label>

                <label>
                <div>Submitted</div> 
                <select
                    value={submitted}
                    onChange={(e) => setSubmitted(e.target.value as Tri)}
                >
                    <option value="any">Any</option> 
                    <option value="true">Submitted</option>
                    <option value="false">Not submitted</option>
                </select>
                </label>

                <label>
                <div>Approved</div> 
                <select
                    value={approved}
                    onChange={(e) => setApproved(e.target.value as Tri)}
                >
                    <option value="any">Any</option> 
                    <option value="true">Approved</option>
                    <option value="false">Not approved</option>
                </select>
                </label>

                {/* BUTTONS */}
                <div style={{ display: "flex", gap: ".5rem" }}>
                    {/* Apply Button that calls function loadTimesheetTable()*/}
                    <button onClick={loadTimeOffTable} disabled={loading}>
                        {loading ? "Loading..." : "Apply filters"}
                    </button>

                    {/* Clear Button that calls function clearTableFilters()*/}
                    <button onClick={() => {clearTableFilters(); getTimeOff();}}
                        disabled={loading}
                    >
                        Clear
                    </button>

                    {/* See All Records Button that calls function loadTimeOffTable()*/}
                    <button onClick={() => {getTimeOff();}} 
                        disabled={loading}
                    >
                        See All Records
                    </button>
                </div>
            </div>
            

            {/* SECTION: Errors */}
            {error && (
                <div
                style={{
                    background: "#ffe6e6",
                    border: "1px solid #ffb3b3",
                    padding: ".75rem",
                    marginBottom: "1rem",
                }}
                >
                {error}
                </div>
            )}

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
                            <Th> View Record</Th>
                        </tr>
                    </thead>

                    <tbody> 
                        {
                            timeOff.map(timeOff =>  
                            {
                                return(
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

                                            <td data-label="Action">
                                            <button onClick={() => navigate(`/time-off/${timeOff.id}`)}>
                                            {"\u279C"} 
                                            </button>
                                            </td>
                                            
                                        </tr>
                                    )

                            })
                        
                        }

                    </tbody>
                </table>
        </div>
        </main>
    )
} //end of const TimeOffPage_E


//HELPER CONSTANTS 
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
// generate checkmark, Xs, or null
function checkMark(v: boolean | null | undefined) 
{
  //Unicode resource -- https://unicode.org/charts//PDF/Unicode-10.0/U100-2B00.pdf
  if (v === true)
  {return "\u2705";}
  else if (v === false)
  {return "\u274C";}

 return  "";
} 

//Employee Id Drop Down 
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