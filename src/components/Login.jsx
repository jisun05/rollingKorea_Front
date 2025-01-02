import React, { useState } from 'react';
import { Modal, Button, Form, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginOauth2 from './LoginOauth2';
import { GoogleOAuthProvider } from '@react-oauth/google'; // GoogleOAuthProvider 임포트

const LoginModal = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoginVisible, setIsLoginVisible] = useState(false);

    const handleLoginClick = () => {
        setIsLoginVisible(true);
    };

    const handleClose = () => {
        setShow(false);
        setEmail('');
        setPassword('');
        setErrorMessage('');
        setSuccessMessage('');
        setIsLoginVisible(false); // 로그인 상태 초기화
    };

    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        // 로그인 요청을 백엔드로 보냅니다.
        fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('로그인 실패');
            }
            return response.json();
        })
        .then(data => {
            setSuccessMessage('로그인 성공!');
            console.log(data);
            handleClose(); // 모달 닫기
        })
        .catch(error => {
            setErrorMessage(error.message);
            console.error('Error:', error);
        });
    };

    const signUpUrl = '/signup'; // 실제 회원가입 경로로 수정 필요

    return (
        <>
            <Nav.Link onClick={handleShow}>LogIn</Nav.Link>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="write your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="write your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '2rem' }}>
                            <Button variant="primary" type="submit" style={{ marginRight: '1rem' }}>
                                Login
                            </Button>
                            <Button 
                             variant="primary" 
                             onClick={handleLoginClick}
                             style={{ marginRight: '1rem' }}
                            >
                            Google Login
                            </Button>
                             {isLoginVisible && (
                                <GoogleOAuthProvider CLIENT_ID> {/* GoogleOAuthProvider로 감싸기 */}
                                    <LoginOauth2 />
                                </GoogleOAuthProvider>
                             )}
                            <Button 
                                variant="primary" 
                                onClick={() => window.location.href = signUpUrl}
                            >
                                Signup
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default LoginModal;
