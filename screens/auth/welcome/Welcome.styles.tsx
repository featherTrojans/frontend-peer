import styled from "styled-components/native";
import { StyleSheet } from "react-native";
import { COLORS, FONTS, icons, SIZES, fontsize } from "../../../constants";


export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white,
      paddingHorizontal: 25,
      paddingTop: 25,
    },
    welcomeTextContainer: {
      justifyContent: "center",
      alignItems: "center",
      marginHorizontal: 58,
    },
    welcomeText: {
      color: COLORS.black,
      ...FONTS.bold,
      ...fontsize.bigger,
      textAlign: "center",
    },
    welcomeTextSub:{
      textAlign: "center",
      color: COLORS.black,
      ...FONTS.regular
    },
    lineBg: {
      marginHorizontal: 82,
      backgroundColor: COLORS.animatedLine,
      height: 3.5,
      borderRadius: 3.5,
      marginBottom: 127,
      marginTop: 127,
    },
    line: {
      backgroundColor: COLORS.blue6,
      height: 3.5,
      borderRadius: 3.5,
    },
    getStartedContainer: {
      paddingHorizontal: 30,
      marginBottom: 112,
    },
    getStartedText: {
      ...fontsize.bsmall,
      ...FONTS.regular,
      textAlign: "center",
    },
  });