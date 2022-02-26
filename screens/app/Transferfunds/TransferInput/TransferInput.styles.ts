import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../../constants";





export const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor:"gray",
        backgroundColor: COLORS.white,
        paddingHorizontal: 15,
        marginVertical:20
    },
    numberBtn: {
        width: 60,
        height: 60,
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: COLORS.grey1,
        borderRadius: 50,
        marginHorizontal: 20,
        marginVertical: 10,
      },
      numberBtnContainer: {
        // flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        marginBottom: 30,
      },
      btnBg: {
        paddingTop: 22,
        paddingBottom: 24,
        backgroundColor: COLORS.blue6,
        alignSelf: "stretch",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        width:"100%"
      },
      btnText: {
        color: COLORS.white,
        textTransform: "uppercase",
        ...fontsize.smallest,
        ...FONTS.bold,
      },
      amountcont:{
          borderBottomColor: "#707070",
          borderBottomWidth: 1,
          paddingVertical: 15,
          width: "70%",
          
      },
      amounttxt:{
          ...fontsize.bmedium
      }
})