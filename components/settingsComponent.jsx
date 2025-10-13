import { Text, View, Switch } from "react-native";
import { useContext } from 'react';
import ThemeContext from "../Contexts/themeContext";

export default function SettingsComponent() {
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext);

  return(
    <View style={{ 
      flex: 1, 
      padding: 20, 
      backgroundColor: isDarkMode ? '#121212' : '#fff' 
    }}>
      <Text style={{ 
        fontSize: 24, 
        fontWeight: 'bold', 
        marginBottom: 30, 
        color: isDarkMode ? '#fff' : '#000' 
      }}>
        Settings
      </Text>
      
      <View style={{ 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: isDarkMode ? '#333' : '#eee'
      }}>
        <Text style={{ 
          fontSize: 18, 
          color: isDarkMode ? '#fff' : '#000' 
        }}>
          Dark Mode
        </Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleDarkMode}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
        />
      </View>

      <View style={{ marginTop: 20 }}>
        <Text style={{ 
          color: isDarkMode ? '#ccc' : '#666' 
        }}>
          App Version: 1.0.0
        </Text>
      </View>
    </View>
  )
}