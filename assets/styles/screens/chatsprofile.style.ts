import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../constants";

export const ChatsprofileScreenStyles = StyleSheet.create({
  quickActionBtn: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingVertical: 11,
    paddingHorizontal: 15,
    borderRadius: 10,
  },
  quickActionBtnText: {
    textTransform: "capitalize",
    ...fontsize.xsmallest,
    ...FONTS.semibold,
    marginLeft: 6.7,
  },
  profileInfoWrap: {
    backgroundColor: COLORS.white,
    paddingVertical: 40,
    borderRadius: 20,
  },
  alignWrap: {
    flexDirection: "row",
    alignSelf: "center",
  },
  profileDetailWrap: {
    marginVertical: 30,
    alignItems: "center",
  },
  profileNameText: {
    marginBottom: 11,
    ...fontsize.small,
    ...FONTS.bold,
    textTransform: "capitalize",
  },
  profileDateJoined: {
    ...fontsize.xsmallest,
    ...FONTS.medium,
    color: COLORS.grey16,
  },
  recentTransactText: {
    marginBottom: 32,
    ...fontsize.xxsmallest,
    ...FONTS.semibold,
    color: COLORS.blue9,
  },
});
