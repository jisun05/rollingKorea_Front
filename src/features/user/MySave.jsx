// src/features/user/MySave.jsx
import React, { useEffect, useState } from 'react';
import apiClient from '../../utils/Log';
import PlaceItem from '../region/PlaceItem';
import { Spinner } from 'react-bootstrap';
import { useAuth } from '../auth/AuthContext';

export default function MySave() {
  const { isLoggedIn, openLoginModal, userId } = useAuth();
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isLoggedIn) {
      openLoginModal();
      return;
    }

    setLoading(true);
    apiClient
      .get(`/api/like-places?userId=${userId}`)
      .then(res => {
        // LikePlaceResponse 안에 place 정보가 담겨 있다고 가정
        const likedPlaces = res.data.content.map(lp => lp.place);
        setPlaces(likedPlaces);
      })
      .catch(err => {
        console.error('Failed to fetch saved places', err);
        setPlaces([]);
      })
      .finally(() => setLoading(false));
  }, [isLoggedIn, openLoginModal, userId]); // openLoginModal을 deps에 추가

  if (loading) {
    return (
      <div className="d-flex justify-content-center my-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (places.length === 0) {
    return <div className="text-center my-5">저장한 장소가 없습니다.</div>;
  }

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {places.map(p => (
        <li key={p.contentId}>
          <PlaceItem
            place={{ ...p, liked: true }} // 이미 찜한 상태
            onClick={() => {/* 클릭 시 상세 또는 지도 표시 로직 */}}
            onLikeClick={() => {
              // MySave 페이지에서도 언라이크 가능
              apiClient
                .delete(`/api/like-places`, { params: { userId, contentId: p.contentId } })
                .then(() => {
                  setPlaces(prev => prev.filter(x => x.contentId !== p.contentId));
                })
                .catch(console.error);
            }}
          />
        </li>
      ))}
    </ul>
  );
}
