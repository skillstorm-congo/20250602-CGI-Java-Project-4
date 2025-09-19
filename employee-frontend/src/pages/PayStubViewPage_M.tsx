import { useState } from "react";
import { useEffect } from "react";
import { findByIdPayStub, deletePayStub} from "../api/api";
import type { payStubType} from "../types/types";
import { useNavigate, useParams} from "react-router-dom";
import { useContext } from "react";
import { UpdatePayStubContext } from "../context/UpdatePayStubContext";

export const PayStubViewPage_M = () => {

    //getting access to our pay stub with useParams()
    const params = useParams();

    //used to route to update pay stub record
    const navigate = useNavigate();

    // we don't need the first element in the array (updatePayStubContext), so we skip it!
    const setUpdatePayStub = useContext(UpdatePayStubContext)?.setUpdatePayStub;
    
    //setting up local state for the Pay Stub Object we'll get from the DB 
    const [payStub, setPayStub] = useState<payStubType>(
        {  
            id:  Number.parseInt(params.id as string),
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

    //API Call 1 of 2 - retrieve a pay stub record
    function getPayStub() 
    {
        findByIdPayStub(payStub.id).then(response => 
            {
                setPayStub(response.data);
                
                if(setUpdatePayStub)
                    setUpdatePayStub(response.data);
            }
            ).catch(err => {console.log(err);} )
    }

    // running the API call when this component loads
    useEffect(() => {
        getPayStub();  
    }, [])

    //API Call 2 of 2 - delete a pay stub record
    function deletePayStubRecord() 
    {
        deletePayStub(payStub.id).then(response => 
            {
                setPayStub(response.data);
                navigate(`/pay-stub-m`);
            }
            ).catch(err => {console.log(err);} )
    }
    
    //html body
    return (
        <main>
            <h1>Pay Stub View Page Manager</h1>
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
                            <Th> Update </Th>
                            <Th> Delete </Th>
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
                                <Td>{"$" + payStub.totalPaid.toFixed(2)}</Td>

                                {/* if approved is false or null and submitted is true, then the record can still be updated to approved */}
                                <td data-label="Action">
                                    { 
                                        payStub.payStubDate === null ? 
                                            <button onClick={() => navigate(`update`)}>{"\u279C"}</button>
                                            : 
                                            <button>{"\u{1F6D1}"}</button>
                                    }
                                
                                </td>

                                {/* if approved is false or null, then the record can still be deleted */}
                                <td data-label="Action">
                                    { 
                                        payStub.payStubDate === null ? 
                                           <button onClick={() => deletePayStubRecord() }>{"\u279C"}</button>
                                            : 
                                            <button>{"\u{1F6D1}"}</button>
                                    }
                                
                                </td>

                            </tr>
                        }

                    </tbody>
                </table>
        </div>

        </main>
    )

} //end of const PayStubViewPage_M


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



