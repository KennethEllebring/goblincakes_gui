import React from "react";
import guildLogo from "../../assets/goblinLogo.webp";

const HeroBanner = () => {
    return (
        <div className="herobanner">
            <img src={guildLogo} alt="Guildlogo" />
        </div>
    );
};

export default HeroBanner;
