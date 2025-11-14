import { View, Text, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from "../styles/styles";
import ThemeContext from "../Contexts/themeContext";
import { useContext } from "react";
import { Button } from 'react-native-paper';

export default function NoLocationComponent({ onRetry }) {
  const { isDarkMode } = useContext(ThemeContext);
  return (
    <View style={styles.containerNoLocation}>
      
      {/* Description */}
      <Ionicons name="beer" style={isDarkMode ? styles.iconDarkTheme : styles.iconLightTheme} />
      <Text style={isDarkMode ? styles.descriptionDarkTheme : styles.descriptionLightTheme} >
        We need your location to find awesome bars nearby. 
        Please enable location services to get started with your pub crawl adventure!
      </Text>
      
      {/* Retry button */}
      <Button
          icon="map-marker"
          onPress={onRetry}
          mode="contained"
          style={{ marginVertical: 5 }}
          contentStyle={{ paddingVertical: 5 }}
          buttonColor={isDarkMode ? '#fff' : '#000'}
          textColor={isDarkMode ? '#000' : '#fff'}
        >
          Enable location
        </Button>
    </View>
  );
}
