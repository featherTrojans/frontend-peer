import React from "react";
import Svg, { G, Path, Circle, Ellipse, Rect } from "react-native-svg";

function Dollaricon() {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={30.431} height={21}>
      <G data-name="cash (1)" transform="translate(-1 -10.126)">
        <Path
          data-name="Path 7139"
          d="M17.789 29.966h13.117a.525.525 0 0 0 .525-.525V11.603a.525.525 0 0 0-.525-.525H1.525a.525.525 0 0 0-.525.525v17.838a.525.525 0 0 0 .525.525Z"
          fill="#63a63d"
        />
        <Path
          data-name="Path 7140"
          d="M17.79 13.177h8.931a.525.525 0 0 1 .525.5c.121 2.861 1.278 3.817 1.816 4.108a.52.52 0 0 1 .272.459v4.561a.52.52 0 0 1-.272.459c-.538.291-1.7 1.247-1.816 4.108a.525.525 0 0 1-.525.5H5.71a.525.525 0 0 1-.525-.5c-.121-2.861-1.278-3.817-1.816-4.108a.52.52 0 0 1-.27-.461v-4.561a.52.52 0 0 1 .272-.459c.538-.291 1.7-1.247 1.816-4.108a.525.525 0 0 1 .525-.5Z"
          fill="#89d461"
        />
        <G
          data-name="Group 6488"
          transform="translate(5.694 16.073)"
          fill="#63a63d"
        >
          <Path
            data-name="Path 7141"
            d="M8.947 0a4.718 4.718 0 0 0 0 8.9h3.152a4.718 4.718 0 0 0 0-8.9Z"
          />
          <Circle
            data-name="Ellipse 233"
            cx={1.5}
            cy={1.5}
            r={1.5}
            transform="translate(.306 2.053)"
          />
          <Ellipse
            data-name="Ellipse 234"
            cx={1}
            cy={1.5}
            rx={1}
            ry={1.5}
            transform="translate(18.306 2.053)"
          />
        </G>
        <Rect
          data-name="Rectangle 1047"
          width={3}
          height={21}
          rx={1.5}
          transform="translate(15 10.126)"
          fill="#efc43c"
        />
      </G>
    </Svg>
  );
}

export default Dollaricon;
