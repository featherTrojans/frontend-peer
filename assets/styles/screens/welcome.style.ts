import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../constants";


export const WelcomeScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 25,
        paddingTop: 25,
      },
      welcomeTextContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 58,
        flex: .2
      },
      welcomeText: {
        color: COLORS.black,
        ...FONTS.bold,
        ...fontsize.big,
        textAlign: "center",
      },
      welcomeTextSub:{
        textAlign: "center",
        color: COLORS.black,
        ...FONTS.regular
      },
      lineBg: {
        marginHorizontal: 82,
        backgroundColor: COLORS.animatedLine,
        height: 3.5,
        borderRadius: 3.5,
        // marginBottom: RFValue(127),
        // marginTop: RFValue(127),
      },
      line: {
        backgroundColor: COLORS.blue6,
        height: 3.5,
        borderRadius: 3.5,
      },
      getStartedContainer: {
        paddingHorizontal: 30,
        // marginBottom: RFValue(112),
        flex: .3,
  
      },
      getStartedText: {
        ...fontsize.bsmall,
        ...FONTS.regular,
        textAlign: "center",
      },
})