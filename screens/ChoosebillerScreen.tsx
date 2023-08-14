import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ChoosebillerScreenStyles } from '../assets/styles/screens'
import { FTIconwithtitleandinfo, FTTitlepagewrapper } from '../components'
import { redirectTo } from '../utils'
import { COLORS, icons } from '../constants'




const {Electricityicon} = icons
const {} = ChoosebillerScreenStyles

const ChoosebillerScreen = () => {
  return (
    <FTTitlepagewrapper title='Choose Biller'>
      <FTIconwithtitleandinfo 
      bG={COLORS.Tyellow}
      title="Pay a new bill"
      info='Start a new electricity purchase'
      onPress={() => redirectTo("billerstate_screen")}
      Icon={Electricityicon}
      
      />
    </FTTitlepagewrapper>
  )
}

export default ChoosebillerScreen

const styles = StyleSheet.create({})