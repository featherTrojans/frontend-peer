
// import all themes and export everything

import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const COLORS = {
  white: "#FFFFFF",
  white2: "#f9fbff",

  blue1: "#1d00ff",
  blue2: "#2949b4",
  blue3: "#1f1f41",
  blue4: "#41d5e2",
  blue5: "#4d53e0",


  
  grey1: "#f0f0f0",
  grey2: "#707070",
  grey3: "#d6d6d6",
  grey4: "#cecccc",
  
  
  black: "#000000",
  
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

const appTheme = { COLORS, SIZES, FONTS };

export default appTheme;
