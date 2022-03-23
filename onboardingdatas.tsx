
import React from 'react'
import { icons } from './constants'
import LottieView from "lottie-react-native"


const {Mapanimate, Phoneanimate, Sittinganimate} = icons


export default [
    {
        icon: <LottieView source={Mapanimate} autoPlay loop style={{width: 320, height: 160, marginBottom: 44}}/>,
        header: "Withdraw your cash from businesses and people around you.",
        information: "Get you cash in hand easily from finding people and agents based on your location."
    },
    {
        icon: <LottieView source={Phoneanimate} autoPlay loop style={{width: 230, height: 230, marginBottom: 20}}/>,
        header: "Make payments with ease from different options.",
        information: "Transfer money to any feather wallet using feather tags or any bank account in Nigeria."
    },
    {
        icon: <LottieView source={Sittinganimate} autoPlay loop style={{width: 193, height: 193, marginBottom: 38}}/>,
        header: "Generate income easily like a boss without any stress.",
        information: "Earn cash and build income each time you give cash to peers. your financial freedom is here."
    }
]


