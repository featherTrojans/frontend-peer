import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import { COLORS, FONTS, fontsize, icons } from '../../../constants'
import Horizontaline from '../../../components/Horizontaline/Horizontaline'
import Custombutton from '../../../components/Custombutton/Custombutton'
import Map from '../../shared/map/Map'
import { Backheader, Loader, Negotiatecharge, Successmodal } from '../../../components';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import axiosCustom from '../../../httpRequests/axiosCustom';
import useAlert from '../../../utils/useAlerts';
import { makePhoneCall } from '../../../utils/userDeviceFunctions';
import amountFormatter from '../../../utils/formatMoney';
import { nameSplitter } from '../../../utils/nameSplitter';
import useCustomModal from '../../../utils/useCustomModal';


const {Purplechaticon, Renegotiateicon, Cancelrequest, Greenphoneicon, Editicon} = icons

interface withdrawobj {
  "fullName": string,
  "username": string,
  "amount":string,
  "charges": string,
  "createdAt": string,
  "meetupPoint": string,
  "negotiatedFee": string,
  "phoneNumber": string,
  "reference": string,
  "status": string,
  "total": string,
  userUid:string
}

enum comingFromEnum { withdrawPending, withdrawAccepted, depositPending, depositAccepted}

const Requesterinfo = ({navigation,route}) => {
  const info = route.params.info as withdrawobj
  const comingFrom = route.params.comingFrom as comingFromEnum
  const [screeninfoandprops, setScreeninfoandprops] = useState<{}>({})
  const [loading, setLoading] = useState(false);
  const { CustomModal:NegotiateChargeModal ,openModal: openNegotiateChargeModal, closeModal:closeNegotiateChargeModal} = useCustomModal()
  const { CustomModal:SuccessCutomModal,openModal: openSuccessModal, closeModal:closeSuccessModal} = useCustomModal()
  const {errorAlert, blueAlert} = useAlert()
  const snapPoints = useMemo(() => ['60%', '85%'], []);
  

  useEffect(()=>{
    const datatosort:any = {
      bottomButton: null,
    }
    switch (comingFrom){
      case comingFromEnum.withdrawPending:
        datatosort.bottomButton = null
        break
      case comingFromEnum.withdrawAccepted:
        datatosort.bottomButton = <Custombutton bg="#11141A" btntext='Make Payment' onpress={() => navigation.navigate("Safetycautions",{info, comingFrom})}/>
        break
      case comingFromEnum.depositPending:
        datatosort.bottomButton = <Custombutton btntext='Accept Request' onpress={handleAcceptRequest}/>
        break
      case comingFromEnum.depositAccepted :
        datatosort.bottomButton = <Custombutton bg="#11141A" btntext='Receive Payment' onpress={() => navigation.navigate("Safetycautions",{info, comingFrom})}/>
        break
      default:
        datatosort.bottomButton = null
    }
    setScreeninfoandprops(datatosort)
  },[])

  
  const handleAcceptRequest = async () =>{
    setLoading(true)
    try{
      await axiosCustom.put(`/request/accept/${info.reference}`)
      navigation.navigate("Home")
    }catch(err){
      errorAlert(err)
    }finally{
      setLoading(false)
    }
  }

  const handleNextNegotiateCharge = async (amount)=>{
    try {
      setLoading(true)
     await axiosCustom.put('/request/negotiate', {negotiatedFee: amount, reference: info?.reference})
     openSuccessModal()
     closeNegotiateChargeModal()
    }catch(err){
      errorAlert(err)
    }
    setLoading(false)
  }
  const handleSuccessBtn = ()=>{
    closeSuccessModal()
    navigation.navigate("Home")
  }

  const handleOpenNegotiateModal = ()=>{
    blueAlert('Renegotiate the charges for this transaction and the requester will be notified immediately.')
    openNegotiateChargeModal()
  }

  return (
    <View style={{paddingTop: getStatusBarHeight(true), flex: 1}}>
      {/* <Map /> */}
      <Backheader title="Withdraw"/>
    {loading && <Loader />}

    <SuccessCutomModal>
      <Successmodal btnText='Yeah, Proceed' successMsg='Renegotiate Charge successful' btnFunction={handleSuccessBtn}  />
    </SuccessCutomModal>
    <NegotiateChargeModal>
        <Negotiatecharge info={info} defaultAmount={info.negotiatedFee} openNextModal={handleNextNegotiateCharge} />
      </NegotiateChargeModal>
   
    <View style={{flex: 1, justifyContent: 'flex-end', paddingHorizontal: 15, paddingBottom: getBottomSpace()+20}}>
  <BottomSheet snapPoints={snapPoints}>
    <BottomSheetScrollView showsVerticalScrollIndicator={false}>
    <View style={{paddingHorizontal: 15, marginBottom: 100}}>
      <View style={{ alignItems: 'center', marginBottom: 40}}>
        <View style={{width: 48, height: 48, borderRadius: 48/2, justifyContent: 'center', alignItems: "center", backgroundColor: COLORS.blue9, marginBottom: 22}}>
          <Text style={{...fontsize.bbsmall, color: COLORS.white, ...FONTS.medium}}>{nameSplitter(info.fullName)}</Text>
        </View>
        <Text style={{...fontsize.small, ...FONTS.medium, color: COLORS.blue9}}>{info.fullName}</Text>
        <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.halfBlack, marginTop: 7}}>{info.meetupPoint} Mins Away</Text>
      </View>


      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{...fontsize.smallest, color: COLORS.blue9, ...FONTS.regular}}>Amount</Text>
        <Text style={{...fontsize.smallest, color: COLORS.blue9, ...FONTS.regular}}>+N{amountFormatter(info.amount)}</Text>
      </View>
      <Horizontaline marginV={20}/>
      <Text style={{marginBottom: 16, ...fontsize.smallest, ...FONTS.regular}}>Total Charge (Base Charge + Your Charge)</Text>
      <Text style={{...fontsize.smaller, ...FONTS.bold, color: COLORS.purple2}}>N{amountFormatter((Number(info.amount) + Number(info.charges) + Number(info.negotiatedFee)).toString())} </Text>

      <View style={{marginTop: 32, marginBottom: 40}}>
          <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.blue9}}>Meetup Point (your comfort/safe zone)</Text>
          <View style={{marginTop: 15}}>
            <View>
            <Text style={{...fontsize.smallest, ...FONTS.medium, color: COLORS.blue9}}>{info.meetupPoint}</Text>
            </View>
          </View>
      </View>




      <Text style={{ ...fontsize.smaller, ...FONTS.medium, color: COLORS.grey16}}>More Actions</Text>


    <View style={{marginVertical: 30}}>
      <View>
        <TouchableOpacity onPress={()=>navigation.navigate("Chatsdm",{ userInfo: info})} style={{flexDirection: 'row', alignItems: "center"}}>
          <View style={{width: 32, height: 32, backgroundColor: COLORS.purple3, borderRadius: 32/2, justifyContent: "center", alignItems: 'center'}}>
            <Purplechaticon />
          </View>
          <View style={{marginLeft: 18}}>
            <Text style={{...fontsize.smallest, ...FONTS.medium, color: COLORS.blue9}}>Chat {info.fullName.split(" ")[0]}</Text>
            <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.grey2, marginTop: 5}}>Discuss conversations via chat</Text>
          </View>
        </TouchableOpacity>
      </View>

      <Horizontaline marginV={21}/>




    {comingFromEnum.withdrawAccepted === comingFrom ?
    
    <View>
    <TouchableOpacity onPress={()=>makePhoneCall(info?.phoneNumber)} style={{flexDirection: 'row', alignItems: "center"}}>
      <View style={{width: 32, height: 32, backgroundColor: COLORS.green3, borderRadius: 32/2, justifyContent: "center", alignItems: 'center'}}>
      <Greenphoneicon />

      </View>
      <View style={{marginLeft: 18}}>
        <Text style={{...fontsize.smallest, ...FONTS.medium, color: COLORS.blue9}}>Phone Call</Text>
        <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.grey2, marginTop: 5}}>Make a phone call to communicate</Text>
      </View>
    </TouchableOpacity>
  </View>
  :
  <View>
        <TouchableOpacity onPress={handleOpenNegotiateModal} style={{flexDirection: 'row', alignItems: "center"}}>
          <View style={{width: 32, height: 32, backgroundColor: COLORS.yellow5, borderRadius: 32/2, justifyContent: "center",alignItems: "center"}}>
            <Renegotiateicon />
          </View>
          <View style={{marginLeft: 18}}>
            <Text style={{...fontsize.smallest, ...FONTS.medium, color: COLORS.blue9}}>Renegotiate Charges </Text>
            <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.grey2, marginTop: 5}}>Send in a new charge for this request</Text>
          </View>
        </TouchableOpacity>
      </View>
  
  
  }
      

      <Horizontaline marginV={21}/>

      <View>
        <TouchableOpacity onPress={()=>navigation.navigate("Cancelrequest", info.reference)} style={{flexDirection: 'row', alignItems: "center"}}>
          <View style={{width: 32, height: 32, backgroundColor: COLORS.red2, borderRadius: 32/2, justifyContent: "center", alignItems: 'center'}}>
            <Cancelrequest />
          </View>
          <View style={{marginLeft: 18}}>
            <Text style={{...fontsize.smallest, ...FONTS.medium, color: COLORS.blue9}}>Cancel Request</Text>
            <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.grey2, marginTop: 5}}>Cancel this transaction right now</Text>
          </View>
        </TouchableOpacity>
      </View>
      </View>





    </View>
    </BottomSheetScrollView>
    

  </BottomSheet>
  {
    screeninfoandprops?.bottomButton
  }
  
  </View>



    </View>

  )
}

export default Requesterinfo

const styles = StyleSheet.create({})