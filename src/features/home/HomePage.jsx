// src/features/home/HomePage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import SvgExpressKorea from '../../components/ExpressKorea';

const REGIONS = [
  'Seoul Area','Gyeonggi Area','Chungnam Area','Chungbuk Area',
  'Jeonbuk Area','Jeonnam Area','Gyeongnam Area','Gyeongbuk Area',
  'Gangwon Area','Jeju Area'
];
 
export default function HomePage() {
  const [hovered, setHovered] = useState(null);

  return (
    <div className="centered-container">
      <div className="main-layout">
        <div className="button-container">
          {REGIONS.map(region => (
            <Link to={`/details/${region}`} key={region} className="button-link">
              <Button
                variant="primary"
                size="lg"
                className="region-button"
                onMouseEnter={() => setHovered(region)}
                onMouseLeave={() => setHovered(null)}
              >
                {region}
              </Button>
            </Link>
          ))}
        </div>
        <div className="svg-container">
          <SvgExpressKorea hoveredRegion={hovered} />
        </div>
      </div>
    </div>
  );
}
