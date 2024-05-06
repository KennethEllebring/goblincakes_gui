import React, { useState, FormEvent } from "react";
import { useAuth } from "../../../components/auth/authContext";
import { fetchData } from "../../../utils/api";
import { toast } from "react-toastify";

const Settings = () => {
    const { username } = useAuth();
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (newPassword !== confirmNewPassword) {
            setErrorMessage("New passwords do not match.");
            return;
        }

        try {
            const response = await fetchData(
                "http://localhost:5050/api/auth/change",
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
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
        } catch (error) {
            console.error("Kunde inte uppdatera lösenord: ", error);
            toast.error("Kunde inte uppdatera lösenord");
            setErrorMessage(
                "Kunde inte uppdatera, kontrollera lösenord och försök igen",
            );
        }
    };

    return (
        <>
            <div className="settings-password">
                <h2>Ändra lösenord</h2>
                <form onSubmit={handleSubmit}>
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
            </div>
        </>
    );
};

export default Settings;
