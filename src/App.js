import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState, useEffect } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import Details from './components/Details';
import SvgExpressKorea from './components/ExpressKorea';
import LoginModal from './components/Login/Login';
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
                        
                        {/* 🔥 key={isLoggedIn}를 추가해서 Nav를 리렌더링하게 만듦 */}
                        <Nav className="ms-auto d-flex align-items-center" key={isLoggedIn}>
                            <Nav.Link as={Link} to="/" className="text-white">Home</Nav.Link>
                            <Nav.Link as={Link} to="/region" className="text-white">Region</Nav.Link>
                            <Nav.Link as={Link} to="/ranking" className="text-white">Ranking</Nav.Link>

                            {isLoggedIn ? (
                                <>
                                    <Nav.Link as={Link} to="/mypage" className="text-white">My Page</Nav.Link>
                                    <Nav.Link onClick={handleLogout} className="text-white">LogOut</Nav.Link>
                                </>
                            ) : (
                                <Nav.Item>
                                    <LoginModal onLoginSuccess={handleLoginSuccess} />
                                </Nav.Item>
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
                <Route path="/region" element={<div style={{ padding: '2rem' }}>Region 페이지입니다.</div>} />
                <Route path="/ranking" element={<div style={{ padding: '2rem' }}>Ranking 페이지입니다.</div>} />
                <Route path="/mypage" element={<div style={{ padding: '2rem' }}>My Page입니다.</div>} />
            </Routes>
        </div>
    );
}

export default App;
