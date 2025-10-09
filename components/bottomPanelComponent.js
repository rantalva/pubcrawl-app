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
  randomBars,
  setRandomBars,
  fetchMultiStopRoute,
  bottomSheetRef,
  setRoutes,
  location,
  fetchSingleRoute,
  isLoading
}) {
  const snapPoints = useMemo(() => ['5%', '40%','85%',], []) // useMemo is used for the bottomSheet to not stick, snappoints are where the bottomsheet snaps to
  const keyExtractor = (item, index) => item.id?.toString() ?? index.toString()

  const handleCollapsePress = () => bottomSheetRef.current.snapToIndex(3)
  const handleClosePress = () => bottomSheetRef.current.snapToIndex(0)
  const handleOpenPress = () => bottomSheetRef.current.expand()

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

    const renderItem = useCallback(({ item }) => { // rendering items in Bottomsheetflashlist
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
        index={3}
        enableContentPanningGesture={true}
        enableHandlePanningGesture={true}
        keyboardBehavior="interactive"
        >
          {/*Commenting fucking sucks in react */}
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
          handleClosePress={handleClosePress}
          handleCollapsePress={handleCollapsePress}
          handleOpenPress={handleOpenPress}
          setRandomBars={setRandomBars}
          fetchMultiStopRoute={fetchMultiStopRoute}
          setRoutes={setRoutes}
          location={location}
          fetchSingleRoute={fetchSingleRoute}
          isLoading={isLoading}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
        </BottomSheetView>
      </BottomSheet>
  );
}
