import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../constants";

export const AccountverificationScreenStyles = StyleSheet.create({

  BAlign: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  statusText: {
    ...fontsize.smallest,
    ...FONTS.bold,
  },
  statusTextBg: {
    paddingHorizontal: 13,
    paddingVertical: 8,
    borderRadius: 15,
  },
  levelInfoWrap: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 50,
    // marginBottom: 30,
  },
  levelText: {
    marginRight: 10,
    ...fontsize.bmedium,
    ...FONTS.bold,
    color: COLORS.blue9,
  },
  requirementText: {
    marginTop: 30,
    marginBottom: 10,
    ...fontsize.smallest,
    ...FONTS.regular,
    color: COLORS.blue9,
  },
  requirementMainText: {
    ...fontsize.smallest,
    ...FONTS.regular,
    color: COLORS.blue9,
  },
  blockWrap: {
    padding: 33,
    backgroundColor: COLORS.white,
    borderRadius: 25,
    marginVertical: 30
  },
  infoKeyText: {
    ...fontsize.smallest,
    ...FONTS.regular,
    color: COLORS.grey16,
  },
  infoValueText: {
    ...fontsize.smallest,
    ...FONTS.semibold,
    color: COLORS.blue9,
  },
  dashedLine: {
    borderWidth: 1,
    borderColor: COLORS.grey16,
    borderStyle: "dashed",
    marginVertical: 26,
  },
});
