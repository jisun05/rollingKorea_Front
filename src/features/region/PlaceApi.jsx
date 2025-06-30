// src/features/region/PlaceApi.jsx
export const fetchPlacesByAreaCode = async (areaCode) => {
  const res = await fetch(`http://localhost:8080/api/places?areaCode=${areaCode}`);
  if (!res.ok) {
    throw new Error('유적지 데이터를 가져오는데 실패했습니다.');
  }
  return res.json(); // Spring Page 객체 전체
};
