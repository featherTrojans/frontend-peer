import { StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Customstatusbar from "../screens/shared/Customstatusbar";
import { useSwipemodal } from "../hooks";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";

const Mainwrapper = ({
  children,
  bgColor = "#FFF",
  pH = 15,
  childBg,
  modalChildren,
  setShowModal,
  showModal,
  modalHeight,
}: {
  children: any;
  bgColor?: string;
  pH?: number;
  childBg?: string;
  modalChildren?: any;
  showModal?: any;
  setShowModal?: any;
  modalHeight?: string | number;
}) => {
  const { Swipemodal } = useSwipemodal();
  const navigation = useNavigation();

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
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

export default Mainwrapper;

const styles = StyleSheet.create({});
