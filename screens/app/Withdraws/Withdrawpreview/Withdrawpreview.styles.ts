import { saveToLibraryAsync } from "expo-media-library";
import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
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
    paddingTop: RFValue(25),
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
    marginTop: RFValue(6),
    marginBottom: RFValue(12),
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
    marginTop: RFValue(46),
    marginBottom: RFValue(56)
  },
  meetUpText: {
    ...fontsize.small,
    ...FONTS.regular,
  },
  meetupLocationContainer: {
    marginTop: RFValue(20),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  locationText: {
    ...fontsize.bbsmall,
    ...FONTS.medium,
    marginLeft: RFValue(12),
  },

  ///Cancel Buttons
  bottomBtnContainer: {
    marginVertical: RFValue(20),
    flexDirection: "row",
  },
  bottomCancelBtn: {
    flex: 1,
    backgroundColor: COLORS.red1,
    borderRadius: 10,
    marginRight: RFValue(14),
    justifyContent: "center",
    alignItems: "center",
  },
  cancelText: {
    ...fontsize.smallest,
    ...FONTS.bold,
    color: COLORS.white,
  },
  blackBtn: {
    width: RFValue(62),
    height: RFValue(62),
    backgroundColor: COLORS.black,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: RFValue(14)
  },

  //Make Request button
  bottomMakeRequestBtn: {
    // flex: 1,

    // Will still set it back to flex
    // width: 300, 
    // height: 62,
    // paddingHorizontal: 10,

    backgroundColor: COLORS.green2,
    borderRadius: 10, 
    marginRight: 14,
    alignItems: "center",
    // flexDirection: "row",
    justifyContent: "center",
    position: 'relative'
  },
  requestText: { 
    textAlign: "center",
    ...fontsize.smallest,
    ...FONTS.bold,
    color: COLORS.white,
  },
  makeRequestCircle: {
    width: RFValue(40),
    height: RFValue(40),
    borderRadius: RFValue(20),
    justifyContent: "center",
    alignItems: "center",
    // marginRight: "90%",
    // flex: 1,

    backgroundColor: COLORS.white,
    zIndex: 20,
    position: 'absolute',
    left: 10
  },



  //Receive payment buttons

  //Accept Request btn
  bottomAcceptBtn: {
    flex: 1,
    backgroundColor: COLORS.green1,
    borderRadius: 10,
    marginRight: RFValue(14),
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
    marginRight: RFValue(100),
  },
});
