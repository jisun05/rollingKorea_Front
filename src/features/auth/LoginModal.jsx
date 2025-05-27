import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FcGoogle } from 'react-icons/fc';  // Google 아이콘 추가
import { useAuth } from './AuthContext';

export default function LoginModal({ show, handleClose }) {
  const { login } = useAuth();

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Social Login</Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column align-items-center">
        <Button
          variant="light"
          className="d-flex align-items-center"
          onClick={() => {
            login();
            handleClose();  // 모달 닫기
          }}
        >
          <FcGoogle size={24} style={{ marginRight: '8px' }} />
          Google로 로그인
        </Button>
      </Modal.Body>
    </Modal>
  );
}
