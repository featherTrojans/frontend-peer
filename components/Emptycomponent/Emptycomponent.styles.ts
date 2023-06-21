import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../constants";



export const emptycompstyles = StyleSheet.create({

  emptyContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: COLORS.black,
    textAlign: "center",
    ...fontsize.xsmallest,
    ...FONTS.regular,
    lineHeight: 18
  },
  transactNow: {
    color: COLORS.blue6,
    ...FONTS.medium,
  },

  centerEmptySet: {
    flexGrow: 1,
    height: "100%",
  },
})
