// src/App.jsx
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Details from './components/Details';
import SvgExpressKorea from './components/ExpressKorea';
import Layout from './components/Layout';
import {Button } from 'react-bootstrap';  // ← 여기

function App() {
  const [hoveredButton, setHoveredButton] = useState(null);

  const handleMouseEnter = (region) => setHoveredButton(region);
  const handleMouseLeave = () => setHoveredButton(null);

  return (
    <Layout>
      <Routes>
        <Route
          path="/"
          element={
            <div className="centered-container">
              <div className="main-layout">
                <div className="button-container">
                  {[
                    'Seoul Area', 'Gyeonggi Area', 'Chungnam Area',
                    'Chungbuk Area','Jeonbuk Area', 'Jeonnam Area',
                    'Gyeongnam Area','Gyeongbuk Area','Gangwon Area','Jeju Area'
                  ].map((region) => (
                    <Link
                      to={`/details/${region}`}
                      key={region}
                      className="button-link"
                    >
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
          }
        />
        <Route path="/details/:region" element={<Details />} />
        <Route
          path="/ranking"
          element={<div style={{ padding: '2rem' }}>Ranking 페이지입니다.</div>}
        />
        <Route
          path="/mypage"
          element={<div style={{ padding: '2rem' }}>My Page입니다.</div>}
        />
      </Routes>
    </Layout>
  );
}

export default App;
