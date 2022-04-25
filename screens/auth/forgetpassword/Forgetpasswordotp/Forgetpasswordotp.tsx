import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import axiosCustom from '../../../../httpRequests/axiosCustom'
import showerror from '../../../../utils/errorMessage'
import Globalmodal from '../../../shared/Globalmodal/Globalmodal'
import Customstatusbar from '../../../shared/Customstatusbar'
import { useToast } from 'react-native-toast-notifications'
import { COLORS, FONTS, fontsize, icons } from '../../../../constants'
import { styles } from '../../verification/Verification.styles'
import { Loader } from '../../../../components'
import { SafeAreaView } from 'react-native-safe-area-context'
import { RFValue } from 'react-native-responsive-fontsize'

   const { Successcheckanimate, Cancelicon } =icons


const Forgetpasswordotp = ({navigation, route}) => {
    const toast = useToast()
    const {email, token} = route.params
    const [time, setTime] = useState<number>(30)
    // const {email, phoneNumber, token} = route.params
    const [loading, setLoading] = useState<boolean>(false)
    const [otpCode, setOtpCode] = useState<any>("")
    const [tokenn, setToken] = useState<string|null>(token)
    const [disable, setDisable] = useState(true)
    
  
      
    useEffect(() => {
      const timer = setInterval(()=>{
        setTime(prevtime =>{
          if(prevtime < 1 ){
            setDisable(false);
            return 0
          }else{
            setDisable(true);
            return prevtime - 1 
          }
        })
      },1000);
      return ()=>{
        clearInterval(timer)
      }
    }, [])
    
    useEffect(()=>{
      // handleResendOTP()
    },[])
  
    const handleSubmit = async ()=>{
      setLoading(true)
      try{
        await axiosCustom.post("auth/verify/code",{code:otpCode},{headers:{token:tokenn!}});
        navigation.navigate("Setnewpassword",{token:tokenn, code:otpCode})
        
        
      }catch(err){
        showerror(toast, err)
      }finally{
        setLoading(false)
      }
    }


    const handleResendOTP = async () => {
      setLoading(true)
      try{
        const response = await axiosCustom.post("auth/resend/code",{email});
        setToken(response?.data?.data?.token)
        setDisable(false)
        setTime(30)
      }catch(err){
        showerror(toast, err)
      }finally{
        setLoading(false)
      }
    }
  
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: COLORS.white}}>
      <View style={[styles.container, {paddingHorizontal: RFValue(25), paddingTop: RFValue(25)}]}>
        <Customstatusbar />
        {/* Closeicon */}
  
  
  
        {loading && <Loader />}
        <TouchableOpacity style={styles.cancelIcon} onPress={()=>navigation.goBack()}>
          <Cancelicon />
        </TouchableOpacity>
        {/* OTP Message information */}
        <View style={styles.otpTextContainer}>
          <Text style={styles.otpMainText}>
            An OTP has been sent to your email - <Text style={styles.otpSubText}>{email}</Text>
          </Text>
        </View>
        {/* Verification input */}
        <View style={styles.otpInputContainer}>
          {/* <OTPInputView
            style={styles.otpInputContainer}
            pinCount={6}
            autoFocusOnLoad
            codeInputFieldStyle={styles.otpInput}
            codeInputHighlightStyle={styles.otpInputActive}
            onCodeFilled={(code) => {
              // You can access the code value here or call any function to get it, ADD Types too
              console.log(`Here is the code ${code}`);
              setOtpCode(parseInt(code))
            }}
          /> */}
          <TextInput keyboardType="number-pad" returnKeyType="done" value={otpCode} onChangeText={(text)=> setOtpCode(text)} style={styles.cutstomOtpInput} maxLength={6}/>
        </View>
        {/* Resend sms duration */}
        <View style={styles.resendAndDuration}>
          <TouchableOpacity 
          disabled={disable} 
          onPress={handleResendOTP}
          >
          <Text style={styles.resendText}>Resend sms in</Text>
          </TouchableOpacity>
          <View>
            <Text style={styles.duration}>00 : {time}s</Text>
          </View>
        </View>
  
        {/* Dashedline */}
        <View style={styles.dashedLine} />
        {/* Change number text */}
        <TouchableOpacity onPress={()=>navigation.goBack()}>
          <Text style={styles.changeNumber}>Change Number?</Text>
        </TouchableOpacity>
  
        {/* Submit button */}
        <View style={styles.btnContainer}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleSubmit}
            style={styles.btnBg}
            // disabled={loading}
          >
            <Text style={styles.btnText}>SUBMIT</Text>
          </TouchableOpacity>
        </View>
      </View>
      </SafeAreaView>
    );
}

export default Forgetpasswordotp
