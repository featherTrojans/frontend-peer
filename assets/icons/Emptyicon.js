import React from 'react'
import Svg, { Path, G } from "react-native-svg"



function Emptyicon() {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={50} height={50}>
    <Path
      d="M1.5 7.5v35a5.987 5.987 0 0 0 6 6h41v-35h-41a5.987 5.987 0 0 1-6-6Z"
      fill="#ff9191"
    />
    <Path
      d="M44 13.5V43a1 1 0 0 1-1 1H1.7a5.981 5.981 0 0 0 5.8 4.5h41v-35Z"
      fill="#f86c6c"
    />
    <Path d="M7.5 1.5a6 6 0 0 0 0 12h35v-12Z" fill="#d7dfeb" />
    <Path
      d="M38 1.5V9H7.5a5.983 5.983 0 0 1-5.562-3.75A6 6 0 0 0 7.5 13.5h35v-12Z"
      fill="#b1c1d6"
    />
    <Path
      d="M7.5 0a7.5 7.5 0 0 0 0 15H47v32H7.5A4.458 4.458 0 0 1 3 42.5v-26a1.5 1.5 0 1 0-3 0v26A7.517 7.517 0 0 0 7.5 50h41a1.5 1.5 0 0 0 1.5-1.5v-35a1.5 1.5 0 0 0-1.5-1.5h-41a4.5 4.5 0 0 1 0-9H41v5.5a1.5 1.5 0 1 0 3 0v-7A1.5 1.5 0 0 0 42.5 0Z"
      fill="#444852"
    />
    <G data-name="Group 6600" fill="#fff">
      <Path d="M25 35a13.957 13.957 0 0 0-8.248 2.688 1.5 1.5 0 1 0 1.768 2.422 11.009 11.009 0 0 1 12.961 0 1.5 1.5 0 1 0 1.768-2.422A13.957 13.957 0 0 0 25 35ZM30.14 24.173a1.5 1.5 0 0 0 .032 2.12l.707.707-.707.707a1.5 1.5 0 1 0 2.121 2.121l.707-.707.707.707a1.5 1.5 0 1 0 2.121-2.121L35.121 27l.707-.707a1.5 1.5 0 1 0-2.121-2.121l-.707.707-.707-.707a1.5 1.5 0 0 0-2.153 0ZM14.14 24.173a1.5 1.5 0 0 0 .032 2.12l.707.707-.707.707a1.5 1.5 0 1 0 2.121 2.121l.707-.707.707.707a1.5 1.5 0 1 0 2.121-2.121L19.121 27l.707-.707a1.5 1.5 0 1 0-2.121-2.121l-.707.707-.707-.707a1.5 1.5 0 0 0-2.153 0Z" />
    </G>
  </Svg>
  )
}

export default Emptyicon