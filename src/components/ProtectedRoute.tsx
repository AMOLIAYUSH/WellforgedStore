import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isLoggedIn, setRedirectUrl } = useAuth();
    const location = useLocation();

    if (!isLoggedIn) {
        // Store the current URL for redirect after login
        setRedirectUrl(location.pathname + location.search);
        return <Navigate to="/auth" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
