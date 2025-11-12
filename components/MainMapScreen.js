// components/MainMapScreen.js
import { useRef, useEffect } from 'react';
import { View } from 'react-native';
import MapComponent from './mapComponent';

export default function MainMapScreen({ route }) {
  const bottomSheetRef = useRef(null);

  // React Navigation passes `route.params`
  const expandSheet = route?.params?.expandSheet;

  // Expand when "Pub" is tapped
 useEffect(() => {
    if (expandSheet && bottomSheetRef.current) {
      bottomSheetRef.current.snapToIndex(2);
    } else if (expandSheet === false) {
      bottomSheetRef.current?.collapse();
    }
  }, [expandSheet]);

  return (
    <View style={{ flex: 1 }}>
      <MapComponent bottomSheetRef={bottomSheetRef} />
    </View>
  );
}
