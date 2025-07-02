import { useState, useEffect } from 'react';
import { fetchPlacesByAreaCode } from './PlaceApi';

/**
 * 지역 코드(areaCode)에 따라 place 목록을 가져오는 커스텀 훅
 * @param {number|null} areaCode – Heritage API 상의 areaCode 값
 * @returns {{ places: Array, loading: boolean, error: string|null }}
 */
export const usePlacesByRegion = (areaCode) => {
  const [places, setPlaces]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    // areaCode가 없으면 빈 배열로 초기화
    if (areaCode == null) {
      setPlaces([]);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchPlacesByAreaCode(areaCode);
        // Spring Data Page 구조에서 .content만 사용
        setPlaces(data.content);
      } catch (err) {
        setError(err.message || '데이터를 가져오는 중 오류가 발생했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [areaCode]);

  return { places, loading, error };
};
