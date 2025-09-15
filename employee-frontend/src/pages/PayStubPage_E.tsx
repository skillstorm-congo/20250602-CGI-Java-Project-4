import { useState } from "react";
import { useEffect } from "react";
import { getAllPayStub, findByDatePayStub, findByEmployeeIdPayStub } from "../api/api";
import type { payStubType} from "../types/types";

//Tri-State-Select: "selected", "unselected", "somewhat selected or partial"
//helpful in the for useState in the filters for constants submitted/approved
type Tri = "any" | "true" | "false";


export const PayStubPage_E = () => {

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

    //CONSTANT - ROW-RECORD STATES for data being transfered for using TimesheetType 
    //const [rows, setRows] = useState<TimesheetType[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    //CONSTANT - FILTER STATES for table: employeeId, managerId, date, submitted, approved
    //NOTE: will adjust for employee vs manager view, notice it's using "set" in the filters but not adding it to a record
    const [employeeId, setEmployeeId] = useState<string>("");
    const [date, setDate] = useState<string>(""); // yyyy-mm-dd
    const [payStubDate, setPayStubDate] = useState<string>(""); //<Tri>("any");


    //FUNCTION 1 of 2: loadTimesheetTable() - will populate findAll() first then call endpoints from controller to filter
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
                else 
                {response = await getAllPayStub();}

                //assign the timesheetData with try{}'s response from the data that Axios pulled from endpoints
                //this is what will will populate the table with the response data
                let payStubData: payStubType[] = Array.isArray(response.data) ? response.data : []; 
            
                //Pay Stub Date-filter Boolean Response (skip if it stays on "any") - Line 156
                if (payStubDate !== "All") 
                {
                    const wantTrue = (payStubDate === "Paid"); //local constant for drop down menu to be a boolean/tri-type, if not "submitted" it'll be FALSE
                    payStubData = payStubData.filter(t => (t.payStubDate !== null) === wantTrue); //set time off field to a true response or checkmark when true
                }
        
                //the response from the filters updating rows of records/data with useState setRows
                //need to catch errors incase time off can't load the data from db, for now any errors
                setPayStub(payStubData);
            }
        catch (e: any) 
        {setError("Failed to load pay stub");} 
        finally {setLoading(false);}

    }//end of loadTimeOfTable

    //FUNCTION 2 of 2: clearTableFilters() - clear filters and set to "empty" state
    function clearTableFilters() {
        setEmployeeId("");
        setDate("");
        setPayStubDate("All");
    }

    //using our API method to retrieve all time off records
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
        //getPayStub(); //orig table with
        //setPayStub(payStub); //see default values
    }, [])


    return (
        <main>
            <h1>Pay Stub Employee</h1>
            <h2>Welcome to the Pay Stub Page for Employee!</h2>
            <p>A Pay Stub is created by a manager. The state is pay stub date. If pay stub date is null, pay stub has NOT been PAID OUT.</p>
            
            {/*Begining of Table */}
            <h2>Pay Stub Records</h2>

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
                    employeeDropDown(payStub).map(id => 
                    {
                        return(<option>{id}</option>)
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
                            {/* <Th> Time Sheet Id 1</Th>
                            <Th> Time Sheet Id 2</Th> */}
                            <Th> Fiscal Year Fiscal Week Start </Th>
                            <Th> Fiscal Year Fiscal Week End </Th>
                            <Th> Date Start </Th>
                            <Th> Date End </Th>
                            <Th> Pay Stub Date</Th>
                            {/* <Th> Total Regular Hours</Th>
                            <Th> Total Overtime Hours</Th>
                            <Th> Total Time Off Hours</Th>
                            <Th> Total Paid</Th> */}
                        </tr>
                    </thead>

                    <tbody> 
                        {
                            payStub.map(payStub =>  
                            {
                                return(
                                        <tr key={payStub.id}>
                                            <Td>{payStub.employeeId}</Td>
                                            {/* <Td>{payStub.timesheetId1}</Td>
                                            <Td>{payStub.timesheetId2}</Td> */}
                                            <Td>{payStub.fiscalYearFiscalWeekStart}</Td>
                                            <Td>{payStub.fiscalYearFiscalWeekEnd}</Td>
                                            <Td>{payStub.dateStart}</Td>
                                            <Td>{payStub.dateEnd}</Td>
                                            <Td>{payStub.payStubDate}</Td>
                                            {/* <Td>{payStub.totalRegularHours}</Td>
                                            <Td>{payStub.totalOvertimeHours}</Td>
                                            <Td>{payStub.totalTimeOffHours}</Td>
                                            <Td>{payStub.totalPaid}</Td> */}
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