import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS, FONTS, fontsize } from "../../constants";
import { styles } from "./Service.styles";

const Service = ({
  title,
  icon,
  bgColor,
}: {
  title: string;
  icon: Element;
  bgColor: string;
}) => {
  return (
    <View style={[styles.container, {backgroundColor: bgColor}]}>
      {icon}
      <Text style={styles.titleText}>{title}</Text>
    </View>
  );
};

export default Service;
