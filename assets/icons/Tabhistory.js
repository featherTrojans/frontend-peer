import React from "react";
import Svg, { Path } from "react-native-svg";

function Tabhistory({ focused }) {
  const fill = focused ? "#003AD6" : "#000000";

  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={21}
  >
    <Path
      data-name="Path 6789"
      d="M13.439 1.415h-.707V.707a.708.708 0 1 0-1.415 0v.707H5.658V.707a.708.708 0 1 0-1.415 0v.707h-.707A3.541 3.541 0 0 0 0 4.951v8.488a3.541 3.541 0 0 0 3.536 3.537h9.9a3.541 3.541 0 0 0 3.536-3.537V4.951a3.541 3.541 0 0 0-3.533-3.536ZM1.415 4.951a2.122 2.122 0 0 1 2.121-2.122h9.9a2.122 2.122 0 0 1 2.124 2.122v.707H1.415Zm12.024 10.61h-9.9a2.122 2.122 0 0 1-2.122-2.122V7.073H15.56v6.366a2.122 2.122 0 0 1-2.121 2.122Z" fill={fill}
    />
  </Svg>
  );
}

export default Tabhistory;
