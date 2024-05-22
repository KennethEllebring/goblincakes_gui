import React, { useState, FormEvent } from "react";
import { useAuth } from "../../../components/auth/authContext";
import { fetchData } from "../../../utils/api";
import { toast } from "react-toastify";

const Settings = () => {
    const { username, logout, characterName, realm, characterSpec } = useAuth();
    const [chooseCharacterName, setChooseCharacterName] = useState("");
    const [chooseRealm, setChooseRealm] = useState("");
    const [chooseCharacterSpec, setChooseCharacterSpec] = useState(
        characterSpec || "",
    );
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isFormEnabled, setIsFormEnabled] = useState(false);

    const handleEnableForm = () => {
        setIsFormEnabled(true);
    };

    const handleSubmitCharacter = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await fetchData(
                "https://goblincakes-server.vercel.app/api/auth/edituser",
                // "http://localhost:5050/api/auth/edituser",
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    mode: "cors",
                    credentials: "include",
                    body: JSON.stringify({
                        username: username,
                        characterName: chooseCharacterName,
                        realm: chooseRealm,
                        characterSpec: chooseCharacterSpec,
                    }),
                },
            );

            setChooseCharacterName("");
            setChooseRealm("");
            setChooseCharacterSpec("tank");
            setIsFormEnabled(false);
            console.log("La till karaktär: ", response);
            toast.success("La till karaktär");
            logout();
        } catch (error) {
            console.error("Kunde inte lägga till karaktär: ", error);
            toast.error("Kunde inte lägga till karaktär");
        }
    };

    const handleSubmitPassword = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newPassword !== confirmNewPassword) {
            setErrorMessage("New passwords do not match.");
            return;
        }

        try {
            const response = await fetchData(
                "https://goblincakes-server.vercel.app/api/auth/changepassword",
                // "http://localhost:5050/api/auth/changepassword",
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    mode: "cors",
                    credentials: "include",
                    body: JSON.stringify({
                        username: username,
                        oldPassword: oldPassword,
                        newPassword: newPassword,
                    }),
                },
            );

            setOldPassword("");
            setNewPassword("");
            setConfirmNewPassword("");
            setErrorMessage("");

            console.log("Password updated successfully: ", response);
            toast.success("Password updated successfully");
            logout();
        } catch (error) {
            console.error("Kunde inte uppdatera lösenord: ", error);
            toast.error("Kunde inte uppdatera lösenord");
            setErrorMessage(
                "Kunde inte uppdatera, kontrollera lösenord och försök igen",
            );
        }
    };

    const handleDeleteAccount = async () => {
        const userConfirmed = window.confirm(
            "Är du säker på att du vill ta bort ditt konto?",
        );

        if (!userConfirmed) {
            return;
        }
        try {
            const response = await fetchData(
                `https://goblincakes-server.vercel.app/api/auth/removeuser/${username}`,
                // `http://localhost:5050/api/auth/removeuser/${username}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    mode: "cors",
                    credentials: "include",
                },
            );

            console.log("Tog bort användare: ", response);
            toast.success("Tog bort användare");
            logout();
        } catch (error) {
            console.error("Kunde inte tabort användare: ", error);
            toast.error("Kunde inte tabort användare");
        }
    };

    return (
        <div className="settings-wrapper">
            <h2 className="settings-header-character">
                Byt karaktär och realm
            </h2>
            <span className="settings-info-character">{`(Använd endast detta om du byter main karaktär i raiden!`}</span>
            <p className="settings-info-character">{`Du kommer att loggas ut när du sparar din karaktär)`}</p>
            <button
                onClick={handleEnableForm}
                className="settings-enable-button"
            >
                Lås upp karaktärsbyte
            </button>
            <div className="settings">
                <form onSubmit={handleSubmitCharacter}>
                    <div>
                        <label htmlFor="char-name">Karaktärsnamn:</label>
                        <input
                            type="text"
                            id="char-name"
                            placeholder={characterName}
                            value={chooseCharacterName}
                            onChange={(e) =>
                                setChooseCharacterName(e.target.value)
                            }
                            required
                            disabled={!isFormEnabled}
                        />
                    </div>
                    <div>
                        <label htmlFor="spec">Ställ in din raidspec: </label>
                        <select
                            name="spec"
                            id="spec"
                            value={chooseCharacterSpec}
                            onChange={(e) =>
                                setChooseCharacterSpec(e.target.value)
                            }
                            required
                            disabled={!isFormEnabled}
                        >
                            <option value="">Välj spec</option>
                            <option value="tank">Tank</option>
                            <option value="dps">DPS</option>
                            <option value="healer">Healer</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="realm">Lägg till Realm:</label>
                        <input
                            type="text"
                            id="realm"
                            placeholder={realm}
                            value={chooseRealm}
                            onChange={(e) => setChooseRealm(e.target.value)}
                            required
                            disabled={!isFormEnabled}
                        />
                    </div>
                    <button
                        type="submit"
                        className="update-button"
                        disabled={!isFormEnabled}
                    >
                        Spara karaktär
                    </button>
                </form>
            </div>
            <div className="settings">
                <h2>Ändra lösenord</h2>
                <form onSubmit={handleSubmitPassword}>
                    <div>
                        <label htmlFor="oldPassword">Gammalt lösenord:</label>
                        <input
                            type="password"
                            id="oldPassword"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="newPassword">Nytt lösenord:</label>
                        <input
                            type="password"
                            id="newPassword"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmNewPassword">
                            Bekräfta nytt lösenord:
                        </label>
                        <input
                            type="password"
                            id="confirmNewPassword"
                            value={confirmNewPassword}
                            onChange={(e) =>
                                setConfirmNewPassword(e.target.value)
                            }
                            required
                        />
                    </div>
                    {errorMessage && (
                        <div style={{ color: "red" }}>{errorMessage}</div>
                    )}
                    <button type="submit" className="update-button">
                        Uppdatera lösenord
                    </button>
                </form>
                <hr />
                <h2 className="settings-header-character">
                    Vill du ta bort ditt konto?
                </h2>
                <p className="settings-info-character">
                    Varning! hela kontot kommer att tas bort
                </p>
                <button onClick={handleDeleteAccount} className="delete-button">
                    Ta bort konto
                </button>
            </div>
        </div>
    );
};

export default Settings;
