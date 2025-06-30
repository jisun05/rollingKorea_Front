import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import RegionSelector from './RegionSelector';
import { usePlacesByRegion } from './UsePlacesByRegion';
import PlaceItem from './PlaceItem';
import Maps from '../../modules/Maps';
//import { useAuth } from '../auth/AuthContext';

export default function RegionDetailPage() {
  const { region: paramCode } = useParams();      // URL에서 :region을 paramCode로 받음
  const areaCode = Number(paramCode);
  const navigate = useNavigate();
  //const { isLoggedIn } = useAuth();

  const { places, loading, error } = usePlacesByRegion(areaCode);

  const [mapPos, setMapPos]   = useState([37.5665, 126.9780]);
  const [mapName, setMapName] = useState('');

  const handleRegionChange = newCode => {
    navigate(`/region/${newCode}`);
  };

  const handlePlaceClick = (lat, lng, name) => {
    setMapPos([lat, lng]);
    setMapName(name);
  };

  const handleLikeClick = placeId => {
    fetch(`/api/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ placeId }),
    })
      .then(() => window.location.reload())
      .catch(console.error);
  };

  return (
    <div className="d-flex">
      <aside className="p-3" style={{ width: '300px' }}>
        <h5>선택된 지역</h5>
        <RegionSelector value={areaCode} onChange={handleRegionChange} />

        {loading && <p>로딩 중…</p>}
        {error   && <p className="text-danger">{error}</p>}
        {!loading && places.length === 0 && <p>해당 지역의 유적지가 없습니다.</p>}

        <ul style={{ listStyle: 'none', padding: 0 }}>
          {places.map(place => (
            <li key={place.contentId}>
              <PlaceItem
                place={place}
                onClick={handlePlaceClick}
                onLikeClick={handleLikeClick}
              />
            </li>
          ))}
        </ul>
      </aside>

      <main style={{ flex: 1 }}>
        <Maps position={mapPos} placeName={mapName} />
      </main>
    </div>
  );
}
