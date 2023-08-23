import { StyleSheet } from "react-native";
import { FONTS, fontsize } from "../../../constants";

export const ChoosememojiScreenStyles = StyleSheet.create({


  sectionHeader: {
    ...fontsize.smallest,
    ...FONTS.regular,
    marginBottom: 15,
  },
  colorOptionBg: {
    width: 36,
    height: 36,
    borderRadius: 36 / 2,
    marginRight: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});
