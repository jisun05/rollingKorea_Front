// src/features/auth/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import { getCurrentUser, logoutRequest } from './authApi';
import LoginModal from './LoginModal';

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  // 로그인 정보
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // 로그인 모달 제어
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const openLoginModal  = () => setLoginModalOpen(true);
  const closeLoginModal = () => setLoginModalOpen(false);

  // 서버에서 현재 로그인 유저 조회
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

  // 구글 OAuth 로그인 (리다이렉트)
  const login = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  };

  // 로그아웃
  const logout = async () => {
    try {
      await logoutRequest();
    } finally {
      setIsLoggedIn(false);
      setUser(null);
      window.location.href = '/';
    }
  };

  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      user,
      login,
      logout,
      openLoginModal,
      closeLoginModal
    }}>
      {children}
      {/* 전역에서 로그인 모달을 띄우고 닫을 수 있도록 Provider 바로 아래에 렌더 */}
      <LoginModal
        show={loginModalOpen}
        handleClose={closeLoginModal}
      />
    </AuthContext.Provider>
  );
};
