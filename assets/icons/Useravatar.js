import React from "react";
import Svg, { Path, Circle, G } from "react-native-svg";

function Useravatar() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="39"
      height="39"
      viewBox="0 0 39 39"
    >
      <G id="User" transform="translate(-1 -1)">
        <Circle
          id="Ellipse_161"
          data-name="Ellipse 161"
          cx="19.5"
          cy="19.5"
          r="19.5"
          transform="translate(1 1)"
          fill="#e6ecff"
        />
        <G
          id="Group_5825"
          data-name="Group 5825"
          transform="translate(4.845 6.661)"
        >
          <Path
            id="Path_6710"
            data-name="Path 6710"
            d="M38.416,45.847a19.541,19.541,0,0,0-31.3-.01,19.479,19.479,0,0,0,31.3.01Z"
            transform="translate(-7.112 -20.387)"
            fill="#003ad6"
          />
          <Circle
            id="Ellipse_162"
            data-name="Ellipse 162"
            cx="7.5"
            cy="7.5"
            r="7.5"
            transform="translate(8.155 0.339)"
            fill="#003ad6"
          />
        </G>
      </G>
    </Svg>
  );
}

export default Useravatar;
