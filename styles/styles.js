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
  picker: {
    height: 150, 
    width: "100%"
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
});