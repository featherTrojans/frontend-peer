import React from 'react'
import Svg, { Text, TSpan } from "react-native-svg"

function Aticon() {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={16} height={15} >
    <Text
      data-name="@"
      transform="translate(0 12)"
      fill="#cbcbcb"
      fontSize={15}
      fontFamily="Helvetica"
    >
      <TSpan x={0} y={0}>
        {"@"}
      </TSpan>
    </Text>
  </Svg>
  )
}

export default Aticon