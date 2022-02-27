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
  imageBorder: {
    width: 55,
    height: 55,
    borderColor: COLORS.black,
    borderWidth: 1,
    borderRadius: 30,
    padding: 2,
  },
  profileName: {
    ...fontsize.bsmall,
    ...FONTS.medium,
    color: COLORS.black,
    marginBottom: 3,
  },
  distanceDuration: {
    ...fontsize.small,
    ...FONTS.regular,
  },
  numberOfBadge: {
    ...fontsize.bmsmall,
    ...FONTS.bold,
    marginRight: 12
  },
  amountText: {
    ...fontsize.bsmall,
    ...FONTS.medium,
  },
  amountPrice:{
    ...fontsize.bsmall,
    ...FONTS.medium,
    marginTop: 6,
    marginBottom: 12,
  },
  amountBaseCharge:{ 
      ...fontsize.small, 
      color: COLORS.blue6 
    },
    baseChargeNegotiate:{
        ...fontsize.small,
        ...FONTS.regular,
        fontStyle: "italic",
        color: COLORS.grey2,
      }
});
