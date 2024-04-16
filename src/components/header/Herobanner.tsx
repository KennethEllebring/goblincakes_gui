import React from "react";
import guildLogo from "../../assets/logo192.png";

const HeroBanner = () => {
    return (
        <div className="herobanner">
            <div>
                <img src={guildLogo} alt="Guildlogo" />
                <h1>GOBLINCAKES</h1>
            </div>
        </div>
    );
};

export default HeroBanner;
