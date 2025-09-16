import axios from "axios"
import type { payStubType, UserType } from "../types/types";

//all local host 9000 from the gateway
const baseUrl = 'http://localhost:9000/';
const userBase = "http://localhost:17000";

//Resource: Axios - https://axios-http.com/docs/req_config
axios.defaults.withCredentials = true;

// ------------------------------------------------------------------
//TIMESHEET FUNCTIONS

//1) get all timesheet records
export const findAllTimesheets = async () => {
    return await axios.get(`${baseUrl}timesheet`);
}

//2) get all timesheet records by the timesheet's id
export const findByIdTimesheet = async (id: number) => {
    return await axios.get(`${baseUrl}timesheet/${id}`);
}

//3) get all timesheet records related to an employee by their Id
export const findByEmployeeIdTimesheet = async (employeeId: number) => {
    return await axios.get(`${baseUrl}timesheet/by-employee/${employeeId}`);
}

//4) get all timesheet records related to employees by the manager Id
export const findByManagerIdTimesheet = async (managerId: number) => {
    return await axios.get(`${baseUrl}timesheet/manager-id/${managerId}`);
}

//5) get all timesheet records by a date /by-date?date=YYYY-MM-DD
export const findByDateTimesheet = async (date: string | Date) => {
    return await axios.get(`${baseUrl}timesheet/by-date`, {params: {date: toISODate(date)},});
}

//6) let an employee log their hours by JSON body to create
export const logHoursTimesheet = async (payload: any) => {
    return await axios.post(`${baseUrl}timesheet/log-hours`, payload);
}

//7) update an employee's timesheet to SUBMITTED
export const submitTimesheet = async (id: number) => {
    return await axios.put(`${baseUrl}timesheet/${id}/submit`);
}

//8) update an employee's timesheet to APPROVED by their manager
export const approvedByManagerIdTimesheet = async (id: number, managerId: number) => {
    return await axios.put(`${baseUrl}timesheet/${id}/approve-by-manager/${managerId}`);
}

//9) update an employee's timesheet to UNAPPROVED
export const unapproveTimesheet = async (id: number) => {
  return await axios.put(`${baseUrl}timesheet/${id}/unapprove`);
};

//10) update the employee's timesheet hours
export const updateHoursTimesheet = async (body: any) => {
  return await axios.put(`${baseUrl}timesheet/update-hours`, body);
};

//11) delete the timesheet
export const deleteTimesheet = async (id: number) => {
  return await axios.delete(`${baseUrl}timesheet/delete/${id}`);
};

//Helper - byDate(), refer back to type on note about why date is a little weird in TS
const toISODate = (d: string | Date) =>
  typeof d === "string" ? d : d.toISOString().slice(0, 10);

// ------------------------------------------------------------------
//TIME OFF FUNCTIONS//

//1) get all time off records
export const getAllTimeOff = async() => 
{
    return await axios.get(`${baseUrl}time-off`);
}

//2) get a time off record by time off id
export const findByIdTimeOff = async (id: number) => {
    return await axios.get(`${baseUrl}time-off/${id}`);
}

//3) get all time off records related to an employee by their Id
export const findByEmployeeIdTimeOff = async (employeeId: number) => {
    return await axios.get(`${baseUrl}time-off/employee-id`, {params: {employeeId},});
}

//4) get all time off records related to employees by the manager Id
export const findByManagerIdTimeOff= async (managerId: number) => {
    return await axios.get(`${baseUrl}time-off/manager-id`, {params: {managerId},});
}

//5) get all time off records by a date /by-date?date=YYYY-MM-DD
export const findByDateTimeOff = async (date: string | Date) => {
    return await axios.get(`${baseUrl}time-off/date`, {params: {date: toISODate(date)},});
}

//6) update a time off record by time off id
export const updateTimeOffRecord = async (id: number, timeOff:object) => {
    return await axios.put(`${baseUrl}time-off/${id}`, timeOff);
}

//7) create a time off record 
export const createTimeOff = async (timeOff:object) => {
    return await axios.post(`${baseUrl}time-off`, timeOff)
}

//8) delete a time off record by time off id
export const deleteTimeOff = async (id:number) => {
    return await axios.delete(`${baseUrl}time-off/${id}`)
}

// ------------------------------------------------------------------
//PAY STUB FUNCTIONS//

//1) get all pay stub records
export const getAllPayStub= async() => 
{
    return await axios.get(`${baseUrl}pay-stub`);
}

//2) get all pay stub records by pay stub id
export const findByIdPayStub = async (id: number) => {
    return await axios.get(`${baseUrl}pay-stub/${id}`);
}

//3) get all pay stub records related to an employee by their Id
export const findByEmployeeIdPayStub = async (employeeId: number) => {
    return await axios.get(`${baseUrl}pay-stub/employee-id`, {params: {employeeId},});
}

//4) get all pay stub records related to employees by the manager Id
export const findByManagerIdPayStub= async (managerId: number) => {
    return await axios.get(`${baseUrl}pay-stub/manager-id`, {params: {managerId},});
}

//5) get all pay stub records by a date /by-date?date=YYYY-MM-DD
export const findByDatePayStub= async (date: string | Date) => {
    return await axios.get(`${baseUrl}pay-stub/date`, {params: {date: toISODate(date)},});
}

//6) delete a pay stub record by time off id
export const deletePayStub = async (id:number) => {
    return await axios.delete(`${baseUrl}pay-stub/${id}`)
}

//7) create a pay stub record 
export const createPayStub = async (payStub:object) => {
    return await axios.post(`${baseUrl}pay-stub`, payStub)
}

//8) update a pay stub record by pay stub id
export const updatePayStubRecord = async (id: number, payStub:object) => {
    return await axios.put(`${baseUrl}pay-stub/${id}`, payStub);
}
// ------------------------------------------------------------------
//USER FUNCTIONS
