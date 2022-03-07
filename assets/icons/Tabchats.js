import React from "react";
import Svg, { Path, G } from "react-native-svg";

function Tabchats({ focused }) {
  const fill = focused ? "#003AD6" : "#000000";


  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={21}
  >
    <G data-name="comment (7)">
      <Path
        data-name="Path 6790"
        d="M16.976 7.973a8.5 8.5 0 1 0-8.475 9.02h4.939a3.54 3.54 0 0 0 3.536-3.537Zm-1.415 5.484a2.122 2.122 0 0 1-2.122 2.122H8.501a7.1 7.1 0 0 1-5.288-2.365 7.015 7.015 0 0 1-1.752-5.527 7.1 7.1 0 0 1 6.122-6.2 7.472 7.472 0 0 1 .918-.054 7.017 7.017 0 0 1 4.512 1.627 7.1 7.1 0 0 1 2.548 4.98Z"
        fill={fill}
      />
      <Path
        data-name="Path 6791"
        d="M5.659 6.384h2.829a.708.708 0 0 0 0-1.415H5.659a.708.708 0 0 0 0 1.415Z"
        fill={fill}
      />
      <Path
        data-name="Path 6792"
        d="M11.318 7.798H5.659a.708.708 0 0 0 0 1.415h5.658a.708.708 0 0 0 0-1.415Z"
        fill={fill}
      />
      <Path
        data-name="Path 6793"
        d="M11.318 10.627H5.659a.708.708 0 0 0 0 1.415h5.658a.708.708 0 0 0 0-1.415Z"
        fill={fill}
      />
    </G>
  </Svg>
);
}

export default Tabchats;
