import React from "react";
import Svg, { G, Circle, Path } from "react-native-svg";

function Maintenancefeeicon() {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={21.5} height={21.5}>
      <G
        fill="none"
        stroke="#ff9d00"
        strokeWidth={1.5}
        data-name="Group 11657"
        transform="translate(-1.25 -1.25)"
      >
        <Circle
          cx={10}
          cy={10}
          r={10}
          data-name="Ellipse 326"
          transform="translate(2 2)"
        />
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16.583 9.667A5.068 5.068 0 0 0 11.988 7 4.825 4.825 0 0 0 7 11"
          data-name="Path 10096"
        />
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.494 9.722H16.4a.6.6 0 0 0 .6-.6V7.5m-9.583 6.167A5.027 5.027 0 0 0 12.012 17 5.241 5.241 0 0 0 17 12"
          data-name="Path 10097"
        />
        <Path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9.506 13.622H7.6a.6.6 0 0 0-.6.6V16.4"
          data-name="Path 10098"
        />
      </G>
    </Svg>
  );
}

export default Maintenancefeeicon;
