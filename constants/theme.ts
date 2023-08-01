
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
  blue8: "#0548D7",

  
  blue9: "#11141A",



  blue10: "#5676FF",
  blue11: "#D2EAFD",
  blue12: "#56BEFF",
  blue13: "#8456FF",
  blue14: "#E6ECFF",
  blue15: "#1539CE",
  blue16: "#342AD5",
  blue17: "#D8E3FF",
  transparentBlue: "#F2F5FF",


  lightBlue: "#F2F5FF",
  lightBlue2: `rgba(210, 234, 254, .5)`,

  grey1: "#f0f0f0",
  grey2: "#707070",
  grey3: "#d6d6d6",
  grey4: "#cecccc",
  grey5: "#8D8D8D",
  grey6: "#B9B9B9",
  grey7: "#333333",
  grey8: "#484848",
  grey9: "#BFBFBF",
  grey10: "#262626",
  grey11: "#EFEFEF",
  grey12: "#F2F5FF",
  grey13: "#DEDEDE",
  grey14: "#FCFDFF",
  grey15: "#CBCBCB",
  grey16: "#696969",
  grey17: "#DBDCDD",
  grey18: "#A0A0A0",
  grey19: "#F7F8FA",
  grey20: "#575151",


  yellow1: "#FF9D00",
  yellow2: "#FFC84B",
  yellow3: "#FFC100",
  yellow4: "#FFC100",
  yellow5: "#FFF5E5",
  green1: "#00C9AA",
  green2: "#25DBA3",
  green3: "#E5FAF6",
  pink1: "#E00070",
  red1: "#E00000",
  red2: "#FFE3E3",
  red3: "#FF5668",
  red4: "#F80000",
  purple: "#6300AC",
  purple2: "#7600FF",
  purple3: "#F1E5FF",
  purple4: "#8456FF",


  lightgray: `rgba(219, 220, 221, .5)`,
  paybillInput: "#E6E6E6",
  checkBorder: "#A5A5A5",
  borderColor: `rgba(31, 31, 65, .4)`,
  black: "#000000",
  black2: "#333333",
  inputBgColor: `rgba(240, 240, 240, .5)`,
  borderColor2: `rgba(112, 112, 112, .2)`,
  borderColor3: `rgba(112, 112, 112, .3)`,
  lineColor: `rgba(112, 112, 112, .1)`,
  lineColor2: `rgba(112, 112, 112, .3)`,
  lineColor3: `rgba(112, 112, 112, .5)`,
  lineColor4: `rgba(112, 112, 112, .6)`,
  switchOff:  `rgba(0, 23, 87, .1)`,
  thumbOff:   `rgba(0, 58, 214, 1)`,
  switchOn:  `rgba(0, 58, 214, .1)`,
  trasparentBlue2: `rgba(230, 236, 255, .7)`,
  trasparentPurple: `rgba(241, 229, 255, .7)`,
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
  respond: RFValue(1)
};

export const FONTS = {
  light: { fontFamily: "BRlight" },
  regular: { fontFamily: "BRregular" },
  medium: { fontFamily: "BRmedium" },
  semibold: { fontFamily: "BRsemibold" },
  bold: { fontFamily: "BRbold" },
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
    fontSize: RFValue(18),
  },
  bsmall: {
    fontSize: RFValue(16),
  },

  bmsmall: {
    fontSize: RFValue(15),
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
  xsmallest: {
    fontSize: RFValue(11),
  },


  xxsmallest: {
    fontSize: RFValue(10),
  },


  xxsmall:{
    fontSize: RFValue(9),
  },
  medium: {
    fontSize: RFValue(20),
  },
  xmedium: {
    fontSize: RFValue(21),
  },
  bmedium: {
    fontSize: RFValue(24),
  },
  bymedium: {
    fontsize: RFValue(25),
  },
  bxmedium: {
    fontSize: RFValue(28),
  },
  big: {
    fontSize: RFValue(30),
  },
  xbig:{
    fontSize: RFValue(32),
  },
  xbigger:{
    fontSize: RFValue(35),
  },
  bigger:{
    fontSize: RFValue(38),
  },
  biggest:{
    fontSize: RFValue(40),
  }
};

const appTheme = { COLORS, SIZES, FONTS, fontsize, Shadow };

export default appTheme;
