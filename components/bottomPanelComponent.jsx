import { View, Text} from "react-native";
import { useCallback, useMemo } from "react";
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import BottomPanelButtonsComponent from "./bottomPanelButtonsComponent";
import { styles } from "../styles/styles";

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
  const snapPoints = useMemo(() => ['5%', '25%', '35%', '85%'], []) // useMemo is used for the bottomSheet to not stick, snappoints are where the bottomsheet snaps to
  

  const handleCollapsePress = () => bottomSheetRef.current.snapToIndex(1)
  const handleClosePress = () => bottomSheetRef.current.snapToIndex(0)
  const handleOpenPress = () => bottomSheetRef.current.expand()

  // callbacks
  const handleSheetChanges = useCallback((index) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
        
      <BottomSheet
        ref={bottomSheetRef}
        onChange={handleSheetChanges}
        snapPoints={snapPoints}
        index={1}
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
        />
        </BottomSheetView>
      </BottomSheet>
  );
}
