import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../../../constants";

export const electrictystyles = StyleSheet.create({
  blockwrap: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    borderRadius: 15,
  },
  headertext: {
    marginVertical: 22,
    ...fontsize.smaller,
    ...FONTS.medium,
    color: COLORS.blue9,
  },
  eachoption: {
    paddingVertical: 22,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logoandtitlewrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  optiontitle: {
    marginLeft: 12,
    ...fontsize.smaller,
    ...FONTS.medium,
    color: COLORS.blue9,
  },
});
