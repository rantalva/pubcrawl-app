import { View, Text, Pressable } from "react-native";
import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";
import React, { useState, useCallback, useMemo, useRef } from "react";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheet, { BottomSheetView, BottomSheetFlashList } from '@gorhom/bottom-sheet';
import { styles } from "../styles/styles";
import BottomPanelButtonsComponent from "./bottomPanelButtonsComponent";

export default function BottomPanel({
  radius,
  setRadius,
  refreshLocation,
  bars,
  selectedCount,
  setSelectedCount,
  generateRandomBars,
  randomBars
}) {
  const snapPoints = useMemo(() => ['5%', '25%','50%','85%',], []) // useMemo is used for the bottomSheet to not stick
  const bottomSheetRef = useRef(); // https://www.youtube.com/watch?v=oIEykI5oagI&t=108s
  const keyExtractor = (item, index) => item.id?.toString() ?? index.toString()

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

    const renderItem = useCallback(({ item }) => {
    return (
      <View key={item} style={styles.itemContainer}>
        <Text>{item.name}</Text>
      </View>
    );
  }, []);

  return (
    
      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        snapPoints={snapPoints}
        index={2}
        enableContentPanningGesture={true}
        enableHandlePanningGesture={true}
        keyboardBehavior="interactive"
        >
        <BottomSheetView style={styles.contentContainer}>
        <BottomPanelButtonsComponent 
          radius={radius}
          setRadius={setRadius}
          refreshLocation={refreshLocation}
          bars={bars}
          selectedCount={selectedCount}
          setSelectedCount={setSelectedCount}
          generateRandomBars={generateRandomBars}
          randomBars={randomBars}
        />
        <BottomSheetFlashList
          data={randomBars}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          estimatedItemSize={50}
          nestedScrollEnabled={true}
        />
        </BottomSheetView>
      </BottomSheet>
  );
}
