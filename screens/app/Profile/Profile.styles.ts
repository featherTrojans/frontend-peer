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
    backgroundColor: COLORS.blue17,
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

  //Accountlevel KYC

  ///Personal info
  personalModalText: {
    textAlign: "center",
    ...fontsize.xsmallest,
    ...FONTS.regular,
    textTransform: "uppercase",
    color: COLORS.blue9,
  },
  personalUserImageWrap: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  personalUserImageBorder: {
    width: 140,
    height: 140,
    borderRadius: 140 / 2,
    borderColor: COLORS.grey11,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 35,
  },
  personalImageBg: {
    width: 122,
    height: 122,
    borderRadius: 122 / 2,
    backgroundColor: COLORS.grey1,
  },
  personalNames: {
    ...fontsize.smaller,
    ...FONTS.regular,
    color: COLORS.grey8,
  },
  personalEachOverlapBlock: {
    width: "100%",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: 45,
    paddingHorizontal: 30,
    paddingTop: 25,
  },
  personalEachBlockHeader: {
    ...fontsize.bsmall,
    ...FONTS.semibold,
    color: COLORS.white,
    marginBottom: 10,
  },
  personalEachBlockSubHeader: {
    ...fontsize.smaller,
    ...FONTS.regular,
    color: COLORS.grey17,
  },

  //Change Memoji
  changeMemojiHeaderWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  changeMemojiHeaderText: {
    ...fontsize.xbigger,
    ...FONTS.bold,
    width: "60%",
  },
  changeMemojiImageBorder: {
    width: 97,
    height: 97,
    borderRadius: 140 / 2,
    borderColor: COLORS.grey11,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 35,
  },
  changeMemojiImageBg: {
    width: 83,
    height: 83,
    borderRadius: 122 / 2,
    backgroundColor: COLORS.grey1,
  },
  changeMemojiColorOptionWrap: {
    marginRight: 35,
    alignItems: "center",
  },
  changeMemojiBgBorder: {
    width: 56,
    height: 56,
    borderRadius: 56 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  changeMemojiOptionBg: {
    width: 48,
    height: 48,
    borderRadius: 48 / 2,
  },
  changeMemojiOptionTitle: {
    marginTop: 18,
    ...fontsize.xxsmallest,
    textTransform: "uppercase",
    ...FONTS.medium,
  },

  ///Verify email
  kycPersonalInfoText: {
    color: COLORS.blue9,
    ...fontsize.bmedium,
    ...FONTS.bold,
    marginBottom: 10,
    marginTop: 40,
  },
  verifyEmailText: {
    ...fontsize.bmedium,
    ...FONTS.regular,
    color: COLORS.blue9,
  },
  verifyEmailInfo: {
    ...fontsize.smaller,
    ...FONTS.regular,
    color: COLORS.grey16,
    marginTop: 20,
    marginBottom: 40,
  },
  emailInputLabel: {
    ...FONTS.semibold,
    color: COLORS.blue9,
    ...fontsize.smallest,
    marginBottom: 18,
  },
  emailTextInput: {
    height: 53,
    borderWidth: 1,
    borderColor: COLORS.grey15,
    borderRadius: 5,
    paddingHorizontal: 15,
    color: COLORS.grey15,
  },

  //Wallet Lists
  walletListHeader: {
    ...fontsize.bxmedium,
    ...FONTS.bold,
    color: COLORS.blue6,
    marginBottom: 10,
  },
  walletListSubHeader: {
    ...fontsize.xsmallest,
    ...FONTS.regular,
    color: COLORS.grey16,
  },

  walletListOptionHeader: {
    ...fontsize.smaller,
    ...FONTS.bold,
    marginBottom: 12,
  },
  walletListOptionSubHeader: {
    ...fontsize.smaller,
    ...FONTS.regular,
    lineHeight: 20,
    color: COLORS.grey16,
  },

  //Secuirty and privacy

  securityPrivacyOptionHeader: {
    ...fontsize.smallest,
    ...FONTS.medium,
    textTransform: "uppercase",
    color: COLORS.grey16,
  },
  biometricOptionWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  biometricsStatusBg: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: COLORS.green1,
    borderRadius: 18,
  },
  biometricStatusText: {
    color: COLORS.white,
    ...fontsize.smallest,
    ...FONTS.bold,
  },

  //Share and earn

  shareAndEarnSvgWrap: {
    justifyContent: "center",
    alignItems: "center",
  },
  shareAndEarnMainText: {
    ...fontsize.bmedium,
    ...FONTS.bold,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 30,
  },
  shareAndEarnSubText: {
    textAlign: "center",
    ...fontsize.smallest,
    ...FONTS.regular,
    color: COLORS.grey16,
    lineHeight: 20,
  },
  shareAndEarchReferWrap: {
    marginVertical: 40,
    paddingVertical: 22,
  },
  shareAndEarnReferCode: {
    ...fontsize.medium,
    ...FONTS.bold,
    color: COLORS.blue6,
    marginBottom: 6,
    textAlign: "center",
  },
  shareAndEarnTaptocopy: {
    ...fontsize.xsmallest,
    ...FONTS.regular,
    textAlign: "center",
    color: COLORS.grey16,
  },

  //Bank Verification Number

  bvnTextinput:{
    height: 53, borderWidth: 1, borderColor: COLORS.grey16, marginTop: 60, marginBottom: 30, borderRadius: 5, paddingHorizontal: 15
  }



});
