import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { icons } from "../../constants";
import { styles } from "./Backheader.styles";

const { Backarrow } = icons;

const Backheader = ({title}: {title: string}) => {
  return (
    <View style={styles.container}>
      <View style={styles.backArrow}>
        <Backarrow />
        <Text style={styles.backArrowText}>{title}</Text>
      </View>
    </View>
  );
};

export default Backheader;
