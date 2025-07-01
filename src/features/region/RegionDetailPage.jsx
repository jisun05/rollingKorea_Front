// src/features/region/RegionDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import RegionSelector from './RegionSelector';
import PlaceItem from './PlaceItem';
import Maps from '../../modules/Maps';
import apiClient from '../../utils/Log';
import { useAuth } from '../auth/AuthContext';

// region 문자열을 areaCode 숫자로 매핑
const REGION_CODE_MAP = {
  Seoul: 1,
  Gyeonggi: 31,
  Chungnam: 33,
  Chungbuk: 36,
  Jeonbuk: 35,
  Jeonnam: 34,
  Gyeongnam: 38,
  Gyeongbuk: 37,
  Gangwon: 32,
  Jeju: 39,
};

export default function RegionDetailPage() {
  const { region } = useParams();
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();

  // URL에 없으면 Seoul
  const currentRegion = region || 'Seoul';
  const areaCode = REGION_CODE_MAP[currentRegion] || REGION_CODE_MAP.Seoul;

  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  // 지도 초기 위치: 서울 시청
  const [mapPos, setMapPos] = useState([37.5665, 126.9780]);
  const [mapName, setMapName] = useState('');

  useEffect(() => {
    setLoading(true);
    apiClient
      .get(`/api/places?areaCode=${areaCode}`)
      .then(res => {
        // Spring Data Page → content 배열
        setPlaces(res.data.content || []);
      })
      .catch(err => {
        console.error('유적지 데이터 fetch 실패', err);
        setPlaces([]); // 빈 배열로
      })
      .finally(() => setLoading(false));
  }, [areaCode]);

  const handleRegionChange = newRegion => {
    navigate(`/region/${encodeURIComponent(newRegion)}`);
  };

  const handlePlaceClick = (lat, lng, name) => {
    setMapPos([lat, lng]);
    setMapName(name);
  };

  const handleLikeClick = placeId => {
    apiClient
      .post('/api/like', { placeId })
      .then(() => {
        setPlaces(prev =>
          prev.map(p =>
            p.placeId === placeId ? { ...p, liked: !p.liked } : p
          )
        );
      })
      .catch(console.error);
  };

  return (
    <div className="d-flex">
      <aside style={{ width: 300, padding: 16 }}>
        <h5>Your Choice</h5>
        <RegionSelector
          value={currentRegion}
          onChange={handleRegionChange}
        />

        {loading ? (
          <Spinner animation="border" />
        ) : places.length === 0 ? (
          <div>No place information available for this region.</div>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {places.map(place => (
              <li key={place.placeId}>
                <PlaceItem
                  place={place}
                  onClick={handlePlaceClick}
                  onLikeClick={handleLikeClick}
                  isLoggedIn={isLoggedIn}
                />
              </li>
            ))}
          </ul>
        )}
      </aside>

      <main style={{ flex: 1, height: '100vh' }}>
        <Maps position={mapPos} placeName={mapName} />
      </main>
    </div>
  );
}
