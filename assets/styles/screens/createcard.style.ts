import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../constants";

export const CreatecardScreenStyles = StyleSheet.create({
  createBlockWrap: {
    flex: 1,
    paddingHorizontal: 18,
    paddingVertical: 24,
    borderRadius: 20,
    backgroundColor: COLORS.white
  },
  createBlockHeader: {
    marginBottom: 25,
    ...fontsize.smallest,
    ...FONTS.semibold,
    color: COLORS.blue9,
  },
  cardChargesInfoText: {
    ...fontsize.xsmallest,
    ...FONTS.medium,
    color: COLORS.blue9,
    lineHeight: 20,
  },

  cardinfotableWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cardInfoKeyText: {
    ...fontsize.smallest,
    ...FONTS.regular,
    color: COLORS.grey16,
  },
  cardInfoValueText: {
    ...fontsize.smallest,
    ...FONTS.semibold,
  },
  joinWaitlistText: {
    ...fontsize.xmedium,
    ...FONTS.bold,
    lineHeight: 25,
    color: COLORS.blue9,
    textAlign: "center",
  },
  waitlistMoreInfoText: {
    ...fontsize.smaller,
    ...FONTS.regular,
    marginTop: 26,
    lineHeight: 20,
    textAlign: "center",
    color: COLORS.blue9,
  },
});
