import { Link } from "react-router"


export const Nav = () => {

    return (
         <nav>
            {/*to use our Router properly, instead of using a-tags, we'll use React's link*/}

            {<Link to={'/'}>HomePage</Link>}
            {<Link to={'/timesheet'}>TimesheetPage</Link>}

        </nav>
    )

}