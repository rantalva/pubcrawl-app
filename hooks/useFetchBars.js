import { useState, useEffect, useRef } from 'react';
import { Alert } from 'react-native';

const categories = 'catering.bar,catering.pub,catering.biergarten,catering.taproom';
const apiKey = process.env.EXPO_PUBLIC_API_KEY;

export default function useBars(location, radius) {
  const [bars, setBars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!location) return;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      const fetchBarsOnTimeout = async () => {
        const lat = location.coords.latitude;
        const lon = location.coords.longitude;
        const url = `https://api.geoapify.com/v2/places?categories=${categories}&filter=circle:${lon},${lat},${radius}&apiKey=${apiKey}`;

        setIsLoading(true);
        setError(null);
        try {
          const response = await fetch(url);
          const data = await response.json();

          if (data.features) {
            const results = data.features.map((place) => ({
              id: place.properties.place_id,
              lat: place.properties.lat,
              lon: place.properties.lon,
              name: place.properties.name || "Unnamed Bar",
            }));
            setBars(results);
          } else {
                Alert.alert("Geoapify error:", data);
                setBars([]);
                setError("No bars found.");
          }
        } catch (err) {
            Alert.alert("Error fetching bars:", err);
            setError(err.message);
            setBars([]);
        } finally {
            setIsLoading(false);
        }
      };

      fetchBarsOnTimeout(); 
    }, 100); // 200ms debounce

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [location, radius]);

  return { bars, isLoading, error };
}