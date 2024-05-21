import React from "react";
import guildLogo from "../../assets/goblinLogo.webp";
import { useAuth } from "../auth/authContext";

const HeroBanner = () => {
    const { characterName, username } = useAuth();
    return (
        <div className="herobanner">
            <img src={guildLogo} alt="Guildlogo" />
            <div className="logged-in-wrapper">
                {characterName && username && (
                    <div className="logged-in-badge">
                        <p className="logged-in-text">Aktiv karaktär: </p>
                        <p className="logged-in-name">{`${characterName}`}</p>
                    </div>
                )}

                {!characterName && username && (
                    <div className="logged-in-badge">
                        <p className="logged-in-text">Inloggad som: </p>
                        <p className="logged-in-name">{`${username}`}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HeroBanner;
