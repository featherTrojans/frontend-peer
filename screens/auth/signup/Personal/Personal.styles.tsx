import { StyleSheet, Dimensions } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { COLORS, FONTS, fontsize, SIZES } from "../../../../constants";


export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: COLORS.white,
      paddingHorizontal: 25,
      paddingTop: RFValue(25),
    },
    header: {
      ...fontsize.big,
      ...FONTS.bold,
      color: COLORS.black,
    },
    topDots: {
      width: 5,
      height: 5,
      backgroundColor: COLORS.grey1,
      borderRadius: 16,
    },
    activeDot: {
      width: 12,
      height: 5,
      backgroundColor: COLORS.blue6,
      borderRadius: 4,
    },
    subText: { 
      color: COLORS.grey5, 
      ...fontsize.medium, 
      ...FONTS.regular 
    },
    proceedBtn: {
      backgroundColor: COLORS.blue6,
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 20,
      borderRadius: 5,
    },
    proceedText: {
      color: COLORS.white,
      ...fontsize.smallest,
      ...FONTS.medium,
    },
    bottomContainer:{
      flex: 1, 
      justifyContent: "flex-end", 
      // marginBottom: RFValue(80),
      marginTop: RFValue(40),

    },
    bottomTextContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginTop: RFValue(28),
    },
    bottomText: {
      ...fontsize.smallest,
      ...FONTS.regular,
      color: COLORS.blue9,
      alignItems: "center",
      justifyContent: "center",
    },

    errorContainer:{
      backgroundColor:"#E00000",
      paddingVertical: 18,
      paddingHorizontal: 24,
      borderRadius: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      position: "absolute",
      top:20,
      left:0,
      // width: Dimensions.get("screen").width,
      width: "100%",
      marginHorizontal:25,
      zIndex:1
    },
    errorText:{
      color: "#fff",
      fontSize: 14,
      maxWidth: 240,
      lineHeight:20
    }
  });