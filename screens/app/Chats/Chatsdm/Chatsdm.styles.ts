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
    paddingTop: 10,
    paddingBottom: 10,
    // paddingHorizontal: 22,
    paddingRight: 30,
    backgroundColor: COLORS.white,
  },
  headerDetailsContainer: {
    flexDirection: "row",
    marginLeft: 5,
    alignItems: "center",
  },
  chatName: {
    flex: 1,
    ...fontsize.smaller,
    ...FONTS.medium,
    color: COLORS.grey7,
    lineHeight: 21,
    textTransform: "capitalize",
    marginLeft: 12
  },
  chatStatusContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },
  chatStatusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.blue6,
    marginRight: 6,
  },
  chatStatusText: {
    color: COLORS.blue6,
    ...fontsize.small,
    ...FONTS.regular,
  },
  messageAreaContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  chatTextContainer: {
    position: "relative",
  },
  inputarea: {
    // paddingHorizontal: 20,
  },
  chatTextInput: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    // shadowColor: "#aaa",
    // shadowOffset: {
    //   width: 0,
    //   height: 1,
    // },
    // shadowOpacity: 0.22,
    // shadowRadius: 2,
    // elevation: 3,
    flexDirection: "row",
    alignItems: "center",
    // marginBottom: 20,
    borderWidth: 1,
    borderColor: COLORS.grey1
  },
  textinput: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 3,
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
    color: "#8456FF",
    ...fontsize.smallest,
    ...FONTS.regular,
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
    alignItems: "center"
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
    textAlign: "center"
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

