import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize, icons, SIZES } from "../../../constants";

export const BVNScreenStyles = StyleSheet.create({
  headerText: {
    ...fontsize.bmedium,
    ...FONTS.bold,
    lineHeight: 30,
    color: COLORS.blue9,
  },
  skip: {
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 45,
  },
  skipLaterText: {
    ...fontsize.smallest,
    ...FONTS.semibold,
    marginLeft: 8.8,
  },
  flex: {
    flex: 1,
  },
  flexdown: {},
  bvnreason: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.gray,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 40,
    borderRadius: 10,
  },
  bvntext: {
    ...fontsize.xsmallest,
    ...FONTS.semibold,
    color: COLORS.blue9,
    marginLeft: 12,
  },
  infotext: {
    ...FONTS.regular,
    ...fontsize.xsmallest,
    textAlign: "center",
  },
  bvnIconTextWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  link: {
    ...FONTS.bold,
    ...fontsize.xsmallest,
  },
  modalBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.halfBlack,
    zIndex: 1,
    paddingHorizontal: 16,
  },
  modalBvnInfo: {
    position: "absolute",
    bottom: 80,
    left: 16,
    right: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  modalBvnInfoText: {
    ...fontsize.smallest,
    ...FONTS.medium,
    marginBottom: 25,
  },
});
