import { StyleSheet, Text, View } from 'react-native'
import React, { useMemo } from 'react'
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import { COLORS, FONTS, fontsize, icons } from '../../../constants'
import Horizontaline from '../../../components/Horizontaline/Horizontaline'
import Custombutton from '../../../components/Custombutton/Custombutton'
import Map from '../../shared/map/Map'
import { Backheader } from '../../../components';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { TouchableOpacity } from 'react-native-gesture-handler';


const {Purplechaticon, Renegotiateicon, Cancelrequest, Greenphoneicon, Editicon} = icons

interface withdrawobj {
  "agent": string,
  "agentUsername": string,
  "amount":string,
  "charges": string,
  "createdAt": string,
  "meetupPoint": string,
  "negotiatedFee": string,
  "phoneNumber": string,
  "reference": string,
  "status": string,
  "total": string,
}

const Requesterinfo = ({navigation,route}) => {
  const info = route.params as withdrawobj
  console.log("----------------------INFO---------------------")
  console.log(info)

  const snapPoints = useMemo(() => ['60%', '85%'], []);
  return (

    <View style={{paddingTop: getStatusBarHeight(true), flex: 1}}>
    
      <Map />
      <Backheader title="Withdraw"/>
    
    <View style={{flex: 1, justifyContent: 'flex-end', paddingHorizontal: 15, paddingBottom: getBottomSpace()+20}}>
  <BottomSheet
  snapPoints={snapPoints}
  >

    <BottomSheetScrollView showsVerticalScrollIndicator={false}>

    <View style={{paddingHorizontal: 15, marginBottom: 100}}>
      <View style={{ alignItems: 'center', marginBottom: 40}}>
        <View style={{width: 48, height: 48, borderRadius: 48/2, justifyContent: 'center', alignItems: "center", backgroundColor: COLORS.blue9, marginBottom: 22}}>
          <Text style={{...fontsize.bbsmall, color: COLORS.white, ...FONTS.medium}}>D</Text>
        </View>
        <Text style={{...fontsize.small, ...FONTS.medium, color: COLORS.blue9}}>{info.agent}</Text>
        <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.halfBlack, marginTop: 7}}>{info.meetupPoint} Mins Away</Text>
      </View>


      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{...fontsize.smallest, color: COLORS.blue9, ...FONTS.regular}}>Amount</Text>
        <Text style={{...fontsize.smallest, color: COLORS.blue9, ...FONTS.regular}}>+N{info.amount}</Text>
      </View>
      <Horizontaline marginV={20}/>
      <Text style={{marginBottom: 16, ...fontsize.smallest, ...FONTS.regular}}>Total Charge (Base Charge + Your Charge)</Text>
      <Text style={{...fontsize.smaller, ...FONTS.bold, color: COLORS.purple2}}>N{info.amount + info.charges + info.negotiatedFee}</Text>

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
        <View style={{flexDirection: 'row', alignItems: "center"}}>
          <View style={{width: 32, height: 32, backgroundColor: COLORS.purple3, borderRadius: 32/2, justifyContent: "center", alignItems: 'center'}}>
            <Purplechaticon />
          </View>
          <View style={{marginLeft: 18}}>
            <Text style={{...fontsize.smallest, ...FONTS.medium, color: COLORS.blue9}}>Chat {info.agent.split(" ")}</Text>
            <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.grey2, marginTop: 5}}>Discuss conversations via chat</Text>
          </View>
        </View>
      </View>

      <Horizontaline marginV={21}/>




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
  <Custombutton btntext='Accept Request' onpress={() => navigation.navigate("Safetycautions")}/>
  </View>



    </View>

  )
}

export default Requesterinfo

const styles = StyleSheet.create({})