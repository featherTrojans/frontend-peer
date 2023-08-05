import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../constants";

export const AccountverificationScreenStyles = StyleSheet.create({
  segmentedWrap: {
    backgroundColor: COLORS.grey1,
    flexDirection: "row",
    justifyContent: "space-between",
    maxWidth: "80%",
    alignSelf: "center",
    borderRadius: 12,
  },
  movingSegmentedbg: {
    backgroundColor: "blue",
    width: "33.3%",
    position: "absolute",
    left: 0,
    top: 0,
    height: "100%",
    borderRadius: 12,
  },
  segmentedOptions: {
    paddingHorizontal: 17,
    paddingVertical: 10,
  },
  segmentedOptionText: {
    ...fontsize.smallest,
    ...FONTS.regular,
  },
});
