import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Svg, { G, Path } from "react-native-svg";

function Backarrow() {
  const navigation = useNavigation();
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.goBack()}>
      <Svg xmlns="http://www.w3.org/2000/svg" width={14} height={11.991}>
        <Path
          d="M13 5.001H3l3.29-3.29A1 1 0 0 0 4.88.291l-4.29 4.3A2 2 0 0 0 0 6.001a2 2 0 0 0 .59 1.4l4.29 4.3a1 1 0 1 0 1.41-1.42L3 7.001h10a1 1 0 0 0 0-2Z"
          fill="#1f1f41"
        />
      </Svg>
    </TouchableOpacity>
  );
}

export default Backarrow;
