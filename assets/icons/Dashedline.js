import React from 'react'
import Svg, { G, Path, Circle } from "react-native-svg"




function Dashedline() {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={98.5} height={21} >
    <G data-name="Group 6217">
      <Path
        data-name="Path 6854"
        d="M.25 10.5h98"
        fill="none"
        stroke="#707070"
        strokeLinecap="round"
        strokeWidth={0.5}
        strokeDasharray="2 6"
      />
      <G data-name="Group 6216" transform="translate(-65.146 -22)">
        <Circle
          data-name="Ellipse 200"
          cx={10.5}
          cy={10.5}
          r={10.5}
          transform="translate(103.896 22)"
          fill="#00c9aa"
        />
        <Path
          data-name="Icon feather-check"
          d="m117.747 29.5-5.051 5.054-2.3-2.297"
          fill="none"
          stroke="#fff"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
        />
      </G>
    </G>
  </Svg>
  )
}

export default Dashedline