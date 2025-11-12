import { useState, useCallback } from 'react';
import { Alert } from 'react-native';

const apiKey = process.env.EXPO_PUBLIC_API_KEY;

export default function usePubCrawl(bars, location, selectedCount, isBarsLoading) {
  const [randomBars, setRandomBars] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRouting, setIsRouting] = useState(false);
  const [error, setError] = useState(null);

  const generateRandomBars = useCallback(async () => {
    if (bars.length === 0 || isBarsLoading || isGenerating) {
      if (bars.length === 0 && !isBarsLoading) Alert.alert("No bars found!", "Try increasing the search radius.");
      return;
    }

    setIsGenerating(true);
    setError(null);
    setRoutes([]);

    setTimeout(() => {
      try {
        const shuffled = [...bars];
        
        // Fisher-Yates shuffle algorithm
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        
        const result = shuffled.slice(0, Math.min(selectedCount, shuffled.length));
        setRandomBars(result);
        
      } catch (err) {
        console.error('Random bar selection error:', err);
        setError("Error selecting bars.");
      } finally {
        setIsGenerating(false);
      }
    }, 300);
  }, [bars, selectedCount, isBarsLoading, isGenerating]);

  const fetchSingleRoute = useCallback(async () => {
    if (!location) return Alert.alert("Location Error", "Your location is not available.");
    if (randomBars.length === 0) return Alert.alert("No bars selected", "Please generate a pub crawl first.");
    
    setRoutes([]);
    setIsRouting(true);
    setError(null);

    try {
      const waypoints = [
        `${location.coords.latitude},${location.coords.longitude}`,
        ...randomBars.map(bar => `${bar.lat},${bar.lon}`)
      ].join('|');
      
      const url = `https://api.geoapify.com/v1/routing?waypoints=${waypoints}&mode=walk&apiKey=${apiKey}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        const coordinates = data.features[0].geometry.coordinates;
        const coords = coordinates.flat().map(([lon, lat]) => ({ 
          latitude: lat, 
          longitude: lon 
        }));
        setRoutes([coords]);
      } else {
        Alert.alert("Route Error", "Could not find a walk route between the selected bars.");
        setRoutes([]);
        setError("Route not found.");
      }
    } catch (err) {
      console.error("Error fetching route:", err);
      Alert.alert("Network Error", "Failed to fetch route.");
      setRoutes([]);
      setError(err.message);
    } finally {
      setIsRouting(false);
    }
  }, [location, randomBars]);

  return { 
    randomBars, 
    routes, 
    isGenerating, 
    isRouting,
    pubCrawlError: error,
    setRandomBars,
    setRoutes,
    generateRandomBars, 
    fetchSingleRoute 
  };
}