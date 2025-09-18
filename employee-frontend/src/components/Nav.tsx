import { Link } from "react-router-dom"


export const Nav = () => {
    return (
         <nav>
            {<Link to={'/'}>Home</Link>}
            {<Link to={'/timesheet'}>Timesheet</Link>}

            {<Link to={'/time-off-e'}>Time Off Employee</Link>}
            {<Link to={'/pay-stub-e'}>Pay Stub Employee</Link>}
            {<Link to={'/time-off-m'}>Time Off Manager</Link>}
            {<Link to={'/pay-stub-m'}>Pay Stub Manager</Link>}
        </nav>
    )

}