export const HomePage = () => {

    return (

        <main>
        <h1>Welcome</h1>
        <h2>How this demo works</h2>
        <p>
            For the purposes of this presentation, each page displays data scoped to an
            <strong> Employee Type</strong> and an <strong>Employee ID</strong>.
        </p>
        <ul>
            <li><strong>Employee – Regular:</strong> sees only their own records (by Employee ID).</li>
            <li><strong>Employee – Manager:</strong> sees records for employees they manage (by Manager ID).</li>
        </ul>
        <p>
            Start by selecting your <em>Employee Type</em> and <em>ID</em> at the top. Pages like
            <em> Timesheet</em> will remain empty until a type + ID is chosen. Once selected, the page
            will automatically filter and show the relevant data.
        </p>
        </main>
    )

}