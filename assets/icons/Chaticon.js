import React from "react";
import Svg, { G, Circle, Path } from "react-native-svg";

const Chaticon = () => (
  <Svg xmlns="http://www.w3.org/2000/svg" width={39} height={39}>
    <G data-name="Group 5693" transform="translate(-22 -404)">
      <Circle
        data-name="Ellipse 149"
        cx={19.5}
        cy={19.5}
        r={19.5}
        transform="translate(22 404)"
        fill="#001757"
      />
      <Path
        data-name="comment (3)"
        d="M47.433 417.028a8.812 8.812 0 1 0-5.623 15.6h5.127a3.676 3.676 0 0 0 3.672-3.672v-5.695a8.844 8.844 0 0 0-3.176-6.233Zm-8.573 3.115h2.937a.734.734 0 0 1 0 1.469H38.86a.734.734 0 0 1 0-1.469Zm5.874 7.343H38.86a.734.734 0 0 1 0-1.469h5.874a.734.734 0 1 1 0 1.469Zm0-2.937H38.86a.734.734 0 0 1 0-1.469h5.874a.734.734 0 0 1 0 1.469Z"
        fill="#fff"
      />
    </G>
  </Svg>
);

export default Chaticon;
