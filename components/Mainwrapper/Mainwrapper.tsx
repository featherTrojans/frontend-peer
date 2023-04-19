import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { COLORS } from "../../constants";
import Customstatusbar from "../../screens/shared/Customstatusbar";

const Mainwrapper = ({
  children,
  bgColor = "#F7F8FA",
  bottom=true
}: {
  children: any;
  bgColor?: string;
  bottom?: boolean
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{ flex: 1, backgroundColor: bgColor, paddingTop: insets.top, paddingBottom: bottom ? insets.bottom : 0}}
    >
      <Customstatusbar />

      {children}
    </View>
  );
};

export default Mainwrapper;

const styles = StyleSheet.create({});
