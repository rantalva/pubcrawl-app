import { View, Text, Pressable} from "react-native";
import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";
import { useState, useCallback, useContext } from "react";
import { styles } from "../styles/styles";
import { Linking, Alert} from 'react-native';
import { FlashList } from "@shopify/flash-list";
import { ScrollView } from "react-native-gesture-handler";
import ThemeContext from "../Contexts/themeContext";
import { Button } from 'react-native-paper';

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
    isRouting,
    isGenerating
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

    const origin = `${location.coords.latitude},${location.coords.longitude}`; // OWN LOCATION
    const destination = `${randomBars[randomBars.length - 1].lat},${randomBars[randomBars.length - 1].lon}`; //LAST BAR OF THE RANDOM BARS LAT AND LON

    const waypoints = randomBars
      .slice(0, randomBars.length - 1) 
      .map((bar) => `${bar.lat},${bar.lon}`)
      .join('|');

    // This is the correct Google Maps URL format
    const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=walking${
      waypoints ? `&waypoints=${waypoints}` : ''
    }`;
    // in URL waypoints are either waypoints if waypoints is true or empty string ' '
    Linking.openURL(url).catch((err) => {
      console.error('Failed to open Google Maps', err);
      Alert.alert('Error', 'Could not open Google Maps.');
    });
};

    return (
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingBottom: 20 }}>
      <View>
         <Text style={{ color: isDarkMode ? '#fff' : '#000' }}>Found {bars.length} from radius: {radius} m</Text>
       <View>

        {/* Warning text when selected amount exceeds found bars */}
       {selectedCount > bars.length && bars.length > 0 && (
         <Text style={styles.warningText}>
           Note: Only {bars.length} bars found (less than selected {selectedCount})
         </Text>
       )}
          <Slider
            style={{ width: "100%", height: 40 }}
            minimumValue={500}
            maximumValue={3000}
            step={100}
            value={radius}
            onValueChange={setRadius}
            minimumTrackTintColor="#1E90FF"
            maximumTrackTintColor={isDarkMode ? "#383737ff" : "#000000"}
          />
        </View>
      <Text style={{ color: isDarkMode ? '#fff' : '#000' }}>
        Selected amount of bars for pub crawl: {selectedCount}
      </Text>
      {/* Button to toggle Picker */}
      <Button
        onPress={() => setPickerVisible((prev) => !prev)}
        mode="contained" 
        style={{ marginVertical: 5 }}
        contentStyle={{ paddingVertical: 5 }}
        buttonColor={isDarkMode ? '#fff' : '#000'}
        textColor={isDarkMode ? '#000' : '#fff'}
      >
        {/* Conditional text logic goes inside the button */}
        {pickerVisible ? "Hide Picker" : "Select Number of Bars"}
      </Button>
          {/* Conditional Picker */}
          {pickerVisible && (
            <View style={styles.pickerView}>
              <Picker
                selectedValue={selectedCount}
                onValueChange={(itemValue) => setSelectedCount(itemValue)}
                style={styles.picker}
                itemStyle={styles.pickerItem}
                mode="dropdown" // Android noob
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
        <Button
          icon="beer"
          onPress={async () => {await generateRandomBars(); handleOpenPress();}}
          mode="contained"
          loading={isGenerating}
          disabled={isLoading || isGenerating}
          style={{ marginVertical: 5 }}
          contentStyle={{ paddingVertical: 5 }}
          buttonColor={isDarkMode ? '#fff' : '#000'}
          textColor={isDarkMode ? '#000' : '#fff'}
        >
          Generate pub crawl!
        </Button>

        {/* Additional warning when generating with limited bars */}
        {selectedCount > bars.length && bars.length > 0 && (
          <Text style={styles.warningText}>
            Only {bars.length} bars will be used for the crawl
          </Text>
        )}

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
          <Button
            icon="map-marker"
            onPress={async () => {await fetchSingleRoute(); handleClosePress();}}
            mode="contained"
            loading={isRouting}
            disabled={isLoading || isRouting}
            style={{ marginVertical: 5 }}
            contentStyle={{ paddingVertical: 5 }}
            buttonColor={isDarkMode ? '#fff' : '#000'}
            textColor={isDarkMode ? '#000' : '#fff'}
        >
          Fetch route
        </Button>
        <Button
          icon='google'
          onPress={openInMaps}
          mode="contained"
          style={{ marginVertical: 5 }}
          contentStyle={{ paddingVertical: 5 }}
          buttonColor="green"
          textColor="white"
        >
          Open in Google Maps
        </Button>
        <Button
            icon='delete'
            onPress={() => {setRandomBars([]); handleCollapsePress(); setRoutes([]);}}
            mode="contained"
            style={{ marginVertical: 5 }}
            contentStyle={{ paddingVertical: 5 }}
            buttonColor="red"
            textColor="white"
        >
          Empty bars
        </Button>
        </>
      )}
      </View>
      </ScrollView>
    )
  };