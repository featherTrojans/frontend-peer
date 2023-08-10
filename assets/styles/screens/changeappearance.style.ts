import { StyleSheet } from "react-native";
import { FONTS, fontsize } from "../../../constants";

export const ChangeappearanceScreenStyles = StyleSheet.create({
  topSectionWrap: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 35,
  },
  customizeText: {
    ...fontsize.bmedium,
    ...FONTS.bold,
  },
  sectionHeader: {
    ...fontsize.smallest,
    ...FONTS.regular,
    marginBottom: 35,
  },
  colorOptionBg: {
    width: 46,
    height: 46,
    borderRadius: 46 / 2,
    marginRight: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});
