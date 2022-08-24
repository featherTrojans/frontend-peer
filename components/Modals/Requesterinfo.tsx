import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, FONTS, fontsize, icons } from '../../constants'
import Horizontaline from '../Horizontaline/Horizontaline'
import Custombutton from '../Custombutton/Custombutton'
const {Purplechaticon, Renegotiateicon, Cancelrequest, Greenphoneicon, Editicon} = icons

const Requesterinfo = () => {
  return (
    <View>
      <View style={{ alignItems: 'center', marginBottom: 40}}>
        <View style={{width: 48, height: 48, borderRadius: 48/2, justifyContent: 'center', alignItems: "center", backgroundColor: COLORS.blue9, marginBottom: 22}}>
          <Text style={{...fontsize.bbsmall, color: COLORS.white, ...FONTS.medium}}>D</Text>
        </View>
        <Text style={{...fontsize.small, ...FONTS.medium, color: COLORS.blue9}}>Damilare Seyinde</Text>
        <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.halfBlack, marginTop: 7}}>12 Mins Away</Text>
      </View>


      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{...fontsize.smallest, color: COLORS.blue9, ...FONTS.regular}}>Amount</Text>
        <Text style={{...fontsize.smallest, color: COLORS.blue9, ...FONTS.regular}}>+N50,000.00</Text>
      </View>
      <Horizontaline marginV={20}/>
      <Text style={{marginBottom: 16, ...fontsize.smallest, ...FONTS.regular}}>Total Charge (Base Charge + Your Charge)</Text>
      <Text style={{...fontsize.smaller, ...FONTS.bold, color: COLORS.purple2}}>N550.00</Text>

      <View style={{marginTop: 32, marginBottom: 40}}>
          <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.blue9}}>Meetup Point (your comfort/safe zone)</Text>
          <View style={{marginTop: 15}}>
            <View>
              {/* dot icon */}
            <Text style={{...fontsize.smallest, ...FONTS.medium, color: COLORS.blue9}}>Gberigbe Field, Gberigbe Ikorodu</Text>
            </View>
              {/* <Editicon /> */}
          </View>
      </View>


      {/* More Actions */}


      <Text style={{ ...fontsize.smaller, ...FONTS.medium, color: COLORS.grey16}}>More Actions</Text>


    <View style={{marginVertical: 30}}>
      <View>
        <View style={{flexDirection: 'row', alignItems: "center"}}>
          <View style={{width: 32, height: 32, backgroundColor: COLORS.purple3, borderRadius: 32/2, justifyContent: "center", alignItems: 'center'}}>
            <Purplechaticon />
          </View>
          <View style={{marginLeft: 18}}>
            <Text style={{...fontsize.smallest, ...FONTS.medium, color: COLORS.blue9}}>Chat Damilare</Text>
            <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.grey2, marginTop: 5}}>Discuss conversations via chat</Text>
          </View>
        </View>
        {/* icon with arrow */}
      </View>

      <Horizontaline marginV={21}/>




   {/* To show phone call if the request has already been accepted */}
    {false ?
    
    <View>
    <View style={{flexDirection: 'row', alignItems: "center"}}>
      <View style={{width: 32, height: 32, backgroundColor: COLORS.green3, borderRadius: 32/2, justifyContent: "center", alignItems: 'center'}}>
      <Greenphoneicon />

      </View>
      <View style={{marginLeft: 18}}>
        <Text style={{...fontsize.smallest, ...FONTS.medium, color: COLORS.blue9}}>Phone Call</Text>
        <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.grey2, marginTop: 5}}>Make a phone call to communicate</Text>
      </View>
    </View>
    {/* icon with arrow */}
  </View>
  :
  <View>
        <View style={{flexDirection: 'row', alignItems: "center"}}>
          <View style={{width: 32, height: 32, backgroundColor: COLORS.yellow5, borderRadius: 32/2, justifyContent: "center",alignItems: "center"}}>
            <Renegotiateicon />
          </View>
          <View style={{marginLeft: 18}}>
            <Text style={{...fontsize.smallest, ...FONTS.medium, color: COLORS.blue9}}>Renegotiate Charges </Text>
            <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.grey2, marginTop: 5}}>Send in a new charge for this request</Text>
          </View>
        </View>
        {/* icon with arrow */}
      </View>
  
  
  }
      

      <Horizontaline marginV={21}/>

      <View>
        <View style={{flexDirection: 'row', alignItems: "center"}}>
          <View style={{width: 32, height: 32, backgroundColor: COLORS.red2, borderRadius: 32/2, justifyContent: "center", alignItems: 'center'}}>
            <Cancelrequest />
          </View>
          <View style={{marginLeft: 18}}>
            <Text style={{...fontsize.smallest, ...FONTS.medium, color: COLORS.blue9}}>Cancel Request</Text>
            <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.grey2, marginTop: 5}}>Cancel this transaction right now</Text>
          </View>
        </View>
        {/* icon with arrow */}
      </View>
      </View>

      <Custombutton btntext='Accept Request' onpress={() => console.log("Requsest details")}/>




    </View>
  )
}

export default Requesterinfo

const styles = StyleSheet.create({})