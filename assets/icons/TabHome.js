import React from "react";
import Svg, { Path, G } from "react-native-svg";

function TabHome({ focused }) {
  const fill = focused ? "#003AD6" : "#bfbfbf";
  return (
    <Svg
      id="home_1_"
      data-name="home (1)"
      xmlns="http://www.w3.org/2000/svg"
      width="15.149"
      height="15.139"
      viewBox="0 0 15.149 15.139"
    >
      <Path
        id="Path_5848"
        data-name="Path 5848"
        d="M193.894,319.841A1.894,1.894,0,0,0,192,321.735v3.787h3.787v-3.787A1.894,1.894,0,0,0,193.894,319.841Z"
        transform="translate(-186.319 -310.383)"
        fill={fill}
      />
      <G id="Group_4998" data-name="Group 4998">
        <Path
          id="Path_5849"
          data-name="Path 5849"
          d="M10.73,11.512V15.3h2.525a1.894,1.894,0,0,0,1.894-1.894V7.648a1.262,1.262,0,0,0-.355-.879L9.429.971A2.525,2.525,0,0,0,5.862.83q-.073.067-.14.14L.367,6.768A1.262,1.262,0,0,0,0,7.658v5.748A1.894,1.894,0,0,0,1.894,15.3H4.418V11.512a3.156,3.156,0,1,1,6.312,0Z"
          transform="translate(0 -0.16)"
          fill={fill}
        />
        <Path
          id="Path_5850"
          data-name="Path 5850"
          d="M193.894,319.841A1.894,1.894,0,0,0,192,321.735v3.787h3.787v-3.787A1.894,1.894,0,0,0,193.894,319.841Z"
          transform="translate(-186.319 -310.383)"
          fill={fill}
        />
      </G>
    </Svg>
  );
}

export default TabHome;
