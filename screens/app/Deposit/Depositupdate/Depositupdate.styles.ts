import { StyleSheet } from "react-native";
import { COLORS, fontsize, FONTS } from "../../../../constants";
import { Shadow } from "../../../../constants/theme";


export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    // paddingHorizontal: 15,
  },
  contentContainer: {
    paddingTop: 20,
    paddingBottom: 14,
    // paddingLeft: 20,
    // paddingRight: 16,
    marginHorizontal: 15,
    // paddingHorizontal: 15,
    paddingLeft: 20, 
    paddingRight: 18,
    // backgroundColor: COLORS.white,
    marginTop: 20,
    marginBottom: 10,
    ...Shadow
    
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  lastAmountText: {
    ...fontsize.small,
    ...FONTS.medium,
    marginBottom: 7,
  },
  updatedTimeText: {
    ...fontsize.smallest,
    ...FONTS.regular,
  },
  lastAmountPrice: {
    ...fontsize.small,
    ...FONTS.bold,
  },
  horizontalLine: {
    height: 0.5,
    backgroundColor: COLORS.borderColor2,
    marginTop: 25,
    marginBottom: 20,
  },
  locationIconandText: {
    flexDirection: "row",
    marginBottom: 22,
  },
  location: {
    marginLeft: 22,
    ...fontsize.small,
    ...FONTS.regular,
  },
  expirationContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  expirationText: {
    ...fontsize.small,
    ...FONTS.regular,
    color: COLORS.grey2,
  },
  updateText: {
    backgroundColor: COLORS.blue6,
    ...fontsize.small,
    ...FONTS.medium,
    paddingVertical: 8,
    paddingHorizontal: 16,
    color: COLORS.white,
    borderRadius: 27,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconAndTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconTitle: {
    marginLeft: 21,
    ...fontsize.bmsmall,
    ...FONTS.medium,
  },
  iconValue: {
    ...fontsize.small,
    ...FONTS.medium,
  },
  bottomBtn:{
    backgroundColor: COLORS.white,
    // height: 70,
    
    borderRadius: 15,
    marginVertical: 25,
    marginHorizontal: 15,
    paddingLeft: 20,
    paddingRight: 30,
    paddingVertical: 16,
    alignItems: "center",
    flexDirection: "row",
    borderColor: COLORS.grey11,
    borderWidth: 1,
    justifyContent: "space-between",
    
    
  },
  eyeiconBg:{
    width: 38,
    height: 38,
    backgroundColor: COLORS.blue6,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  viewRequestText:{
    ...fontsize.smaller,
    ...FONTS.medium,
    marginLeft: 18,
    color: COLORS.black,
  },
  emptyListContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 38
  },
  emptyListText: {
    textAlign: "center",
    paddingHorizontal: 50,
    ...fontsize.small,
    ...FONTS.regular,
  },
});
