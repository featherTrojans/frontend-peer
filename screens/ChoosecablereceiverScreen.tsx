import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ChoosecablereceiverScreenStyles } from '../assets/styles/screens'
import { FTIconwithtitleandinfo, FTSearchinput, FTTitlepagewrapper } from '../components'
import { redirectTo } from '../utils'
import { icons } from '../constants'


const {Bluecardicon} = icons

const {} = ChoosecablereceiverScreenStyles
const ChoosecablereceiverScreen = () => {
  return (
    <FTTitlepagewrapper title='Choose Cable Type'>
      <FTSearchinput 
      placeholder="Search Biller"
      />
      <FTIconwithtitleandinfo 
      bG='red'
      title="DSTV"
      onPress={() => redirectTo("choosecableamount_screen")}
      Icon={Bluecardicon}
      
      />
    </FTTitlepagewrapper>
  )
}

export default ChoosecablereceiverScreen

const styles = StyleSheet.create({})