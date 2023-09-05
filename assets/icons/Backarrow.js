import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Svg, { G, Path } from "react-native-svg";

function Backarrow({ invert = false }) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
      <Svg xmlns="http://www.w3.org/2000/svg" width={8.289} height={7.1}>
        <Path
          d="M7.7 2.961H1.776l1.948-1.948a.593.593 0 0 0-.835-.841L.349 2.718A1.184 1.184 0 0 0 0 3.553a1.184 1.184 0 0 0 .349.829l2.54 2.546a.593.593 0 1 0 .835-.841L1.776 4.145H7.7a.592.592 0 1 0 0-1.184Z"
          fill={invert ? "#fff":"#000"}
        />
      </Svg>
    </TouchableOpacity>
  );
}

export default Backarrow;
