
import React from 'react'
import { icons } from './constants'
import LottieView from "lottie-react-native"
import { RFValue } from 'react-native-responsive-fontsize'



const {Mapanimate, Phoneanimate, Sittinganimate, Trackinguseranimate} = icons


export default [
    {
        icon: <LottieView source={Trackinguseranimate} autoPlay loop style={{width: 280, height: 497, marginTop: -40}}/>,
        header: "The coolest and most convenient way to withdraw your cash",
        information: "Withdraw cash from people or businesses around you. Say bye bye to long queues, double debits & ATM wahala."
    },
    {
        icon: <LottieView source={Phoneanimate} autoPlay loop style={{width: 230, height: 230, }}/>,
        header: "Make payments with with ease from different options",
        information: "Transfer money to any feather wallet using usernames or phone number for free or any bank account in Nigeria."
    },
    {
        icon: <LottieView source={Sittinganimate} autoPlay loop style={{width: 193, height: 193, }}/>,
        header: "Generate income or side hustle earnings easily like a boss 😎 ",
        information: "Earn cash and build income each time you give cash to peers, your financial freedom is here"
    }
]


