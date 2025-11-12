import { useState, useEffect, useRef } from 'react';
import { Alert } from 'react-native';

// Put constants outside the hook so they don't get re-created
const categories = 'catering.bar,catering.pub,catering.biergarten,catering.taproom';
const apiKey = process.env.EXPO_PUBLIC_API_KEY;

// 1. Create the function and pass in dependencies
export default function useBars(location, radius) {
  // 2. Move your state inside the hook
  const [bars, setBars] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // 3. Move your ref inside the hook
  const timeoutRef = useRef(null);

  // 4. Move your useEffect logic inside the hook
  useEffect(() => {
    // Don't fetch if location isn't ready
    if (!location) return;

    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Set a new timeout to debounce the fetch
    timeoutRef.current = setTimeout(() => {
      
      // We define the fetch function *inside* here
      // to make sure it uses the correct 'location' and 'radius'
      const fetchBarsOnTimeout = async () => {
        const lat = location.coords.latitude;
        const lon = location.coords.longitude;
        const url = `https://api.geoapify.com/v2/places?categories=${categories}&filter=circle:${lon},${lat},${radius}&apiKey=${apiKey}`;

        setIsLoading(true);
        setError(null); // Clear previous errors
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
            console.error("Geoapify error:", data);
            setBars([]); // Clear bars on error
            setError("No bars found.");
          }
        } catch (err) {
          console.error("Error fetching bars:", err);
          setError(err.message); // Set error state
          setBars([]); // Clear bars on error
        } finally {
          // This ensures loading is false even if an error happens
          setIsLoading(false); 
        }
      };

      fetchBarsOnTimeout(); // Call the fetch
      
    }, 200); // 200ms debounce

    // Cleanup: Clear the timeout if the hook unmounts
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [location, radius]); // The hook re-runs when these change

  // 5. Return the values your component needs
  return { bars, isLoading, error };
}