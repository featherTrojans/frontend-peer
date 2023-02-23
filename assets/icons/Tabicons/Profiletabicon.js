import React from 'react'
import Svg, { G, Circle, Path } from "react-native-svg"

function Profiletabicon({focused}) {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
  >
    <G
      data-name="profile (2)"
      style={{
        mixBlendMode: "luminosity",
        isolation: "isolate",
      }}
    >
      <Circle
        data-name="Ellipse 252"
        cx={4}
        cy={4}
        r={4}
        transform="translate(5.98 3.99)"
        fill={focused ? "#d8e3ff" : "#E3E3E3"}
      />
      <Path
        data-name="Path 7274"
        d="M12.956 10.64a3.954 3.954 0 0 1-5.951 0 8 8 0 0 0-4.815 5.6 9.966 9.966 0 0 0 15.58 0 7.986 7.986 0 0 0-4.814-5.6Z"
        fill={focused ? "#003ad6" : "#3a3a3a"}
      />
      <Path
        data-name="Path 7275"
        d="M7.005 10.64a4 4 0 1 1 5.951 0 7.985 7.985 0 0 1 4.807 5.578 9.98 9.98 0 1 0-15.566 0 8 8 0 0 1 4.808-5.578Z"
        fill={focused ?  "#b1c6ff" : "#C6C6C6" }
      />
    </G>
  </Svg>
  )
}

export default Profiletabicon