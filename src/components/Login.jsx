import React, { useState, useEffect } from 'react';
import { Modal, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginOauth2 from './LoginOauth2';
import { GoogleOAuthProvider } from '@react-oauth/google';

const LoginModal = () => {
    const [show, setShow] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        setIsLoggedIn(false);
        alert('로그아웃 되었습니다.');
    };

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        setShow(false);
    };

    return (
        <>
            {/* 로그인 상태에 따른 네비게이션 메뉴 */}
            {isLoggedIn ? (
                <>
                    <Nav.Link onClick={handleLogout}>LogOut</Nav.Link>
                    <Nav.Link href="/mypage">My Page</Nav.Link> {/* My Page 링크 */}
                </>
            ) : (
                <Nav.Link onClick={handleShow}>LogIn</Nav.Link>
            )}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Google Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <GoogleOAuthProvider clientId="386257786961-e3udpn75tlqvi29ejnkc3sagve80aqjf.apps.googleusercontent.com">
                        <LoginOauth2 onLoginSuccess={handleLoginSuccess} />
                    </GoogleOAuthProvider>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default LoginModal;
