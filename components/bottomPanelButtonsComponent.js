import { View, Text, Pressable } from "react-native";
import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";
import React, { useState, useCallback, useMemo, useRef } from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView, BottomSheetFlashList } from '@gorhom/bottom-sheet';
import { styles } from "../styles/styles";

export default function BottomPanelButtonsComponent({
    radius,
    setRadius,
    refreshLocation,
    bars,
    selectedCount,
    setSelectedCount,
    generateRandomBars,
    randomBars
}) {
    const [pickerVisible, setPickerVisible] = useState(false);
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

      {/* Refresh Location */}
      <Pressable
        onPress={refreshLocation}
        style={{
            marginTop: 10,
            backgroundColor: "#1E90FF",
            padding: 10,
            borderRadius: 8,
            alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold" }}>Refresh Location</Text>
      </Pressable>
        <Pressable
          onPress={generateRandomBars}
          style={{
            marginTop: 10,
            backgroundColor: "orange",
            padding: 10,
            borderRadius: 8,
            alignItems: "center",
          }}
        >
          <Text style={{ color: "#fff", fontWeight: "bold" }}>
            Select Random Bars
          </Text>
        </Pressable>
      </View>
    )
  };