import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faHouse,
    faPeopleGroup,
    faDungeon,
    faPenToSquare,
    faLock,
} from "@fortawesome/free-solid-svg-icons";

const NavBar = () => {
    return (
        <div className="navbar-wrapper">
            <nav className="navbar">
                <Link to="/">
                    <FontAwesomeIcon icon={faHouse} />
                    HEM
                </Link>
                <Link to="/team">
                    <FontAwesomeIcon icon={faPeopleGroup} />
                    TEAMET
                </Link>
                <Link to="/raid">
                    <FontAwesomeIcon icon={faDungeon} />
                    RAID
                </Link>
                <Link to="/application">
                    <FontAwesomeIcon icon={faPenToSquare} />
                    ANSÖKAN
                </Link>
                <Link to="/login">
                    <FontAwesomeIcon icon={faLock} />
                    LOGIN
                </Link>
            </nav>
        </div>
    );
};

export default NavBar;
