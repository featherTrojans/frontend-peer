import React from 'react'
import Svg, { Defs, G, Circle } from "react-native-svg"




function Pinlocation1() {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={181} height={181} {...props}>
    <Defs></Defs>
    <G data-name="Initial Pin" transform="translate(-127 -350)">
      <G transform="translate(127 350)" filter="url(#a)">
        <G
          data-name="Ellipse 14"
          transform="translate(60 64)"
          fill="#d2d9f7"
          stroke="rgba(62,100,255,0.5)"
          opacity={0.842}
        >
          <Circle cx={30.5} cy={30.5} r={30.5} stroke="none" />
          <Circle cx={30.5} cy={30.5} r={30} fill="none" />
        </G>
      </G>
      <G transform="translate(127 350)" filter="url(#b)">
        <Circle
          data-name="Ellipse 12"
          cx={12}
          cy={12}
          r={12}
          transform="translate(79 83)"
          fill="#fff"
        />
      </G>
      <Circle
        data-name="Ellipse 15"
        cx={6}
        cy={6}
        r={6}
        transform="translate(212 439)"
        fill="#3e64ff"
      />
    </G>
  </Svg>
  )
}

export default Pinlocation1