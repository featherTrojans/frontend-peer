import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../../../constants";
import { Shadow } from "../../../../../constants/theme";

export const styles = StyleSheet.create({
  // Paybills Component

  paybillsInput: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.paybillInput,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  atSymbol: {
    ...fontsize.bsmall,
  },
  boundaryLine: {
    marginLeft: 15.5,
    marginRight: 16.5,
  },

  //   Airtime purchase

  headerText: {
    marginTop: 16,
    ...fontsize.bsmall,
    ...FONTS.regular,
    marginRight: 55,
  },

  // Selection type

  selectionTypeContainer: {
    position: "relative",
    marginTop: 30,
    ...Shadow,
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  selectionType: {
    ...fontsize.smallest,
    ...FONTS.regular,
    textAlign: "center",
  },
  animatedLine: {
    position: "absolute",
    height: 1.5,
    backgroundColor: COLORS.blue6,
    bottom: 0,
    left: 0,
  },
  inputsContainer: {
    marginTop: 40,
    minHeight: 400,
    flex: 1,
  },
});
