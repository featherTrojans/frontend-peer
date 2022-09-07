import React from 'react'
import Svg, { Defs, LinearGradient, Stop, G, Path } from "react-native-svg"


function Updateprofileicon() {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={18.027}
    height={18.027}
  >
    <Defs>
      <LinearGradient
        id="a"
        x1={0.5}
        y1={1}
        x2={0.5}
        gradientUnits="objectBoundingBox"
      >
        <Stop offset={0} stopColor="#addcff" />
        <Stop offset={0.503} stopColor="#eaf6ff" />
        <Stop offset={1} stopColor="#eaf6ff" />
      </LinearGradient>
      <LinearGradient
        id="b"
        x1={0.5}
        y1={1}
        x2={0.5}
        gradientUnits="objectBoundingBox"
      >
        <Stop offset={0} stopColor="#5558ff" />
        <Stop offset={1} stopColor="#00c0ff" />
      </LinearGradient>
    </Defs>
    <G data-name="Group 6495">
      <G data-name="Group 6494">
        <Path
          data-name="Path 7142"
          d="M222.46 4.426 219.291.2a.548.548 0 0 0-.846 0l-3.169 4.225a.528.528 0 0 0 .551.829l1.456-.364v7.327a2.643 2.643 0 0 1-2.641 2.641h-2.113a.528.528 0 0 0-.528.528V17.5a.528.528 0 0 0 .528.528h2.113a5.816 5.816 0 0 0 5.809-5.809V4.892l1.456.364a.528.528 0 0 0 .551-.829Z"
          transform="translate(-204.539 -.002)"
          fill="url(#a)"
        />
      </G>
    </G>
    <G data-name="Group 6497">
      <G data-name="Group 6496">
        <Path
          data-name="Path 7143"
          d="M10.034 0H7.921a5.816 5.816 0 0 0-5.809 5.811v7.316l-1.456-.364a.528.528 0 0 0-.551.829l3.169 4.225a.529.529 0 0 0 .846 0l3.169-4.225a.528.528 0 0 0-.551-.829l-1.456.364V5.811a2.643 2.643 0 0 1 2.639-2.64h2.112a.528.528 0 0 0 .528-.528V.53a.528.528 0 0 0-.527-.53Z"
          transform="translate(0 -.002)"
          fill="url(#b)"
        />
      </G>
    </G>
  </Svg>
  )
}

export default Updateprofileicon