
import React from 'react'
import { icons, images } from './constants'
import LottieView from "lottie-react-native"
import { RFValue } from 'react-native-responsive-fontsize'



const {Mapanimate, Phoneanimate, Sittinganimate, Trackinguseranimate} = icons
const {Splashimage1, Splashimage2, Splashimage3, Splashimage4} = images

export default [
    {
        image: Splashimage1,
        imageBg: "#D2EAFD",
        header: "Withdraw your cash from businesses and agents near you.",
        information: "Enjoy powerful services perfectly tailored for you, our driving force is to eliminate your pain points and enhance convenience",
        page: 1
        
    },
    {
        image: Splashimage2,
        imageBg: "#FCF3D1",
        header: "Send money to other feather users for free and any nigerian bank.",
        information: "Earn cash and build income each time you give cash to peers, your financial freedom is here",
        page: 2
    },
    {
        image: Splashimage3,
        imageBg: "#FBEEEE",
        header: "Pay your bills with speed, you never have to miss a thing again. ",
        information: "Earn cash and build income each time you give cash to peers, your financial freedom is here",
        page: 1
    },
    {
        image: Splashimage4,
        imageBg: "#EEFBF3",
        header: "Enjoy amazing in-app conversations - send money where you are.",
        information: "Feather is a modern digital wallet on steroids that helps you process your daily transactional needs.",
        page: 4
    }
]


