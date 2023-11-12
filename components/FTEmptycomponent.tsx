import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { COLORS, FONTS, fontsize, icons } from "../constants";
import { FTEmptycomponentStyles } from "../assets/styles/components";
import { TabActions, useNavigation } from "@react-navigation/native";

const { emptyContainer, emptyText, performTransactText, performTransactBg } =
  FTEmptycomponentStyles;

const { Cryinganimate } = icons;

const Emptycomponent = ({
  size = 110,
  msg,
  showTransact = true,
}: {
  size?: number;
  msg: string;
  showTransact?: boolean;
}) => {
  const navigation = useNavigation();
  const jumpToAction = TabActions.jumpTo("Transact");

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

      {showTransact && (
        <TouchableOpacity
          activeOpacity={0.3}
          onPress={() => navigation.dispatch(jumpToAction)}
          style={performTransactBg}
        >
          <Text style={performTransactText}>Perform a transaction</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Emptycomponent;

const styles = StyleSheet.create({});
