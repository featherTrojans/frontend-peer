import {useState} from "react"
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native";
import OTPInputView from '@twotalltotems/react-native-otp-input'
import { COLORS, FONTS, fontsize, icons } from "../../../constants";
import axiosCustom from "../../../httpRequests/axiosCustom";
import { styles } from "./Verification.styles";
// import { VerificationContainer, VerificationText } from "./Verification.styles";

const { Cancelicon } = icons;

const Verification = ({navigation}) => {
  const [vericode, setVericode] = useState({1:"",2: "",3: "",4: "",5: "",6:"",7:""})
  const [otpCode, setOtpCode] = useState<number>()
  
  const handleSubmit = async ()=>{
    const code =  Object.values(vericode).join("")
    try{
      const response = await axiosCustom.post("auth/verify/code",{code});
      console.log(response)
      navigation.navigate("Security")
    }catch(err){
      console.log(err.response)
    }
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
          An OTP has been sent to you via SMS to your phone number -
          <Text style={styles.otpSubText}>08033211658</Text>, and to your email
          - <Text style={styles.otpSubText}>seth@feather.africa</Text>
        </Text>
      </View>

      {/* Verification input */}

      <View style={styles.otpInputContainer}>
        <OTPInputView
          style={styles.otpInputContainer}
          pinCount={6}
          autoFocusOnLoad
          codeInputFieldStyle={styles.otpInput}
          codeInputHighlightStyle={styles.otpInputActive}
          onCodeFilled={(code) => {
            //You can access the code value here or calll any function to get it, ADD Types too
            console.log(`Here is the code ${code}`);
            setOtpCode(parseInt(code))
          }}
        />
      </View>

      {/* Resend sms duration */}
      <View style={styles.resendAndDuration}>
        <View>
          <Text style={styles.resendText}>Resend sms in</Text>
        </View>
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
          onPress={() => navigation.navigate("Security")}
          style={styles.btnBg}
        >
          <Text style={styles.btnText}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Verification;
