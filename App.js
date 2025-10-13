import { View } from 'react-native';
import { styles } from './styles/styles';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingsComponent from './components/settingsComponent';
import { Ionicons } from '@expo/vector-icons'
import MainMapScreen from './components/MainMapScreen';
import ThemeContext from './Contexts/themeContext';
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isThemeLoaded, setIsThemeLoaded] = useState(false);
  const Tab = createBottomTabNavigator();

  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('darkMode');
      if (savedTheme !== null) {
        setIsDarkMode(JSON.parse(savedTheme));
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    } finally {
      setIsThemeLoaded(true);
    }
  };

  const toggleDarkMode = async () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    // Save to AsyncStorage
    try {
      await AsyncStorage.setItem('darkMode', JSON.stringify(newDarkMode));
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };
  const navigationTheme = isDarkMode ? DarkTheme : DefaultTheme;

  const tabBarStyles = {
    backgroundColor: isDarkMode ? '#1e1e1e' : '#fff',
    borderTopColor: isDarkMode ? '#333' : '#e0e0e0',
  };

  return (
  <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
    <View style={[
      styles.container,
      { backgroundColor: isDarkMode ? '#121212' : '#fff' }
      ]}>
    <NavigationContainer theme={navigationTheme}>
      <Tab.Navigator 
          screenOptions={{
          tabBarStyle: tabBarStyles,
          tabBarActiveTintColor: isDarkMode ? '#fff' : '#000',
          tabBarInactiveTintColor: isDarkMode ? '#888' : '#666',
        }}
      >
        <Tab.Screen
          name="Home"
          component={MainMapScreen}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color}/>
            )
          }}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault();
              navigation.navigate('Home', { expandSheet: false });
            },
          })}
        />
        <Tab.Screen
          name="Pub"
          component={MainMapScreen}
          initialParams={{ expandSheet: true }} // First time
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              e.preventDefault(); // Don’t switch tab, just send params
              navigation.navigate('Home', { expandSheet: true });
            },
          })}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="beer" size={size} color={color} />
            ),
          }}
        />
          <Tab.Screen
            name="Settings"
            component={SettingsComponent}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Ionicons name="settings" size={size} color={color} />
              ),
            }}
          />
      </Tab.Navigator>
    </NavigationContainer>
    </View>
    </ThemeContext.Provider>
  );
}
