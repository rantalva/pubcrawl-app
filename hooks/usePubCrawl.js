import { useState, useCallback } from 'react';
import { Alert } from 'react-native';

const apiKey = process.env.EXPO_PUBLIC_API_KEY;

// This hook manages the logic for selection and routing
export default function usePubCrawl(bars, location, selectedCount, isBarsLoading) {
  const [randomBars, setRandomBars] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isRouting, setIsRouting] = useState(false);
  const [error, setError] = useState(null);

  // 1. Random Bar Generation Logic
  const generateRandomBars = useCallback(async () => {
    // Prevent generation if bars are still loading or none are found
    if (bars.length === 0 || isBarsLoading || isGenerating) {
      if (bars.length === 0 && !isBarsLoading) Alert.alert("No bars found!", "Try increasing the search radius.");
      return;
    }

    setIsGenerating(true);
    setError(null);
    setRoutes([]); // Clear old routes when generating new bars

    // Use a setTimeout to allow the UI to update the 'Generating...' text
    setTimeout(() => {
      try {
        const shuffled = [...bars];
        
        // Fisher-Yates shuffle algorithm
        for (let i = shuffled.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        
        // Select the requested number of bars
        const result = shuffled.slice(0, Math.min(selectedCount, shuffled.length));
        setRandomBars(result);
        
      } catch (err) {
        console.error('Random bar selection error:', err);
        setError("Error selecting bars.");
      } finally {
        setIsGenerating(false);
      }
    }, 300);
  }, [bars, selectedCount, isBarsLoading, isGenerating]); // Dependencies

  // 2. Route Fetching Logic
  const fetchSingleRoute = useCallback(async () => {
    if (!location) return Alert.alert("Location Error", "Your location is not available.");
    if (randomBars.length === 0) return Alert.alert("No bars selected", "Please generate a pub crawl first.");
    
    // Reset routes and start loading state
    setRoutes([]);
    setIsRouting(true);
    setError(null);

    try {
      // Create waypoints string: user location + all random bars
      const waypoints = [
        `${location.coords.latitude},${location.coords.longitude}`,
        ...randomBars.map(bar => `${bar.lat},${bar.lon}`)
      ].join('|');
      
      const url = `https://api.geoapify.com/v1/routing?waypoints=${waypoints}&mode=walk&apiKey=${apiKey}`;
      
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.features && data.features.length > 0) {
        // Geoapify returns [lon, lat], we map it to {latitude, longitude}
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
  }, [location, randomBars]); // Dependencies

  // 3. Return all state and actions the component needs
  return { 
    randomBars, 
    routes, 
    isGenerating, 
    isRouting,
    pubCrawlError: error,
    setRandomBars, // Allow clearing the list
    setRoutes, // Allow clearing the route lines
    generateRandomBars, 
    fetchSingleRoute 
  };
}