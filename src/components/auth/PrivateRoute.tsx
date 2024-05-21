import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../components/auth/authContext";

interface PrivateRouteProps {
    children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
    const { isAuthenticated, isLoading, checkAuth } = useAuth();
    const location = useLocation();

    useEffect(() => {
        checkAuth();
    }, [location, checkAuth]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
