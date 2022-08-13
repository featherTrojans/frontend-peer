import React from "react";
import Svg, { G, Circle, Path } from "react-native-svg";

function Acceptedcheck() {
  return (
    <Svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} >
      <G data-name="Group 6599" transform="translate(-56 -437)">
        <Circle
          data-name="Ellipse 244"
          cx={7.5}
          cy={7.5}
          r={7.5}
          transform="translate(56 437)"
          fill="#fff"
        />
        <Path
          data-name="Icon ionic-ios-checkmark-circle"
          d="M63.725 439a5.727 5.727 0 1 0 5.728 5.725A5.726 5.726 0 0 0 63.725 439Zm2.932 4.143-3.681 3.7a.5.5 0 0 1-.319.151.482.482 0 0 1-.322-.157l-1.543-1.543a.11.11 0 0 1 0-.157l.49-.49a.106.106 0 0 1 .154 0l1.222 1.222 3.359-3.384a.109.109 0 0 1 .077-.033.1.1 0 0 1 .077.033l.482.5a.109.109 0 0 1 .006.158Z"
          fill="#00c9aa"
        />
      </G>
    </Svg>
  );
}

export default Acceptedcheck;
