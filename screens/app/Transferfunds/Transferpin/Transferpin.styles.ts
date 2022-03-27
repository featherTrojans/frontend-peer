import { StyleSheet } from "react-native";
import { COLORS, fontsize, FONTS } from "../../../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    // paddingHorizontal: 25,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: 25,
  },
  backArrowConteiner: {
    marginVertical: 20,
  },
  descriptionContainer: {
    marginHorizontal: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  descriptionText: {
    textAlign: "center",
    ...fontsize.bsmall,
    ...FONTS.medium,
    lineHeight: 25,
    color: COLORS.black,
    marginBottom: 15,
  },
  descriptionSubText: {
    ...FONTS.bold,
    color: COLORS.blue6,
  },
  enterPinText: {
    ...fontsize.bsmall,
    ...FONTS.medium,
    color: COLORS.blue6,
  },

  numberBtnContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
  },
  pinContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 48,
    marginBottom: 65,
  },
  pinInputContainer: {
    width: 252,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pinView: {
    width: 50,
    height: 60,
    borderColor: COLORS.blue7,
    borderWidth: 1,
    borderRadius: 13,
    paddingHorizontal: 15,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  ///Deposit pin screen

  transactionSubHeader: {
    textAlign: "center",
    marginHorizontal: 40,
    //  marginVertical: 40,
    marginTop: 24,
    marginBottom: 45,
    ...fontsize.bsmall,
    ...FONTS.regular,
  },
});
