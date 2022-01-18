import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { icons, COLORS, FONTS, fontsize} from "../../constants";
// import { inputContainer } from "../../global/styles";
import { RFValue } from "react-native-responsive-fontsize";
import { ReactNode } from "react";
const { Eyeicon, Usericondark } = icons;

const Input = ({icon, placeholder, password}: {icon: ReactNode, placeholder: string, password?: boolean}) => {
  return (
    <View style={[styles.inputContainer, { marginBottom: 15 }]}>
    <View style={styles.inputiconwrapper}>
      {icon}
    </View>
    <TextInput
      style={styles.textInput}
      placeholder={placeholder}
      placeholderTextColor={COLORS.placeHolder}
      underlineColorAndroid="transparent"
      secureTextEntry={password ? true : false}
    />
  </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    height: 62,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderColor: COLORS.inputBorderColorDark,
    backgroundColor: COLORS.white,
  },
  textInput: {
    flex: 1,
    borderColor: COLORS.white,
    color: COLORS.black,
    ...FONTS.light,
    ...fontsize.small,
    paddingLeft: 12.5,
  },
  inputiconwrapper: {
    borderRightWidth: 1,
    borderColor: COLORS.black,
    paddingRight: 12,
  },
});
