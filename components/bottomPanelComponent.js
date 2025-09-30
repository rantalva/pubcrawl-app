import { View, Text, Pressable } from "react-native";
import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";

export default function BottomPanel({
  radius,
  setRadius,
  refreshLocation,
  bars,
  selectedCount,
  setSelectedCount,
  generateRandomBars,
}) {
  const [pickerVisible, setPickerVisible] = useState(false);

  return (
    <View
      style={{
        position: "absolute",
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}
    >
      {/* Radius Slider */}
      <Text>Found {bars.length} from radius: {radius} m</Text>
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
            selectedValue={selectedCount}
            onValueChange={(itemValue) => setSelectedCount(itemValue)}
          >
            {[3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
              <Picker.Item key={num} label={num.toString()} value={num} />
            ))}
          </Picker>

          {/* Button to generate random bars */}
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
  );
}
