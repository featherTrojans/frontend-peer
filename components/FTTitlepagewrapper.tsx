import { Pressable,  StyleSheet, Text, View } from "react-native";
import React from "react";
import Customstatusbar from "../screens/shared/Customstatusbar";
import { COLORS, FONTS, fontsize, icons } from "../constants";
// import { navigation } from "../utils";
import { FTBackheaderStyles } from "../assets/styles/components";
import { useSwipemodal } from "../hooks";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
const { Backarrow } = icons;
const { backArrowContainer, backHeaderWrap, backHeaderTitle, childrenWrap } =
  FTBackheaderStyles;
  

const FTTitlepagewrapper = ({
  title,
  showArrow = true,
  bg = "#fff",
  children,
  rightComponent,
  modalChildren,
  setShowModal,
  showModal,
  modalHeight,
  headerBg = "#fff",
  childBg = "#fff",
  invert = false,
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
  headerBg?: string;
  childBg?: string;
  invert?: boolean;
}) => {
  const { Swipemodal } = useSwipemodal();
  const navigation = useNavigation()


  return (
    <>
      <SafeAreaView style={{ flex: 1, backgroundColor: bg }}>
        <Customstatusbar />

        <View style={[backHeaderWrap, { backgroundColor: headerBg }]}>
          <Pressable
            hitSlop={20}
            onPress={() => navigation.goBack()}
            style={[
              backArrowContainer,
              { borderColor: invert ? COLORS.white : COLORS.black },
            ]}
          >
            <Backarrow invert={invert} />
          </Pressable>

          <Text
            style={[
              backHeaderTitle,
              { color: invert ? COLORS.white : COLORS.black },
            ]}
          >
            {title}
          </Text>
          {rightComponent ? rightComponent : <View style={{ width: 45 }} />}
        </View>
        <View style={[childrenWrap, { backgroundColor: childBg }]}>
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

export default FTTitlepagewrapper;

const styles = StyleSheet.create({});
