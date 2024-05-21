import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHouse,
    faPeopleGroup,
    faDungeon,
    faPenToSquare,
    faLock,
    faLockOpen,
    faList,
} from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
    const { logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async (
        e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
    ) => {
        e.preventDefault();
        await logout();
        navigate("/login");
    };

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
                {isAuthenticated ? (
                    <>
                        <NavLink
                            to="/forum"
                            className={({ isActive }) =>
                                getActiveClass(isActive)
                            }
                        >
                            <FontAwesomeIcon icon={faList} />
                            FORUM
                        </NavLink>
                        <NavLink
                            to="/dashboard"
                            className={({ isActive }) =>
                                getActiveClass(isActive)
                            }
                        >
                            <FontAwesomeIcon icon={faLockOpen} />
                            DASHBOARD
                        </NavLink>
                        <NavLink
                            to="/login"
                            onClick={handleLogout}
                            className={({ isActive }) =>
                                getActiveClass(isActive)
                            }
                        >
                            <FontAwesomeIcon icon={faLockOpen} />
                            LOGGA UT
                        </NavLink>
                    </>
                ) : (
                    <NavLink
                        to="/login"
                        className={({ isActive }) => getActiveClass(isActive)}
                    >
                        <FontAwesomeIcon icon={faLock} />
                        LOGGA IN
                    </NavLink>
                )}
            </nav>
        </div>
    );
};

export default NavBar;
