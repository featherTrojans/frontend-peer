import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { COLORS, FONTS, fontsize, SIZES } from "../../../constants";


export const styles = StyleSheet.create({
    container: {
      flex: 1,
      // height: SIZES.height,
      paddingHorizontal: 25,
      paddingTop: RFValue(25),
      backgroundColor: COLORS.white,
    },
    headerText: {
      ...fontsize.big,
      ...FONTS.bold,
      color: COLORS.blue6,
    },
    setupText: {
      ...fontsize.bsmall,
      ...FONTS.regular,
      color: COLORS.grey2,
    },
    laterBtn: {
      ...fontsize.smallest,
      ...FONTS.bold,
      color: COLORS.blue7,
      textAlign: "center",
    },
    continueBtn: {
      height: RFValue(62),
      backgroundColor: COLORS.blue6,
      borderRadius: RFValue(10),
      justifyContent: "center",
      alignItems: "center",
      marginBottom: RFValue(80),
    },
    continueText: {
      ...fontsize.smallest,
      ...FONTS.bold,
      color: COLORS.white,
    },
    namecont:{
      flexDirection: "row",
      marginLeft: 20,
      alignItems:"center"
    },
    name:{
      color: "#0034CB",
      marginLeft: 10
    }
  });
  