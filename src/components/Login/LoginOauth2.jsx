import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const LoginOauth2 = ({ onLoginSuccess }) => {
    const googleLoginUrl = process.env.REACT_APP_GOOGLE_LOGIN_URL || 'http://localhost:8080/api/google/login';

    const handleLoginSuccess = (credentialResponse) => {
        fetch(googleLoginUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idToken: credentialResponse.credential }),
        })
            .then(response => {
                if (!response.ok) throw new Error('로그인 실패');
                return response.json();
            })
            .then(data => {
                localStorage.setItem('accessToken', data.token);
                alert('로그인 성공!');
                if (onLoginSuccess) onLoginSuccess(); // 여기서 모달 닫고 로그인 처리됨
            })
            .catch(error => {
                console.error('로그인 에러:', error);
                alert('로그인 중 문제가 발생했습니다.');
            });
    };

    return (
        <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={() => alert('Google 로그인 실패')}
            useOneTap
        />
    );
};

export default LoginOauth2;
