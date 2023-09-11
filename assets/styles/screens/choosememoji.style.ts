import { StyleSheet } from "react-native";
import { COLORS, FONTS, SIZES, fontsize } from "../../../constants";
export const ChoosememojiScreenStyles = StyleSheet.create({
  sectionHeader: {
    ...fontsize.smallest,
    ...FONTS.regular,
    marginBottom: 15,
  },
  colorOptionBg: {
    width: 36,
    height: 36,
    borderRadius: 36 / 2,
    marginRight: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  profileWrap: {
    marginTop: 46,
    marginBottom: 20,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "red"
  },
  memojisWrapper: {
    justifyContent: "space-evenly",
    alignItems: "center",
    // rowGap: 15
    marginTop: 20,
  },
  buttonWrap: {
    backgroundColor: COLORS.blue9,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    paddingHorizontal: 40,
    paddingVertical: 21,
    borderRadius: 27,
  },
  buttonText: {
    color: COLORS.white,
    ...fontsize.xsmallest,
    ...FONTS.bold,
  },
  memojiSuccessWrap: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 50,
  },
  successHeader: {
    ...fontsize.bmedium,
    textAlign: "center",
    ...FONTS.bold,
    lineHeight: 29,
    color: COLORS.blue9,
    marginTop: 78,
    marginBottom: 40,
  },
  successMessageText: {
    ...fontsize.small,
    ...FONTS.medium,
    lineHeight: 26,
    textAlign: "center",
    color: COLORS.blue9,
  },
  succesAnimation: {
    width: SIZES.width,
    height: 390,
    // backgroundColor: "red",
    position: "absolute",
    alignSelf: "center",
  },
});
