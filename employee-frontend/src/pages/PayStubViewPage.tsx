import { useState } from "react";
import { useEffect } from "react";
import { findByIdPayStub} from "../api/api";
import type { payStubType} from "../types/types";
import { useParams} from "react-router-dom";

export const PayStubViewPage = () => {

    //getting access to our pay stub with useParams()
    const params = useParams();

    //setting up local state for the pay stub Object we'll get from the DB 
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
            payStubDate: null,
            totalRegularHours: 45,
            totalOvertimeHours: 2,
            totalTimeOffHours: 0,
            totalPaid: 5555.69
        }

    );

    //API Call 1 of 1 - retrieve a pay stub record
    function getPayStub() 
    {
        findByIdPayStub(payStub.id).then(response => 
            {
                setPayStub(response.data);
            }
            ).catch(err => {console.log(err);} )
    }

    // running the API call when this component loads
    useEffect(() => {
        getPayStub();  
    }, [])

    //html body
    return (
        <main>
            <h1>Pay Stub View Employee</h1>
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
                                <Td>{"$" + payStub.totalPaid.toFixed(2)}</Td>

                            </tr>
                        }

                    </tbody>
                </table>
        </div>

        </main>
    )

} //end of const PayStubViewPage


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



