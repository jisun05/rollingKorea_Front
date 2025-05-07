// src/api/axios.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // env에 선언된 값
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,  // 쿠키 인증을 쓴다면 true
});

// (선택) 요청 인터셉터에 토큰 자동 첨부
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default apiClient;
