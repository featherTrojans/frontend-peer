import {useState, useEffect} from "react"
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity, StatusBar } from "react-native";
import LottieView from 'lottie-react-native'
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { COLORS, FONTS, fontsize, icons } from "../../../constants";
import { AuthContext } from "../../../context/AuthContext";
import axiosCustom from "../../../httpRequests/axiosCustom";
import { styles } from "./Verification.styles";
import { Bottombtn, Loader } from "../../../components";
import { useToast } from "react-native-toast-notifications";
import showerror from "../../../utils/errorMessage";
import Globalmodal from "../../shared/Globalmodal/Globalmodal";
import Customstatusbar from "../../shared/Customstatusbar";

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
      const response = await axiosCustom.post("auth/verify/code",{code:otpCode},{headers:{token:tokenn!}});
      // navigation.navigate("Security",{token:tokenn})
      setShowModal(true)
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
    <View style={styles.container}>
      <Customstatusbar />
      {/* Closeicon */}

      <Globalmodal
        showState={showModal}
        onBgPress={() => setShowModal(true)}
        btnFunction={() => navigation.navigate("Security",{token:tokenn})}
        btnText="Continue"
      >
        <View style={{marginBottom: 50, justifyContent: 'center', alignItems: 'center', marginHorizontal: 85}}>
            <LottieView source={Successcheckanimate} style={{width: 148, height: 148}} autoPlay loop/>
            <Text style={{...fontsize.bsmall, ...FONTS.regular, marginTop: 17, textAlign: 'center'}}>Your number has been successfully verified</Text>
    

        </View>
      </Globalmodal>



      {loading && <Loader />}
      <TouchableOpacity style={styles.cancelIcon} onPress={()=>navigation.goBack()}>
        <Cancelicon />
      </TouchableOpacity>
      {/* OTP Message information */}
      <View style={styles.otpTextContainer}>
        <Text style={styles.otpMainText}>
          An OTP has been sent to you via SMS to your phone number - <Text style={styles.otpSubText}>{phoneNumber}</Text>, and to your email
          - <Text style={styles.otpSubText}>{email}</Text>
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
        <TextInput keyboardType="number-pad" value={otpCode} onChangeText={(text)=> setOtpCode(text)} style={styles.cutstomOtpInput} maxLength={6}/>
      </View>
      {/* Resend sms duration */}
      <View style={styles.resendAndDuration}>
        <TouchableOpacity disabled={disable} onPress={handleResendOTP}>
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
          disabled={loading}
        >
          <Text style={styles.btnText}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Verification;
