// src/features/region/RegionDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import RegionSelector from './RegionSelector';
import PlaceItem from './PlaceItem';
import Maps from '../../modules/Maps';
import apiClient from '../../utils/Log';

const REGION_CODE_MAP = {
  Seoul:     1,
  Incheon:   2,
  Gyeonggi: 31,
  Chungnam: 32,
  Chungbuk: 33,
  Jeonbuk: 34,
  Jeonnam: 35,
  Gyeongnam:36,
  Gyeongbuk:37,
  Gangwon:  38,
  Jeju:     39,
};

export default function RegionDetailPage() {
  const { region } = useParams(); // "Seoul"|"Incheon"|…
  const navigate = useNavigate();

  const currentRegion = region || 'Seoul';
  const areaCode = REGION_CODE_MAP[currentRegion];

  const [places, setPlaces]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [mapPos, setMapPos]   = useState([37.5665, 126.9780]);
  const [mapName, setMapName] = useState('');

  // like 버튼 토글 핸들러
  const handleLikeClick = (contentId) => {
    apiClient
      .post('/api/like', { placeId: contentId })
      .then(() => {
        setPlaces(prev =>
          prev.map(p =>
            p.contentId === contentId ? { ...p, liked: !p.liked } : p
          )
        );
      })
      .catch(console.error);
  };

  useEffect(() => {
    setLoading(true);
    apiClient
      .get(`/api/places?areaCode=${areaCode}`)
      .then(res => {
        setPlaces(res.data.content || []);
      })
      .catch(err => {
        console.error('유적지 데이터 fetch 실패', err);
        setPlaces([]);
      })
      .finally(() => setLoading(false));
  }, [areaCode]);

  const handleRegionChange = newRegion => {
    navigate(`/region/${encodeURIComponent(newRegion)}`);
  };

  return (
    <div className="d-flex">
      <aside style={{ width: 300, padding: 16 }}>
        <h5>Your Choice</h5>
        <RegionSelector
          value={currentRegion}           // 문자열
          onChange={handleRegionChange}   // 문자열 콜백
        />

        {loading ? (
          <Spinner animation="border" />
        ) : places.length === 0 ? (
          <div>No place information available for this region.</div>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {places.map(place => (
              <li key={place.contentId}>
                <PlaceItem
                  place={place}
                  onClick={(lat, lng, name) => {
                    setMapPos([lat, lng]);
                    setMapName(name);
                  }}
                  onLikeClick={handleLikeClick}
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
