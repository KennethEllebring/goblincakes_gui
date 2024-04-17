import React from "react";
import tankImage from "../../assets/TANK.jpg";
import healerImage from "../../assets/HEALER.jpg";
import dpsImage from "../../assets/DPS.jpg";

const TEAMMOCK = {
    TANKS: [
        { name: "Drow", class: "Demonhunter", ilvl: 489, spec: tankImage },
        { name: "Våfflann", class: "Demonhunter", ilvl: 478, spec: tankImage },
    ],
    HEALERS: [
        { name: "Sky", class: "Priest", ilvl: 480, spec: healerImage },
        {
            name: "SlackerPetetheg",
            class: "Monk",
            ilvl: 489,
            spec: healerImage,
        },
        { name: "Tyrann", class: "Paladin", ilvl: 488, spec: healerImage },
        { name: "Soffan", class: "Monk", ilvl: 489, spec: healerImage },
        { name: "Någon=)", class: "Kanin", ilvl: 500, spec: healerImage },
    ],
    DPS: [
        { name: "Fiskbulle", class: "Mage", ilvl: 462, spec: dpsImage },
        { name: "Ungodlyjobas", class: "Mage", ilvl: 999, spec: dpsImage },
        { name: "Jossie", class: "Deathknight", ilvl: 489, spec: dpsImage },
        { name: "Superlisa", class: "Rogue", ilvl: 482, spec: dpsImage },
        { name: "Majs", class: "Demonhunter", ilvl: 486, spec: dpsImage },
        { name: "Gute", class: "Hunter", ilvl: 482, spec: dpsImage },
        { name: "Pranky", class: "Warlock", ilvl: 484, spec: dpsImage },
        { name: "Moriganhell", class: "Priest", ilvl: 489, spec: dpsImage },
        { name: "Ibreakhorses", class: "Shaman", ilvl: 100, spec: dpsImage },
    ],
};

const Team = () => {
    return (
        <>
            <div className="team-wrapper">
                <div className="team">
                    <div className="left-team-wrapper">
                        <div className="team-card">
                            <h1>TANKS</h1>
                            <div className="team-info-card-wrapper">
                                {TEAMMOCK.TANKS.map((tank, i) => (
                                    <div key={i} className="team-info-card">
                                        <span>{tank.name}</span>
                                        <img src={tank.spec} alt="tank icon" />
                                        <div className="team-info">
                                            <span>{tank.class}</span>
                                            <span>{tank.ilvl}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="team-card">
                            <h1>HEALERS</h1>
                            <div className="team-info-card-wrapper">
                                {TEAMMOCK.HEALERS.map((healer, i) => (
                                    <div key={i} className="team-info-card">
                                        <span>{healer.name}</span>
                                        <img
                                            src={healer.spec}
                                            alt={`healer icon`}
                                        />
                                        <div className="team-info">
                                            <span>{healer.class}</span>
                                            <span>{healer.ilvl}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="right-team-wrapper">
                        <div className="team-card">
                            <h1>DPS</h1>
                            <div className="team-info-card-wrapper">
                                {TEAMMOCK.DPS.map((dps, i) => (
                                    <div key={i} className="team-info-card">
                                        <span>{dps.name}</span>
                                        <img src={dps.spec} alt="tank icon" />
                                        <div className="team-info">
                                            <span>{dps.class}</span>
                                            <span>{dps.ilvl}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Team;
