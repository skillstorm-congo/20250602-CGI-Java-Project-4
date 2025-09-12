import axios from "axios"

//all local host 9000 from the gateway
const baseUrl = 'http://localhost:9000/';

//rename findAll() to be specific to what's being pulled
//since it's in React, the method doesn't need to be identical to the backend method
export const findAllTimesheets = async () => {
    // we'll use axios for this request -- npm i axios
    // this library allows for easier API calls with less unpacking, better syntax, etc.

    // change the url after the base per service that matches the controller
    return await axios.get(`${baseUrl}timesheet`);
}