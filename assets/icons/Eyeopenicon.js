import React from 'react'
import Svg, { Path, Circle } from "react-native-svg"

function Eyeopenicon() {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    stroke="#000"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    className="feather feather-eye"
    viewBox="0 0 24 24"
  >
    <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <Circle cx={12} cy={12} r={3} />
  </Svg>
  )
}

export default Eyeopenicon