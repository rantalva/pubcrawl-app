import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from "../styles/styles";

export default function NoLocationComponent({ onRetry }) {

  return (
    <View style={styles.containerNoLocation}>
      
      {/* Description */}
      <Ionicons name="beer" size={50} padding={30}/>
      <Text style={styles.description}>
        We need your location to find awesome bars nearby. 
        Please enable location services to get started with your pub crawl adventure!
      </Text>
      
      {/* Retry button */}
      <Pressable 
        style={styles.retryButton}
        onPress={onRetry}
      >
        <Ionicons name="location" size={20} color="black" style={styles.buttonIcon} />
        <Text style={styles.retryButtonText}>Enable Location</Text>
      </Pressable>
    </View>
  );
}
