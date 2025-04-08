import React from 'react';
import { GoogleLogin } from '@react-oauth/google';

const LoginOauth2 = () => {
    const googleLoginUrl = process.env.REACT_APP_GOOGLE_LOGIN_URL || 'http://localhost:8080/api/google/login';

    const handleLoginSuccess = (credentialResponse) => {
        console.log('Login Success:', credentialResponse);

        fetch(googleLoginUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ idToken: credentialResponse.credential }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('로그인 실패');
            }
            return response.json();
        })
        .then(data => {
            console.log('서버 응답:', data);
            localStorage.setItem('accessToken', data.token); // JWT 저장
            alert('로그인 성공!');
            // 추가 리다이렉트 또는 상태 업데이트 가능
        })
        .catch(error => {
            console.error('Error:', error);
            alert('로그인 중 오류 발생');
        });
    };

    const handleLoginError = () => {
        console.error('Google 로그인 실패');
        alert('Google 로그인 실패');
    };

    return (
        <div>
            <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={handleLoginError}
                useOneTap
            />
        </div>
    );
};

export default LoginOauth2;
