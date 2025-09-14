import { Outlet } from "react-router-dom"
import { Footer } from "../components/Footer"
import { Header } from "../components/Header"
import { Nav } from "../components/Nav";

export const Frame = () => {
    return (
        <>
            <Header/>
            <Nav/>
            <main>
                <Outlet />
            </main>
            <Footer/>
        </>
    );
};