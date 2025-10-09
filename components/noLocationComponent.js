import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function NoLocationComponent({ onRetry }) {

  return (
    <View style={styles.container}>
      {/* Sad emoji/icon */}
      <View style={styles.iconContainer}>
        <Ionicons 
          name="sad-outline" 
          size={80} 
          
        />
      </View>
      
      {/* Main message */}
      <Text style={styles.title}>
        We're feeling lost... 🗺️
      </Text>
      
      {/* Description */}
      <Text style={styles.description}>
        We need your location to find awesome bars nearby. 
        Please enable location services to get started with your pub crawl adventure!
      </Text>
      
      {/* Steps */}
      <View style={styles.stepsContainer}>
        <View style={styles.step}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>1</Text>
          </View>
          <Text style={styles.stepText}>
            Enable location permissions
          </Text>
        </View>
        
        <View style={styles.step}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>2</Text>
          </View>
          <Text style={styles.stepText}>
            Make sure location is turned on
          </Text>
        </View>
        
        <View style={styles.step}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>3</Text>
          </View>
          <Text style={styles.stepText}>
            Tap the button below to retry
          </Text>
        </View>
      </View>
      
      {/* Retry button */}
      <Pressable 
        style={styles.retryButton}
        onPress={onRetry}
      >
        <Ionicons name="location" size={20} color="white" style={styles.buttonIcon} />
        <Text style={styles.retryButtonText}>Enable Location</Text>
      </Pressable>
      
      {/* Fun fact */}
      <View style={styles.funFact}>
        <Ionicons name="beer" size={20}/>
        <Text style={styles.funFactText}>
          Did you know? The world's longest pub crawl visited 60 bars in 24 hours!
        </Text>
        <Ionicons name="beer" size={20}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  stepsContainer: {
    width: '100%',
    marginBottom: 32,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  stepText: {
    fontSize: 14,
    flex: 1,
  },
  retryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonIcon: {
    marginRight: 8,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  funFact: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 32,
    width: '100%',
  },
  funFactText: {
    fontSize: 12,
    marginLeft: 8,
    flex: 1,
    fontStyle: 'italic',
  },
});