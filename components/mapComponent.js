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
import useLocation from "../hooks/useLocation";
import useBars from "../hooks/useFetchBars";
import usePubCrawl from "../hooks/usePubCrawl";

//const apiKey = process.env.EXPO_PUBLIC_API_KEY;

export default function MapComponent({ bottomSheetRef }) {
  const { location, isLoading: isLocationLoading, error: locationError, fetchLocation } = useLocation();
  const [radius, setRadius] = useState(1000); // meters
  const [selectedCount, setSelectedCount] = useState(3);
  const mapRef = useRef(null);
  const { bars, isLoading: isBarsLoading, error: barsError } = useBars(location, radius);
  const {isDarkMode} = useContext(ThemeContext)
  const { 
      randomBars,
      routes,
      isGenerating, 
      isRouting,
      pubCrawlError,
      setRandomBars,
      setRoutes,
      generateRandomBars,
      fetchSingleRoute
    } = usePubCrawl(bars, location, selectedCount, isBarsLoading);

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

if (isLocationLoading) {
  return (
    <NoLocationComponent onRetry={fetchLocation} />
  );
}

if (!location || locationError) {
  return <NoLocationComponent onRetry={fetchLocation} />
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
          isLoading={isBarsLoading}
          isRouting={isRouting}
          isGenerating={isGenerating}
        />
    </GestureHandlerRootView>
  );
}
