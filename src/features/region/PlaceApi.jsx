export const fetchPlacesByRegion = async (region) => {
    const res = await fetch(`http://localhost:8080/api/places?region=${region}`);
    if (!res.ok) throw new Error('유적지 데이터를 가져오는데 실패했습니다.');
    return res.json();
  };
  