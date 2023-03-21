import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTS, fontsize } from '../../constants'

const Headerandsubheader = ({header, subHeader}) => {
  return (
    <View style={{width: "100%"}}>
      <Text style={{...fontsize.xbigger, ...FONTS.bold, color: COLORS.black, marginBottom: 30}}>{header}</Text>
      <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.blue9}}>{subHeader}</Text>
    </View>
  )
}

export default Headerandsubheader

const styles = StyleSheet.create({})