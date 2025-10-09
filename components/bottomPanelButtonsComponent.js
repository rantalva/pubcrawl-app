import { View, Text, Pressable, Button } from "react-native";
import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";
import React, { useState, useCallback, useMemo, useRef } from "react";
import { styles } from "../styles/styles";
import { Linking, Alert} from 'react-native';
import BottomSheet, { BottomSheetView, BottomSheetFlashList } from '@gorhom/bottom-sheet';


export default function BottomPanelButtonsComponent({
    radius,
    setRadius,
    bars,
    selectedCount,
    setSelectedCount,
    generateRandomBars,
    randomBars,
    handleClosePress,
    handleCollapsePress,
    handleOpenPress,
    setRandomBars,
    setRoutes,
    location,
    fetchSingleRoute,
    isLoading,
    keyExtractor,
    renderItem
}) {
    const [pickerVisible, setPickerVisible] = useState(false);

    const openInMaps = () => {
      if (!randomBars || randomBars.length === 0) {
        Alert.alert("No bars selected");
        return;
      }

      if (!location) {
        Alert.alert("Location not available");
        return;
      }

      const origin = `${location.coords.latitude},${location.coords.longitude}`;

      const destination = `${randomBars[randomBars.length - 1].lat},${randomBars[randomBars.length - 1].lon}`;

      const waypoints = randomBars
        .slice(0, randomBars.length - 1) // all except last bar
        .map((bar) => `${bar.lat},${bar.lon}`)
        .join('|');

        const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=walking${
        waypoints ? `&waypoints=${waypoints}` : ''
      }`;

      Linking.openURL(url);
    };

    return (
      <View>
         <Text>Found {bars.length} from radius: {radius} m</Text>
       <View>
          <Slider
            style={{ width: "100%", height: 40 }}
            minimumValue={500}
            maximumValue={3000}
            step={100}
            value={radius}
            onValueChange={setRadius}
            minimumTrackTintColor="#1E90FF"
            maximumTrackTintColor="#000000"
          />
        </View>  
      <Text>Selected amount of bars for pub crawl: {selectedCount} </Text>
      {/* Button to toggle Picker */}
      <Pressable
        onPress={() => setPickerVisible((prev) => !prev)}
        style={{
          marginTop: 10,
          backgroundColor: "#1E90FF",
          padding: 10,
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>
          {pickerVisible ? "Hide Picker" : "Select Number of Bars"}
        </Text>
      </Pressable>

      {/* Conditional Picker */}
      {pickerVisible && (
        <>
          <Picker
            style={styles.picker}
            selectedValue={selectedCount}
            onValueChange={(itemValue) => setSelectedCount(itemValue)}
          >
            {[3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <Picker.Item key={num} label={num.toString()} value={num} />
            ))}
          </Picker>
        </>
      )}

        <Pressable
          onPress={async () => {await generateRandomBars(); handleOpenPress();}} // new method 
          style={{
            marginTop: 10,
            backgroundColor: "orange",
            padding: 10,
            borderRadius: 8,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            {isLoading ? "Loading..." : "Select Random bars"}
          </Text>
        </Pressable>

        <BottomSheetFlashList
          data={randomBars}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          estimatedItemSize={50}
          nestedScrollEnabled={true}
          ListEmptyComponent={
            <View style={{ padding: 20, alignItems: 'center' }}>
              <Text style={{ color: '#666' }}>No bars selected yet</Text>
              <Text style={{ color: '#999', fontSize: 12, marginTop: 5 }}>
                Press "Select Random Bars" to get started
              </Text>
            </View>
        }
        />

      {randomBars.length > 0 && (
        <>
          <Button 
            onPress={async () => { 
              await fetchSingleRoute(); 
              handleClosePress(); 
            }}
            title='Fetch route'
        />
          <Pressable
            onPress={openInMaps}
            style={{
              marginTop: 10,
              backgroundColor: "green",
              padding: 10,
              borderRadius: 8,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "bold" }}>
              Open in Google Maps
            </Text>
          </Pressable>
          <Button
            onPress={() => {setRandomBars([]); handleCollapsePress(); setRoutes([]);}}
            title="Empty bars"
          />
        </>
      )}

      </View>
    )
  };