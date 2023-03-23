import { StyleSheet, Text, View, TouchableNativeFeedback } from "react-native";
import React from "react";
import { COLORS, FONTS, fontsize, SIZES } from "../../constants";
import { RFValue } from "react-native-responsive-fontsize";





const Numberbtn = ({
  children,
  onpress,
  textColor,
}: {
  children: string;
  onpress: () => void;
  textColor?: string;
}) => {
  return (
    <TouchableNativeFeedback
      style={[styles.numberBtn]}
      onPress={onpress}
      background={TouchableNativeFeedback.Ripple(COLORS.lightBlue, true)}
    >
      <View style={styles.numberBtn}>
        <Text
          style={[
            styles.numberBtnText,
            { color: textColor ? textColor : COLORS.black },
          ]}
        >
          {children}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
};

export default Numberbtn;

const styles = StyleSheet.create({
  numberBtn: {
    width: RFValue(60),
    height: RFValue(60),
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: RFValue(20),
    marginVertical: RFValue(10),
    borderRadius: RFValue(60/2),

  },
  numberBtnText: {
    ...fontsize.bbsmall,
    ...FONTS.medium,
    color: COLORS.grey2,
  },
});
