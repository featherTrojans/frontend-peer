import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../constants";

export const AccountverificationScreenStyles = StyleSheet.create({
  segmentedWrap: {
    backgroundColor: COLORS.grey1,
    flexDirection: "row",
    justifyContent: "space-between",
    maxWidth: "80%",
    alignSelf: "center",
    borderRadius: 12,
  },
  movingSegmentedbg: {
    backgroundColor: "blue",
    width: "33.3%",
    position: "absolute",
    left: 0,
    top: 0,
    height: "100%",
    borderRadius: 12,
  },
  segmentedOptions: {
    paddingHorizontal: 17,
    paddingVertical: 10,
  },
  segmentedOptionText: {
    ...fontsize.smallest,
    ...FONTS.regular,
  },
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
    marginBottom: 30,
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
    borderWidth: 0.5,
    borderColor: COLORS.grey1,
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
