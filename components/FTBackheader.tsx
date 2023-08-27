import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { COLORS, icons } from "../constants";
import { useNavigation } from "@react-navigation/native";
import { FTBackheaderStyles } from "../assets/styles/components";
const { container, backArrowContainer } = FTBackheaderStyles;

const { Backarrow } = icons;

const Backheader = ({
  title,
  showArrow = true,
  mb = 20,
  bg,
  rightComponent,
}: {
  title?: string;
  showArrow?: boolean;
  mb?: number;
  bg?: string;
  rightComponent?: any;
}) => {
  const navigation = useNavigation();

  return (
    <View style={[container, { marginBottom: mb, backgroundColor: bg }]}>
      <Pressable hitSlop={20} onPress={() => navigation.goBack()} style={backArrowContainer}>
        {showArrow && <Backarrow />}
      </Pressable>

      {rightComponent}
    </View>
  );
};

export default Backheader;
