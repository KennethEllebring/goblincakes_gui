import React from "react";

const Raid = () => {
    return (
        <>
            <div className="raid-wrapper">
                <div className="raid">
                    <div>
                        <h3>{`Amirdrassil, the Dream's Hope`}</h3>
                        <div>
                            <p>Normal:</p>
                            <div className="progress">
                                <div
                                    className="progress-bar"
                                    style={{ width: "100%" }}
                                >
                                    9 / 9
                                </div>
                            </div>
                        </div>
                        <div>
                            <p>HC:</p>
                            <div className="progress">
                                <div
                                    className="progress-bar"
                                    style={{ width: "100%" }}
                                >
                                    9 / 9
                                </div>
                            </div>
                        </div>
                        <div>
                            <p>Mythic:</p>
                            <div className="progress">
                                <div
                                    className="progress-bar"
                                    style={{ width: "33.33%" }}
                                >
                                    3 / 9
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3>{`Aberrus, the Shadowed Crucible`}</h3>
                        <div>
                            <p>Normal:</p>
                            <div className="progress">
                                <div
                                    className="progress-bar"
                                    style={{ width: "100%" }}
                                >
                                    9 / 9
                                </div>
                            </div>
                        </div>
                        <div>
                            <p>HC:</p>
                            <div className="progress">
                                <div
                                    className="progress-bar"
                                    style={{ width: "100%" }}
                                >
                                    9 / 9
                                </div>
                            </div>
                        </div>
                        <div>
                            <p>Mythic:</p>
                            <div className="progress">
                                <div
                                    className="progress-bar"
                                    style={{ width: "0%" }}
                                ></div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3>{`Vault of the Incarnates`}</h3>
                        <div>
                            <p>Normal:</p>
                            <div className="progress">
                                <div
                                    className="progress-bar"
                                    style={{ width: "100%" }}
                                >
                                    8 / 8
                                </div>
                            </div>
                        </div>
                        <div>
                            <p>HC:</p>
                            <div className="progress">
                                <div
                                    className="progress-bar"
                                    style={{ width: "100%" }}
                                >
                                    8 / 8
                                </div>
                            </div>
                        </div>
                        <div>
                            <p>Mythic:</p>
                            <div className="progress">
                                <div
                                    className="progress-bar"
                                    style={{ width: "25%" }}
                                >
                                    2 / 8
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Raid;
