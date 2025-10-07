import { StatusBar } from 'expo-status-bar';
import { Text, View, Pressable, Alert } from 'react-native';
import { styles } from './styles/styles';
import MapComponent from './components/mapComponent';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingsComponent from './components/settingsComponent';

export default function App() {

  
const Tab = createBottomTabNavigator();

  return (
    
    <View style={styles.container}>
    <NavigationContainer>
      <Tab.Navigator >
        <Tab.Screen name="Home" component={MapComponent} options={{headerShown: false}} />
        <Tab.Screen name="Settings" component={SettingsComponent} />
      </Tab.Navigator>
    </NavigationContainer>
    </View>
  );
}
