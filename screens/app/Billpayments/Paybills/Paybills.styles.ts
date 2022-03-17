import { StyleSheet } from "react-native";
import { COLORS, FONTS, fontsize } from "../../../../constants";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginTop: 16,
    marginHorizontal: 15,
  },
  eachContainer:{
      paddingLeft: 23, 
      paddingRight: 30, 
      paddingTop: 34, 
      paddingBottom: 32, 
      marginBottom: 15,
      borderRadius: 8
    },
    topRow:{ 
        marginBottom: 40, 
        flexDirection: 'row', 
        justifyContent: 'space-between' 
    },
  headers: {
    ...fontsize.bsmall,
    ...FONTS.medium,
    lineHeight: 22,
  },
  headerInfo:{
      ...fontsize.small, 
      ...FONTS.regular, 
      lineHeight: 21, 
      color: COLORS.grey2
    }
});
