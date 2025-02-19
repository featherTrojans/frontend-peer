import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";


export const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
        top:0,
        bottom:0,
        right:0,
        left:0,
        zIndex:120,
        // backgroundColor: "rgba(255,255,255,0.7)"   
        // backgroundColor: "red"   
    },
    logoBg: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: COLORS.blue6,
        justifyContent: "center",
        alignItems: "center",
      }

})