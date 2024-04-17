import React from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHouse,
    faPeopleGroup,
    faDungeon,
    faPenToSquare,
    faLock,
} from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
    // Function to determine the class based on the isActive boolean
    const getActiveClass = (isActive: boolean) =>
        isActive ? "active-link" : "";

    return (
        <div className="navbar-wrapper">
            <nav className="navbar">
                <NavLink
                    to="/"
                    className={({ isActive }) => getActiveClass(isActive)}
                    end
                >
                    <FontAwesomeIcon icon={faHouse} />
                    HEM
                </NavLink>
                <NavLink
                    to="/team"
                    className={({ isActive }) => getActiveClass(isActive)}
                >
                    <FontAwesomeIcon icon={faPeopleGroup} />
                    TEAMET
                </NavLink>
                <NavLink
                    to="/raid"
                    className={({ isActive }) => getActiveClass(isActive)}
                >
                    <FontAwesomeIcon icon={faDungeon} />
                    RAID
                </NavLink>
                <NavLink
                    to="/application"
                    className={({ isActive }) => getActiveClass(isActive)}
                >
                    <FontAwesomeIcon icon={faPenToSquare} />
                    ANSÖKAN
                </NavLink>
                <NavLink
                    to="/login"
                    className={({ isActive }) => getActiveClass(isActive)}
                >
                    <FontAwesomeIcon icon={faLock} />
                    LOGIN
                </NavLink>
            </nav>
        </div>
    );
};

export default NavBar;
