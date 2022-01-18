// import all themes and export everything

import { Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
const { width, height } = Dimensions.get("window");

export const COLORS = {
  white: "#FFFFFF",
  white2: "#f9fbff",

  blue1: "#1d00ff",
  blue2: "#2949b4",
  blue3: "#1f1f41",
  blue4: "#41d5e2",
  blue5: "#4d53e0",
  blue6: "#003AD6",
  blue7: "#001757",

  grey1: "#f0f0f0",
  grey2: "#707070",
  grey3: "#d6d6d6",
  grey4: "#cecccc",
  grey5: "#8D8D8D",
  grey6: "#B9B9B9",

  yellow1: "#FF9D00",

  black: "#000000",
  placeHolder: `rgba(225, 225, 225, 1)`,
  animatedLine: `rgba(225, 225, 225, .7)`,
  inputBorderColor: `rgba(225, 225, 225, .5)`,
  inputBorderColorDark: "#E6E6E6",
};

export const SIZES = {
  // Design sizes

  // App Dimensions
  width,
  height,
};

export const FONTS = {
  light: { fontFamily: "GTlight" },
  regular: { fontFamily: "GTregular" },
  medium: { fontFamily: "GTmedium" },
  bold: { fontFamily: "GTbold" },
};

export const fontsize = {
  bsmall: {
    fontSize: RFValue(16),
  },
  small: {
    fontSize: RFValue(14),
  },
  smaller: {
    fontSize: RFValue(13),
  },
  smallest: {
    fontSize: RFValue(12),
  },
  medium: {
    fontSize: RFValue(20),
  },
  big: {
    fontSize: RFValue(30),
  },
  bigger:{
    fontSize: RFValue(38),
  }
};

const appTheme = { COLORS, SIZES, FONTS, fontsize };

export default appTheme;
