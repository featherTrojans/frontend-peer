import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Customstatusbar from "../screens/shared/Customstatusbar";
import { COLORS, FONTS, fontsize, icons } from "../constants";
import { navigation } from "../utils";
import { FTBackheaderStyles } from "../assets/styles/components";
import { useSwipemodal } from "../hooks";
const { Backarrow } = icons;
const { backArrowContainer, backHeaderWrap, backHeaderTitle, childrenWrap } =
  FTBackheaderStyles;

const FTTitlepagewrapper = ({
  title,
  showArrow = true,
  bg,
  children,
  rightComponent,
  modalChildren,
  setShowModal,
  showModal,
  modalHeight,
}: {
  children: any;
  title?: string;
  showArrow?: boolean;
  bg?: string;
  rightComponent?: React.ReactNode | string;
  modalChildren?: any;
  showModal?: any;
  setShowModal?: any;
  modalHeight?: string | number;
}) => {
  const { Swipemodal } = useSwipemodal();

  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: bg }}>
        <Customstatusbar />
        <View style={backHeaderWrap}>
          <Pressable
            onPress={() => navigation.goBack()}
            style={backArrowContainer}
          >
            <Backarrow />
          </Pressable>

          <Text style={backHeaderTitle}>{title}</Text>
          {rightComponent ? rightComponent : <View style={{ width: 45 }} />}
        </View>
        <View style={childrenWrap}>{children}</View>
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

export default FTTitlepagewrapper;

const styles = StyleSheet.create({});
