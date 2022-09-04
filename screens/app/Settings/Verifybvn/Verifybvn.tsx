import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native'
import React, { useRef, useState, useContext } from 'react'
import OTPTextInput from "react-native-otp-textinput";
import LottieView from "lottie-react-native"
import { Custombutton, Horizontaline, Mainwrapper } from '../../../../components'
import { COLORS, FONTS, fontsize, icons } from '../../../../constants'
import axiosCustom from '../../../../httpRequests/axiosCustom';
import { AuthContext } from '../../../../context/AuthContext';
import useAlert from '../../../../utils/useAlerts';
import useCustomModal from '../../../../utils/useCustomModal';
import { RFValue } from 'react-native-responsive-fontsize';


const {Whitebackarrow, Verifiedbvnanimate} = icons


const Verifybvn = ({navigation}) => {
    const { authdata, setAuthData } = useContext(AuthContext);
    const otpInput = useRef(null);
    const [otpCode, setOtpCode] = useState<any>("")
    const [success, setSucess] = useState(false)
    const {successAlert, errorAlert} = useAlert()
    const {CustomModal, openModal} = useCustomModal()
   const handleOTPSubmit = async ()=>{
     try{
      await axiosCustom.post("user/verify/upgrade",{code:otpCode})
      setAuthData({...authdata, userDetails:{userLevel: 2, ...authdata?.userDetails}})
      setSucess(true);
      // successAlert("bvn verification successful")
      openModal()
      // setTimeout(()=>{
      //   navigation.navigate("Settings")
      // },1000)
     }catch(err){
       errorAlert(err)
     }
   } 

  return (
    <Mainwrapper bgColor={COLORS.blue6}>

    <ScrollView style={{ paddingHorizontal: 16, marginTop: 30 }} showsVerticalScrollIndicator={false} bounces={false}>
    
    
    
      <CustomModal>
        <View>
          <View>
          <LottieView source={Verifiedbvnanimate} loop style={{ width: RFValue(264), height: 168,   }}/>
            <Text style={{...fontsize.small, ...FONTS.regular, color: COLORS.blue9, lineHeight: 22}}>Your BVN has been verified successfully and a bank account has been created for you</Text>
          </View>
          <Custombutton btntext='Thanks, Continue' onpress={() => navigation.navigate("Settings")}/>
        </View>
      </CustomModal>



       <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* back arrow */}
          <Pressable
          onPress={() => navigation.goBack()}
            style={({ pressed }) => [
              {
                backgroundColor: pressed ? COLORS.blue8 : COLORS.blue6,
              },
              {width: 30, height: 30,borderRadius: 30/2, justifyContent: "center", alignItems: "center"}
            ]}
          >
            <Whitebackarrow />
          </Pressable>

          <View
            style={{
              padding: 12,
              backgroundColor: COLORS.blue8,
              borderRadius: 20,
            }}
          >
            <Text
              style={{
                ...fontsize.smallest,
                ...FONTS.regular,
                color: COLORS.white,
                lineHeight: 24,
              }}
            >
              No BVN?{" "}
              <Text style={{ ...FONTS.bold, color: COLORS.green1 }}> Skip</Text>
            </Text>
          </View>
        </View>

            
        <View style={{ marginTop: 50 }}>
          <Text
            style={{
              ...fontsize.bmedium,
              ...FONTS.medium,
              lineHeight: 37,
              color: COLORS.white,
              marginBottom: 22,
            }}
          >
            Verify your phone
          </Text>
          <Text
            style={{
              ...fontsize.small,
              ...FONTS.regular,
              color: COLORS.white,
            }}
          >
            A One-Time-Passcode has been sent to the phone number associated with your BVN, kindly input code to verify your BVN and continue to upgrade
          </Text>
        </View>




        <View style={{justifyContent: "center", alignItems: "center", marginVertical: 45}}>
      <View style={{ minWidth: 285, alignItems: "center", justifyContent: "center"}}>


      <OTPTextInput
            ref={otpInput}
            handleTextChange={(text) => setOtpCode(text)}
            inputCount={6}
            // tintColor={COLORS.green1}
            // offTintColor={COLORS.grey6}
            textInputStyle={{
              width: 40,
              height: 50,
              backgroundColor: COLORS.blue8,
              borderWidth: 1,
              borderBottomWidth: 1,
              borderRadius: 4,
              color: COLORS.white,
              ...fontsize.xmedium,
              ...FONTS.regular
            }}
          />
  
      </View>
      </View>



      <View style={{backgroundColor: COLORS.blue8, padding: 20, borderRadius: 15, marginBottom: 30}}>
        <View style={{flexDirection: "row", justifyContent: 'space-between'}}>
            <Text style={{...fontsize.smallest, ...FONTS.medium, color: COLORS.white}}>Resend Code</Text>
            <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.white}}>00 : 30s</Text>
        </View>
        <Horizontaline marginV={18.5} />
        <Text style={{...fontsize.smallest, color: COLORS.white, ...FONTS.regular}}>Incorrect BVN?  <Text style={{color: COLORS.yellow1, ...FONTS.medium}}>Change BVN.</Text></Text>
      </View>

        <Custombutton btntext="Verify" bg={COLORS.green2} onpress={handleOTPSubmit}/>




        </ScrollView>
    </Mainwrapper>
  )
}

export default Verifybvn

const styles = StyleSheet.create({})