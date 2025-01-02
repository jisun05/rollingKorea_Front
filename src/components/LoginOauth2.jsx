import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const LoginOauth2 = () => {
    // OAuth2 URL
    const googleLoginUrl = process.env.REACT_APP_GOOGLE_LOGIN_URL; // 환경 변수에서 URL 가져오기

    const handleLoginSuccess = (credentialResponse) => {
        console.log('Login Success:', credentialResponse);
        // 서버에 로그인 요청을 보내는 로직 추가
        fetch(googleLoginUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: credentialResponse.credential }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('로그인 실패');
            }
            return response.json();
        })
        .then(data => {
            console.log('OAuth2 Login Success:', data);
            // 로그인 성공 후 처리
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    const handleLoginError = (error) => {
        console.error('Login Failed:', error);
    };

    return (
        <div>
            <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={handleLoginError}
            />
        </div>
    );
};

export default LoginOauth2;
