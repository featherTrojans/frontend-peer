import React from "react";

import Svg, {
  Defs,
  LinearGradient,
  Stop,
  G,
  Circle,
  Path,
  Rect,
} from "react-native-svg";
import Gradient from "expo-linear-gradient";

const Depositicon = (props) => (

    <Svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width={39}
      height={39}
      {...props}
    >
      <Defs>
        <LinearGradient
          id="a"
          x1={0.514}
          y1={0.999}
          x2={0.508}
          y2={0.8}
          gradientUnits="objectBoundingBox"
        >
          <Stop offset={0} stopColor="#ffb92d" />
          <Stop offset={1} stopColor="#f59500" />
        </LinearGradient>
        <LinearGradient
          id="f"
          x1={0.544}
          y1={0.884}
          x2={0.527}
          y2={0.725}
          xlinkHref="#a"
        />
        <LinearGradient
          id="e"
          x1={0.497}
          y1={2.381}
          x2={0.497}
          y2={2.115}
          gradientUnits="objectBoundingBox"
        >
          <Stop offset={0} stopColor="#a7f3ce" />
          <Stop offset={1} stopColor="#61db99" />
        </LinearGradient>
        <LinearGradient
          id="b"
          x1={0.497}
          y1={1.192}
          x2={0.497}
          y2={0.334}
          gradientUnits="objectBoundingBox"
        >
          <Stop offset={0} stopColor="#ff4c54" />
          <Stop offset={1} stopColor="#be3f45" />
        </LinearGradient>
        <LinearGradient
          id="g"
          x1={0.497}
          y1={0.009}
          x2={0.497}
          y2={-0.849}
          xlinkHref="#b"
        />
        <LinearGradient
          id="c"
          x1={0.595}
          y1={0.09}
          x2={0.113}
          y2={0.09}
          gradientUnits="objectBoundingBox"
        >
          <Stop offset={0} stopColor="#be3f45" stopOpacity={0} />
          <Stop offset={1} stopColor="#be3f45" />
        </LinearGradient>
        <LinearGradient
          id="h"
          x1={0.328}
          y1={0.312}
          x2={0.748}
          y2={0.118}
          xlinkHref="#a"
        />
        <LinearGradient
          id="i"
          x1={0.484}
          y1={-2.152}
          x2={0.467}
          y2={-2.526}
          xlinkHref="#c"
        />
        <LinearGradient
          id="d"
          x1={0.488}
          y1={14.281}
          x2={0.488}
          y2={-6.552}
          gradientUnits="objectBoundingBox"
        >
          <Stop offset={0} stopColor="#fff465" />
          <Stop offset={1} stopColor="#ffe600" />
        </LinearGradient>
        <LinearGradient
          id="j"
          x1={0.497}
          y1={0.68}
          x2={0.497}
          y2={-0.33}
          xlinkHref="#d"
        />
        <LinearGradient
          id="k"
          x1={0.486}
          y1={-3.309}
          x2={0.486}
          y2={-23.828}
          xlinkHref="#d"
        />
        <LinearGradient
          id="l"
          x1={0.754}
          y1={-1.086}
          x2={-0.167}
          y2={-0.458}
          xlinkHref="#c"
        />
        <LinearGradient
          id="m"
          x1={0.478}
          y1={-1.436}
          x2={0.478}
          y2={-2.157}
          xlinkHref="#b"
        />
        <LinearGradient
          id="n"
          x1={0.469}
          y1={-3.071}
          x2={0.469}
          y2={-2.351}
          xlinkHref="#b"
        />
        <LinearGradient
          id="o"
          x1={-4.368}
          y1={7.43}
          x2={-3.372}
          y2={3.032}
          xlinkHref="#e"
        />
        <LinearGradient
          id="p"
          x1={-4.375}
          y1={7.43}
          x2={-3.379}
          y2={3.031}
          xlinkHref="#e"
        />
        <LinearGradient
          id="q"
          x1={-4.762}
          y1={5.504}
          x2={-3.766}
          y2={1.105}
          xlinkHref="#e"
        />
        <LinearGradient
          id="r"
          x1={-4.769}
          y1={5.504}
          x2={-3.773}
          y2={1.105}
          xlinkHref="#e"
        />
      </Defs>
      <G data-name="Group 5693" transform="translate(-22 -404)">
        <Circle
          data-name="Ellipse 149"
          cx={19.5}
          cy={19.5}
          r={19.5}
          transform="translate(22 404)"
          fill="#001757"
        />
        <G transform="translate(7.975 412)">
          <Path
            data-name="Path 6632"
            d="M43.05 87.585H24.787a1.762 1.762 0 0 1-1.762-1.762V70.616a1.762 1.762 0 0 1 1.762-1.762H43.05a1.762 1.762 0 0 1 1.762 1.762v15.207a1.762 1.762 0 0 1-1.762 1.762Z"
            transform="translate(0 -65.634)"
            fill="url(#a)"
          />
          <Path
            data-name="Path 6633"
            d="M52.547 95.682H35.1A1.684 1.684 0 0 1 33.415 94V79.47a1.684 1.684 0 0 1 1.685-1.684h17.447a1.684 1.684 0 0 1 1.683 1.684V94a1.684 1.684 0 0 1-1.683 1.682Z"
            transform="translate(-9.904 -74.148)"
            fill="url(#f)"
          />
          <Path
            data-name="Path 6634"
            d="M62.311 8.139 57.918.53a1.06 1.06 0 0 0-1.447-.387l-13.85 8Z"
            transform="translate(-18.68)"
            fill="url(#e)"
          />
          <Path
            data-name="Path 6635"
            d="M23.025 160.482h21.787v-5.771a1.319 1.319 0 0 0-1.319-1.319H24.344a1.319 1.319 0 0 0-1.319 1.319Z"
            transform="translate(0 -146.22)"
            fill="url(#b)"
          />
          <Path
            data-name="Path 6636"
            d="M23.025 236.4v8.1a1.762 1.762 0 0 0 1.762 1.762H43.05a1.762 1.762 0 0 0 1.762-1.762v-8.1a1.089 1.089 0 0 0-1.089-1.089H24.114a1.089 1.089 0 0 0-1.089 1.089Z"
            transform="translate(0 -224.312)"
            fill="url(#g)"
          />
          <Path
            data-name="Path 6637"
            d="M418.679 169.277v14.036h1.521a1.762 1.762 0 0 0 1.762-1.762v-8.987Z"
            transform="translate(-377.154 -161.362)"
            fill="url(#c)"
          />
          <Path
            data-name="Path 6638"
            d="m40.039 122.812-15.294-1.776a1.944 1.944 0 0 1-1.72-1.931v-15.37a.651.651 0 0 0 .576.646l16.887 1.961a1.944 1.944 0 0 1 1.72 1.931v12.607a1.944 1.944 0 0 1-2.169 1.932Z"
            transform="translate(0 -98.884)"
            fill="url(#h)"
          />
          <Path
            data-name="Path 6639"
            d="M40.039 370.479 24.745 368.7a1.944 1.944 0 0 1-1.72-1.931v3.07a1.944 1.944 0 0 0 1.72 1.931l15.294 1.776a1.944 1.944 0 0 0 2.169-1.931v-3.07a1.944 1.944 0 0 1-2.169 1.934Z"
            transform="translate(0 -349.621)"
            fill="url(#i)"
          />
          <Path
            data-name="Path 6640"
            d="M30.9 139.042h-.039l-.7-.077a.352.352 0 0 1 .077-.7l.7.077a.352.352 0 0 1-.038.7Z"
            transform="translate(-6.499 -131.796)"
            fill="url(#d)"
          />
          <Path
            data-name="Path 6641"
            d="M87.331 159.187h-.045l-1.36-.173a.352.352 0 1 1 .089-.7l1.36.173a.352.352 0 0 1-.044.7Zm1.339-.174a.352.352 0 0 1-.15-.671 1.389 1.389 0 0 0 .737-.766.352.352 0 1 1 .665.232 2.067 2.067 0 0 1-1.1 1.171.351.351 0 0 1-.152.034Zm-4.059-.172h-.045l-1.36-.173a.352.352 0 1 1 .089-.7l1.36.173a.352.352 0 0 1-.044.7Zm-2.72-.346h-.045l-1.36-.173a.352.352 0 0 1 .089-.7l1.36.173a.352.352 0 0 1-.044.7Zm-2.721-.346h-.045l-1.36-.173a.352.352 0 1 1 .089-.7l1.36.173a.352.352 0 0 1-.044.7Zm-2.72-.346h-.045l-1.36-.173a.352.352 0 1 1 .089-.7l1.36.173a.352.352 0 0 1-.044.7Zm13.219-1.121a.352.352 0 0 1-.352-.352v-1.371a.352.352 0 0 1 .7 0v1.371a.352.352 0 0 1-.349.352Zm0-2.742a.352.352 0 0 1-.352-.352v-1.371a.352.352 0 1 1 .7 0v1.371a.352.352 0 0 1-.349.352Zm0-2.742a.352.352 0 0 1-.352-.352v-1.371a.352.352 0 1 1 .7 0v1.371a.352.352 0 0 1-.349.354Zm0-2.742a.352.352 0 0 1-.352-.352v-1.371a.352.352 0 1 1 .7 0v1.367a.352.352 0 0 1-.349.355Zm-.492-2.6a.351.351 0 0 1-.242-.1 1.726 1.726 0 0 0-1.02-.444H87.9a.352.352 0 1 1 .075-.7h.006a2.43 2.43 0 0 1 1.432.633.352.352 0 0 1-.242.608Zm-2.6-.689h-.039l-1.363-.15a.352.352 0 0 1 .077-.7l1.363.15a.352.352 0 0 1-.038.7Zm-2.726-.3h-.039l-1.363-.15a.352.352 0 1 1 .077-.7l1.363.15a.352.352 0 0 1-.038.7Zm-2.726-.3h-.039l-1.363-.15a.352.352 0 1 1 .077-.7l1.363.15a.352.352 0 0 1-.038.7Zm-2.726-.3h-.039l-1.36-.154a.352.352 0 1 1 .077-.7l1.363.15a.352.352 0 0 1-.038.7Zm-2.726-.3h-.039l-1.363-.15a.352.352 0 0 1 .077-.7l1.363.15a.352.352 0 0 1-.038.7Z"
            transform="translate(-48.554 -136.42)"
            fill="url(#j)"
          />
          <Path
            data-name="Path 6642"
            d="M47.509 433.74h-.045l-.7-.089a.352.352 0 0 1 .089-.7l.7.089a.352.352 0 0 1-.044.7Z"
            transform="translate(-22.337 -412.703)"
            fill="url(#k)"
          />
          <Path
            data-name="Path 6643"
            d="m38.105 2.623-2.253 1.226a.605.605 0 0 1-.821-.242.605.605 0 0 1 .242-.821l2.253-1.226a.605.605 0 0 1 .821.242.6.6 0 0 1-.242.821Z"
            fill="#61db99"
          />
          <Path
            data-name="Path 6644"
            d="m326.585 306.84-2.236-2.236a1.726 1.726 0 1 0-2.438 2.438l4.674 4.674v-4.876Z"
            transform="translate(-284.378 -289.828)"
            fill="url(#l)"
          />
          <Circle
            data-name="Ellipse 153"
            cx={1.726}
            cy={1.726}
            r={1.726}
            transform="translate(36.974 14.217)"
            fill="url(#m)"
          />
          <Circle
            data-name="Ellipse 154"
            cx={1.191}
            cy={1.191}
            r={1.191}
            transform="translate(37.509 14.752)"
            fill="url(#n)"
          />
          <Circle
            data-name="Ellipse 155"
            cx={0.246}
            cy={0.246}
            r={0.246}
            transform="translate(38.001 15.244)"
            fill="url(#o)"
          />
          <Circle
            data-name="Ellipse 156"
            cx={0.246}
            cy={0.246}
            r={0.246}
            transform="translate(38.906 15.244)"
            fill="url(#p)"
          />
          <Circle
            data-name="Ellipse 157"
            cx={0.246}
            cy={0.246}
            r={0.246}
            transform="translate(38.001 16.149)"
            fill="url(#q)"
          />
          <Circle
            data-name="Ellipse 158"
            cx={0.246}
            cy={0.246}
            r={0.246}
            transform="translate(38.906 16.149)"
            fill="url(#r)"
          />
        </G>
      </G>
    </Svg>
);

export default Depositicon;
