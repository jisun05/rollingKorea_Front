// src/features/region/RegionDetailPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import RegionSelector from './RegionSelector';
import PlaceItem from './PlaceItem';
import Maps from '../../modules/Maps';
import apiClient from '../../utils/Log';
import { useAuth } from '../auth/AuthContext';

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
  const { region } = useParams(); // URL 에서 "Seoul"|"Incheon"|… 가져옴
  const navigate = useNavigate();
  const { isLoggedIn, openLoginModal } = useAuth();

  const currentRegion = region || 'Seoul';
  const areaCode = REGION_CODE_MAP[currentRegion] || 1;

  const [places, setPlaces]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [mapPos, setMapPos]   = useState([37.5665, 126.9780]); // 기본 서울 시청
  const [mapName, setMapName] = useState('');

  // 좋아요 핸들러
  const handleLikeClick = contentId => {
    if (!isLoggedIn) {
      // 미로그인 시 로그인 모달 열기
      openLoginModal();
      return;
    }

    apiClient
      .post('/api/like-places', { contentId })
      .then(() => {
        setPlaces(prev =>
          prev.map(p =>
            p.contentId === contentId
              ? { ...p, liked: !p.liked }
              : p
          )
        );
      })
      .catch(console.error);
  };

  // 페이지 로드 또는 지역 변경 시 데이터 패치
  useEffect(() => {
    setLoading(true);
    apiClient
      .get(`/api/places?areaCode=${areaCode}`)
      .then(res => {
        const data = res.data.content || [];
        setPlaces(data);

        if (data.length > 0) {
          // 첫 번째 장소를 지도에 자동 포커스
          const first = data[0];
          setMapPos([ first.mapY, first.mapX ]);
          setMapName(first.title);
        } else {
          // 데이터 없으면 기본값 유지
          setMapPos([37.5665, 126.9780]);
          setMapName('');
        }
      })
      .catch(err => {
        console.error('유적지 데이터 fetch 실패', err);
        setPlaces([]);
        setMapPos([37.5665, 126.9780]);
        setMapName('');
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
          value={currentRegion}           // 문자열로 현재 지역 표시
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
