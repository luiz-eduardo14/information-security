import { useCallback, useEffect, useState } from "react";
import { Storage } from "../utils";
import { meRequest } from "../services/user";
import { useNavigate } from "react-router";
import { UserDTO } from "../services/types/user";


export type useAuthReturn = {
    token: string | null;
    saveToken: (token: string) => void;
    authenticated: boolean;
    user: UserDTO | null;
    logout: () => void;
    ready: boolean;
    fetchMe: () => void;
}

export default function useAuth(): useAuthReturn {
    const [token, setToken] = useState<string | null>(null);
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<UserDTO | null>(null);
    const [ready, setReady] = useState<boolean>(false);

    const saveToken = useCallback((token: string) => {
        localStorage.setItem(Storage.TOKEN, token);
        setToken(token);
    }, [setToken]);

    const navigate = useNavigate();

    const logout = useCallback(() => {
        localStorage.removeItem(Storage.TOKEN);
        setAuthenticated(false);
        setToken(null);
        setUser(null);
        navigate('/login');
    }, [navigate]);
        
    const fetchMe = useCallback(async () => {
        try {
            const token = localStorage.getItem(Storage.TOKEN);
            if (!token) throw new Error('Token not found');
            const response = await meRequest(null, token);
            if (!response.ok) throw new Error('Invalid token');
            setUser(response.data ?? null);
            setAuthenticated(true);
            setToken(token);
            navigate('/');
        } catch (error) {
            console.error(error);
            logout();
        } finally {
            setReady(true);
        }
    }, [logout, navigate]);

    useEffect(() => {
        fetchMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (!token) return;
        fetchMe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [token]);

    return {
        token,
        saveToken,
        authenticated,
        user,
        logout,
        ready,
        fetchMe
    };
}