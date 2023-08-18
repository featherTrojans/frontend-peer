import React from "react";
import Svg, { Path } from "react-native-svg";

function Keyboarddeleteicon({ fill }) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={18}
      height={18}
      viewBox="0 0 24 24"
    >
      <Path
        fill="none"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Zm-2 4-6 6m0-6 6 6"
      />
    </Svg>
  );
}

export default Keyboarddeleteicon;
