import React, { useEffect, useState } from "react";
import defaultImg from "../../assets/defaultavatar.webp";
import tankBadge from "../../assets/tankbadge.jpg";
import dpsBadge from "../../assets/dpsbadge.jpg";
import healerBadge from "../../assets/healerbadge.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faUserShield } from "@fortawesome/free-solid-svg-icons";

interface BlizzardResponse {
    character: Character;
    rank: number;
    characterMedia: string | null;
    characterMythicData: Mythic;
}

interface Character {
    name: string;
    level: number;
    playable_class: Class;
}

interface Class {
    id: number;
}

interface Mythic {
    current_mythic_rating: Rating;
}

interface Rating {
    rating: number;
}

interface Info {
    characterName: string;
    characterSpec: string;
    twitch: string;
}

interface ExtendedBlizzardResponse extends BlizzardResponse {
    characterSpec: string;
    characterName: string;
    twitch: string | undefined;
}

const Team = () => {
    const [raidTeam, setRaidTeam] = useState<ExtendedBlizzardResponse[]>([]);
    const [infos, setInfos] = useState<Info[]>([]);
    const [loading, setLoading] = useState(true);
    const [dataFetched, setDataFetched] = useState(false);

    const fetchData = async () => {
        try {
            const [guildResponse, specsResponse] = await Promise.all([
                fetch(`http://localhost:5050/api/blizzard/guild`),
                fetch(`http://localhost:5050/api/blizzard/info`),
            ]);

            if (guildResponse.ok && specsResponse.ok) {
                const guildData: BlizzardResponse[] =
                    await guildResponse.json();
                const specsData: Info[] = await specsResponse.json();

                const extendedData = guildData.map((member) => ({
                    ...member,
                    characterSpec: "Unknown",
                    characterName: member.character.name,
                    twitch: undefined,
                })) as ExtendedBlizzardResponse[];

                setRaidTeam(extendedData);
                setInfos(specsData);
                setDataFetched(true);
            } else {
                throw new Error("Failed to fetch data");
            }
        } catch (error) {
            console.error("Failed to fetch data:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (dataFetched) {
            const updatedRaidTeam = raidTeam.map((member) => {
                const characterName = member.character.name;
                const specInfo = infos.find(
                    (i) =>
                        i.characterName?.toLowerCase() ===
                        characterName?.toLowerCase(),
                );
                return {
                    ...member,
                    characterSpec: specInfo
                        ? specInfo.characterSpec
                        : "Unknown",
                    twitch: specInfo ? specInfo.twitch : undefined,
                };
            });

            const sortedData = updatedRaidTeam.sort((a, b) => {
                const specA = a.characterSpec || "Unknown";
                const specB = b.characterSpec || "Unknown";
                return specA.localeCompare(specB);
            });

            // Only update the state if the sorted data is different from the current raid team
            if (JSON.stringify(sortedData) !== JSON.stringify(raidTeam)) {
                setRaidTeam(sortedData);
            }
        }
    }, [dataFetched, infos]); // Dependencies: dataFetched and infos

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
                return "Evoker";
            default:
                return `Rank ${id}`;
        }
    };

    const groupMembersByRole = (members: ExtendedBlizzardResponse[]) => {
        const tanks = members.filter((member) =>
            ["tank"].includes(member.characterSpec),
        );
        const healers = members.filter((member) =>
            ["healer"].includes(member.characterSpec),
        );
        const dps = members.filter((member) =>
            ["dps"].includes(member.characterSpec),
        );
        return { tanks, healers, dps };
    };

    const { tanks, healers, dps } = groupMembersByRole(raidTeam);

    const renderTeamSection = (
        title: string,
        members: ExtendedBlizzardResponse[],
    ) => (
        <div>
            <h2>{title}</h2>
            <div className="role">
                {members.map((member, index) => (
                    <div key={index} className="team-card">
                        <div className="name-and-class">
                            <p>{member.character.name}</p>
                            <p>
                                {getClass(member.character.playable_class.id)}
                            </p>
                            {member.characterSpec === "tank" && (
                                <img
                                    src={tankBadge}
                                    alt="tank badge"
                                    className="spec-badge"
                                />
                            )}
                            {member.characterSpec === "dps" && (
                                <img
                                    src={dpsBadge}
                                    alt="dps badge"
                                    className="spec-badge"
                                />
                            )}
                            {member.characterSpec === "healer" && (
                                <img
                                    src={healerBadge}
                                    alt="healer badge"
                                    className="spec-badge"
                                />
                            )}
                        </div>
                        <div className="img-mplus-links">
                            {member.characterMedia ? (
                                <img
                                    src={member.characterMedia}
                                    alt={`${member.character.name} icon`}
                                />
                            ) : (
                                <img src={defaultImg} alt="default icon" />
                            )}
                            <div className="mplus-and-links">
                                <div className="mplus-rating">
                                    <span>Mythic +</span>
                                    <p
                                        style={{
                                            color: (() => {
                                                const rating = Math.floor(
                                                    member.characterMythicData
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
                                        {`${Math.floor(member.characterMythicData.current_mythic_rating.rating)}`}
                                    </p>
                                </div>
                                <div className="links">
                                    <a
                                        href={`https://worldofwarcraft.blizzard.com/en-gb/character/eu/stormscale/${member.character.name}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        title="View character details in the WoW armory"
                                    >
                                        <FontAwesomeIcon icon={faUserShield} />
                                    </a>
                                    {member.twitch && (
                                        <a
                                            href={member.twitch}
                                            target="_blank"
                                            rel="noreferrer"
                                            title="View this players Twitch-stream"
                                        >
                                            <FontAwesomeIcon icon={faVideo} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="team-wrapper">
            <h1>RAIDTEAMET</h1>
            <div className="team-section">
                <div className="team">
                    {renderTeamSection("Tanks", tanks)}
                    {renderTeamSection("Healers", healers)}
                    {renderTeamSection("DPS", dps)}
                </div>
            </div>
        </div>
    );
};

export default Team;
