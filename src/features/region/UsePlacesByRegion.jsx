import { useState, useEffect } from 'react';
import { fetchPlacesByAreaCode } from './PlaceApi';

export const usePlacesByRegion = (areaCode) => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (areaCode == null) {
      setPlaces([]);
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchPlacesByAreaCode(areaCode);
        setPlaces(data.content);  // Page.content
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [areaCode]);

  return { places, loading, error };
};
