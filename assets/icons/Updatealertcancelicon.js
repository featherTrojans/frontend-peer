import React from 'react'
import Svg, { Defs, LinearGradient, Stop, Path } from "react-native-svg"


function Updatealertcancelicon() {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={6.753}
    height={6.759}
  >
    <Defs>
      <LinearGradient
        id="a"
        x1={0.5}
        x2={0.5}
        y2={1}
        gradientUnits="objectBoundingBox"
      >
        <Stop offset={0} stopColor="#5558ff" />
        <Stop offset={1} stopColor="#00c0ff" />
      </LinearGradient>
    </Defs>
    <Path
      d="m10 8.915 2.024-2.026a.783.783 0 0 0-1.1-1.1L8.892 7.808l-2.03-2.03a.783.783 0 0 0-1.108 1.107l2.031 2.03-2.024 2.026a.783.783 0 1 0 1.105 1.105l2.026-2.024 2.024 2.024a.783.783 0 0 0 1.107-1.107Z"
      transform="translate(-5.5 -5.549)"
      fill="url(#a)"
    />
  </Svg>
  )
}

export default Updatealertcancelicon