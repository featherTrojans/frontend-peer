import React from 'react'
import {Svg, Defs, G, Circle} from "react-native-svg"
function MarkerIcon() {
    return (
        <Svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="181" height="181" viewBox="0 0 181 181">
        <Defs>
            <filter id="Ellipse_14" x="0" y="0" width="181" height="181" filterUnits="userSpaceOnUse">
            <feOffset dy="-4" input="SourceAlpha"/>
            <feGaussianBlur stdDeviation="20" result="blur"/>
            <feFlood flood-color="#3e64ff" flood-opacity="0.251"/>
            <feComposite operator="in" in2="blur"/>
            <feComposite in="SourceGraphic"/>
            </filter>
            <filter id="Ellipse_12" x="49" y="53" width="84" height="84" filterUnits="userSpaceOnUse">
            <feOffset input="SourceAlpha"/>
            <feGaussianBlur stdDeviation="10" result="blur-2"/>
            <feFlood flood-color="#fff" flood-opacity="0.322"/>
            <feComposite operator="in" in2="blur-2"/>
            <feComposite in="SourceGraphic"/>
            </filter>
        </Defs>
        <G id="Initial_Pin" data-name="Initial Pin" transform="translate(-127 -350)">
            <G transform="matrix(1, 0, 0, 1, 127, 350)" filter="url(#Ellipse_14)">
            <G id="Ellipse_14-2" data-name="Ellipse 14" transform="translate(60 64)" fill="#d2d9f7" stroke="rgba(62,100,255,0.5)" stroke-width="1" opacity="0.842">
                <Circle cx="30.5" cy="30.5" r="30.5" stroke="none"/>
                <Circle cx="30.5" cy="30.5" r="30" fill="none"/>
            </G>
            </G>
            <G transform="matrix(1, 0, 0, 1, 127, 350)" filter="url(#Ellipse_12)">
            <Circle id="Ellipse_12-2" data-name="Ellipse 12" cx="12" cy="12" r="12" transform="translate(79 83)" fill="#fff"/>
            </G>
            <Circle id="Ellipse_15" data-name="Ellipse 15" cx="6" cy="6" r="6" transform="translate(212 439)" fill="#3e64ff"/>
        </G>
        </Svg>

    )
}

export default MarkerIcon
