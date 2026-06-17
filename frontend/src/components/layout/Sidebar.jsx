import { NavLink } from "react-router-dom";

function Sidebar() {
    return (
        <aside className="sidebar">
            <div className="brand">
                <h2>InsightFlow</h2>
                <p>Smart CSV Analytics</p>
            </div>

            <nav className="nav-menu">
                <NavLink to="/">Upload CSV</NavLink>
                <NavLink to="/dashboard">Dashboard</NavLink>
                <NavLink to="/data">Data Preview</NavLink>
                <NavLink to="/insights">Insights</NavLink>
                <NavLink to="/history">History</NavLink>
            </nav>
        </aside>
    )

}

export default Sidebar;