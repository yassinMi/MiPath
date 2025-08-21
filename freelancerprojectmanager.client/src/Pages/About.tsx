import  { Link } from "react-router-dom"

function About() {

    return <p>features:

        - login with email
        - create/delete projects
        - create/delete tasks
        - view "this week" tasks summary
        - view "today" tasks summary
        - filter projects and tasks by custome attributes
        <Link to="/">back to app</Link>
    </p>
}

export default About