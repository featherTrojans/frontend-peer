import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../constants";


export const ChatsdmScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 20,
    zIndex: 2,
  },
  backArrowWrap: {
    borderColor: COLORS.blue9,
    borderWidth: 1,
    width: 32,
    height: 32,
    borderRadius: 32 / 2,
    justifyContent: "center",
    alignItems: "center",
  },
  headerDetailsContainer: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 5,
    alignItems: "center",
    justifyContent: "space-between",
  },
  chatsDmProfileWrap: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginLeft: 15,
  },
  chatName: {
    ...fontsize.smaller,
    ...FONTS.bold,
    color: COLORS.grey7,
    textTransform: "capitalize",
    // marginBottom: 6,
  },
  chatLastSeen: {
    ...fontsize.xsmallest,
    ...FONTS.regular,
    color: COLORS.grey20,
    marginTop: 6,
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
    marginTop: 10,
    borderRadius: 24,
    position: "relative",
    paddingVertical: 7,
    paddingHorizontal: 32,
    backgroundColor: COLORS.Tyellow,
  },
  chatTransferText: {
    ...fontsize.xxsmallest,
    ...FONTS.semibold,
    lineHeight: 24,
    color: COLORS.yellow1,
    textAlign: "center",
  },

  messageAreaContainer: {
    // flex: 1,
    paddingHorizontal: 15,
    // paddingBottom: 100,
  },
  chatTextContainer: {
    // position: "absolute",
    // bottom: 0,
    // right: 0,
    // left: 0,
  },
  inputarea: {},
  chatTextInput: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 24,
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "flex-end",
  },
  textinput: {
    flex: 1,
    // height: 40,
    backgroundColor: COLORS.white3,
    paddingHorizontal: 10,
    paddingVertical: 3,
    ...FONTS.regular,
    ...fontsize.smallest,
    color: COLORS.grey7,
    borderRadius: 5

    // borderLeftColor: "",
    // borderLeftWidth: 1,
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

  viewWrapper: {
    backgroundColor: COLORS.white,
    paddingTop: 40,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingHorizontal: 15,
  },

  //send cash modal styling
  sendCashHeader: {
    textAlign: "center",
    paddingHorizontal: 30,
    marginBottom: 40,
    ...fontsize.xsmallest,
    ...FONTS.medium,
    lineHeight: 24,
    color: COLORS.black2,
  },
  sendCashWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    // marginBottom: getBottomSpace() + 20,
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
  transactionSuccessText: {
    ...fontsize.small,
    ...FONTS.regular,
    color: COLORS.blue9,
  },

  //Choose amount to send modal
  chooseAmountHeader: {
    textAlign: "center",
    ...fontsize.smallest,
    ...FONTS.medium,
    color: COLORS.black2,
  },
  chooseAmountInputWrap: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: COLORS.grey2,
    borderRadius: 10,
    paddingHorizontal: 24,
    height: 56,
    marginTop: 25,
    marginBottom: 16,
  },
  textInputStyle: {
    height: "100%",
    paddingHorizontal: 12,
    flex: 1,
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
});
