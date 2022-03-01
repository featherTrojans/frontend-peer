import * as React from "react";
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  G,
  Rect,
  Path,
} from "react-native-svg";

const Trendingupright = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={29.5} height={29.5}>
    <Defs>
      <LinearGradient
        id="a"
        x1={0.51}
        y1={-0.006}
        x2={0.49}
        y2={1.006}
        gradientUnits="objectBoundingBox"
      >
        <Stop offset={0} stopColor="#09c6f9" />
        <Stop offset={1} stopColor="#045de9" />
      </LinearGradient>
    </Defs>
    <G data-name="trend up right" transform="translate(-1.25 -1.25)">
      <Rect
        data-name="Rectangle 987"
        width={29.5}
        height={29.5}
        rx={4.95}
        transform="translate(1.25 1.25)"
        fill="url(#a)"
      />
      <Path
        data-name="Path 6762"
        d="M20.447 10.407 17.4 15.25h-6.747l-2.368 7.525 1.43.45 2.038-6.475h6.474l3.432-5.45.606 2.97 1.47-.3-1.141-5.59-5.317 1.214.335 1.462Z"
        fill="#fff"
        fillRule="evenodd"
      />
    </G>
  </Svg>
);

export default Trendingupright;
