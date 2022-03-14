import React from "react";
import {TouchableOpacity} from "react-native"
import { useNavigation } from '@react-navigation/native';
import Svg, { G, Path } from "react-native-svg";

function Backarrow() {
  // const navigation = useNavigation()
  return (
    
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width="9.648"
        height="17.296"
        viewBox="0 0 9.648 17.296"
        >
        <G
          id="Icon_feather-arrow-right"
          data-name="Icon feather-arrow-right"
          transform="translate(1 1.414)"
          >
          <Path
            id="Path_3975"
            data-name="Path 3975"
            d="M25.234,7.5,18,14.734l7.234,7.234"
            transform="translate(-18 -7.5)"
            fill="none"
            stroke="#000"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
          />
        </G>
      </Svg>

  );
}

export default Backarrow;
