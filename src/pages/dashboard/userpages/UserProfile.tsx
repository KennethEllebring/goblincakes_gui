import React from "react";
import { useAuth } from "../../../components/auth/authContext";

const UserProfile = () => {
    const { username } = useAuth();
    return (
        <div>
            <h1>{`Välkommen ${username}!`}</h1>
            <span>
                OBS! innan du fortsätter, gå in på inställningar och ändra ditt
                lösenord
            </span>
        </div>
    );
};

export default UserProfile;
