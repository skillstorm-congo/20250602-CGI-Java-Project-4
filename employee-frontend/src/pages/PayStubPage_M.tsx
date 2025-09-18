import { useState } from "react";
import { useEffect } from "react";
import { getAllPayStub, findByDatePayStub, findByEmployeeIdPayStub, findByManagerIdPayStub } from "../api/api";
import type { payStubType} from "../types/types";
import { useNavigate} from "react-router-dom";

export const PayStubPage_M = () => {

    //setting up navigation to view a time off record
    const navigate = useNavigate();

    //setting up local state for the Pay Stub Object we'll get from the DB 
    const [payStub, setPayStub] = useState<payStubType[]>(
        [  
            {  
                id: 6,
                employeeId: 66,
                timesheetId1: 666,
                timesheetId2: 6666,
                fiscalYearFiscalWeekStart: "202531",
                fiscalYearFiscalWeekEnd: "202532",
                dateStart: "2025-08-11",
                dateEnd: "2025-08-22",
                payStubDate: "2025-09-02",
                totalRegularHours: 40,
                totalOvertimeHours: 0,
                totalTimeOffHours: 0,
                totalPaid: 100.56
            },
            {
                id: 8,
                employeeId: 88,
                timesheetId1: 8888,
                timesheetId2: 88888,
                fiscalYearFiscalWeekStart: "202531",
                fiscalYearFiscalWeekEnd: "202532",
                dateStart: "2025-08-11",
                dateEnd: "2025-08-22",
                payStubDate: null,
                totalRegularHours: 40,
                totalOvertimeHours: 5,
                totalTimeOffHours: 0,
                totalPaid: 506.98
            }
    ]
    );

    //CONSTANT - ROW-RECORD STATES for data being transfered for using pay stub type
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    //CONSTANT - FILTER STATES for table: employeeId, managerId, date, pay stub date
    const [employeeId, setEmployeeId] = useState<string>("");
    const [managerId, setManagerId] = useState<string>("");
    const [date, setDate] = useState<string>(""); // yyyy-mm-dd
    const [payStubDate, setPayStubDate] = useState<string>(""); //<Tri>("any");

    //FUNCTION 1 of 2: loadPayStubTable() - will populate findAll() first then call endpoints from controller to filter
    async function loadPayStubTable() {
        setLoading(true);
        setError(null);

        //the methods() come from the api.ts for filter constants date, managerId, employeeId
        try {
                let response;
                if (date) 
                {response = await findByDatePayStub(date);} 
                else if (employeeId) 
                {response = await findByEmployeeIdPayStub(Number(employeeId));} 
                else if (managerId) 
                {response = await findByManagerIdPayStub(Number(managerId));} 
                else 
                {response = await getAllPayStub();}

                //assign the payStubData with try{}'s response from the data that Axios pulled from endpoints
                //this is what will will populate the table with the response data
                let payStubData: payStubType[] = Array.isArray(response.data) ? response.data : []; 
            
                //Pay Stub Date-filter 
                if (payStubDate) // if it is not null 
                {
                    const wantTrue = (payStubDate === "Paid"); //local constant for drop down menu
                    payStubData = payStubData.filter(t => (t.payStubDate !== null) === wantTrue); 
                }
        
                //the response from the filters updating rows of records/data with useState setRows
                //need to catch errors incase time off can't load the data from db, for now any errors
                setPayStub(payStubData);
            }
        catch (e: any) 
        {setError("Failed to load pay stub");} 
        finally {setLoading(false);}

    }//end of loadPayStubTable

    //FUNCTION 2 of 2: clearTableFilters() - clear filters and set to "empty" state
    function clearTableFilters() {
        setEmployeeId("");
        setManagerId("");
        setDate("");
        setPayStubDate("All");
    }

    //API Call 1 of 1 - retrieve all pay stub records
    function getPayStub() 
    {
        getAllPayStub().then(response => 
            {
                setPayStub(response.data);
            }
            ).catch(err => {console.log(err);} )
    }

    // running the API call when this component loads
    useEffect(() => {
        loadPayStubTable(); //new table with filters
    }, [])


    return (
        <main>
            <h1>Pay Stub Manager</h1>
            <p>A Pay Stub is created by a manager. The state is pay stub date. If pay stub date is null, pay stub has NOT been PAID OUT.</p>
            
            {/*Begining of Table */}
            <h2>Pay Stub Records</h2>

            {/* BUTTON */}
            <div style={{ display: "flex", gap: ".5rem" }}>
                {/*Create a New Pay Stub Record */}
                <button onClick={() => navigate(`/pay-stub-m/create`)}>
                    Create a New Pay Stub
                </button>
            </div>
            <br></br>

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
                <option value="" disabled hidden>Select an Id...</option>
                { 
                    employeeDropDown(payStub).map(id => 
                    {
                        return(<option key = {id}>{id}</option>)
                    })
                        
                }
                </select>
                </label>

                <label>
                <div>Manager ID</div>
                <select
                    value={managerId}
                    onChange={(e) => setManagerId(e.target.value)}
                >
                <option value="" disabled hidden>Select an Id...</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
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
                <div>Pay Stub Date</div> 
                <select
                    value={payStubDate}
                    onChange={(e) => setPayStubDate(e.target.value)}
                >
                    <option>All</option>
                    <option>Paid</option>
                    <option>Not Paid</option>
                </select>
                </label>


                {/* BUTTONS */}
                <div style={{ display: "flex", gap: ".5rem" }}>
                    {/* Apply Button that calls function loadTimesheetTable()*/}
                    <button onClick={loadPayStubTable} disabled={loading}>
                        {loading ? "Loading..." : "Apply filters"}
                    </button>

                    {/* Clear Button that calls function clearTableFilters()*/}
                    <button onClick={() => {clearTableFilters(); getPayStub();}} 
                        disabled={loading}
                    >
                        Clear
                    </button>

                    {/* See All Records Button that calls function loadTimesheetTable()*/}
                    <button onClick={() => {getPayStub();}} 
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
                            <Th> Employee Id</Th>
                            <Th> Fiscal Year Fiscal Week Start </Th>
                            <Th> Fiscal Year Fiscal Week End </Th>
                            <Th> Date Start </Th>
                            <Th> Date End </Th>
                            <Th> Pay Stub Date</Th>
                            <Th> View Record</Th>
                        </tr>
                    </thead>

                    <tbody> 
                        {
                            payStub.map(payStub =>  
                            {
                                return(
                                        <tr key={payStub.id}>
                                            <Td>{payStub.employeeId}</Td>
                                            <Td>{payStub.fiscalYearFiscalWeekStart}</Td>
                                            <Td>{payStub.fiscalYearFiscalWeekEnd}</Td>
                                            <Td>{payStub.dateStart}</Td>
                                            <Td>{payStub.dateEnd}</Td>
                                            <Td>{payStub.payStubDate}</Td>

                                            <td data-label="Action">
                                            <button onClick={() => navigate(`/pay-stub-m/${payStub.id}`)}>
                                            {"\u279C"} 
                                            </button>
                                            </td>
                                        </tr>
                                    )

                            }
                        )
                        
                        }

                    </tbody>
                </table>
                </div>
        </main>
    )

}//end of const PayStubPage_E


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


//Employee Id Drop Down 
function employeeDropDown(data :payStubType[])
{
    //set up an empty array
    const allIds:number[] = [];

    //add all employee id to an array
    data.forEach(element => 
    {
        allIds.push(element.employeeId);
        
    } )

    //get all unique ids in the array
    const uniqueIds = [...new Set(allIds)];

    return uniqueIds;
}
