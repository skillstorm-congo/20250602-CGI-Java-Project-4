import { useState } from "react";
import { useEffect } from "react";
import { getAllPayStub } from "../api/api";
import type { payStubType} from "../types/types";

export const PayStubPage_E = () => {

        //setting up local state for the Time Off Object we'll get from the DB 
    const [payStub, setPayStub] = useState<payStubType[]>(
        [  
            {  
                id: 6,
                employeeId: 66,
                timesheetId1: 666,
                timesheetId2: 6666,
                fiscalYearFiscalWeekStart: "202531",
                fiscalYearFiscalWeekEnd: "202532",
                dateStart: new Date("2025-08-11"),
                dateEnd: new Date("2025-08-22"),
                payStubDate: new Date("2025-09-02"),
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
                dateStart: new Date("2025-08-11"),
                dateEnd: new Date("2025-08-22"),
                payStubDate: new Date("2025-09-02"),
                totalRegularHours: 40,
                totalOvertimeHours: 5,
                totalTimeOffHours: 0,
                totalPaid: 506.98
            }
    ]
    );

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
        getPayStub();
    }, [])


    return (
        <main>
            <h1>Pay Stub Employee</h1>
            <h2>Welcome to the Pay Stub Page for Employee!</h2>
            <p>A Pay Stub is created by a manager. The state is pay stub date. If pay stub date is null, pay stub has NOT been approved.</p>
            
            {/*Put table here of all pay stub records */}
            <h2>Pay Stub Records</h2>
            <table style= {{width:'500px'}} >
                    <thead>
                        <tr>
                            <th> ID </th>
                            <th> Employee Id</th>
                            <th> Time Sheet Id 1</th>
                            <th> Time Sheet Id 2</th>
                            <th> Fiscal Year Fiscal Week Start </th>
                            <th> Fiscal Year Fiscal Week End </th>
                            <th> Date Start </th>
                            <th> Date End </th>
                            <th> Pay Stub Date</th>
                            <th> Total Regular Hours</th>
                            <th> Total Overtime Hours</th>
                            <th> Total Time Off Hours</th>
                            <th> Total Paid</th>
                        </tr>
                    </thead>

                    <tbody> 
                        {
                            payStub.map(payStub =>  
                            {
                                return(
                                        <tr key={payStub.id}>
                                            <td>{payStub.id}</td>
                                            <td>{payStub.employeeId}</td>
                                            <td>{payStub.timesheetId1}</td>
                                            <td>{payStub.timesheetId2}</td>
                                            <td>{payStub.fiscalYearFiscalWeekStart}</td>
                                            <td>{payStub.fiscalYearFiscalWeekEnd}</td>
                                            <td>{payStub.dateStart.toLocaleDateString()}</td>
                                            <td>{payStub.dateEnd.toLocaleDateString()}</td>
                                            <td>{payStub.payStubDate.toLocaleDateString()}</td>
                                            <td>{payStub.totalRegularHours}</td>
                                            <td>{payStub.totalOvertimeHours}</td>
                                            <td>{payStub.totalTimeOffHours}</td>
                                            <td>{payStub.totalPaid}</td>
                                        </tr>
                                    )

                            }
                        )
                        
                        }

                    </tbody>
                </table>

        </main>



    )

}