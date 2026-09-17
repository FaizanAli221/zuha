import { createContext, useContext, useEffect, useState } from "react";
import { login as apiLogin, register as apiRegister } from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("zuha_user");
    const savedToken = localStorage.getItem("zuha_token");
    if (savedUser && savedToken) {
      setUser(JSON.parse(savedUser));
      setToken(savedToken);
    }
  }, []);

  function persist(userData, tokenData) {
    setUser(userData);
    setToken(tokenData);
    localStorage.setItem("zuha_user", JSON.stringify(userData));
    localStorage.setItem("zuha_token", tokenData);
  }

  async function login(email, password) {
    const data = await apiLogin(email, password);
    persist(data.user, data.token);
    return data.user;
  }

  async function register(name, email, password, phone) {
    const data = await apiRegister(name, email, password, phone);
    persist(data.user, data.token);
    return data.user;
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("zuha_user");
    localStorage.removeItem("zuha_token");
  }

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
