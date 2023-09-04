import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Customstatusbar from "../screens/shared/Customstatusbar";
import { useSwipemodal } from "../hooks";
import { SIZES } from "../constants";

const FTTabWrapper = ({
  children,
  bgColor = "#FFF",
  modalChildren,
  setShowModal,
  showModal,
  modalHeight,
  childBg,
  pH = 16,
}: {
  children: any;
  bgColor?: string;
  modalChildren?: any;
  showModal?: any;
  setShowModal?: any;
  modalHeight?: string | number;
  childBg?: string;
  pH?: number;
}) => {
  const { Swipemodal } = useSwipemodal();

  return (
    <>
    <Customstatusbar />
      <SafeAreaView
        style={{ flex: 1, backgroundColor: bgColor, }}
        edges={["top"]}
      >
        <View
          style={{ flex: 1, paddingHorizontal: pH, backgroundColor: childBg }}
        >
          {children}
        </View>
      </SafeAreaView>
      {modalChildren && (
        <Swipemodal
          showModal={showModal}
          setShowModal={setShowModal}
          modalHeight={modalHeight}
        >
          {modalChildren}
        </Swipemodal>
      )}
    </>
  );
};

export default FTTabWrapper;

const styles = StyleSheet.create({});
