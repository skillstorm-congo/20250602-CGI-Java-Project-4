import { Outlet } from "react-router-dom"
import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import { Nav } from "../components/Nav";
import { useState } from "react";
import { UpdateTimeOffContext } from "../context/UpdateTimeOffContext";
import { UpdatePayStubContext } from "../context/UpdatePayStubContext";
import type { timeOffType, payStubType } from "../types/types";

export const Frame = () => {

    // the state for our context
    // this default value is just what the original value of favorite will be
    const [ updateTimeOff, setUpdateTimeOff ] = useState<timeOffType | undefined>(undefined);
    const [ updatePayStub, setUpdatePayStub ] = useState<payStubType | undefined>(undefined);


    return (
        <>
            <Header/>
            <Nav/>
            <main>
                <UpdateTimeOffContext.Provider value={{ updateTimeOff, setUpdateTimeOff }}>
                <UpdatePayStubContext.Provider value={{ updatePayStub, setUpdatePayStub}}>
                <Outlet />
                </UpdatePayStubContext.Provider>
                </UpdateTimeOffContext.Provider>
            </main>
            <Footer/>
        </>
    );
};