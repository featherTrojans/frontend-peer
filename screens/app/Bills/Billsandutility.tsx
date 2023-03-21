import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Backheader, Iconandinfo, Mainwrapper } from '../../../components'
import { icons } from '../../../constants'



const {Bankblueicon} = icons


const Billsandutility = () => {
  return (
    <Mainwrapper>
        <Backheader />
      <Iconandinfo action={() => console.log("From Bills and payment")} Icon={Bankblueicon} title="Mobile Airtime & Data" info="Airtime and data from your network."  />


    </Mainwrapper>
  )
}

export default Billsandutility

const styles = StyleSheet.create({})