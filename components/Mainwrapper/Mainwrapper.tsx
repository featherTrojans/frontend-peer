import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../../constants";
import Customstatusbar from "../../screens/shared/Customstatusbar";

const Mainwrapper = ({
  children,
  bgColor = "#F7F8FA",
}: {
  children: any;
  bgColor?: string;
}) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }}>
      <Customstatusbar />

      {children}
    </SafeAreaView>
  );
};

export default Mainwrapper;

const styles = StyleSheet.create({});
