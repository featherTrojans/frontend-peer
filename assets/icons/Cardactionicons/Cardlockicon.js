import React from 'react'
import Svg, { G, Path, Rect } from "react-native-svg"




function Cardlockicon() {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={15} height={19} >
    <G data-name="lock (4)" transform="translate(-4 -2)">
      <Path
        data-name="Path 7448"
        d="M15.4 10.55H7.8a.95.95 0 0 1-.95-.95V6.75a4.75 4.75 0 1 1 9.5 0V9.6a.95.95 0 0 1-.95.95Zm-6.65-1.9h5.7v-1.9a2.85 2.85 0 1 0-5.7 0Z"
        fill="#666"
      />
      <Rect
        data-name="Rectangle 1141"
        width={15}
        height={12}
        rx={3}
        transform="translate(4 9)"
        fill="#000000"
      />
    </G>
  </Svg>
  )
}

export default Cardlockicon