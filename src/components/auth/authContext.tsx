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
    login: (username: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [username, setUsername] = useState<string>("");
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
            const { username, isAdmin } = await userData;

            if (data.status === 200) {
                setIsAuthenticated(true);
                setIsAdmin(isAdmin);
                setUsername(username);
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
                console.log(data.message);
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
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext)!;
