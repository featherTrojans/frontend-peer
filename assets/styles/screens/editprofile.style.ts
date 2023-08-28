import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../constants";

export const EditprofileScreenStyles = StyleSheet.create({
  profileHeaderText: {
    ...fontsize.bmedium,
    ...FONTS.bold,
    color: COLORS.blue9,
  },
  headerWrap: {
    marginTop: 20,
    marginBottom: 40,
  },
  profileWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    alignItems: "center",
  },
  headerRightWrap: {
    flexDirection: "row",
    alignItems: "center",
    // paddingVertical: 12,
    height: 35,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: COLORS.black,
    borderRadius: 24,
    marginLeft: 10,
  },
  headerRightEditText: {
    ...fontsize.xsmallest,
    ...FONTS.semibold,
    marginLeft: 8,
  },
  pickOptionWrap: {
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  pickOptionText: {
    ...fontsize.xsmallest,
    ...FONTS.regular,
    color: COLORS.blue9,
    textAlign: "center",
    textTransform: "uppercase",
  },
  optionText: {
    paddingVertical: 15,
    textTransform: "capitalize",
    ...fontsize.smallest,
    ...FONTS.medium,
  },
});
