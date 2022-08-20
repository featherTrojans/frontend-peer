import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../../constants";

export const walletmanangementstyles = StyleSheet.create({
  memojimainwrap: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 50,
  },
  memojitextwrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  typebg: {
    // backgroundColor: COLORS.green2,
    paddingVertical: 6,
    paddingHorizontal: 11,
    borderRadius: 20,
    marginLeft: 15.5,
  },
  secondtypebg: {},
  typetext: {
    color: COLORS.white,
    ...fontsize.smallest,
    ...FONTS.regular,
    lineHeight: 22,
  },
  tablewrap: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 20,
    paddingVertical: 28,
    borderRadius: 20,
  },
  bottominfowrap: {
    backgroundColor: COLORS.blue6,
    marginTop: 20,
    borderRadius: 16,
    padding: 20,
  },
  bankinfowrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  bankinfotitle: {
    ...fontsize.smallest,
    ...FONTS.regular,
    lineHeight: 20,
    marginBottom: 13,
    color: COLORS.black,
  },
  bankinfovalue: {
    ...fontsize.small,
    ...FONTS.medium,
    color: COLORS.black,
    lineHeight: 20,
  },
  copybankinfobg: {
    backgroundColor: COLORS.black,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 18,
  },
  copybankinfotext: {
    ...fontsize.xsmallest,
    color: COLORS.white,
    ...FONTS.medium,
    lineHeight: 22,
  },
  tableoptionwrap: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  tableoptiontitle: {
    ...fontsize.smallest,
    ...FONTS.regular,
    color: COLORS.grey2,
    lineHeight: 20,
  },
  tableoptionvalue: {
    ...fontsize.smallest,
    ...FONTS.medium,
    color: COLORS.black,
    lineHeight: 20,
  },
  bottominfotext: {
    lineHeight: 20,
    color: COLORS.white,
    ...fontsize.small,
    ...FONTS.medium,
    marginBottom: 25,
  },
  curvedbuttonbg: {
    paddingVertical: 14,
    backgroundColor: COLORS.green2,
    borderRadius: 21,
  },
  curvedbuttontext: {
    textAlign: "center",
    color: COLORS.white,
    ...fontsize.smallest,
  },
});
