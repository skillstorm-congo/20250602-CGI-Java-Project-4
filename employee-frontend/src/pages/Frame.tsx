import { Outlet } from "react-router-dom"
import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import { Nav } from "../components/Nav";
import { useState } from "react";
import {updateTimeOffContext} from "../context/updateTimeOffContext"

export const Frame = () => {

    // the state for our context
    // this default value is just what the original value of favorite will be
    const [ updateTimeOff, setUpdateTimeOff ] = useState('');


    return (
        <>
            <Header/>
            <Nav/>
            <main>
                <updateTimeOffContext.Provider value={[ updateTimeOff, setUpdateTimeOff ]}>
                <Outlet />
                </updateTimeOffContext.Provider>
            </main>
            <Footer/>
        </>
    );
};