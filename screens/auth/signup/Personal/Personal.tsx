import React,{useState} from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Input } from "../../../../components/index";
import {  FONTS,icons, } from "../../../../constants";
import { JustifyBetween } from "../../../../global/styles";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import { styles } from "./Personal.styles";

const { Usericondark, Phoneicon, Envelopeicon } = icons;

const Personal = ({navigation}) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleSubmit = async()=>{
    try{
      //send the request
      const data = {firstName,lastName,email,phoneNumber}
      const response = await axiosCustom.post("auth/signup",data)
      //store data in context
      console.log(response)
      navigation.navigate("Verification")
    }catch(err){
      // error handling
      console.log(err.response)
    }
  }
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <StatusBar />
        {/* <Text>Sign up page</Text> */}
        {/* Get Started and dots */}
        <JustifyBetween style={{ marginBottom: 10 }}>
          <View>
            <Text style={styles.header}>Get Started.</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={[styles.topDots, { marginRight: 10 }]} />
            <View style={[styles.topDots, { marginRight: 10 }]} />
            <View style={styles.topDots} />
          </View>
        </JustifyBetween>
        {/* personal */}
        <View style={{ marginBottom: 40 }}>
          <Text style={styles.subText}>
            Personal
          </Text>
        </View>
        {/* Input */}
        <Input placeholder="Firstname" value={firstName} onchange={setFirstName} icon={<Usericondark />} />
        <Input placeholder="Lastname" value={lastName} onchange={setLastName} icon={<Usericondark />} />
        <Input placeholder="Email Address" value={email} onchange={setEmail} icon={<Envelopeicon />} />
        <Input placeholder="Phone Number" value={phoneNumber} onchange={setPhoneNumber} icon={<Phoneicon />} />

        {/* Proceed Btn */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.proceedBtn} activeOpacity={0.8} onPress={handleSubmit}>
            <Text style={styles.proceedText}>PROCEED</Text>
          </TouchableOpacity>
          {/* Have an account */}
          <View style={styles.bottomTextContainer}>
            <Text style={styles.bottomText}>Have an account yet?</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")} activeOpacity={0.8}>

            <Text style={[styles.bottomText, { ...FONTS.bold }]}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Personal;

// const styles = StyleSheet.create({
//   container: {
//     // flex: 1,
//     width: SIZES.width,
//     height: SIZES.height,
//     backgroundColor: COLORS.white,
//     paddingHorizontal: 25,
//     paddingTop: 25,
//   },
//   header: {
//     ...fontsize.big,
//     ...FONTS.bold,
//     color: COLORS.black,
//   },
//   topDots: {
//     width: 8,
//     height: 8,
//     backgroundColor: COLORS.grey1,
//     borderRadius: 16,
//   },
//   subText: { 
//     color: COLORS.grey5, 
//     ...fontsize.medium, 
//     ...FONTS.regular 
//   },
//   proceedBtn: {
//     backgroundColor: COLORS.blue6,
//     justifyContent: "center",
//     alignItems: "center",
//     height: 62,
//     borderRadius: 10,
//   },
//   proceedText: {
//     color: COLORS.white,
//     ...fontsize.smallest,
//     ...FONTS.bold,
//   },
//   bottomContainer:{
//     flex: 1, 
//     justifyContent: "flex-end", 
//     marginBottom: 80
//   },
//   bottomTextContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 28,
//   },
//   bottomText: {
//     ...fontsize.small,
//     ...FONTS.regular,
//     color: COLORS.black,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
