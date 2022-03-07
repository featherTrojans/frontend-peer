import React from 'react'
import Svg, { G, Path } from "react-native-svg"


function Tabuser({focused}) {
  const fill = focused ? "#003AD6" : "#000000";

  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={17}
  >
    <G data-name="user (3)" fill={fill}>
      <Path
        data-name="Path 6797"
        d="M6.366 8.488a4.244 4.244 0 1 0-4.244-4.244 4.244 4.244 0 0 0 4.244 4.244Zm0-7.074a2.829 2.829 0 1 1-2.829 2.83 2.829 2.829 0 0 1 2.829-2.829Z"
        fill={fill}
      />
      <Path
        data-name="Path 6798"
        d="M6.366 9.903A6.373 6.373 0 0 0 0 16.269a.708.708 0 1 0 1.415 0 4.951 4.951 0 1 1 9.9 0 .708.708 0 1 0 1.415 0 6.373 6.373 0 0 0-6.364-6.366Z"
        fill={fill}
      />
    </G>
  </Svg>
  )
}

export default Tabuser