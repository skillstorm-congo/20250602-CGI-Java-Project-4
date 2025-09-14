import { Link } from "react-router-dom"


export const Nav = () => {
    return (
         <nav>
            {<Link to={'/'}>HomePage</Link>}
            {<Link to={'/timesheet'}>TimesheetPage</Link>}

            {<Link to={'/time-off-e'}>TimeOffPage_E</Link>}
            {<Link to={'/pay-stub-e'}>PayStubPage_E</Link>}
        </nav>
    )

}