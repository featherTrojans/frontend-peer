import React from 'react'
import Svg, { Path } from "react-native-svg"

function Ratingsstar({filled}) {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={33.658}
    height={31.975}
  >
    <Path
      data-name="Icon material-star"
      d="m16.829 25.7 10.4 6.277-2.759-11.833 9.189-7.96-12.1-1.027L16.829 0 12.1 11.158 0 12.184l9.189 7.96-2.76 11.831Z"
      fill={filled ? "#003AD6" : "#d6d6d6"}
    />
  </Svg>
  )
}

export default Ratingsstar