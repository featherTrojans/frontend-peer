import React from 'react'
import Svg, { G, Circle, Path } from "react-native-svg"

function Vcardicon() {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={18} height={13} >
    <G data-name="card-atm (1)" transform="translate(-2.97 -5.5)">
      <Circle
        data-name="Ellipse 283"
        cx={2}
        cy={2}
        r={2}
        transform="translate(13.97 11.5)"
        fill="#002fff"
      />
      <Path
        data-name="Path 7446"
        d="M13.97 13.5a1.983 1.983 0 0 1 .5-1.31 2 2 0 1 0 0 2.62 1.983 1.983 0 0 1-.5-1.31Z"
        fill="#99abff"
      />
      <Path
        data-name="Path 7447"
        d="M18.97 5.5h-14a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2Zm-3 10a1.987 1.987 0 0 1-1.5-.69 2 2 0 1 1 0-2.62 2 2 0 1 1 1.5 3.31Z"
        fill="#6682ff"
      />
    </G>
  </Svg>
  )
}

export default Vcardicon