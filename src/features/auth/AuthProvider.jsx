// src/features/auth/AuthProvider.jsx
import React, { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { getCurrentUser } from '../../api/authApi';  // API 모듈에서 가져오기

export default function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = () => {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';  // 구글 로그인 페이지 이동
  };

  const logout = () => {
    window.location.href = 'http://localhost:8080/logout';  // 백엔드 로그아웃
  };

  useEffect(() => {
    // 백엔드 세션으로 로그인 상태 확인
    getCurrentUser()
      .then(() => setIsLoggedIn(true))
      .catch(() => setIsLoggedIn(false));
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
