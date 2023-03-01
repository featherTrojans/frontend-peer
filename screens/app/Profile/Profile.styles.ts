import { StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { COLORS, FONTS, fontsize } from "../../../constants";

export const profilestyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: getStatusBarHeight(true),
    backgroundColor: COLORS.white,
  },
  subcontainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  profilehomeheader: {
    marginVertical: 30,
    justifyContent: "space-between",
    flexDirection: "row",
    // alignItems: "center"
  },
  profileheaderText: {
    ...fontsize.big,
    ...FONTS.bold,
    color: COLORS.black,
  },
  userProfileWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userProfile: {
    flexDirection: "row",
    alignItems: "center",
  },
  userImageBg: {
    width: 84,
    height: 84,
    borderRadius: 84 / 2,
    backgroundColor: COLORS.blue1,
  },
  userFullname: {
    ...fontsize.bbsmall,
    ...FONTS.bold,
    marginBottom: 6,
  },
  userUsername: {
    ...fontsize.smaller,
    ...FONTS.regular,
  },
  accountDataWrap: {
    backgroundColor: COLORS.blue6,
    marginVertical: 45,
    padding: 22,
    borderRadius: 15,
  },
  accountData: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  accountKey: {
    ...fontsize.smallest,
    ...FONTS.regular,
    color: COLORS.grey9,
    marginBottom: 12,
  },
  accountValue: {
    ...fontsize.medium,
    ...FONTS.bold,
    color: COLORS.white,
  },
  accountBankname: {
    ...fontsize.smaller,
    ...FONTS.medium,
    color: COLORS.white,
  },
  ///Settings actions
  settingsHeader: {
    ...fontsize.smaller,
    ...FONTS.bold,
    marginBottom: 30,
  },
  settingOptionsWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  settingAction: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingActionIconBg: {
    width: 44,
    height: 44,
    borderRadius: 44 / 2,
    backgroundColor: "#F6F8FF",
    justifyContent: "center",
    alignItems: "center",
  },
  settingActionInfoWrap: {},
  settingActionTitle: {
    ...fontsize.smaller,
    ...FONTS.semibold,
    marginBottom: 9,
  },
  settingActionInfo: {
    ...fontsize.xsmallest,
    ...FONTS.regular,
  },
});
