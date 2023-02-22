import React from 'react'
import Svg, { G, Path } from "react-native-svg"

function Chatstabicon({focused}) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={20} height={20}>
    <G
      data-name="chat (1)"
      style={{
        mixBlendMode: "luminosity",
        isolation: "isolate",
      }}
    >
      <Path
        data-name="Path 7272"
        d="M.617 15.924A1 1 0 0 1 0 15V3a3 3 0 0 1 3-3h10a3 3 0 0 1 3 3v6.873a3 3 0 0 1-3 3H4.538l-2.831 2.834a1 1 0 0 1-1.09.217Z"
        fill="#b1c6ff"
      />
      <Path
        data-name="Path 7273"
        d="M19 20a1 1 0 0 1-.707-.293l-2.374-2.374H9a3 3 0 0 1-3-3V9a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v10a1 1 0 0 1-1 1Z"
        fill="#003ad6"
      />
    </G>
  </Svg>
  )
}

export default Chatstabicon