import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  previewContainer: {
    width: "100%",
    height: "auto",
    // flex: 0.4,
    backgroundColor: COLORS.white,
    position: "absolute",
    bottom: 0,
    left: 0,
    paddingTop: 25,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  detailsContainer: {},
  detailsProfile: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  numberOfBadge: {
    ...fontsize.bmsmall,
    ...FONTS.bold,
    marginRight: 12,
    marginLeft: 8,
  },
  amountText: {
    ...fontsize.bsmall,
    ...FONTS.medium,
  },
  amountPrice: {
    ...fontsize.bsmall,
    ...FONTS.medium,
    marginTop: 6,
    marginBottom: 12,
  },
  amountBaseCharge: {
    ...fontsize.small,
    color: COLORS.blue6,
  },
  baseChargeNegotiate: {
    ...fontsize.small,
    ...FONTS.regular,
    fontStyle: "italic",
    color: COLORS.grey2,
  },
  meetupContainer: {
    marginTop: 22,
  },
  meetUpText: {
    ...fontsize.small,
    ...FONTS.regular,
  },
  meetupLocationContainer: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  locationText: {
    ...fontsize.bbsmall,
    ...FONTS.medium,
    marginLeft: 12,
  },

  ///Cancel Buttons
  bottomBtnContainer: {
    marginVertical: 20,
    flexDirection: "row",
  },
  bottomCancelBtn: {
    flex: 1,
    backgroundColor: COLORS.red1,
    borderRadius: 10,
    marginRight: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelText: {
    ...fontsize.smallest,
    ...FONTS.bold,
    color: COLORS.white,
  },
  blackBtn: {
    width: 62,
    height: 62,
    backgroundColor: COLORS.black,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },

  //Make Request button
  bottomMakeRequestBtn: {
    flex: 1,
    backgroundColor: COLORS.black,
    borderRadius: 10,
    marginRight: 14,
    paddingHorizontal: 10,
    alignItems: "center",
    flexDirection: "row",
    position: 'relative'
  },
  requestText: {
    ...fontsize.smallest,
    ...FONTS.bold,
    color: COLORS.white,
  },
  makeRequestCircle: {
    width: 40,
    height: 40,
    // marginRight: "90%",
    // flex: 1,
    backgroundColor: COLORS.green2,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 20,
  },

  //Receive payment buttons

  //Accept Request btn
  bottomAcceptBtn: {
    flex: 1,
    backgroundColor: COLORS.green1,
    borderRadius: 10,
    marginRight: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  depositAmountBaseCharge: {
    ...fontsize.small,
    color: COLORS.green1,
  },
  depositLocationText: {
    ...fontsize.bmsmall,
    ...FONTS.regular,
    marginLeft: 12,
    marginRight: 100,
  },
});
