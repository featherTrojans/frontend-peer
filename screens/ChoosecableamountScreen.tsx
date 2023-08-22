import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ChoosecableamountScreenStyles } from '../assets/styles/screens'
import { FTCustombutton, FTIconwithtitleandinfo, FTSearchinput, FTTitlepagewrapper } from '../components'
import { redirectTo } from '../utils'
import { icons } from '../constants'

const {Bluecardicon} = icons
const {} = ChoosecableamountScreenStyles

const ChoosecableamountScreen = () => {
  return (
    <FTTitlepagewrapper title='Choose Cable Amount'>
     <FTSearchinput 
      placeholder="Search Biller"
      />



      <FTIconwithtitleandinfo 
      
      bG='red'
      title="XTRA-BB2 50GB (1 Month)"
      info='N24,500'
      onPress={() => redirectTo("cableiuc_screen")}
      Icon={Bluecardicon}
      
      />
      
    </FTTitlepagewrapper>
  )
}

export default ChoosecableamountScreen

const styles = StyleSheet.create({})