import React from "react";
import Svg, { Path } from "react-native-svg";

function Tabhistory({ focused }) {
  const fill = focused ? "#fff" : "#bfbfbf";

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="21"
      viewBox="0 0 21 21"
    >
      <Path
        id="time-oclock"
        d="M10.5,0A10.5,10.5,0,1,0,21,10.5,10.5,10.5,0,0,0,10.5,0Zm0,12.25a1.745,1.745,0,0,1-.875-3.258V6.125a.875.875,0,1,1,1.75,0V8.992A1.745,1.745,0,0,1,10.5,12.25Z"
        fill={fill}
      />
    </Svg>
  );
}

export default Tabhistory;
