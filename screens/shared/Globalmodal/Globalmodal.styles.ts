import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../constants";


export const styles = StyleSheet.create({
    container:{
        backgroundColor: COLORS.white,
        // alignItems: "center",
        paddingHorizontal: 25,
        paddingTop: 16,
        paddingBottom: 20,
        borderTopLeftRadius: 22,
        borderTopRightRadius: 22,
      },
      btnStyle:{
        height: 62,
        backgroundColor: COLORS.blue6,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
      },
      btnText:{
        ...fontsize.smallest,
        ...FONTS.bold,
        textTransform: "uppercase",
        color: COLORS.white,
      }
})
