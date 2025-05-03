// src/modules/Maps.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';

// 뷰 위치를 변경해 줄 훅
function Recenter({ center, zoom }) {
  const map = useMap();
  React.useEffect(() => {
    map.invalidateSize();      // 컨테이너 리사이즈 반영
    map.setView(center, zoom); // 뷰 재설정
  }, [center, zoom, map]);
  return null;
}

export default function Maps({ position, placeName }) {
  return (
    <MapContainer
      center={position}
      zoom={10}
      style={{
        width: '100%',          // 부모 영역 가득
        height: '100%',         // 부모 영역 가득
        border: '2px solid black',
        boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.5)'
      }}
      scrollWheelZoom
    >
      {/* 뷰 재조정 컴포넌트 */}
      <Recenter center={position} zoom={10} />

      <TileLayer
        attribution='&copy; <a href="https://osm.org/copyright">OSM</a>'
        url='https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
      />

      <Marker position={position}>
        <Popup>{placeName}</Popup>
      </Marker>
    </MapContainer>
  );
}
