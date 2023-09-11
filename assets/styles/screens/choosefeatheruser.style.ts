import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../constants";

export const ChoosefeatheruserScreenStyles = StyleSheet.create({
  searchContactWrap: {
    backgroundColor: COLORS.Tblue7,
    borderRadius: 10,
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    paddingVertical: 12,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
  },
  searchContactText: {
    ...fontsize.xxsmallest,
    ...FONTS.semibold,
    color: COLORS.blue6,
    marginLeft: 6,
  },
  listHeaderText: {
    marginBottom: 30,
    ...fontsize.smallest,
    ...FONTS.semibold,
    color: COLORS.blue9,
  },
  addBeneficiaryWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    flex: 1,
  },
  saveBeneficiaryText: {
    ...FONTS.regular,
    ...fontsize.smallest,
    color: COLORS.blue9,
  },
});
