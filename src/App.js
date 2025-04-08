import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import Details from './components/Details';
import SvgExpressKorea from './components/ExpressKorea';
import LoginModal from './components/Login';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';

function App() {
    const [hoveredButton, setHoveredButton] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) setIsLoggedIn(true);
    }, []);

    const handleMouseEnter = (buttonName) => {
        setHoveredButton(buttonName);
    };

    const handleMouseLeave = () => {
        setHoveredButton(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        setIsLoggedIn(false);
        alert('로그아웃 되었습니다.');
        navigate('/');
    };

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
    };

    return (
        <div className="App">
            <Navbar bg="primary" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand as={Link} to="/">Rolling Korea</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto d-flex align-items-center">
                            <Nav.Link as={Link} to="/">Home</Nav.Link>

                            {isLoggedIn && (
                                <Nav.Link as={Link} to="/mypage">My Page</Nav.Link>
                            )}

                            {isLoggedIn ? (
                                <Nav.Link onClick={handleLogout}>LogOut</Nav.Link>
                            ) : (
                                <LoginModal onLoginSuccess={handleLoginSuccess} />
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Routes>
                <Route path="/" element={
                    <div className="centered-container">
                        <div className="main-layout">
                            <div className="button-container">
                                {[
                                    'Gyeonggi Area', 'Chungnam Area', 'Chungbuk Area',
                                    'Jeonbuk Area', 'Jeonnam Area', 'Gyeongnam Area',
                                    'Gyeongbuk Area', 'Gangwon Area', 'Jeju Area'
                                ].map((region) => (
                                    <Link to={`/details/${region}`} key={region} className="button-link">
                                        <Button
                                            variant="primary"
                                            size="lg"
                                            className="region-button"
                                            onMouseEnter={() => handleMouseEnter(region)}
                                            onMouseLeave={handleMouseLeave}
                                        >
                                            {region}
                                        </Button>
                                    </Link>
                                ))}
                            </div>
                            <div className="svg-container">
                                <SvgExpressKorea hoveredRegion={hoveredButton} />
                            </div>
                        </div>
                    </div>
                } />
                <Route path="/details/:region" element={<Details />} />
                {/* 마이페이지 라우트 필요시 추가 */}
                {/* <Route path="/mypage" element={<MyPage />} /> */}
            </Routes>
        </div>
    );
}

export default App;
