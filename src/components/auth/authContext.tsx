import React, {
    useContext,
    createContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

interface AuthContextType {
    isAuthenticated: boolean;
    isLoading: boolean;
    isAdmin: boolean;
    username: string;
    characterName: string;
    realm: string;
    characterSpec: string;
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [username, setUsername] = useState<string>("");
    const [characterName, setCharacterName] = useState<string>("");
    const [realm, setRealm] = useState<string>("");
    const [characterSpec, setCharacterSpec] = useState<string>("");
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const navigate = useNavigate();

    const checkAuth = async () => {
        try {
            const response = await fetch(
                "http://localhost:5050/api/auth/check",
                {
                    credentials: "include",
                },
            );
            const data = await response;
            const userData = await response.json();
            const { username, isAdmin, characterName, realm, characterSpec } =
                userData;

            if (data.status === 200) {
                setIsAuthenticated(true);
                setIsAdmin(isAdmin);
                setUsername(username);
                setCharacterName(characterName);
                setRealm(realm);
                setCharacterSpec(characterSpec);
            } else {
                setIsAuthenticated(false);
            }
        } catch (error) {
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const login = async (username: string, password: string) => {
        try {
            const response = await fetch(
                "http://localhost:5050/api/auth/login",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    credentials: "include",
                    body: JSON.stringify({ username, password }),
                },
            );

            const data = await response.json();

            if (response.ok) {
                await checkAuth();
                toast.success(data.message);
                navigate("/dashboard/profile");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const logout = async () => {
        try {
            const response = await fetch(
                "http://localhost:5050/api/auth/logout",
                {
                    method: "GET",
                    credentials: "include",
                },
            );

            const data = await response.json();

            if (response.ok) {
                setIsAuthenticated(false);
                setIsAdmin(false);
                setUsername("");
                setCharacterName("");
                setRealm("");
                setCharacterSpec("");
                toast.success(data.message);
                navigate("/login");
            }
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                isLoading,
                isAdmin,
                username,
                characterName,
                realm,
                characterSpec,
                login,
                logout,
                checkAuth,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
