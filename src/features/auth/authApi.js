// src/api/authApi.js
export const getCurrentUser = async () => {
    const res = await fetch('/api/user', { credentials: 'include' });
    if (!res.ok) throw new Error('Not authenticated');
    return res.json();
  };
  
  export const logoutRequest = async () => {
    await fetch('http://localhost:8080/logout', {
      method: 'GET',
      credentials: 'include',
    });
  };
  