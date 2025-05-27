// src/features/auth/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser, logoutRequest } from './authApi';


export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const data = await getCurrentUser();
      setIsLoggedIn(true);
      setUser(data);
    } catch {
      setIsLoggedIn(false);
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  const logout = async () => {
    await logoutRequest();
    setIsLoggedIn(false);
    setUser(null);
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
