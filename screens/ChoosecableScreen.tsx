import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ChoosecableScreenStyles } from '../assets/styles/screens'
import { FTIconwithtitleandinfo, FTSearchinput, FTTitlepagewrapper } from '../components'
import { redirectTo } from '../utils'
import { COLORS, icons } from '../constants'

const { Cableicon} = icons
const {} = ChoosecableScreenStyles

const ChoosecableScreen = () => {
  return (
    <FTTitlepagewrapper title='Choose Cable'>
      <FTSearchinput 
      placeholder="Search Biller"
      />
      <FTIconwithtitleandinfo 
      bG={COLORS.Tgreen2}
      title="Send to new account"
      info='Start a new cable tv subscription purchase'
      onPress={() => redirectTo("choosecablereceiver_screen")}
      Icon={Cableicon}
      />

    </FTTitlepagewrapper>
  )
}

export default ChoosecableScreen

const styles = StyleSheet.create({})