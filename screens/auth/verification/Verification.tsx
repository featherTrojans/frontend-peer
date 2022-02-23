import {useState, useContext} from "react"
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native";
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { COLORS, FONTS, fontsize, icons } from "../../../constants";
import { AuthContext } from "../../../context/AuthContext";
import axiosCustom from "../../../httpRequests/axiosCustom";
import { styles } from "./Verification.styles";
// import { VerificationContainer, VerificationText } from "./Verification.styles";

const { Cancelicon } = icons;

const Verification = ({route,navigation}) => {
  const {email, phoneNumber, token} = route.params
  const [loading, setLoading] = useState<boolean>(false)
  const [otpCode, setOtpCode] = useState<any>("")
  const [tokenn, setToken] = useState<string|null>(token)

  const handleSubmit = async ()=>{
    setLoading(true)
    try{
      const response = await axiosCustom.post("auth/verify/code",{code:otpCode},{headers:{token:tokenn!}});
      console.log(response)
      navigation.navigate("Security",{token:tokenn})
    }catch(err){
      console.log(err.response)
    }finally{
      setLoading(false)
    }
  }

  const handleResendOTP = async () => {
    try{
      const response = await axiosCustom.post("auth/resend/code",{email});
      setToken(response?.data?.data?.token)
      console.log(response)
    }catch(err){
      console.log(err.response)
    }finally{}
  }

  return (
    <View style={styles.container}>
      {/* Closeicon */}
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
            // You can access the code value here or calll any function to get it, ADD Types too
            console.log(`Here is the code ${code}`);
            setOtpCode(parseInt(code))
          }}
        /> */}
        <TextInput keyboardType="number-pad" value={otpCode} onChangeText={(text)=> setOtpCode(text)} />
      </View>

      {/* Resend sms duration */}
      <View style={styles.resendAndDuration}>
        <TouchableOpacity onPress={handleResendOTP}>
          <Text style={styles.resendText}>Resend sms in</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.duration}>00 : 30s</Text>
        </View>
      </View>

      {/* Dashedline */}
      <View style={styles.dashedLine} />
      {/* Change number text */}
      <View>
        <Text style={styles.changeNumber}>Change Number?</Text>
      </View>

      {/* Submit button */}
      <View style={styles.btnContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={handleSubmit}
          style={styles.btnBg}
          disabled={loading}
        >
          <Text style={styles.btnText}>{loading?"loading...":"SUBMIT"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Verification;
