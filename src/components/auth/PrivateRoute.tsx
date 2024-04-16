import React from "react";
import { Navigate } from "react-router-dom";

type PrivateRouteProps = {
    children: React.ReactNode;
};

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const isAuthenticated = localStorage.getItem("user");

    return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
