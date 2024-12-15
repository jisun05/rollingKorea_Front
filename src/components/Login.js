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

    return (
        <>
            <Nav.Link onClick={handleShow}>LogIn</Nav.Link>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>로그인</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>이메일</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="이메일 입력"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>비밀번호</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="비밀번호 입력"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            로그인
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default LoginModal;