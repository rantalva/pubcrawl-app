import { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import { Alert } from 'react-native';

export default function useLocation() {
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchLocation = async () => {
    setIsLoading(true);
    setError(null);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setError("Permission to access location was denied");
        Alert.alert("Permission needed", "This app needs location access to function.");
        return;
      }
      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
    } catch (err) {
      setError("Failed to get location: " + err.message);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  return { 
    location,
    isLoading,
    error,
    fetchLocation
  };
}