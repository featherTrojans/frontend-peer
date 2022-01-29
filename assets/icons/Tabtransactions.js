import React from "react";
import Svg, { Path } from "react-native-svg";

function Tabtransactions({ focused }) {
  const fill = focused ? "#fff" : "#bfbfbf";
  return (
    <Svg
      id="credit-card_2_"
      data-name="credit-card (2)"
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="15.75"
      viewBox="0 0 21 15.75"
    >
      <Path
        id="Path_5851"
        data-name="Path 5851"
        d="M16.625,3H4.375A4.38,4.38,0,0,0,0,7.375H21A4.38,4.38,0,0,0,16.625,3Z"
        transform="translate(0 -3)"
        fill={fill}
      />
      <Path
        id="Path_5852"
        data-name="Path 5852"
        d="M0,15.25a4.38,4.38,0,0,0,4.375,4.375h12.25A4.38,4.38,0,0,0,21,15.25V10H0Zm6.125-.437A1.312,1.312,0,1,1,4.813,13.5a1.312,1.312,0,0,1,1.312,1.312"
        transform="translate(0 -3.875)"
        fill={fill}
      />
    </Svg>
  );
}

export default Tabtransactions;
