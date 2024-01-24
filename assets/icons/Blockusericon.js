import React from "react";
import Svg, { Path } from "react-native-svg";

function Blockusericon({color="#F50000"}) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={10} height={10}>
      <Path
        fill={color}
        d="M9.878 9.289 8.55 7.961a1.67 1.67 0 0 0 .617-1.294V2.5A1.668 1.668 0 0 0 7.5.833h-5a1.663 1.663 0 0 0-.847.231L.711.122a.417.417 0 0 0-.589.589l9.167 9.167a.417.417 0 0 0 .589-.589Zm-8.332-6a.417.417 0 0 0-.713.293v3.085A1.668 1.668 0 0 0 2.5 8.333h.74L4.5 9.392a.765.765 0 0 0 .5.193.724.724 0 0 0 .489-.185l.82-.663a.417.417 0 0 0 .034-.618Z"
      />
    </Svg>
  );
}

export default Blockusericon;
