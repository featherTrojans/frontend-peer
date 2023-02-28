import { StyleSheet } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { COLORS, FONTS, fontsize } from "../../../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  chatHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: COLORS.white,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerDetailsContainer: {
    flexDirection: "row",
    marginLeft: 5,
    alignItems: "center",
  },
  chatsDmProfileWrap: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  chatName: {
    ...fontsize.smaller,
    ...FONTS.bold,
    color: COLORS.grey7,
    textTransform: "capitalize",
    marginBottom: 6,
  },
  chatLastSeen: {
    ...fontsize.xsmallest,
    ...FONTS.regular,
    color: COLORS.grey20,
  },

  chatTransferMsgWrap: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
    flex: 1,
  },
  chatTransferAnim: {
    width: "100%",
    height: 590,
    position: "absolute",
    left: -121,
    bottom: 0,
    zIndex: 1,
  },
  chatTransferTextBg: {
    borderWidth: 0.5,
    borderColor: COLORS.grey13,
    backgroundColor: COLORS.grey14,
    paddingHorizontal: 24,
    paddingTop: 9,
    paddingBottom: 13,
    marginTop: 10,
    borderRadius: 24,
    position: "relative",
  },
  chatTransferText: {
    ...fontsize.smallest,
    ...FONTS.regular,
    lineHeight: 24,
    color: COLORS.black,
    textAlign: "center",
  },

  messageAreaContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  chatTextContainer: {
    position: "relative",
  },
  inputarea: {},
  chatTextInput: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.grey1,
  },
  messagesDateWrap: {
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: COLORS.blue14,
    paddingHorizontal: 16,
    paddingVertical: 9,
    borderRadius: 15,
    marginVertical: 20,
  },
  messageDateText: {
    textAlign: "center",
    ...fontsize.xsmallest,
    ...FONTS.regular,
    color: COLORS.blue15,
  },
  textinput: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 3,
    ...FONTS.regular,
    color: COLORS.grey7,
    ...fontsize.smallest,
  },
  emptyChatLoaderWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyChatAnimation: {
    width: 160,
    height: 160,
  },

  chatToMe: {
    flexDirection: "row-reverse",
    marginBottom: 15,
    alignItems: "flex-end",
  },
  chatToMeColor: {
    padding: 15,
    backgroundColor: "#003AD6",
    borderBottomRightRadius: 0,
    marginBottom: 10,
    borderRadius: 20,
  },
  chatToMeTime: {
    color: COLORS.grey18,
    ...fontsize.xsmallest,
    ...FONTS.bold,
  },
  chatNotMe: {
    flexDirection: "row",
    marginBottom: 15,
  },
  chatNotMeColor: {
    padding: 15,
    backgroundColor: COLORS.white,
    marginBottom: 10,
    borderRadius: 20,
    borderBottomLeftRadius: 0,
  },

  chatTextStyle: {
    ...fontsize.smallest,
    ...FONTS.regular,
    lineHeight: 21,
  },

  // Profile details modal
  dmActionsProfileWrap: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  dmActionsProfileImage: {
    width: 90,
    height: 90,
    borderRadius: 90 / 2,
    backgroundColor: COLORS.grey1,
    marginBottom: 30,
  },
  dmActionsProfileName: {
    ...fontsize.bbsmall,
    ...FONTS.bold,
    color: COLORS.black,
    marginBottom: 15,
  },
  dmActionsText: {
    textAlign: "center",
    ...fontsize.smaller,
    ...FONTS.medium,
    color: COLORS.grey16,
  },
  dmProfileActionsWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 45,
    marginVertical: 40,
  },
  dmProfileActionWrap: {
    justifyContent: "center",
    alignItems: "center",
  },
  dmActionsBg: {
    width: 48,
    height: 48,
    borderRadius: 48 / 2,
    backgroundColor: COLORS.lightgray,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  dmActionsTitle: {
    ...fontsize.smaller,
    ...FONTS.medium,
  },

  ///Modals styling

  // viewWrapper: {
  //   backgroundColor: COLORS.white,
  //   paddingTop: 40,
  //   borderTopRightRadius: 30,
  //   borderTopLeftRadius: 30,
  //   paddingHorizontal: 15,
  // },

  //send cash modal styling
  sendCashHeader: {
    textAlign: "center",
    paddingHorizontal: 30,
    marginBottom: 40,
    ...fontsize.small,
    ...FONTS.medium,
    lineHeight: 24,
    color: COLORS.black2,
  },
  sendCashWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: getBottomSpace() + 20,
  },
  sendCashButton: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    flexDirection: "row",
    flex: 0.48,

    alignItems: "center",
    borderRadius: 6,
  },
  buttonIconBg: {
    width: 31,
    height: 31,
    borderRadius: 31 / 2,
    backgroundColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    marginLeft: 10,
    color: COLORS.white,
    ...fontsize.smallest,
    ...FONTS.medium,
    lineHeight: 18,
  },

  //Choose amount to send modal
  chooseAmountHeader: {
    textAlign: "center",
    ...fontsize.small,
    ...FONTS.medium,
    color: COLORS.black2,
  },
  amountBlockWrap: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 52,
    marginBottom: 48,
  },
  addedAmountText: {
    ...fontsize.biggest,
    ...FONTS.bold,
    lineHeight: 66,
    minWidth: 150,
    textAlign: "center",
  },
  amountOptionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: 46,
  },
  amountOption: {
    width: 76,
    height: 41,
    backgroundColor: COLORS.white3,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    marginBottom: 15,
    borderRadius: 21,
  },
  amountOptionText: {
    ...fontsize.small,
    ...FONTS.regular,
    color: COLORS.black,
    lineHeight: 18,
  },

  buttonWrapper: {
    paddingTop: 23,
    paddingBottom: 20,
    backgroundColor: COLORS.blue5,
    marginBottom: getBottomSpace() + 27,
    borderRadius: 6,
  },
  buttonTextValue: {
    textAlign: "center",
    color: COLORS.white,
    ...fontsize.smallest,
    ...FONTS.medium,
    lineHeight: 18,
  },

  // Enter Secure pin styles

  securePinHeader: {
    textAlign: "center",
    ...fontsize.small,
    ...FONTS.regular,
  },
  inputLockWrapper: {
    height: 56,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: COLORS.borderColor2,
    borderRadius: 10,
    paddingLeft: 24,
    marginVertical: 16,
  },
  securePinTextInput: {
    flex: 1,
    borderLeftWidth: 0.5,
    marginLeft: 17,
    paddingHorizontal: 15,
    ...fontsize.smallest,
    lineHeight: 24,
    ...FONTS.regular,
  },

  sendingSuccessText: {
    marginBottom: getBottomSpace() + 50,
    ...fontsize.small,
    ...FONTS.regular,
    lineHeight: 24,
    color: COLORS.black2,
  },
});
