import React from "react";
import Svg, { G, Circle, Path } from "react-native-svg";

function Erroricon() {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={73} height={73}>
      <G data-name="Group 11626">
        <G data-name="Group 11625" transform="translate(.242 .242)">
          <Circle
            cx={36.5}
            cy={36.5}
            r={36.5}
            fill="#fdf3f7"
            data-name="Ellipse 323"
            transform="translate(-.242 -.242)"
          />
          <Circle
            cx={17.5}
            cy={17.5}
            r={17.5}
            fill="#e00070"
            data-name="Ellipse 322"
            transform="translate(18.758 18.758)"
          />
          <Path
            fill="none"
            stroke="#fff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="m32.258 39.633 3.688-3.688m3.688-3.688-3.689 3.688m0 0-3.687-3.689m3.688 3.688 3.688 3.688"
            data-name="Path 10093"
          />
        </G>
      </G>
    </Svg>
  );
}

export default Erroricon;
