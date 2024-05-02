import React, { useState } from "react";
import { useAuth } from "../../components/auth/authContext";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        login(username, password);
    };

    return (
        <div className="login-wrapper">
            <div className="login">
                <form onSubmit={handleLogin}>
                    <label>
                        Användarnamn:
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    <label>
                        Lösenord:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    <button className="login-button" type="submit">
                        Logga in
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
