import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MywalletScreenStyles } from '../assets/styles/screens'
import { FTTitlepagewrapper } from '../components'
import { COLORS, FONTS, fontsize } from '../constants'

const {accountLeveltext, levelTypeText} = MywalletScreenStyles



const MywalletScreen = () => {
  return (
    <FTTitlepagewrapper title='My Wallet'>
      <View style={{alignSelf: "center"}}>
        <Text style={accountLeveltext}>Account Level</Text>
        <View>
          <Text style={levelTypeText}>Newbie Level</Text>
        </View>
      </View>
    </FTTitlepagewrapper>
  )
}

export default MywalletScreen

const styles = StyleSheet.create({})