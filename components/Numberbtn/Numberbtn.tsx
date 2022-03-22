import { StyleSheet, Text, View, TouchableNativeFeedback } from "react-native";
import React from "react";
import { COLORS } from "../../constants";
import { styles } from "./Numberbtn.styles";

const Numberbtn = ({
  children,
  onpress,
  textColor,

}: {
  children: string;
  onpress: () => void;
  textColor?: string
}) => {
  return (
    <TouchableNativeFeedback
      style={styles.numberBtn}
      onPress={onpress}
      background={TouchableNativeFeedback.Ripple(COLORS.lightBlue, true)}
    >
      <View style={styles.numberBtn}>
        <Text style={[styles.numberBtnText,{color: textColor}]}>{children}</Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default Numberbtn;
