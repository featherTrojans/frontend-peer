import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Sendingandreceive from '../Send&Receive/Sendingandreceive'
import { COLORS, FONTS, fontsize } from '../../constants'
import Horizontaline from '../Horizontaline/Horizontaline'
import Custombutton from '../Custombutton/Custombutton'
  const RequestSummary = ({withdrawInfo}) => {
  return (
    <View>
      <Text style={{...fontsize.smaller, ...FONTS.medium, color: COLORS.blue9}}>Request Summary</Text>
      <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.grey16, marginTop: 10}}>Kindly confirm all your charges breakdown</Text>


    {/* <Sendingandreceive /> */}
    <View style={{justifyContent: "center", alignItems: "center", marginTop: 35, marginBottom: 40}}>

    <View style={{flexDirection: "row", width: 190, justifyContent: 'center', alignItems: "center", alignContent: "center"}}>
      <View style={{alignItems: "center"}}>
        <View style={{width: 48, height: 48, backgroundColor: COLORS.lightBlue}}/>
        <Text>You</Text>
      </View>
      {/* Separator bg */}
      <View style={{width: 24, height: 24}}/>
      <View />
      <View style={{alignItems: "center"}}>
        <View style={{width: 48, height: 48, backgroundColor: COLORS.lightBlue}}/>
        <Text>{withdrawInfo.fullName}</Text>
      </View>
    </View>
    </View>



    <View style={{flexDirection: "row", justifyContent: 'space-between'}}>
      <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.blue9}}>Withdraw Amount</Text>
      <Text style={{...fontsize.smallest, ...FONTS.medium, color: COLORS.blue9}}>N{withdrawInfo.amount}</Text>
    </View>

    <Horizontaline marginV={20}/>

    <View style={{flexDirection: "row", justifyContent: 'space-between'}}>
      <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.blue9}}>Base Charge </Text>
      <Text style={{...fontsize.smallest, ...FONTS.medium, color: COLORS.purple4}}>+N500.00</Text>
    </View>

    <Horizontaline marginV={20}/>

    <View style={{flexDirection: "row", justifyContent: 'space-between'}}>
      <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.blue9}}>My Added Fee</Text>
      <Text style={{...fontsize.smallest, ...FONTS.medium, color: COLORS.purple4}}>+N50.00</Text>
    </View>

    <Horizontaline marginV={20}/>


    <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.blue9, lineHeight: 27}}>Total amount to pay on meetup</Text>
    <Text style={{marginBottom: 40, marginTop: 16, ...fontsize.smaller, ...FONTS.bold, color: COLORS.green1}}>N50,550.00</Text>


    <Custombutton btntext='Yeah, Continue' onpress={() => console.log("Transacti")} bg={COLORS.blue9}/>

    </View>
  )
}

export default RequestSummary

const styles = StyleSheet.create({})