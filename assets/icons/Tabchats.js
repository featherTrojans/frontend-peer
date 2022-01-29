import React from "react";
import Svg, { Path } from "react-native-svg";

function Tabchats({ focused }) {
  const fill = focused ? "#fff" : "#bfbfbf";

  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="18.732"
      height="18.75"
      viewBox="0 0 18.732 18.75"
    >
      <Path
        id="comment_5_"
        data-name="comment (5)"
        d="M15.373,2.154A9.374,9.374,0,1,0,9.392,18.747h5.454a3.91,3.91,0,0,0,3.906-3.906V8.784a9.408,9.408,0,0,0-3.378-6.63ZM6.253,5.467H9.378a.781.781,0,0,1,0,1.562H6.253a.781.781,0,0,1,0-1.562ZM12.5,13.279H6.253a.781.781,0,1,1,0-1.562H12.5a.781.781,0,1,1,0,1.562Zm0-3.125H6.253a.781.781,0,1,1,0-1.562H12.5a.781.781,0,1,1,0,1.562Z"
        transform="translate(-0.02 0.003)"
        fill={fill}
      />
    </Svg>
  );
}

export default Tabchats;
