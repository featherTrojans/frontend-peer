import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../constants";

export const FTBackheaderStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  backArrowContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    borderWidth: 1,
    borderColor: COLORS.black,
  },
  backHeaderWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 25,
    alignItems: "center",
  },
  backHeaderTitle: {
    flex: 1,
    textAlign: "center",
    ...fontsize.smallest,
    ...FONTS.regular,
    color: COLORS.black,
  },
  childrenWrap: {
    flex: 1,
    paddingHorizontal: 15,
  },
});
