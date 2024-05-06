import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../components/auth/authContext";

const Dashboard = () => {
    const { logout, isAdmin } = useAuth();

    const handleLogout = async () => {
        await logout();
    };

    const AdminNav = () => (
        <nav className="dashboard-nav">
            <NavLink
                to="/dashboard/profile"
                className={({ isActive }) => (isActive ? "active-link" : "")}
            >
                PROFIL
            </NavLink>
            <NavLink
                to="/dashboard/news"
                className={({ isActive }) => (isActive ? "active-link" : "")}
            >
                NYHETER
            </NavLink>
            <NavLink
                to="/dashboard/applications"
                className={({ isActive }) => (isActive ? "active-link" : "")}
            >
                ANSÖKNINGAR
            </NavLink>
            <NavLink
                to="/dashboard/settings"
                className={({ isActive }) => (isActive ? "active-link" : "")}
            >
                INSTÄLLNINGAR
            </NavLink>
        </nav>
    );

    const UserNav = () => (
        <nav className="dashboard-nav">
            <NavLink
                to="/dashboard/profile"
                className={({ isActive }) => (isActive ? "active-link" : "")}
            >
                PROFIL
            </NavLink>
            <NavLink
                to="/dashboard/settings"
                className={({ isActive }) => (isActive ? "active-link" : "")}
            >
                INSTÄLLNINGAR
            </NavLink>
            <button onClick={handleLogout} className="logout-button">
                LOGGA UT
            </button>
        </nav>
    );

    return (
        <div className="dashboard-wrapper">
            <div className="dashboard">
                {isAdmin ? <AdminNav /> : <UserNav />}
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
