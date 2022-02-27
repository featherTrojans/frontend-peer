import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "./Bottombtn.styles";
import { COLORS } from "../../constants";

type Props = {
  title: string;
  bg?: string;
  onpress: () => void;
};
const Bottombtn = ({ title, bg = COLORS.blue6, onpress, ...rest }: Props) => {
  return (
    <TouchableOpacity
      style={styles.btnSection}
      activeOpacity={0.8}
      onPress={onpress}
      {...rest}
    >
      <View style={[styles.btnBg, { backgroundColor: bg }]}>
        <Text style={styles.btnText}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Bottombtn;
