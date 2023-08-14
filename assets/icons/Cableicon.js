import React from "react";
import Svg, { Path } from "react-native-svg"

function Cableicon() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={12}
      height={13.5}
    >
      <Path
        fill="#25dba3"
        d="M10 2.667H7.6l1.533-1.533A.66.66 0 0 0 8.2.2L6 2.333 5.2 1a.637.637 0 0 0-.867-.267.738.738 0 0 0-.267.933l.6 1H2a1.964 1.964 0 0 0-2 2V10a1.964 1.964 0 0 0 2 2v.667a.63.63 0 0 0 .667.667.63.63 0 0 0 .667-.667V12h5.333v.667a.667.667 0 1 0 1.333 0V12a1.964 1.964 0 0 0 2-2V4.667a1.964 1.964 0 0 0-2-2Z"
      />
    </Svg>
  );
}

export default Cableicon;
