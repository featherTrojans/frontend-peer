import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../constants";




export const FTSearchinputStyles = StyleSheet.create({
  searchInputWrap: {
    height: 55,
    backgroundColor: COLORS.blue18,
    paddingHorizontal: 20,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  searchTextInput: {
    flex: 1,
    paddingRight: 20,
    ...fontsize.xsmallest,
    ...FONTS.regular,
    color: COLORS.blue9,
  },
});
