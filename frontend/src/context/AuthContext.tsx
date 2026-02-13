import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
    id: string;
    mobile_number: string;
    first_name: string;
    last_name?: string;
    email: string;
    role: string;
}

interface PendingCartAction {
    sku: string;
    action: "add";
}

interface AuthContextType {
    isLoggedIn: boolean;
    user: User | null;
    redirectUrl: string | null;
    pendingCartAction: PendingCartAction | null;
    token: string | null;
    login: (token: string, user: User) => void;
    logout: () => void;
    setRedirectUrl: (url: string | null) => void;
    setPendingCartAction: (action: PendingCartAction | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [redirectUrl, setRedirectUrl] = useState<string | null>(null);
    const [pendingCartAction, setPendingCartAction] = useState<PendingCartAction | null>(null);

    // Load auth state from localStorage on mount
    useEffect(() => {
        const storedAuth = localStorage.getItem("wellforged_auth");
        if (storedAuth) {
            try {
                const { isLoggedIn: stored, user: storedUser, token } = JSON.parse(storedAuth);
                if (stored && storedUser && token) {
                    setIsLoggedIn(true);
                    setUser(storedUser);
                    setToken(token);
                }
            } catch (error) {
                console.error("Failed to parse stored auth:", error);
                localStorage.removeItem("wellforged_auth");
            }
        }
    }, []);

    const login = (token: string, user: User) => {
        setIsLoggedIn(true);
        setUser(user);
        setToken(token);

        // Persist to localStorage
        localStorage.setItem("wellforged_auth", JSON.stringify({
            isLoggedIn: true,
            user,
            token
        }));
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUser(null);
        setToken(null);
        setRedirectUrl(null);
        setPendingCartAction(null);
        localStorage.removeItem("wellforged_auth");
    };

    return (
        <AuthContext.Provider
            value={{
                isLoggedIn,
                user,
                token,
                redirectUrl,
                pendingCartAction,
                login,
                logout,
                setRedirectUrl,
                setPendingCartAction,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
