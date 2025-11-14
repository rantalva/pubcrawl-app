import { StyleSheet } from 'react-native';


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  map: {
    flex: 1,
    width: '100%',
  },
  bottomPanel: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,   // Android shadow
  },
  contentContainer: {
    flex: 1,
    padding: 30,
  },
  pickerView: {
    height: 120, 
    marginTop: 10, 
    backgroundColor: '#f5f5f5', 
    borderRadius: 8,
    overflow: 'hidden' 
  },
  picker: {
    width: "100%", 
    height: 120, 
    marginTop: -50
  },
  pickerItem: {
    color: 'black', 
    fontSize: 18
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: "#eee",
  },
    locationButton: {
    position: "absolute",
    top: 40, // adjust distance from top
    right: 20, // adjust distance from right
    backgroundColor: "#1e88e5",
    borderRadius: 30,
    padding: 12,
    elevation: 5, // for shadow on Android
    shadowColor: "#000", // for shadow on iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  }, 
   customMarker: {
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#FFD700',
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
  descriptionDarkTheme: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
    color: 'white'
  },
  descriptionLightTheme: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
    color: 'black'
  },
  iconDarkTheme: {
    color: 'white',
    fontSize: 50,
    padding: 30
  },
  iconLightTheme: {
    color: 'black',
    fontSize: 50,
    padding: 30
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
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
  containerNoLocation: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  googleMapsButton: {
    marginTop: 10,
    backgroundColor: "green",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  generatePubCrawlButton: {
    marginTop: 10,
    backgroundColor: "orange",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff", 
    fontWeight: "bold"
  },
  togglePickerButton: {
    marginTop: 10,
    backgroundColor: "#1E90FF",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  emptyBarsButton: {
    marginTop: 10,
    backgroundColor: "#f80000ff",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  warningText: {
    color: '#ff6b6b', 
    fontStyle: 'italic',
    marginTop: 10,
    marginBottom: 10
  }
});