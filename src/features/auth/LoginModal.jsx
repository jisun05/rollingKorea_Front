import React, { useState, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import LoginOauth2 from './LoginOauth2';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthContext } from './AuthContext';

const LoginModal = () => {
    const [show, setShow] = useState(false);
    const { login } = useContext(AuthContext);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    return (
        <>
            <Button
                variant="link"
                onClick={handleShow}
                className="text-white p-0"
                style={{ textDecoration: 'none' }}
            >
                LogIn
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Google Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <GoogleOAuthProvider clientId={clientId}>
                        <LoginOauth2
                            onLoginSuccess={() => {
                                login();       // 전역 로그인 처리
                                handleClose(); // 모달 닫기
                            }}
                        />
                    </GoogleOAuthProvider>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default LoginModal;
