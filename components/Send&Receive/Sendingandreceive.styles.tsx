import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { COLORS } from "../../constants";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    // marginBottom: 18,
    marginBottom: RFValue(26),
    marginTop: RFValue(42),
  },
  arrowContainer: {
    marginHorizontal: RFValue(30),
  },
  badgeImage: {
    position: "absolute",
    left: -10,
  },

  ///Show Images styles


  typeContainer: {
    width: RFValue(62),
    height: RFValue(62),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: RFValue(62 / 2),
    // backgroundColor: "#001757",
  },
  imageStyle: {
    width: "50%",
    height: "50%",
  },


});
