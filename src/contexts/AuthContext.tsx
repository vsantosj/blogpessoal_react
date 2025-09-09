import { createContext, type ReactNode, useState } from "react";

import type UserLogin from "../models/UserLogin";
import { login } from "../services/Service";
import { ToastAlert } from "../utils/ToastAlert";

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
    name: "",
    user: "",
    password: "",
    photoUrl: "",
    token: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(userLogin: UserLogin) {
    setIsLoading(true);
    try {
      await login("/usuarios/login", userLogin, setUser);
      ToastAlert("O Usuario foi autenticado com sucesso!", "sucess");
    } catch {
      ToastAlert(
        "Dados inconsistentes. Favor verificar as informacoes de login.",
        "error"
      );
    }
    setIsLoading(false);
  }

  function handleLogout() {
    setUser({
      id: 0,
      name: "",
      user: "",
      password: "",
      photoUrl: "",
      token: "",
    });
  }

  return (
    <AuthContext.Provider
      value={{ user, handleLogin, handleLogout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
