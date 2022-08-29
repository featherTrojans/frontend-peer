import React from 'react'
import Svg, { G, Circle, Path } from "react-native-svg"


function Greencheckicon() {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={21} height={21} >
    <G data-name="Group 6216" transform="translate(-103.896 -22)">
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
  </Svg>
  )
}

export default Greencheckicon