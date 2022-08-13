import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../constants";
import { getBottomSpace } from 'react-native-iphone-x-helper'

export const styles = StyleSheet.create({
    container:{
        backgroundColor: COLORS.white,
        paddingBottom: getBottomSpace()+20,
        paddingHorizontal: 15,
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
