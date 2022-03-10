import React from 'react'
import Svg, { G, Path, Circle } from "react-native-svg"


function Downloadreceipt() {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={25.025}
    height={22.893}
  >
    <G transform="translate(0 -21.823)">
      <Path
        data-name="Path 6717"
        d="M19.645 28.065a7.816 7.816 0 0 0-15.471 1.54c0 .176.007.356.023.547a4.69 4.69 0 0 0 .5 9.353h.547c-.013-.173-.026-.345-.026-.521a6.774 6.774 0 1 1 13.548 0c0 .176-.014.348-.026.521h.547a5.725 5.725 0 0 0 .361-11.441Z"
        fill="#bbdefb"
      />
      <Circle
        data-name="Ellipse 163"
        cx={5.732}
        cy={5.732}
        r={5.732}
        transform="translate(6.258 33.253)"
        fill="#4caf50"
      />
      <G data-name="Group 5852" fill="#fafafa">
        <Path
          data-name="Path 6718"
          d="M11.989 42.632a.521.521 0 0 1-.521-.521v-6.253a.521.521 0 1 1 1.042 0v6.253a.521.521 0 0 1-.521.521Z"
        />
        <Path
          data-name="Path 6719"
          d="M11.989 42.632a.521.521 0 0 1-.369-.152l-2.084-2.084a.521.521 0 0 1 .737-.737l1.716 1.715 1.715-1.715a.521.521 0 0 1 .737.737l-2.084 2.084a.521.521 0 0 1-.368.152Z"
        />
      </G>
    </G>
  </Svg>
  )
}

export default Downloadreceipt