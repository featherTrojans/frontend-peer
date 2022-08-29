import React, {useState, useEffect, useRef} from "react"
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity, StatusBar } from "react-native";
import LottieView from 'lottie-react-native'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import OTPTextInput from "react-native-otp-textinput";
import { COLORS, FONTS, fontsize, icons } from "../../../constants";
import { AuthContext } from "../../../context/AuthContext";
import axiosCustom from "../../../httpRequests/axiosCustom";
import { styles } from "./Verification.styles";
import { Backheader, Bottombtn, Custombutton, Loader } from "../../../components";
import { useToast } from "react-native-toast-notifications";
import showerror from "../../../utils/errorMessage";
import Globalmodal from "../../shared/Globalmodal/Globalmodal";
import Customstatusbar from "../../shared/Customstatusbar";
import { SafeAreaView } from "react-native-safe-area-context";
import { RFValue } from "react-native-responsive-fontsize";

// import { VerificationContainer, VerificationText } from "./Verification.styles";

const { Cancelicon, Successcheckanimate } = icons;

const Verification = ({route,navigation}) => {
  const toast = useToast()
  const [time, setTime] = useState<number>(30)
  const {email, phoneNumber, token} = route.params
  const [loading, setLoading] = useState<boolean>(false)
  const [otpCode, setOtpCode] = useState<any>("")
  const [tokenn, setToken] = useState<string|null>(token)
  const [disable, setDisable] = useState(true)
  const [showModal, setShowModal] = useState<boolean>(false)
  const otpInput = useRef(null);

    
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
      // setShowModal(true)
     return navigation.navigate("Security",{token:tokenn})
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
    <SafeAreaView style={styles.container}>
      <Customstatusbar />


      <Backheader title="Verify Phone Number"/>
      <View style={{paddingHorizontal: 25, flex: 1}}>



      {/* <Globalmodal
        showState={showModal}
        onBgPress={() => setShowModal(true)}
        btnFunction={() => {
          setShowModal(false)
          navigation.navigate("Security",{token:tokenn})
        }}
        btnText="Continue"
      >
        <View style={{marginBottom: RFValue(50), justifyContent: 'center', alignItems: 'center', marginHorizontal: 85}}>
            <LottieView source={Successcheckanimate} style={{width: 148, height: 148}} autoPlay loop/>
            <Text style={{...fontsize.bsmall, ...FONTS.regular, marginTop: RFValue(17), textAlign: 'center'}}>Your number has been successfully verified</Text>
        </View>
      </Globalmodal> */}



      {loading && <Loader />}
   
      

      <View>
        <Text style={{...fontsize.bsmall, ...FONTS.regular, color: COLORS.black, lineHeight: 20}}>Enter OTP sent to your device</Text>
        <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.grey16, lineHeight: 20, marginTop: 15,}}>An OTP has been sent to you via SMS to your phone number - {phoneNumber}, and to your email - {email}</Text>
      </View>



      {/* Verification input */}

      <View style={{justifyContent: "center", alignItems: "center", marginVertical: 40}}>
      <View style={{ minWidth: 285, alignItems: "center", justifyContent: "center"}}>


      <OTPTextInput
            ref={otpInput}
            handleTextChange={(text) => setOtpCode(text)}
            inputCount={5}
            tintColor={COLORS.green1}
            offTintColor={COLORS.grey6}
            textInputStyle={{
              width: 40,
              height: 50,
              backgroundColor: COLORS.white,
              borderWidth: 1,
              borderBottomWidth: 1,
              borderRadius: 4,
            }}
          />
        {/* <TextInput 
        keyboardType="number-pad" 
        returnKeyType="done" 
        value={otpCode} 
        onChangeText={(text)=> setOtpCode(text)} 
        style={styles.cutstomOtpInput} 
        maxLength={6}
        /> */}
      </View>
      </View>




      <View style={{backgroundColor: COLORS.white, padding: 20, borderRadius: 15, marginBottom: 22}}>

      
      {/* Resend sms duration */}
      <View style={styles.resendAndDuration}>
        <TouchableOpacity disabled={disable} onPress={handleResendOTP}>
        <Text style={styles.resendText}>Resend sms in</Text>
        </TouchableOpacity>
          <Text style={styles.duration}>00 : {time}s</Text>
      </View>



      {/* Dashedline */}
      <View style={styles.dashedLine} />
      {/* Change number text */}
      <TouchableOpacity onPress={()=>navigation.goBack()}>
        <Text style={styles.changeNumber}>Incorrect Number? <Text style={{color: COLORS.blue9}}>Change Number</Text></Text>
      </TouchableOpacity>

      </View>



      <Custombutton btntext="Verify" onpress={handleSubmit} disable={loading} />
 




      </View>
    </SafeAreaView>
  );
};

export default Verification;
