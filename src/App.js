import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import Details from './components/Details';
import SvgExpressKorea from './components/ExpressKorea';
import LoginModal from './components/Login';
import { Routes, Route, Link } from 'react-router-dom';

function App() {
    const [hoveredButton, setHoveredButton] = useState(null); 

    const handleMouseEnter = (buttonName) => {
        setHoveredButton(buttonName);
    };

    const handleMouseLeave = () => {
        setHoveredButton(null);
    };

    return (
        <div className="App">
            <Navbar bg="primary" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">Rolling Korea</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link> 
                        <Nav.Link as={Link} to="/login">
                            <LoginModal />
                        </Nav.Link>           
                    </Nav>
                </Container>
            </Navbar>

            <Routes>
                <Route path="/" element={
                    <div className="centered-container">
                        <div className="main-layout">
                            <div className="button-container">
                                {['Gyeonggi Area', 'Chungnam Area', 'Chungbuk Area', 'Jeonbuk Area', 'Jeonnam Area', 
                                  'Gyeongnam Area', 'Gyeongbuk Area', 'Gangwon Area', 'Jeju Area'].map((region) => (
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
                }/>
                <Route path="/details/:region" element={<Details />} />  
            </Routes>
        </div>
    );
}

export default App;
