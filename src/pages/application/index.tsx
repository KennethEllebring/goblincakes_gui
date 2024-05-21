import React from "react";
import ApplicationForm from "./components/ApplicationForm";
import alliance from "../../assets/AllianceLogo.webp";
import horde from "../../assets/hordeBadgebeskuren.png";

const Application = () => {
    return (
        <>
            <div className="application-wrapper">
                <h1>ANSÖKNINGSFORMULÄR</h1>
                <div className="application">
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-around",
                            width: "100%",
                        }}
                    >
                        <div>
                            <img
                                src={alliance}
                                alt=""
                                style={{ width: "250px", marginTop: "1rem" }}
                            />
                        </div>
                        <div className="application-form">
                            <ApplicationForm />
                        </div>
                        <div>
                            <img
                                src={horde}
                                alt=""
                                style={{ width: "250px" }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Application;
