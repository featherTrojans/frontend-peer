import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../constants";



export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"gray",
        // backgroundColor: COLORS.white,
        paddingHorizontal: 15
    },
    subHeader: {
        ...fontsize.bsmall,
        ...FONTS.medium
    },
    body:{
        justifyContent: "center",
        flex: 1, 
        paddingHorizontal: 15,
        alignItems: "center" 
    },
    bodytext:{
        ...fontsize.bsmall,
        textAlign: "center",
        maxWidth: 259,
        lineHeight: 22
    },
    btnBg: {
        paddingTop: 22,
        paddingBottom: 24,
        backgroundColor: COLORS.blue6,
        alignSelf: "stretch",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
      },
      btnText: {
        color: COLORS.white,
        textTransform: "uppercase",
        ...fontsize.smallest,
        ...FONTS.bold,
      },
      //DEPOSIT NOT EMPTY
      update:{
          marginTop: 15,
          paddingHorizontal: 15,
          backgroundColor:"#fff",
          
        },
        update__amount:{
          paddingVertical: 19,
          flexDirection:"row",
          borderBottomColor:"#707070",
          borderBottomWidth: 1,
      },
      update__amounttext:{
          flex: 1,
          marginHorizontal:23
      },
      amt:{
          ...fontsize.small,
          color: "#000",
          ...FONTS.bold
      },
      location:{
        paddingVertical: 19,
      },
      location__place:{
          flexDirection:"row",
          marginBottom: 20
      },
      location__text:{
          marginLeft: 20
      },
      expiresbox:{
          flexDirection:"row",    
          justifyContent: "space-between"
      },
      expires:{
          color: "#707070",
          ...fontsize.small,
          ...FONTS.regular
      },
      expires__btn:{
        paddingHorizontal: 18,
        paddingVertical: 8,
        backgroundColor: COLORS.blue6,
        borderRadius: 27,
    },
    expires__text:{
        color: COLORS.white,
        textTransform: "uppercase",
        ...fontsize.small,
        ...FONTS.medium,
      }
})
