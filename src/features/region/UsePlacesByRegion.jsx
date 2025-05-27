import { useState, useEffect } from 'react';
import { fetchPlacesByRegion } from '../api/placeApi';

export const usePlacesByRegion = (region) => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPlacesByRegion(region);
        setPlaces(data.content); // ⚠️ Spring Data Page 객체의 'content' 사용
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [region]);

  return { places, loading, error };
};
