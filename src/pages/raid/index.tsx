import React, { useEffect, useState } from "react";
import raiderIoLogo from "../../assets/raideriologo.png";
import warcraftLogs from "../../assets/warcraftlogslogo.png";

interface WarcraftlogsResponse {
    id: string;
    title: string;
    owner: string;
    start: number;
    end: number;
    zone: number;
}

interface RaidProgressionDetail {
    summary: string;
    total_bosses: number;
    normal_bosses_killed: number;
    heroic_bosses_killed: number;
    mythic_bosses_killed: number;
}

interface RaidProgression {
    [raidName: string]: RaidProgressionDetail;
}

interface RaiderIoResponse {
    name: string;
    faction: string;
    region: string;
    realm: string;
    profile_url: string;
    raid_progression: RaidProgression;
}

const Raid = () => {
    const [raidLogs, setRaidLogs] = useState<WarcraftlogsResponse[]>([]);
    const [guildProgress, setGuildProgress] = useState<RaiderIoResponse | null>(
        null,
    );

    const fetchGuildProgress = async () => {
        try {
            const response = await fetch(
                // `http://localhost:5050/api/raiderio/guildprogress`,
                `https://goblincakes-server.vercel.app/api/raiderio/guildprogress`,
                {
                    method: "GET",
                    mode: "cors",
                    credentials: "include",
                },
            );

            if (response.ok) {
                const data: RaiderIoResponse = await response.json();
                setGuildProgress(data);
            } else {
                throw new Error("Failed to fetch data");
            }
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    };

    const fetchRaidLogs = async () => {
        try {
            const response = await fetch(
                // `http://localhost:5050/api/warcraftlogs/logs`,
                `https://goblincakes-server.vercel.app/api/warcraftlogs/logs`,
                {
                    method: "GET",
                    mode: "cors",
                    credentials: "include",
                },
            );

            if (response.ok) {
                const data: WarcraftlogsResponse[] = await response.json();
                const sortedLogs = data
                    .sort((a, b) => b.start - a.start)
                    .slice(0, 20);
                setRaidLogs(sortedLogs);
            } else {
                throw new Error("Failed to fetch data");
            }
        } catch (error) {
            console.error("Failed to fetch data:", error);
        }
    };

    useEffect(() => {
        fetchGuildProgress();
        fetchRaidLogs();
    }, []);

    return (
        <div className="raid-wrapper">
            <h1>RAID</h1>
            <div className="raid">
                <h2>RAID PROGRESS</h2>
                <div className="raid-progress-wrapper">
                    {guildProgress &&
                        Object.entries(guildProgress.raid_progression)
                            .filter(
                                ([raidName]) =>
                                    !raidName
                                        .toLowerCase()
                                        .includes("awakened"),
                            )
                            .map(([raidName, progress], index) => (
                                <div key={index} className="raid-progress">
                                    <h3>{raidName.replace(/-/g, " ")}</h3>
                                    <div className="progress-bar">
                                        <div
                                            className="bar normal"
                                            style={{
                                                width: `${(progress.normal_bosses_killed / progress.total_bosses) * 100}%`,
                                            }}
                                        >
                                            Normal:{" "}
                                            {progress.normal_bosses_killed}/
                                            {progress.total_bosses}
                                        </div>
                                    </div>
                                    <div className="progress-bar">
                                        <div
                                            className="bar heroic"
                                            style={{
                                                width: `${(progress.heroic_bosses_killed / progress.total_bosses) * 100}%`,
                                            }}
                                        >
                                            Heroic:{" "}
                                            {progress.heroic_bosses_killed}/
                                            {progress.total_bosses}
                                        </div>
                                    </div>
                                    <div className="progress-bar">
                                        <div
                                            className="bar mythic"
                                            style={{
                                                width: `${(progress.mythic_bosses_killed / progress.total_bosses) * 100}%`,
                                            }}
                                        >
                                            Mythic:{" "}
                                            {progress.mythic_bosses_killed}/
                                            {progress.total_bosses}
                                        </div>
                                    </div>
                                </div>
                            ))}
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "0.5rem",
                        paddingBottom: "1rem",
                        borderBottom: "2px solid silver",
                    }}
                >
                    <p>Powered by:</p>
                    <a
                        href="https://raider.io/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img
                            style={{ height: "30px" }}
                            src={raiderIoLogo}
                            alt="raiderIO logo"
                        />
                    </a>
                </div>
                <h2>LOGS</h2>
                <div className="logs">
                    {raidLogs.map((raidlog, index) => (
                        <div key={index} className="post">
                            <a
                                href={`https://www.warcraftlogs.com/reports/${raidlog.id}`}
                                className="log-link"
                                target="_blank"
                                rel="noreferrer"
                            >
                                <p>{`${raidlog.title}`}</p>
                                <p>{`Owner: ${raidlog.owner}`}</p>
                                <p>
                                    {`Start: ${new Date(raidlog.start).toLocaleString()}`}
                                </p>
                                <p>
                                    {`End: ${new Date(raidlog.end).toLocaleString()}`}
                                </p>
                            </a>
                        </div>
                    ))}
                </div>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "0.5rem",
                        paddingTop: "2rem",
                        paddingBottom: "1rem",
                    }}
                >
                    <p>Powered by:</p>
                    <a
                        href="https://www.warcraftlogs.com/"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <img
                            style={{ height: "30px" }}
                            src={warcraftLogs}
                            alt="raiderIO logo"
                        />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Raid;
