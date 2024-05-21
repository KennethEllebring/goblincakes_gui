import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../../components/auth/authContext";

const Dashboard = () => {
    const { isAdmin } = useAuth();

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
