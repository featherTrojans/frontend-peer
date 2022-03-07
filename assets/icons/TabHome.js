import React from "react";
import Svg, { Path, G } from "react-native-svg";

function TabHome({ focused }) {
  const fill = focused ? "#003AD6" : "#000000";
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={21}
  >
    <Path
      data-name="home (3)"
      d="m16.353 6.4-5.365-5.366a3.542 3.542 0 0 0-5 0L.622 6.4A2.106 2.106 0 0 0 0 7.9v6.944a2.122 2.122 0 0 0 2.122 2.122h12.731a2.122 2.122 0 0 0 2.122-2.122V7.9a2.106 2.106 0 0 0-.622-1.5Zm-5.744 9.151H6.366v-2.783a2.122 2.122 0 1 1 4.244 0Zm4.951-.707a.707.707 0 0 1-.707.707h-2.829v-2.783a3.537 3.537 0 1 0-7.073 0v2.783H2.122a.707.707 0 0 1-.707-.707V7.9a.713.713 0 0 1 .207-.5l5.365-5.364a2.127 2.127 0 0 1 3 0l5.365 5.366a.713.713 0 0 1 .207.5Z" fill={fill}
    />
  </Svg>
  );
}

export default TabHome;
