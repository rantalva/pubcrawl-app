import { StatusBar } from 'expo-status-bar';
import { Text, View, Pressable, Alert } from 'react-native';
import { styles } from './styles/styles';
import MapComponent from './components/mapComponent';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingsComponent from './components/settingsComponent';
import { Ionicons } from '@expo/vector-icons'
import { useRef } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MainMapScreen from './components/MainMapScreen';

export default function App() {

  
const Tab = createBottomTabNavigator();
const bottomSheetRef = useRef(); // https://www.youtube.com/watch?v=oIEykI5oagI&t=108s

  return (
    <View style={styles.container}>
    <NavigationContainer>
      <Tab.Navigator >
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
              navigation.navigate('Home', { expandSheet: false }); // 👈 Collapse BottomSheet
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
  );
}
