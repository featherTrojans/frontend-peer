import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import Sendingandreceive from '../Send&Receive/Sendingandreceive'
import { COLORS, FONTS, fontsize } from '../../constants'
import Horizontaline from '../Horizontaline/Horizontaline'
import Custombutton from '../Custombutton/Custombutton'
import axiosCustom from '../../httpRequests/axiosCustom'
import { LocationContext } from '../../context/LocationContext'
import useAlert from '../../utils/useAlerts'
const RequestSummary = ({withdrawInfo, baseCharge, addedFee, openNextModal}) => {

const {errorAlert} = useAlert()
const { coords } = useContext(LocationContext);

const handleCreateWithdrawal = async ()=>{

    const data = {
        amount: withdrawInfo.amount,
        charges: baseCharge,
        agentUsername: withdrawInfo.username,
        agent: withdrawInfo.fullName,
        statusId: withdrawInfo.reference,
        meetupPoint: coords.locationText,
        negotiatedFee: addedFee,
      };
      console.log(data);
      try{
          await axiosCustom.post("/request/create", data);
          openNextModal()
      }catch(err){
        errorAlert(err)
      }
}

return (
    <View>
      <Text style={{...fontsize.smaller, ...FONTS.medium, color: COLORS.blue9}}>Request Summary</Text>
      <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.grey16, marginTop: 10}}>Kindly confirm all your charges breakdown</Text>

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
      <Text style={{...fontsize.smallest, ...FONTS.medium, color: COLORS.purple4}}>+N{baseCharge}</Text>
    </View>

    <Horizontaline marginV={20}/>

    <View style={{flexDirection: "row", justifyContent: 'space-between'}}>
      <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.blue9}}>My Added Fee</Text>
      <Text style={{...fontsize.smallest, ...FONTS.medium, color: COLORS.purple4}}>+N{addedFee}</Text>
    </View>

    <Horizontaline marginV={20}/>


    <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.blue9, lineHeight: 27}}>Total amount to pay on meetup</Text>
    <Text style={{marginBottom: 40, marginTop: 16, ...fontsize.smaller, ...FONTS.bold, color: COLORS.green1}}>N{Number(addedFee) + Number(baseCharge) + Number(withdrawInfo.amount)}</Text>


    <Custombutton btntext='Yeah, Continue' onpress={handleCreateWithdrawal} bg={COLORS.blue9}/>

    </View>
  )
}

export default RequestSummary

const styles = StyleSheet.create({})