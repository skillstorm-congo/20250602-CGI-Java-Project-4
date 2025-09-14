import { useState } from "react";
import { useEffect } from "react";
import { getAllTimeOff } from "../api/api";
import type { timeOffType } from "../types/types";

export const TimeOffPage_E = () => {

    //setting up local state for the Time Off Object we'll get from the DB 
    const [timeOff, setTimeOff] = useState<timeOffType[]>(
        [  
            {  
                id: 6,
                employeeId: 66,
                fiscalYearFiscalWeekStart: "202544",
                fiscalYearFiscalWeekEnd: "202544",
                dateStart: new Date("2025-10-30"),
                dateEnd: new Date("2025-10-31"),
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
                dateStart: new Date("2025-10-30"),
                dateEnd: new Date("2025-10-31"),
                comment: "BBQ",
                approved: false,
                approvedDate: null,
                submitted: true,
                submittedDate: null   
            }
    ]
    );

    //using our API method to retrieve all time off records
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
        getTimeOff();
    }, [])


    return (
        <main>
            <h1>Time Off Page Employee</h1>
            <p>A Time Off Request is created by an employee. These requests' state are: not submitted or submitted. If they have been submitted then their state are: not approved or approved.</p>
            
            {/*Put table here of all time off records */}
            <h2>Time Off Records</h2>
            <table style= {{width:'500px'}} >
                    <thead>
                        <tr>
                            <th> ID </th>
                            <th>Employee Id</th>
                            <th> Fiscal Year Fiscal Week Start </th>
                            <th> Fiscal Year Fiscal Week End </th>
                            <th> Date Start </th>
                            <th> Date End </th>
                            <th> Comment </th>
                            <th> Approved</th>
                            <th> Approved Date</th>
                            <th> Submitted</th>
                            <th> Submitted Date</th>
                        </tr>
                    </thead>

                    <tbody> 
                        {
                            timeOff.map(timeOff =>  
                            {
                                return(
                                        <tr key={timeOff.id}>
                                            <td>{timeOff.id}</td>
                                            <td>{timeOff.employeeId}</td>
                                            <td>{timeOff.fiscalYearFiscalWeekStart}</td>
                                            <td>{timeOff.fiscalYearFiscalWeekEnd}</td>
                                            <td>{timeOff.dateStart.toLocaleDateString()}</td>
                                            <td>{timeOff.dateEnd.toLocaleDateString()}</td>
                                            <td>{timeOff.comment}</td>
                                            <td>{timeOff.approved ? timeOff.approved.toString() : (timeOff.approved.toString() ?? null)}</td>
                                            <td>{timeOff.approvedDate ? timeOff.approvedDate.toLocaleDateString(): null}</td>
                                            <td>{timeOff.submitted ? timeOff.submitted.toString() : (timeOff.submitted.toString() ?? null)}</td>
                                            <td>{timeOff.submittedDate ? timeOff.submittedDate.toLocaleDateString(): null}</td>
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