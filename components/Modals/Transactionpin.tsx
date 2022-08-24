import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTS, fontsize } from '../../constants'
import Horizontaline from '../Horizontaline/Horizontaline'

const Transactionpin = () => {
  return (
    <View>
        <View style={{justifyContent: "center", alignItems: "center"}}>
            <View style={{width: 104, height: 104, backgroundColor: COLORS.lightBlue}}/>
        </View>
        <View style={{marginTop: 34.5}}>
      <Text style={{textAlign: "center", lineHeight: 22, ...fontsize.smaller, ...FONTS.medium, color: COLORS.blue9}}>Kindly input your transaction pin on Susan’s device to complete the transaction, don’t worry it’s safe✌🏽</Text>
      
        <Horizontaline marginV={20}/>
        <Text style={{color: COLORS.red4, textAlign: "center", ...fontsize.smallest, ...FONTS.medium}}>Cancel Request</Text>
      
      </View>
    </View>
  )
}

export default Transactionpin
