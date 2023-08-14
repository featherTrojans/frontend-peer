import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize, icons, SIZES } from "../../../constants";

export const BVNScreenStyles = StyleSheet.create({
  headerText: {
    ...fontsize.bmedium,
    ...FONTS.bold,
    color: COLORS.blue9,
    marginBottom: 5,
  },
  skip: {
    justifyContent: "center",
    flexDirection: "row",
    marginTop: 45,
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
    marginBottom: 40,
  },
  bvntext: {},
  info: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  infotext: {
    ...FONTS.regular,
    ...fontsize.xsmallest,
  },
  link: {
    ...FONTS.bold,
    ...fontsize.xsmallest,
  },
});
