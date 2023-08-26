import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../constants";

export const FTEmptycomponentStyles = StyleSheet.create({
  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: COLORS.black,
    textAlign: "center",
    ...fontsize.xsmallest,
    ...FONTS.regular,
    lineHeight: 18,
  },
  transactNow: {
    color: COLORS.blue6,
    ...FONTS.medium,
  },

  centerEmptySet: {
    flexGrow: 1,
    height: "100%",
  },
  performTransactText: {
    ...fontsize.xxsmallest,
    ...FONTS.semibold,
    color: COLORS.blue16,
  },
  performTransactBg: {
    alignSelf: "center",
    marginTop: 37,
    paddingVertical: 11,
    paddingHorizontal: 24,
    backgroundColor: "#F3F5FE",
    borderRadius: 10,
  },
});
