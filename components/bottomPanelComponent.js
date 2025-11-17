import { useMemo, useContext } from "react";
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import BottomPanelButtonsComponent from "./bottomPanelButtonsComponent";
import { styles } from "../styles/styles";
import ThemeContext from "../Contexts/themeContext";

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
  isLoading,
  isRouting,
  isGenerating
}) {
  const snapPoints = useMemo(() => ['5%', '25%', '40%', '85%', '100%'], []) // useMemo is used for the bottomSheet to not stick, snappoints are where the bottomsheet snaps to
  const { isDarkMode } = useContext(ThemeContext);
  const handleCollapsePress = () => bottomSheetRef.current.snapToIndex(1)
  const handleClosePress = () => bottomSheetRef.current.snapToIndex(0)
  const handleOpenPress = () => bottomSheetRef.current.snapToIndex(4)

  return (   
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        index={1}
        enableContentPanningGesture={true}
        enableHandlePanningGesture={true}
        keyboardBehavior="interactive"
        backgroundStyle={{
          backgroundColor: isDarkMode ? '#1e1e1e' : '#fff'
        }}
        handleStyle={{
          backgroundColor: isDarkMode ? '#333' : '#fff'
        }}
        handleIndicatorStyle={{
          backgroundColor: isDarkMode ? '#666' : '#ccc'
        }}
        >
          {/*Commenting fucking sucks in react */}
        <BottomSheetView style={[
          styles.contentContainer,
          { backgroundColor: isDarkMode ? '#1e1e1e' : '#fff' }
          ]}>
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
          isRouting={isRouting}
          isGenerating={isGenerating}
        />
        </BottomSheetView>
      </BottomSheet>
  );
}
