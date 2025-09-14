
// another way to structure the exporting of a component
export const Header = () => {

    return (
        <>
            <header>
                Employee Management FRONTEND
                <nav>
                    <a href="/homepage">HomePage</a>
                    <a href="/timesheet">TimesheetPage</a>
                    <a href="/time-off-e">TimeOffPage_E</a>
                    <a href="/pay-stub-e">PayStubPage_E</a>
                </nav>
            </header>
        </>
    )

}