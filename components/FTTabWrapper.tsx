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
}: {
  children: any;
  bgColor?: string;
  modalChildren?: any;
  showModal?: any;
  setShowModal?: any;
  modalHeight?: string | number;
}) => {
  const { Swipemodal } = useSwipemodal();


  return (
    <>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: bgColor }}
        edges={["top"]}
      >
        <Customstatusbar />
        <View style={{ flex: 1, paddingHorizontal: 25 }}>{children}</View>
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
