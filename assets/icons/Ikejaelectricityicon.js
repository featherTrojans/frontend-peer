import React from 'react'
import Svg, { Defs, Pattern, Image, G, Path } from "react-native-svg"


function Ikejaelectricityicon() {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={34}
    height={34}
  >
    <Defs>
      <Pattern id="a" width={1} height={1} viewBox="6.37 6.37 21.26 21.259">
        <Image
          preserveAspectRatio="xMidYMid slice"
          width={34}
          height={34}
          xlinkHref="data:image/png;base64,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"
        />
      </Pattern>
    </Defs>
    <G data-name="Group 6590">
      <G
        data-name="Intersection 29"
        transform="translate(6903 4677)"
        fill="url(#a)"
      >
        <Path d="M-6903-4660a17 17 0 0 1 17-17 17 17 0 0 1 17 17 17 17 0 0 1-17 17 17 17 0 0 1-17-17Z" />
        <Path
          d="M-6886-4676.5c-4.407 0-8.55 1.717-11.667 4.833A16.392 16.392 0 0 0-6902.5-4660c0 4.407 1.716 8.55 4.833 11.667A16.394 16.394 0 0 0-6886-4643.5c4.407 0 8.55-1.717 11.667-4.833A16.392 16.392 0 0 0-6869.5-4660c0-4.407-1.717-8.55-4.833-11.667A16.392 16.392 0 0 0-6886-4676.5m0-.5c9.389 0 17 7.611 17 17s-7.611 17-17 17c-9.39 0-17-7.611-17-17s7.61-17 17-17Z"
          fill="rgba(112,112,112,0.16)"
        />
      </G>
    </G>
  </Svg>
  )
}

export default Ikejaelectricityicon