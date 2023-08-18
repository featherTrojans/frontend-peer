import React from 'react'
import Svg, { G, Text, TSpan, Path } from "react-native-svg"

function Nairaicon() {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={23} height={25} >
    <G fill="#fff" data-name="Group 7215">
      <Text
        fontFamily="Helvetica"
        fontSize={25}
        letterSpacing="-.01em"
        transform="translate(12 19)"
      >
        <TSpan x={-9.027} y={0}>
          {"N"}
        </TSpan>
      </Text>
      <G data-name="Group 7214">
        <Path d="M0 12h23v3H0z" data-name="Rectangle 1121" />
        <Path d="M0 7h23v3H0z" data-name="Rectangle 1122" />
      </G>
    </G>
  </Svg>
  )
}

export default Nairaicon