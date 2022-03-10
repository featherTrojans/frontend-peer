import React from 'react'
import Svg, { Defs, G, Circle } from "react-native-svg"

function Pinlocation2() {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={84} height={84} {...props}>
    <Defs></Defs>
    <G data-name="End Pin" transform="translate(-255 -131)">
      <G transform="translate(255 131)" filter="url(#a)">
        <Circle
          data-name="Ellipse 16"
          cx={12}
          cy={12}
          r={12}
          transform="translate(30 30)"
          fill="#fff"
        />
      </G>
      <Circle
        data-name="Ellipse 17"
        cx={4}
        cy={4}
        r={4}
        transform="translate(293 169)"
        fill="#3e64ff"
      />
    </G>
  </Svg>
  )
}

export default Pinlocation2