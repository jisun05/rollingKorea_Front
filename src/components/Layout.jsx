import React, { useContext } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../features/auth/AuthContext';
import LoginModal from '../features/auth/LoginModal';

export default function Layout({ children }) {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    alert('로그아웃 되었습니다.');
    navigate('/');
  };

  return (
    <>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">Rolling Korea</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto d-flex align-items-center">
              <Nav.Link as={Link} to="/" className="text-white">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/details/Seoul Area" className="text-white">
                Region
              </Nav.Link>
              <Nav.Link as={Link} to="/ranking" className="text-white">
                Ranking
              </Nav.Link>

              {isLoggedIn ? (
                <>
                  <Nav.Link as={Link} to="/mypage" className="text-white">
                    My Page
                  </Nav.Link>
                  <Nav.Link onClick={handleLogout} className="text-white">
                    LogOut
                  </Nav.Link>
                </>
              ) : (
                <Nav.Item>
                  <LoginModal />
                </Nav.Item>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container style={{ marginTop: '2rem' }}>
        {children}
      </Container>
    </>
  );
}
