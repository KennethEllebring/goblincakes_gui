import React, { useState } from "react";

const Application = () => {
    const [specialisation, setSpecialisation] = useState<string>("");

    const handleSpecialisationChange = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setSpecialisation(e.target.value);
    };

    return (
        <>
            <div className="application-wrapper">
                <h1>ANSÖKNINGSFORMULÄR</h1>
                <div className="application">
                    <div className="application-form">
                        <p>Välj primär position</p>
                        <div>
                            <input
                                type="radio"
                                id="tank"
                                name="specialisation"
                                value="tank"
                                onChange={handleSpecialisationChange}
                                checked={specialisation === "tank"}
                            />
                            <label htmlFor="tank">Tank</label>
                            <br />
                            <input
                                type="radio"
                                id="healer"
                                name="specialisation"
                                value="healer"
                                onChange={handleSpecialisationChange}
                                checked={specialisation === "healer"}
                            />
                            <label htmlFor="healer">Healer</label>
                            <br />
                            <input
                                type="radio"
                                id="dps"
                                name="specialisation"
                                value="dps"
                                onChange={handleSpecialisationChange}
                                checked={specialisation === "dps"}
                            />
                            <label htmlFor="dps">Dps</label>
                        </div>

                        {specialisation === "tank" && (
                            <div>
                                <br />
                                <label htmlFor="tankClass">Välj klass</label>
                                <br />
                                <select id="tankClass" name="tankClass">
                                    <option value="vengeancedh">
                                        Demonhunter / Vengeance
                                    </option>
                                    <option value="guarddruid">
                                        Druid / Guardian
                                    </option>
                                    <option value="brewmonk">
                                        Monk / Brewmaster
                                    </option>
                                    <option value="protpaladin">
                                        Paladin / Protection
                                    </option>
                                    <option value="protwarrior">
                                        Warrior / Protection
                                    </option>
                                </select>
                            </div>
                        )}
                        {specialisation === "healer" && (
                            <div>
                                <br />
                                <label htmlFor="healerClass">Välj klass</label>
                                <br />
                                <select id="healerClass" name="healerClass">
                                    <option value="restodruid">
                                        Druid / Restoration
                                    </option>
                                    <option value="persewoker">
                                        Ewoker / Perservation
                                    </option>
                                    <option value="mistmonk">
                                        Monk / Mistweaver
                                    </option>
                                    <option value="holypaladin">
                                        Paladin / Holy
                                    </option>
                                    <option value="discpriest">
                                        Priest / Discipline
                                    </option>
                                    <option value="holypriest">
                                        Priest / Holy
                                    </option>
                                    <option value="shaman">
                                        Shaman / Restoration
                                    </option>
                                </select>
                            </div>
                        )}
                        {specialisation === "dps" && (
                            <div>
                                <br />
                                <label htmlFor="dpsClass">Välj klass</label>
                                <br />
                                <select id="dpsClass" name="dpsClass">
                                    <option value="frostdk">
                                        Deathknight / Frost
                                    </option>
                                    <option value="unholydk">
                                        Deathknight / Unholy
                                    </option>
                                    <option value="havocdh">
                                        Demonhunter / Havoc
                                    </option>
                                    <option value="feraldruid">
                                        Druid / Feral
                                    </option>
                                    <option value="balancedruid">
                                        Druid / Balance
                                    </option>
                                    <option value="devewoker">
                                        Ewoker / Devestation
                                    </option>
                                    <option value="augewoker">
                                        Ewoker / Augmentation
                                    </option>
                                    <option value="bmhunter">
                                        Hunter / Beastmaster
                                    </option>
                                    <option value="mmhunter">
                                        Hunter / Marksman
                                    </option>
                                    <option value="survhunter">
                                        Hunter / Survival
                                    </option>
                                    <option value="arcanemage">
                                        Mage / Arcane
                                    </option>
                                    <option value="firemage">
                                        Mage / Fire
                                    </option>
                                    <option value="frostmage">
                                        Mage / Frost
                                    </option>
                                    <option value="windmonk">
                                        Monk / Windwalker
                                    </option>
                                    <option value="retripaladin">
                                        Paladin / Retri
                                    </option>
                                    <option value="outlawrogue">
                                        Rogue / Outlaw
                                    </option>
                                    <option value="assasinrogue">
                                        Rogue / Assasination
                                    </option>
                                    <option value="subrogue">
                                        Rogue / Subtlety
                                    </option>
                                    <option value="enhanceshaman">
                                        Shaman / Enhancement
                                    </option>
                                    <option value="elementalshaman">
                                        Shaman / Elemental
                                    </option>
                                    <option value="demowarlock">
                                        Warlock / Demo
                                    </option>
                                    <option value="affliwarlock">
                                        Warlock / Affliction
                                    </option>
                                    <option value="destrowarlock">
                                        Warlock / Destruction
                                    </option>
                                    <option value="armswarrior">
                                        Warrior / Arms
                                    </option>
                                    <option value="furywarrior">
                                        Warrior / Fury
                                    </option>
                                    <option value="shadowpriest">
                                        Priest / Shadow
                                    </option>
                                </select>
                            </div>
                        )}

                        <button className="application-button">
                            Skicka in
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Application;
