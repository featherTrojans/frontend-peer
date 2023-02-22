import React from 'react'
import Svg, { Path } from "react-native-svg"



function Hometabicon({focused}) {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={15.606}
    height={16.427}
  >
    <Path
      data-name="home (1)"
      d="M5.457 15.427v-2.519a1.165 1.165 0 0 1 1.162-1.161H8.98a1.165 1.165 0 0 1 1.169 1.161v2.512a1.011 1.011 0 0 0 1.008 1.008h1.611a2.842 2.842 0 0 0 2.007-.821 2.8 2.8 0 0 0 .832-1.99V6.461A2.031 2.031 0 0 0 14.87 4.9L9.4.554a2.559 2.559 0 0 0-3.252.058L.794 4.9A2.032 2.032 0 0 0 0 6.461v7.148a2.829 2.829 0 0 0 2.839 2.818h1.574a1.011 1.011 0 0 0 .717-.29 1 1 0 0 0 .3-.71Z"
      fill={focused ? "#003AD6" : "#3a3a3a" }
    />
  </Svg>
  )
}

export default Hometabicon