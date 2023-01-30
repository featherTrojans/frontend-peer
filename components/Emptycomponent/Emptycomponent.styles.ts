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
    ...fontsize.smaller,
    ...FONTS.regular,
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
