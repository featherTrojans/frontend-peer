import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTS, fontsize, icons } from '../../constants'
import Custombutton from '../Custombutton/Custombutton'
const {Purplechaticon, Editicon} = icons

const Withdrawinfo = ({openTransationSummary}) => {
  
  return (
    <View>
      <View style={{ alignItems: 'center', marginBottom: 40}}>
        <View style={{width: 48, height: 48, borderRadius: 48/2, justifyContent: 'center', alignItems: "center", backgroundColor: COLORS.blue9, marginBottom: 22}}>
          <Text style={{...fontsize.bbsmall, color: COLORS.white, ...FONTS.medium}}>D</Text>
        </View>
        <Text style={{...fontsize.small, ...FONTS.medium, color: COLORS.blue9}}>Damilare Seyinde</Text>
        <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.halfBlack, marginTop: 7}}>12 Mins Away</Text>
      </View>


        <Text style={{...fontsize.smallest, color: COLORS.blue9, ...FONTS.regular, marginBottom: 10}}>Meetup Point (your comfort/safe zone)</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20}}>
            <View>
            <Text style={{...fontsize.smallest, color: COLORS.blue9, ...FONTS.regular}}>Gberigbe Field, Gberigbe Ikorodu</Text>
            </View>
            <Editicon />
        </View>
      <Custombutton btntext='Yeah Proceed' onpress={openTransationSummary}/>
    </View>
  )
}

export default Withdrawinfo

const styles = StyleSheet.create({})