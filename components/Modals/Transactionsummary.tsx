import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useContext } from 'react'
import Sendingandreceive from '../Send&Receive/Sendingandreceive'
import { COLORS, FONTS, fontsize, icons } from '../../constants'
import Horizontaline from '../Horizontaline/Horizontaline'
import Custombutton from '../Custombutton/Custombutton'
import amountFormatter from '../../utils/formatMoney'
import { getFirstName, nameSplitter } from '../../utils/nameSplitter'
import { AuthContext } from '../../context/AuthContext'





const {Sendingarrow, Receivingarrow} = icons
  const Transactionsummary = ({openNextModal, info}) => {
    const {authdata} = useContext(AuthContext)


    console.log(info, "here is the info from transaction summary");
    


  return (
    <View>
      <Text style={{...fontsize.smaller, ...FONTS.medium, color: COLORS.blue9}}>Transaction Summary</Text>
      <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.grey16, marginTop: 10}}>You are about to receive payment from  <Text style={{color: COLORS.blue9}}>@loveyjay67</Text></Text>


    {/* <Sendingandreceive /> */}
    <View style={{justifyContent: "center", alignItems: "center", marginTop: 35, marginBottom: 40}}>

    <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: "center",  }}>
      <View style={{alignItems: "center", }}>
        {authdata?.userDetails?.imageUrl ? 
        <Image
        style={{width: 48, height: 48,borderRadius: 48/2, marginBottom: 14}}
        source={{
          uri: authdata?.userDetails?.imageUrl
        }}
      />
        :
        <View style={{width: 48, height: 48, backgroundColor: COLORS.green3, marginBottom: 14, justifyContent: "center", alignItems: "center", borderRadius: 48/2}}>
            <Text style={{...fontsize.smaller, ...FONTS.medium, color: COLORS.green1 }}>{nameSplitter(authdata?.userDetails?.fullName)}</Text>
        </View>
      }
        <Text style={{...fontsize.smaller, ...FONTS.medium, textTransform: "capitalize", color: COLORS.blue9}}>You</Text>
      </View>

      {/* Separator bg */}
      <View style={{marginHorizontal: 32, height: 48,  alignSelf: "center"}}>
          <Sendingarrow />
        <Receivingarrow />
      </View>
        
      <View style={{alignItems: "center"}}>
      <View style={{width: 48, height: 48, backgroundColor: COLORS.purple3, marginBottom: 14, justifyContent: "center", alignItems: "center", borderRadius: 48/2}}>
            <Text style={{...fontsize.smaller, ...FONTS.medium, color: COLORS.purple4 }}>{nameSplitter(info?.fullName)}</Text>
        </View>
        <Text style={{...fontsize.smaller, ...FONTS.medium, textTransform: "capitalize", color: COLORS.blue9}}>{getFirstName(info?.fullName)}</Text>
      </View>
    </View>
    </View>



    <View style={{flexDirection: "row", justifyContent: 'space-between'}}>
      <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.blue9}}>Amount to give</Text>
      <Text style={{...fontsize.smallest, ...FONTS.medium, color: COLORS.blue9}}>N{amountFormatter(info.amount)}</Text>
    </View>

    <Horizontaline marginV={20}/>

    <View style={{flexDirection: "row", justifyContent: 'space-between'}}>
      <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.blue9}}>Base Charge </Text>
      <Text style={{...fontsize.smallest, ...FONTS.medium, color: COLORS.purple4}}>+N{amountFormatter(info.charges)}</Text>
    </View>

    <Horizontaline marginV={20}/>

    <View style={{flexDirection: "row", justifyContent: 'space-between'}}>
      <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.blue9}}>My Added fee</Text>
      <Text style={{...fontsize.smallest, ...FONTS.medium, color: COLORS.purple4}}>+N{amountFormatter(info.negotiatedFee)}</Text>
    </View>

    <Horizontaline marginV={20}/>

    {/* <View style={{flexDirection: "row", justifyContent: 'space-between'}}>
      <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.blue9}}>Feather Commission (1%)</Text>
      <Text style={{...fontsize.smallest, ...FONTS.medium, color: COLORS.red4}}>-N20.00</Text>
    </View>

    <Horizontaline marginV={20}/> */}


    <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.blue9, lineHeight: 27}}>{true? "Total Amount to pay on meetup":"Amount you will receive in your wallet"}</Text>
    <Text style={{marginBottom: 40, marginTop: 16, ...fontsize.smaller, ...FONTS.bold, color: COLORS.green1}}>N{amountFormatter(Number(info.amount) + Number(info.charges) + Number(info.negotiatedFee))}</Text>


    <Custombutton btntext='Great, Continue' onpress={openNextModal} bg={COLORS.blue9}/>





    </View>
  )
}

export default Transactionsummary

const styles = StyleSheet.create({})