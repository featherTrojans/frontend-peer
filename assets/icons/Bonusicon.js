import React from 'react'
import Svg, { Path } from "react-native-svg"

function Bonusicon() {
  return (
    <Svg
    width={39}
    height={39}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <Path
      d="M19.5 39C30.27 39 39 30.27 39 19.5S30.27 0 19.5 0 0 8.73 0 19.5 8.73 39 19.5 39Z"
      fill="#003AD6"
    />
    <Path
      d="m19.375 7.776 3.64 7.376 8.137 1.182-5.887 5.741 1.39 8.106-7.28-3.826-7.28 3.827 1.39-8.107-5.889-5.74 8.139-1.183 3.64-7.376Z"
      fill="#FFCE00"
    />
    <Path
      d="m19.375 26.355 7.28 3.827-1.39-8.107 5.889-5.741-8.139-1.182-3.64-7.376v18.579Z"
      fill="#FFBC00"
    />
    <Path
      d="M19.375 7.776v11.619l11.779-3.061-8.139-1.182-3.64-7.376Z"
      fill="#FF9500"
    />
    <Path
      d="m26.655 30.181-7.28-10.787-7.279 10.787 7.28-3.827 7.28 3.827Z"
      fill="#FA0"
    />
    <Path d="m26.655 30.181-7.28-10.787v6.958l7.28 3.829Z" fill="#FF9500" />
    <Path d="m15.735 15.152-8.139 1.182 11.779 3.061V7.776" fill="#FFDC4A" />
  </Svg>
  )
}

export default Bonusicon