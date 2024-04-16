import React from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        localStorage.setItem("user", "loggedIn");
        navigate("/dashboard");
    };

    return (
        <div>
            <h1>Login</h1>
            <button onClick={handleLogin}>Log In</button>
        </div>
    );
};

export default Login;
