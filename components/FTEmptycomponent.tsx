import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { COLORS, FONTS, fontsize, icons } from "../constants";
import { FTEmptycomponentStyles } from "../assets/styles/components";
const { emptyContainer, emptyText, performTransactText, performTransactBg } =
  FTEmptycomponentStyles;

const { Cryinganimate } = icons;

const Emptycomponent = ({
  size = 110,
  msg,
  showTransact = true
}: {
  size?: number;
  msg: string;
  showTransact?: boolean
}) => {
  return (
    <View style={emptyContainer}>
      {/* Crying icons */}
      <LottieView
        source={Cryinganimate}
        autoPlay
        loop
        style={{ width: size, height: size }}
      />
      <View style={{ marginHorizontal: 50 }}>
        <Text style={emptyText}>{msg}</Text>
      </View>

     {showTransact && <View style={performTransactBg}>
        <Text style={performTransactText}>Perform a transaction</Text>
      </View>}
    </View>
  );
};

export default Emptycomponent;

const styles = StyleSheet.create({});
