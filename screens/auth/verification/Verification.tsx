import {useState} from "react"
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity } from "react-native";
import { COLORS, FONTS, fontsize, icons } from "../../../constants";
import axiosCustom from "../../../httpRequests/axiosCustom";
import { VerificationContainer, VerificationText } from "./Verification.styles";

const { Cancelicon } = icons;

const Verification = ({navigation}) => {
  const [vericode, setVericode] = useState({1:"",2: "",3: "",4: "",5: "",6:"",7:""})
  
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
      <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 25, }}>
        <Text style={{textAlign: 'center', ...FONTS.regular, color: COLORS.black, ...fontsize.bsmall}}>
          An OTP has been sent to you via SMS to your phone number -
          <Text style={{...FONTS.medium}}>08033211658</Text>, and to your email -{" "}
          <Text  style={{...FONTS.medium}}>seth@feather.africa</Text>
        </Text>
      </View>

      {/* Verification input */}
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 28}}>
        <TextInput style={styles.otpInput}/>
        <TextInput style={styles.otpInput}/>
        <TextInput style={styles.otpInput}/>
        <TextInput style={styles.otpInput}/>
        <TextInput style={styles.otpInput}/>
        <TextInput style={styles.otpInput}/>
      </View>

      {/* Resend sms duration */}
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View>
          <Text style={{...fontsize.small, ...FONTS.medium}}>Resend sms in</Text>
        </View>
        <View>
          <Text style={{...fontsize.small, ...FONTS.regular}}>00 : 30s</Text>
        </View>
      </View>

      {/* Dashedline */}
      <View style={{height: .5, backgroundColor: COLORS.grey2, marginBottom: 19, marginTop: 24}}/>
      {/* Change number text */}
      <View>
        <Text style={{color: COLORS.grey5, ...fontsize.small, ...FONTS.medium}}>Change Number?</Text>
      </View>

      {/* Submit button */}
      <View style={{flex: 1, justifyContent: 'flex-end'}}>
        <TouchableOpacity activeOpacity={0.8} onPress={handleSubmit} style={{height: 62, backgroundColor: COLORS.blue6, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 80}}>
          <Text style={{...fontsize.smallest, ...FONTS.bold, color: COLORS.white}}>SUBMIT</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Verification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 36,
    backgroundColor: COLORS.white,
  },
  cancelIcon: {
    marginBottom: 36,
  },
  otpInput: {
    width: 51, 
    height: 66, 
    borderRadius: 13, 
    borderColor: COLORS.grey6, 
    borderWidth: 1, 
    backgroundColor: COLORS.white
  }
});
