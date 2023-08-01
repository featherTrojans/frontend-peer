import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Customstatusbar from "../screens/shared/Customstatusbar";

const Mainwrapper = ({
  children,
  bgColor = "#FFF",
}: {
  children: any;
  bgColor?: string;
}) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }} >
      <Customstatusbar />
      <View style={{ flex: 1, paddingHorizontal: 15 }}>{children}</View>
    </SafeAreaView>
  );
};

export default Mainwrapper;

const styles = StyleSheet.create({});
