import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../../utils/Log';
import RegionSelector from './RegionSelector';
import Maps from '../../modules/Maps';

export default function RegionDetailPage() {
  const { region } = useParams();
  const navigate = useNavigate();

  const [places, setPlaces] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(region);
  const [mapPos, setMapPos] = useState([37.62591, 126.8981]);
  const [mapName, setMapName] = useState('');

  useEffect(() => {
    console.log("현재 region 값:", region);
    setSelectedRegion(region);
    apiClient
      .get(`/api/places?region=${encodeURIComponent(region)}`)
      .then(res => setPlaces(res.data.content))  // 페이지네이션 구조일 때 .content 접근
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

        <ul style={{ listStyle: 'none', padding: 0 }}>
          {places.length === 0 ? (
            <li>해당 지역의 문화유산 정보가 없습니다.</li>
          ) : (
            places.map(place => (
              <li key={place.id} style={{ cursor: 'pointer', marginBottom: '8px' }}
                  onClick={() => handlePlaceClick(place.latitude, place.longitude, place.name)}>
                📍 {place.name}
              </li>
            ))
          )}
        </ul>
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
