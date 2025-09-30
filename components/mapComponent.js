import MapView, { Marker, Circle, PROVIDER_GOOGLE } from "react-native-maps";
import { View, Text, Alert } from "react-native";
import { useState, useEffect, useRef } from "react";
import * as Location from "expo-location";
import BottomPanel from "./bottomPanelComponent";

// Your Geoapify API key
const GEOAPIFY_API_KEY = "c14486c8b8eb431184047104880673b8";

export default function MapComponent() {
  const [location, setLocation] = useState(null);
  const [radius, setRadius] = useState(1000); // meters
  const [bars, setBars] = useState([]);
  const timeoutRef = useRef(null);
  const [selectedCount, setSelectedCount] = useState(3);
  const [randomBars, setRandomBars] = useState([]);

  // Fetch user location
  async function fetchLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("No permission to get location");
      return;
    }
    let loc = await Location.getCurrentPositionAsync({});
    setLocation(loc);
  }

  useEffect(() => {
    fetchLocation();
  }, []);

  // Fetch bars from Geoapify
  const fetchBars = async () => {
    if (!location) return;

    const lat = location.coords.latitude;
    const lon = location.coords.longitude;

    const GEOAPIFY_API_KEY = 'c14486c8b8eb431184047104880673b8'

    const url = `https://api.geoapify.com/v2/places?categories=catering.bar,catering.pub,catering.biergarten,catering.taproom&filter=circle:${lon},${lat},${radius}&apiKey=${GEOAPIFY_API_KEY}`;

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
        setBars([]);
      }
    } catch (error) {
      console.error("Error fetching bars:", error);
    }
  };

  // Debounce fetch when radius changes
  useEffect(() => {
    if (!location) return;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      fetchBars();
    }, 200); // 200ms debounce

  }, [radius, location]);
  

    const generateRandomBars = () => {
    if (bars.length === 0) return;

    const shuffled = [...bars].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(selectedCount, bars.length));
    setRandomBars(selected);
  };

  // Initial loading
  if (!location) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Fetching location...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        provider={PROVIDER_GOOGLE}
        showsMyLocationButton
        showsUserLocation
        style={{ flex: 1 }}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0322,
          longitudeDelta: 0.0221,
        }}
      >
        {/* Radius circle */}
        <Circle
          center={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
          }}
          radius={radius}
          strokeColor="rgba(0,0,255,0.5)"
          fillColor="rgba(0,0,255,0.2)"
        />
        {/* Bars 
        {bars.map((bar) => (
          <Marker
            key={bar.id}
            coordinate={{ latitude: bar.lat, longitude: bar.lon }}
            title={bar.name}
            pinColor="orange"
          />
        ))} 
          */}

          {/* Highlight random selected bars in orange */}
          {randomBars.map((bar) => (
          <Marker key={"selected-" + bar.id} coordinate={{ latitude: bar.lat, longitude: bar.lon }} title={bar.name} pinColor="orange" />
        ))}
        
      </MapView>

      {/* Bottom panel with slider and refresh */}
      <BottomPanel
        radius={radius}
        setRadius={setRadius}
        refreshLocation={fetchLocation}
        bars={bars}
        selectedCount={selectedCount}
        setSelectedCount={setSelectedCount}
        generateRandomBars={generateRandomBars}
      />
    </View>
  );
}
