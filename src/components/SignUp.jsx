import React, { useState } from 'react';
import { Modal, Button, Form, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const SignupModal = () => {
    const [show, setShow] = useState(false);
    const [loginId, setLoginId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nickname, setNickname] = useState('');
    const [userName, setUserName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthday, setBirthday] = useState('');
    const [location, setLocation] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleClose = () => {
        setShow(false);
        setLoginId('');
        setPassword('');
        setConfirmPassword('');
        setNickname('');
        setUserName('');
        setPhoneNumber('');
        setBirthday('');
        setLocation('');
        setErrorMessage('');
        setSuccessMessage('');
    };

    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage('비밀번호가 일치하지 않습니다.');
            return;
        }

        // 회원가입 요청을 백엔드로 보냅니다.
        fetch('/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                loginId, 
                password, 
                nickname, 
                userName, 
                phoneNumber, 
                birthday, 
                location 
            }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('회원가입 실패');
            }
            return response.json();
        })
        .then(data => {
            setSuccessMessage('회원가입 성공!');
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
            <Nav.Link onClick={handleShow}>SignUp</Nav.Link>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign Up</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formBasicLoginId">
                            <Form.Label>Login ID</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your login ID"
                                value={loginId}
                                onChange={(e) => setLoginId(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicConfirmPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Confirm your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicNickname">
                            <Form.Label>Nickname</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your nickname"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicUserName">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your first name"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your phone number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicBirthday">
                            <Form.Label>Birthday</Form.Label>
                            <Form.Control
                                type="date"
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicLocation">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </Form.Group>

                        <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: '2rem' }}>
                            <Button variant="primary" type="submit" style={{ marginRight: '1rem' }}>
                                Submit
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default SignupModal;
