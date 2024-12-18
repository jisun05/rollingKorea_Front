import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import {Navbar,Container,Nav,Button} from 'react-bootstrap';
import Details from './components/Details';
import SvgJisunKorea from './components/JisunKorea'
import LoginModal from './components/Login'
import { Routes, Route, Link} from 'react-router-dom';
function App() {

    const [hoveredButton, setHoveredButton] = useState(null); // 어떤 버튼이 hovered 되었는지를 추적
    const handleMouseEnter = (buttonName) => {
        setHoveredButton(buttonName); // 버튼에 마우스가 들어갔을 때 상태 변경
    };

    const handleMouseLeave = () => {
        setHoveredButton(null); // 마우스가 버튼을 떠날 때 상태 초기화
    };
  
  return (
    
    <div className="App">
    <Navbar bg="primary" data-bs-theme="dark">
    <Container>
      <Navbar.Brand href="/">Rolling Korea</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="/login"><LoginModal /></Nav.Link>           
      </Nav>
    </Container>
  </Navbar>
  <Routes>
        <Route path="/" element={

<div style={{ 
    display: 'flex', 
    justifyContent: 'center', // 수평 가운데 정렬
    alignItems: 'center', // 수직 가운데 정렬
    height: '100vh', // 전체 화면 높이
    margin: 70 // 기본 마진 제거
    
}}>
<div style={{ display: 'flex', flexDirection: 'row', gap: '250px', justifyContent: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', width : "270px", marginTop: '150px', marginLeft: '200px' }}>
                    {['Gyeonggi Area', 'Chungnam Area', 'Chungbuk Area', 'Jeonbuk Area', 'Jeonnam Area', 'Gyeongnam Area', 'Gyeongbuk Area', 'Gangwon Area', 'Jeju Area'].map((region) => (
                        <Link to={`/details/${region}`} key={region} style={{ textDecoration: 'none' }}>
                            <Button
                                variant="primary"
                                size="lg"
                                style={{ width: '100%' }}
                                onMouseEnter={() => handleMouseEnter(region)} // 마우스가 버튼에 들어갈 때
                                onMouseLeave={handleMouseLeave} // 마우스가 버튼을 떠날 때                            
                            >
                                {region}
                            </Button>
                        </Link>
                        ))}.
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: '250px', justifyContent: 'center',marginTop: '110px' }}>
                        <SvgJisunKorea hoveredRegion={hoveredButton} /> {/* hoveredRegion prop 전달 */}
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
