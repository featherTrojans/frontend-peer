import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants";

export const FTBackheaderStyles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingVertical: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      },
      backArrowContainer: {
        justifyContent: "center",
        alignItems: "center",
        width: 45,
        height: 45,
        borderRadius: 45 / 2,
        borderWidth: 1,
        borderColor: COLORS.black,
    
      },
})