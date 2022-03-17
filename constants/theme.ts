
// import all themes and export everything

import { Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
const { width, height } = Dimensions.get("window");

export const COLORS = {
  white: "#FFFFFF",
  white2: "#f9fbff",
  white3: "#F7F8FA",
 
  blue1: "#1d00ff",
  blue2: "#2949b4",
  blue3: "#1f1f41",
  blue4: "#41d5e2",
  blue5: "#4d53e0",
  blue6: "#003AD6",
  blue7: "#001757",
  transparentBlue: "#F2F5FF",


  lightBlue: "#F2F5FF",

  grey1: "#f0f0f0",
  grey2: "#707070",
  grey3: "#d6d6d6",
  grey4: "#cecccc",
  grey5: "#8D8D8D",
  grey6: "#B9B9B9",
  grey7: "#333333",
  grey8: "#484848",
  grey9: "#BFBFBF",
  

  yellow1: "#FF9D00",
  yellow2: "#FFC84B",
  green1: "#00C9AA",
  green2: "#25DBA3",
  pink1: "#E00070",
  red1: "#E00000",


  checkBorder: "#A5A5A5",
  errorBorder: `rgba(224, 0, 0, .5)`,
  black: "#000000",
  borderColor: "#EDEDED",
  borderColor2: `rgba(112, 112, 112, .2)`,
  borderColor3: `rgba(112, 112, 112, .3)`,
  lineColor: `rgba(112, 112, 112, .1)`,
  lineColor2: `rgba(112, 112, 112, .3)`,
  lineColor3: `rgba(112, 112, 112, .5)`,
  halfBlack: `rgba(0, 0, 0, .5)`,
  placeHolder: `rgba(225, 225, 225, 1)`,
  placeHolder2: `rgba(51, 51, 51, .4)`,
  iconBg: `rgba(225, 225, 225, .05)`,
  animatedLine: `rgba(225, 225, 225, .7)`,
  inputBorderColor: `rgba(225, 225, 225, .5)`,
  inputBorderColorDark: "#E6E6E6",
  withdraw: "#41D5E2",
  deposit: "#25DBA3",
  transfer: "#FFC100",
  paybills: "#4D53E0"
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

export const Shadow = {
  shadowColor: COLORS.borderColor2,
    shadowOpacity: 0.3,
    shadowOffset: { width: 10, height: -10},
    shadowRadius: 3,
    elevation: 10,
    backgroundColor: 'white'
}

export const fontsize = {
  
  bbsmall: {
    fontSize: 18,
  },
  bsmall: {
    fontSize: 16,
  },

  bmsmall: {
    fontSize: 15,
  },

  small: {
    fontSize: 14,
  },
  smaller: {
    fontSize: 13,
  },
  smallest: {
    fontSize: 12,
  },
  xsmallest: {
    fontSize: 11,
  },
  xxsmallest: {
    fontSize: 10,
  },
  medium: {
    fontSize: 20,
  },
  xmedium: {
    fontSize: 21,
  },
  bmedium: {
    fontSize: 24,
  },
  bxmedium: {
    fontSize: 28,
  },
  big: {
    fontSize: 30,
  },
  bigger:{
    fontSize: 38,
  }
};

const appTheme = { COLORS, SIZES, FONTS, fontsize, Shadow };

export default appTheme;
