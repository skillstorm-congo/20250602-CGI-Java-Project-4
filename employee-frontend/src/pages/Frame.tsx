import { Outlet } from "react-router-dom"
import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import { Nav } from "../components/Nav";
import { useState } from "react";
import {updateTimeOffContext} from "../context/updateTimeOffContext"
import { updatePayStubContext } from "../context/updatePayStubContext";

export const Frame = () => {

    // the state for our context
    // this default value is just what the original value of favorite will be
    const [ updateTimeOff, setUpdateTimeOff ] = useState('');
    const [ updatePayStub, setUpdatePayStub ] = useState('');


    return (
        <>
            <Header/>
            <Nav/>
            <main>
                <updateTimeOffContext.Provider value={[ updateTimeOff, setUpdateTimeOff ]}>
                <updatePayStubContext.Provider value={[ updatePayStub, setUpdatePayStub]}>
                <Outlet />
                </updatePayStubContext.Provider>
                </updateTimeOffContext.Provider>
            </main>
            <Footer/>
        </>
    );
};