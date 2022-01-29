import React from "react";
import Svg, { Path } from "react-native-svg";

function Tabsettings({ focused }) {
  const fill = focused ? "#fff" : "#bfbfbf";

  return (
    <Svg
      id="settings_2_"
      data-name="settings (2)"
      xmlns="http://www.w3.org/2000/svg"
      width="18.895"
      height="21"
      viewBox="0 0 18.895 21"
    >
      <Path
        id="Path_5855"
        data-name="Path 5855"
        d="M26.014,15.75a2.625,2.625,0,0,0,3.585.964h0l.389-.225a7.855,7.855,0,0,0,2.492,1.439v.449a2.625,2.625,0,1,0,5.25,0v-.449a7.854,7.854,0,0,0,2.492-1.44l.391.226a2.626,2.626,0,1,0,2.625-4.55h0l-.389-.224a7.963,7.963,0,0,0,0-2.879l.389-.224a2.626,2.626,0,0,0-2.625-4.55l-.389.225a7.855,7.855,0,0,0-2.494-1.436V2.625a2.625,2.625,0,1,0-5.25,0v.449a7.854,7.854,0,0,0-2.492,1.44L29.6,4.288a2.626,2.626,0,1,0-2.625,4.55h0l.389.224a7.963,7.963,0,0,0,0,2.879l-.389.224A2.63,2.63,0,0,0,26.014,15.75ZM35.108,7a3.5,3.5,0,1,1-3.5,3.5A3.5,3.5,0,0,1,35.108,7Z"
        transform="translate(-25.66)"
        fill={fill}
      />
    </Svg>
  );
}

export default Tabsettings;
