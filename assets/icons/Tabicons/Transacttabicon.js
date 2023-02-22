import React from 'react'
import Svg, { G, Path } from "react-native-svg"

function Transacttabicon({focused}) {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={20} height={17.779} >
    <G
      style={{
        mixBlendMode: "luminosity",
        isolation: "isolate",
      }}
    >
      <Path
        data-name="Path 7269"
        d="M6.444.001a2 2 0 0 0-2 2v13.556a2.222 2.222 0 0 1-2.222 2.222h14.445A3.333 3.333 0 0 0 20 14.446V2a2 2 0 0 0-2-2H6.444Z"
        fill="#d8e3ff"
      />
      <Path
        data-name="Path 7270"
        d="M4.444 15.557V4.446H2a2 2 0 0 0-2 2v9.333a2 2 0 0 0 2 2h.222a2.222 2.222 0 0 0 2.222-2.222Z"
        fill="#b1c6ff"
      />
      <Path
        data-name="Path 7271"
        d="M15 5.89H9a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2Zm0 4h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2Zm-5 0H9a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2Zm5 4h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2Zm-5 0H9a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2Z"
        fill="#003ad6"
      />
    </G>
  </Svg>
  )
}

export default Transacttabicon