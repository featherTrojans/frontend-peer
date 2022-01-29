import React from "react";
import Svg, { Path } from "react-native-svg";

function Deposit() {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width="17.5"
      height="15.75"
      viewBox="0 0 17.5 15.75"
    >
      <Path
        id="top-up"
        d="M19.5,3.875V4.75H4.625a.875.875,0,0,0,0,1.75h14a.875.875,0,0,1,.875.875V17a1.75,1.75,0,0,1-1.75,1.75H11.625V12.987l1.131,1.131a.875.875,0,1,0,1.237-1.237l-2.625-2.625a.875.875,0,0,0-1.239,0L7.5,12.881a.875.875,0,1,0,1.237,1.237l1.133-1.131V18.75H3.75A1.75,1.75,0,0,1,2,17V4.75A1.75,1.75,0,0,1,3.75,3H18.625a.875.875,0,0,1,.875.875Z"
        transform="translate(-2 -3)"
        fill="#fff"
      />
    </Svg>
  );
}

export default Deposit;
