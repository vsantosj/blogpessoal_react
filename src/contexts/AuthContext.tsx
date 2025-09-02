import { createContext, useState, type ReactNode } from "react";
import { login } from "../services/Service";
import type UserLogin from "../models/UserLogin";



interface AuthContextProps {
    user: UserLogin;
    handleLogout(): void;
    handleLogin(user: UserLogin): void;
    isLoading: boolean;
}

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {

    const [user, setUser] = useState<UserLogin>({
        id: 0,
        name: '',
        user: '',
        password: '',
        photoUrl: '',
        token: ''
    })

    const [isLoading, setIsLoading] = useState(false);

    async function handleLogin(userLogin: UserLogin) {
        setIsLoading(true);
        try {
            await login('/usuarios/login', userLogin, setUser);
            alert("O Usuario foi autenticado com sucesso!");
        } catch (error) {
            alert("Dados inconsistentes. Favor verificar as informacoes de login.");
        }
        setIsLoading(false);
    }

    function handleLogout() {
        setUser({
            id: 0,
            name: '',
            user: '',
            password: '',
            photoUrl: '',
            token: ''
        })
    }



    return (
        <AuthContext.Provider value={{user, handleLogin, handleLogout, isLoading}}>
            {children}
        </AuthContext.Provider>
    )
}
