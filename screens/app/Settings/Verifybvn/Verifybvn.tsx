import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native'
import React, { useRef, useState } from 'react'
import OTPTextInput from "react-native-otp-textinput";
import { Custombutton, Horizontaline, Mainwrapper } from '../../../../components'
import { COLORS, FONTS, fontsize, icons } from '../../../../constants'


const {Whitebackarrow} = icons


const Verifybvn = ({navigation}) => {

    const otpInput = useRef(null);
    const [otpCode, setOtpCode] = useState<any>("")


  return (
    <Mainwrapper bgColor={COLORS.blue6}>

<ScrollView style={{ paddingHorizontal: 16, marginTop: 30 }} showsVerticalScrollIndicator={false} bounces={false}>
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
            inputCount={5}
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

        <Custombutton btntext="Verify" bg={COLORS.green2} onpress={() => console.log("hellow from verify btn")}/>




        </ScrollView>
    </Mainwrapper>
  )
}

export default Verifybvn

const styles = StyleSheet.create({})