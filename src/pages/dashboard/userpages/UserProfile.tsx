import React, { useEffect, useState } from "react";
import { useAuth } from "../../../components/auth/authContext";
import defaultAvatar from "../../../assets/defaultavatar.webp";
import allianceBadge from "../../../assets/AllianceLogo.webp";
import hordeBadge from "../../../assets/hordeBadge.png";
import tankBadge from "../../../assets/tankbadge.jpg";
import dpsBadge from "../../../assets/dpsbadge.jpg";
import healerBadge from "../../../assets/healerbadge.jpg";

interface BlizzardResponse {
    code: number;
    name: string;
    guild: Guild;
    faction: Faction;
    level: number;
    achievement_points: number;
    equipped_item_level: number;
    media: [Media];
    melee_crit: Crit;
    melee_haste: Haste;
    mastery: Mastery;
    versatility: number;
    versatility_damage_done_bonus: number;
    character_class: Class;
    current_mythic_rating?: Mythic;
}

interface Guild {
    name: string;
}

interface Faction {
    type: string;
}

interface Media {
    key: string;
    value: string;
}

interface Crit {
    rating: number;
    value: number;
}

interface Haste {
    rating: number;
    value: number;
}

interface Mastery {
    rating: number;
    value: number;
}

interface Class {
    id: number;
}

interface Mythic {
    rating: number;
}

const UserProfile = () => {
    const { username, characterName, realm, characterSpec } = useAuth();
    const [characterProfile, setCharacterProfile] =
        useState<BlizzardResponse | null>(null);

    const fetchCharacter = async () => {
        try {
            const response = await fetch(
                `http://localhost:5050/api/blizzard/${realm}/${characterName}`,
                {
                    method: "GET",
                },
            );

            if (response.ok) {
                const data = await response.json();
                setCharacterProfile(data);
            } else {
                throw new Error("Failed to fetch data");
            }
        } catch (error) {
            console.error("Failed to fetch news:", error);
        }
    };

    useEffect(() => {
        if (characterName) {
            fetchCharacter();
        } else return;
    }, []);

    const getClass = (id: number): string => {
        switch (id) {
            case 0:
                return "BIS";
            case 1:
                return "Warrior";
            case 2:
                return "Paladin";
            case 3:
                return "Hunter";
            case 4:
                return "Rogue";
            case 5:
                return "Priest";
            case 6:
                return "Deathknight";
            case 7:
                return "Shaman";
            case 8:
                return "Mage";
            case 9:
                return "Warlock";
            case 10:
                return "Monk";
            case 11:
                return "Druid";
            case 12:
                return "Demonhunter";
            case 13:
                return "Ewoker";
            default:
                return `Rank ${id}`;
        }
    };

    return (
        <div className="user-profile">
            <h1>{`Välkommen ${username}!`}</h1>
            {!characterName && (
                <div>
                    <p>
                        Obs! byt lösenord och lägg till din karaktär och realm
                        du spelar på under inställningar
                    </p>
                </div>
            )}

            {characterProfile && !characterProfile.code ? (
                <div className="profile-info">
                    <div className="name-and-guild">
                        <p>{characterProfile.name}</p>
                        <p>{`<${characterProfile.guild?.name}>`}</p>
                    </div>
                    <div className="profile-img-wrapper">
                        {characterProfile.media &&
                        characterProfile.media.find(
                            (img) => img.key === "main-raw",
                        ) ? (
                            <img
                                src={
                                    characterProfile.media.find(
                                        (img) => img.key === "main-raw",
                                    )?.value
                                }
                                alt="Character Avatar"
                                className="profile-img"
                            />
                        ) : (
                            <img
                                src={defaultAvatar}
                                alt="Default Avatar"
                                className="profile-img"
                            />
                        )}
                    </div>
                    <div className="character-info">
                        <div className="character-header">
                            {characterProfile.faction.type === "ALLIANCE" ? (
                                <img
                                    className="faction-badge"
                                    src={allianceBadge}
                                    alt="alliance badge"
                                />
                            ) : (
                                <img
                                    className="faction-badge"
                                    src={hordeBadge}
                                    alt="horde badge"
                                />
                            )}
                            <p>{`Level ${characterProfile.level} ${getClass(characterProfile.character_class.id)}`}</p>
                            {characterSpec === "tank" && (
                                <img
                                    src={tankBadge}
                                    alt="tank badge"
                                    className="spec-badge"
                                />
                            )}
                            {characterSpec === "dps" && (
                                <img
                                    src={dpsBadge}
                                    alt="dps badge"
                                    className="spec-badge"
                                />
                            )}
                            {characterSpec === "healer" && (
                                <img
                                    src={healerBadge}
                                    alt="healer badge"
                                    className="spec-badge"
                                />
                            )}
                        </div>
                        <div className="stats-wrapper">
                            <div className="itemlevel">
                                <h3>Item Level</h3>
                                <hr />
                                <p
                                    style={{
                                        fontWeight: 800,
                                        color: (() => {
                                            const rating = Math.floor(
                                                characterProfile.equipped_item_level,
                                            );
                                            if (rating > 414) {
                                                return "#FF8000";
                                            } else if (rating > 375) {
                                                return "#A335EE";
                                            } else if (rating > 342) {
                                                return "#0070FF";
                                            } else {
                                                return "#1EFF0C";
                                            }
                                        })(),
                                    }}
                                >
                                    {`${Math.floor(characterProfile.equipped_item_level)}`}
                                </p>
                                <h3>Mythic Rating</h3>
                                <hr />
                                {characterProfile.current_mythic_rating && (
                                    <p
                                        style={{
                                            fontWeight: 800,
                                            color: (() => {
                                                const rating = Math.floor(
                                                    characterProfile
                                                        .current_mythic_rating
                                                        .rating,
                                                );
                                                if (rating > 2399) {
                                                    return "#FF8000";
                                                } else if (rating > 1499) {
                                                    return "#A335EE";
                                                } else if (rating > 749) {
                                                    return "#0070FF";
                                                } else {
                                                    return "#1EFF0C";
                                                }
                                            })(),
                                        }}
                                    >
                                        {`${Math.floor(characterProfile.current_mythic_rating.rating)}`}
                                    </p>
                                )}
                            </div>
                            <div className="stats">
                                <h3>Stats</h3>
                                <hr />
                                <p>
                                    {`Critical Strike:
                        ${Math.floor(characterProfile.melee_crit.value)}%`}
                                </p>
                                <p>
                                    {`Haste:
                        ${Math.floor(characterProfile.melee_haste.value)}%`}
                                </p>
                                <p>
                                    {`Mastery:
                        ${Math.floor(characterProfile.mastery.value)}%`}
                                </p>
                                <p>
                                    {`Versatility:
                        ${Math.floor(characterProfile.versatility_damage_done_bonus)}%`}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <h2>
                        Kan inte hitta karaktären kontrollera stavning och
                        försök igen
                    </h2>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
