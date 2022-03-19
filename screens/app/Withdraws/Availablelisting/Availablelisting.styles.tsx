import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../../constants";

export const styles = StyleSheet.create({
  isActive: {
    backgroundColor: COLORS.blue6,
  },
  isActiveColor: {
    color: COLORS.white,
  },
  imageContainer: {
    flex: 1,
    paddingHorizontal: 15,
    paddingTop: 35,
  },
  listingTypeContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  typeBg: {
    paddingTop: 15,
    paddingBottom: 18,
    paddingRight: 23,
    paddingLeft: 21,
    borderRadius: 27,
  },
  typeText: {
    color: COLORS.grey2,
    ...fontsize.bsmall,
    textTransform: "capitalize",
  },
  //   Single user styling

  userContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 14,
    paddingRight: 20,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15
  },
  detailsContainer: {
    flexDirection: "row",
  },
  infoContainer: {
    marginLeft: 15,
  },
  userName: {
    color: COLORS.black,
    ...fontsize.bsmall,
    ...FONTS.medium,
  },
  otherInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  distance: {
    color: COLORS.grey2,
    ...fontsize.small,
    ...FONTS.regular,
  },
  smallDot: {
    marginLeft: 8,
    marginRight: 10,
    width: 7,
    height: 7,
    borderRadius: 7,
    backgroundColor: COLORS.blue7,
  },
  numberOfBadges: {
    color: COLORS.blue6,
    ...fontsize.small,
    ...FONTS.medium,
  },


  listingType:{
    ...fontsize.bxmedium,
    ...FONTS.bold,
    // marginBottom: 23
  },
  listingTypeInfo:{
    ...fontsize.small,
    ...FONTS.regular,
    lineHeight: 23
  },
  listingTypesText:{
    ...fontsize.small, ...FONTS.medium,
    color: COLORS.grey2,
    marginBottom: 10.5,
    textTransform: 'capitalize'
  }
});
