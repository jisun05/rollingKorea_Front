import React, { useState } from 'react';
import { Modal, Button, Form, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginModal = () => {
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleClose = () => {
        setShow(false);
        setEmail('');
        setPassword('');
        setErrorMessage('');
        setSuccessMessage('');
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

    // OAuth2  URL
    const googleLoginUrl = 'http://localhost:8080/oauth2/authorization/google';

    // 회원가입 URL (예시)
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
                                onClick={() => window.location.href = googleLoginUrl}
                                style={{ marginRight: '1rem' }}
                            >
                                Google Login
                            </Button>
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
