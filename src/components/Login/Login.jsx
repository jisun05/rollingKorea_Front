import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginOauth2 from './LoginOauth2';
import { GoogleOAuthProvider } from '@react-oauth/google';

const LoginModal = ({ onLoginSuccess }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                    <GoogleOAuthProvider clientId="386257786961-e3udpn75tlqvi29ejnkc3sagve80aqjf.apps.googleusercontent.com">
                        <LoginOauth2
                            onLoginSuccess={() => {
                                if (onLoginSuccess) onLoginSuccess();
                                handleClose();
                            }}
                        />
                    </GoogleOAuthProvider>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default LoginModal;
