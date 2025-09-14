// this file contain custom types we can use 
// to ensure properties are being passed correctly
// we can also set our useState default value to something of this type

export type timeOffType = {
    id: number,
    employeeId: number,
    fiscalYearFiscalWeekStart: String
    fiscalYearFiscalWeekEnd: String,
    dateStart: Date,
    dateEnd: Date,
    comment: String,
    approved: Boolean | null,
    approvedDate: Date | null,
    submitted: Boolean | null,
    submittedDate: Date | null 
}

export type payStubType = {

    id: number,
    employeeId: number,
    timesheetId1: number,
    timesheetId2: number,
    fiscalYearFiscalWeekStart: String,
    fiscalYearFiscalWeekEnd: String,
    dateStart: Date,
    dateEnd: Date,
    payStubDate: Date,
    totalRegularHours: number,
    totalOvertimeHours: number,
    totalTimeOffHours: number,
    totalPaid: number
}
