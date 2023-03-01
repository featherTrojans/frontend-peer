import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { COLORS, icons } from "../../constants";
import { styles } from "./Backheader.styles";
import { useNavigation } from "@react-navigation/native";

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
    <View style={[styles.container, { marginBottom: mb, backgroundColor: bg }]}>
      <Pressable
        onPress={() => navigation.goBack()}
        style={styles.backArrowContainer}
      >
        {showArrow && <Backarrow />}
      </Pressable>

      {rightComponent}
    </View>
  );
};

export default Backheader;
