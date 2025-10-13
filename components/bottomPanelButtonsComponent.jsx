import { View, Text, Pressable, Button } from "react-native";
import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";
import { useState, useCallback, useContext } from "react";
import { styles } from "../styles/styles";
import { Linking, Alert} from 'react-native';
import { FlashList } from "@shopify/flash-list";
import { ScrollView } from "react-native-gesture-handler";
import ThemeContext from "../Contexts/themeContext";


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
    isLoading
}) {
    const [pickerVisible, setPickerVisible] = useState(false);
    const { isDarkMode } = useContext(ThemeContext);

    const keyExtractor = (item) => item.id?.toString() ?? Math.random().toString

    const renderItem = useCallback(({ item, index }) => { // rendering items in Bottomsheetflashlist
      return (
        <View key={item} style={[
          styles.itemContainer,
          { backgroundColor: isDarkMode ? '#333' : '#eee' }
        ]}>
          <Text style={{ color: isDarkMode ? '#fff' : '#000' }}>{index + 1}. {item.name}</Text>
        </View>
      );
    }, [isDarkMode]);

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
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 20 }}>
      <View>
         <Text style={{ color: isDarkMode ? '#fff' : '#000' }}>Found {bars.length} from radius: {radius} m</Text>
       <View>
          <Slider
            style={{ width: "100%", height: 40 }}
            minimumValue={500}
            maximumValue={3000}
            step={100}
            value={radius}
            onValueChange={setRadius}
            minimumTrackTintColor="#1E90FF"
            maximumTrackTintColor={isDarkMode ? "#fff" : "#000000"}
          />
        </View>  
      <Text style={{ color: isDarkMode ? '#fff' : '#000' }}>
        Selected amount of bars for pub crawl: {selectedCount}
      </Text>
      {/* Button to toggle Picker */}
      <Pressable
        onPress={() => setPickerVisible((prev) => !prev)}
        style={styles.togglePickerButton}
      >
        <Text style={styles.buttonText}>
          {pickerVisible ? "Hide Picker" : "Select Number of Bars"}
        </Text>
      </Pressable>

          {/* Conditional Picker */}
          {pickerVisible && (
            <View style={styles.pickerView}>
              <Picker
                selectedValue={selectedCount}
                onValueChange={(itemValue) => setSelectedCount(itemValue)}
                style={styles.picker}
                itemStyle={styles.pickerItem}
                mode="dropdown" // This makes it work better on Android
              >
                {[3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <Picker.Item 
                    key={num} 
                    label={num.toString()} 
                    value={num} 
                  />
                ))}
              </Picker>
            </View>
          )}

        <Pressable
          onPress={async () => {await generateRandomBars(); handleOpenPress();}} // new method 
          style={styles.generatePubCrawlButton}
        >
          <Text style={styles.buttonText}>
            {isLoading ? "Loading..." : "Generate pub crawl!"}
          </Text>
        </Pressable>

        <FlashList
          data={randomBars}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          estimatedItemSize={50}
          nestedScrollEnabled={true}
          scrollEnabled={false}
          ListEmptyComponent={
            <View style={{ padding: 1, alignItems: 'center' }}>
              <Text style={{ color: '#666' }}>No bars selected yet</Text>
              <Text style={{ color: '#999', fontSize: 12, marginTop: 5 }}>
                Press "Select Random Bars" to get started
              </Text>
            </View>
        }
        />

      {randomBars.length > 0 && (
        <>
          <Pressable
            onPress={async () => { 
              await fetchSingleRoute(); 
              handleClosePress(); 
            }}
            style={styles.togglePickerButton}
          >
            <Text style={styles.buttonText}>
              Fetch route
            </Text>
          </Pressable>
          <Pressable
            onPress={openInMaps}
            style={styles.googleMapsButton}
          >
            <Text style={styles.buttonText}>
              Open in Google Maps
            </Text>
          </Pressable>
          <Pressable
            onPress={() => {setRandomBars([]); handleCollapsePress(); setRoutes([]);}}
            style={styles.emptyBarsButton}
          >
            <Text style={styles.buttonText}>
              Empty bars
            </Text>
          </Pressable>
        </>
      )}
      </View>
      </ScrollView>
    )
  };