// src/features/region/RegionDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../../utils/Log';
import RegionSelector from './RegionSelector';
import PlaceTabs from './PlaceTabs';
import Maps from '../../modules/Maps';

export default function RegionDetailPage() {
  const { region } = useParams();
  const navigate = useNavigate();

  const [places, setPlaces] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(region);
  const [mapPos, setMapPos] = useState([37.62591, 126.8981]);
  const [mapName, setMapName] = useState('');

  useEffect(() => {
    setSelectedRegion(region);
    apiClient
      .get(`/api/place?region=${encodeURIComponent(region)}`)
      .then(res => setPlaces(res.data))
      .catch(console.error);
  }, [region]);

  const handleRegionChange = newRegion => {
    setSelectedRegion(newRegion);
    navigate(`/details/${encodeURIComponent(newRegion)}`);
  };

  const handlePlaceClick = (lat, lng, name) => {
    setMapPos([lat, lng]);
    setMapName(name);
  };

  return (
    <div className="region-detail">
      {/* 왼쪽 사이드바 */}
      <div className="region-detail__sidebar">
        <h5>Your Choice</h5>
        <RegionSelector
          value={selectedRegion}
          onChange={handleRegionChange}
        />
        <PlaceTabs
          places={places}
          onPlaceClick={handlePlaceClick}
        />
      </div>

      {/* 오른쪽 지도 */}
      <div className="region-detail__map">
        <Maps
          position={mapPos}
          placeName={mapName}
        />
      </div>
    </div>
  );
}
