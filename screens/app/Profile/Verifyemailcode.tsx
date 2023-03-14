import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Backheader, Custombutton, Horizontaline, Mainwrapper } from '../../../components'
import { COLORS, FONTS, fontsize } from '../../../constants'


const Verifyemailcode = () => {
  return (
    <Mainwrapper>
        <Backheader />

        <View style={{paddingHorizontal: 15}}>
      <View style={{alignItems: "center",}}>
        <Text style={{width: "70%", textAlign: "center", ...fontsize.small, ...FONTS.medium, lineHeight: 30}}>Enter the 4-digit code sent to you at <Text style={{textDecorationColor: COLORS.black, textDecorationLine: "underline", ...FONTS.semibold}}> setongee@gmail.com </Text></Text>



        <View style={{flexDirection: "row", width: 234, justifyContent: 'space-between', marginVertical: 50}}>
            <View style={{width: 49, height: 51, backgroundColor: COLORS.white, borderColor: COLORS.grey6, borderWidth: 1, borderRadius: 8}}/>
            <View style={{width: 49, height: 51, backgroundColor: COLORS.white, borderColor: COLORS.grey6, borderWidth: 1, borderRadius: 8}}/>

            <View style={{width: 49, height: 51, backgroundColor: COLORS.white, borderColor: COLORS.grey6, borderWidth: 1, borderRadius: 8}}/>

            <View style={{width: 49, height: 51, backgroundColor: COLORS.white, borderColor: COLORS.grey6, borderWidth: 1, borderRadius: 8}}/>

        </View>

      
      </View>
      <View style={{backgroundColor: COLORS.white, padding: 20, borderRadius: 15,marginBottom: 20 }}>
            <View style={{flexDirection: "row", justifyContent: "space-between",}}>
                <Text>Resend Code</Text>
                <Text>00 : 30s</Text>
            </View>
            <Horizontaline marginV={18}/>
            <Text style={{...fontsize.smallest, ...FONTS.medium, color: COLORS.grey16}}>Incorrect Email?  <Text style={{color: COLORS.blue16, ...FONTS.bold}}>Change Email Address.</Text></Text>
        </View>

        <Custombutton onpress={() => console.log("verify email clicked")} bg="#000" btntext='Verify Email'/>

        </View>
        





    </Mainwrapper>
  )
}

export default Verifyemailcode

const styles = StyleSheet.create({})