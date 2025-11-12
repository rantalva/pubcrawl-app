import MapView, { Marker, Circle, Polyline, } from "react-native-maps";
import { View, Alert } from "react-native";
import { useState, useEffect, useRef, useCallback, useContext } from "react";
import * as Location from "expo-location";
import BottomPanel from "./bottomPanelComponent";
import NoLocationComponent from "./noLocationComponent";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ThemeContext from "../Contexts/themeContext";
import { styles } from "../styles/styles";

const categories = 'catering.bar,catering.pub,catering.biergarten,catering.taproom'
const apiKey = process.env.EXPO_PUBLIC_API_KEY;

export default function MapComponent({ bottomSheetRef }) {
  const [location, setLocation] = useState(null);
  const [radius, setRadius] = useState(1000); // meters
  const [bars, setBars] = useState([]);
  const timeoutRef = useRef(null);
  const [selectedCount, setSelectedCount] = useState(3);
  const [randomBars, setRandomBars] = useState([]);
  const mapRef = useRef(null);
  const [routes, setRoutes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { isDarkMode } = useContext(ThemeContext);

    const goToUserLocation = () => {
    if (!location) return Alert.alert("No location available!");;

    mapRef.current.animateToRegion(
      {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221,
      },
      1000
    );
  };

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

    const url = `https://api.geoapify.com/v2/places?categories=${categories}&filter=circle:${lon},${lat},${radius}&apiKey=${apiKey}`;

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
  

const generateRandomBars = useCallback(async () => {
  // Quick validation
  if (bars.length === 0 || isLoading) {
    return;
  }

  // Set loading immediately
  setIsLoading(true);

  // Use setTimeout to break the render cycle
  setTimeout(() => {
    try {
      const shuffled = [...bars];
      const selected = [];
      
      // Fisher-Yates shuffle 
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      
      // Take first n items
      const result = shuffled.slice(0, Math.min(selectedCount, shuffled.length));
      setRandomBars(result);
      
    } catch (error) {
      console.error('Random bar selection error:', error);
    } finally {
      setIsLoading(false);
    }
  }, 0);
}, [bars, selectedCount]);

  const fetchSingleRoute = async () => {
    if (!location || randomBars.length === 0) return Alert.alert("No bars selected for route");

    try {
      // Create waypoints string: start + all random bars
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
        
        setRoutes([coords]); // Single route array
      } else {
        console.error("No route found");
        setRoutes([]);
      }
    } catch (err) {
      console.error("Single route fetch failed:", err);
      setRoutes([]);
    }
  };

  // Initial loading
if (!location) {
  return (
    <NoLocationComponent onRetry={fetchLocation} />
  );
}

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <MapView
          ref={mapRef}
          userInterfaceStyle={isDarkMode ? 'dark' : 'light'}
          showsMyLocationButton={false}
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

            {/* Highlight random selected bars in orange */}
            {randomBars.map((bar) => (
            <Marker key={"selected-" + bar.id} coordinate={{ latitude: bar.lat, longitude: bar.lon }} title={bar.name}>
              <View style={styles.customMarker}>
                <Ionicons name="beer" size={20} color="#e6cb38ff" />
              </View>
            </Marker>
          ))}

          {/* Draw all routes */}
          {routes.map((coords, idx) => (
            <Polyline
              key={`route-${idx}`}
              coordinates={coords}
              strokeColor="orange"
              strokeWidth={4}
            />
          ))}       
        </MapView>

        {/* Custom location button */}
        <TouchableOpacity style={styles.locationButton} onPress={goToUserLocation}>
          <Ionicons name="locate" size={24} color="white" />
        </TouchableOpacity>

        {/* Bottom panel with slider and refresh */}
      </View>
        <BottomPanel
          radius={radius}
          setRadius={setRadius}
          refreshLocation={fetchLocation}
          bars={bars}
          selectedCount={selectedCount}
          setSelectedCount={setSelectedCount}
          generateRandomBars={generateRandomBars}
          randomBars={randomBars}
          setRandomBars={setRandomBars}
          bottomSheetRef={bottomSheetRef}
          setRoutes={setRoutes}
          location={location}
          fetchSingleRoute={fetchSingleRoute}
          isLoading={isLoading}
        />
    </GestureHandlerRootView>
  );
}
