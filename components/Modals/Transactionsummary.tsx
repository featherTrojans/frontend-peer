import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Sendingandreceive from '../Send&Receive/Sendingandreceive'
import { COLORS, FONTS, fontsize, icons } from '../../constants'
import Horizontaline from '../Horizontaline/Horizontaline'
import Custombutton from '../Custombutton/Custombutton'







const {Sendingarrow, Receivingarrow} = icons
  const Transactionsummary = () => {
  return (
    <View>
      <Text style={{...fontsize.smaller, ...FONTS.medium, color: COLORS.blue9}}>Transaction Summary</Text>
      <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.grey16, marginTop: 10}}>You are about to receive payment from  <Text style={{color: COLORS.blue9}}>@loveyjay67</Text></Text>


    {/* <Sendingandreceive /> */}
    <View style={{justifyContent: "center", alignItems: "center", marginTop: 35, marginBottom: 40}}>

    <View style={{flexDirection: "row", width: 190, justifyContent: 'center', alignItems: "center", alignContent: "center"}}>
      <View style={{alignItems: "center"}}>
        <View style={{width: 48, height: 48, backgroundColor: COLORS.lightBlue, borderRadius: 24}}/>
        <Text style={{...fontsize.smaller, ...FONTS.medium, marginTop: 14, color: COLORS.grey16}}>You</Text>
      </View>
      {/* Separator bg */}
      <View style={{marginHorizontal: 32}}>
      <Sendingarrow />
        <Receivingarrow />
      </View>
      
      <View style={{alignItems: "center"}}>
        <View style={{width: 48, height: 48, backgroundColor: COLORS.lightBlue, borderRadius: 24}}/>
        <Text style={{...fontsize.smaller, ...FONTS.medium, marginTop: 14, color: COLORS.grey16}}>Damilare</Text>
      </View>
    </View>
    </View>



    <View style={{flexDirection: "row", justifyContent: 'space-between'}}>
      <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.blue9}}>Amount to give</Text>
      <Text style={{...fontsize.smallest, ...FONTS.medium, color: COLORS.blue9}}>N50,00.00</Text>
    </View>

    <Horizontaline marginV={20}/>

    <View style={{flexDirection: "row", justifyContent: 'space-between'}}>
      <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.blue9}}>Base Charge </Text>
      <Text style={{...fontsize.smallest, ...FONTS.medium, color: COLORS.purple4}}>+N500.00</Text>
    </View>

    <Horizontaline marginV={20}/>

    <View style={{flexDirection: "row", justifyContent: 'space-between'}}>
      <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.blue9}}>Negotiated Fee</Text>
      <Text style={{...fontsize.smallest, ...FONTS.medium, color: COLORS.purple4}}>+N50.00</Text>
    </View>

    <Horizontaline marginV={20}/>

    <View style={{flexDirection: "row", justifyContent: 'space-between'}}>
      <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.blue9}}>Feather Commission (1%)</Text>
      <Text style={{...fontsize.smallest, ...FONTS.medium, color: COLORS.red4}}>-N20.00</Text>
    </View>

    <Horizontaline marginV={20}/>


    <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.blue9, lineHeight: 27}}>Amount you will receive in your wallet</Text>
    <Text style={{marginBottom: 40, marginTop: 16, ...fontsize.smaller, ...FONTS.bold, color: COLORS.green1}}>N50550.00</Text>


    <Custombutton btntext='Great, Continue' onpress={() => console.log("Transaction summary")} bg={COLORS.blue9}/>





    </View>
  )
}

export default Transactionsummary

const styles = StyleSheet.create({})