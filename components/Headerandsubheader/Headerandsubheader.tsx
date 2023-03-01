import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTS, fontsize } from '../../constants'

const Headerandsubheader = () => {
  return (
    <View style={{width: "85%"}}>
      <Text style={{...fontsize.xbigger, ...FONTS.bold, color: COLORS.black, marginBottom: 30}}>Merchant Withdrawal</Text>
      <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.blue9}}>Kindly input your active phone number that you can reach.</Text>
    </View>
  )
}

export default Headerandsubheader

const styles = StyleSheet.create({})