import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'
import { Backheader, Custombutton, Headerandsubheader, Mainwrapper } from '../../../components'
import { profilestyles } from './Profile.styles'
import { COLORS } from '../../../constants'

const Verifyemail = ({navigation}) => {
  return (
    <Mainwrapper>
        <View style={{paddingHorizontal: 15,}}>


          <Text style={profilestyles.kycPersonalInfoText}>KYC - Personal Info.</Text>
          <Text style={profilestyles.verifyEmailText}>Verify Email Address</Text>
          <Text style={profilestyles.verifyEmailInfo}>Kindly choose from the questions above and provide appropriate answers to fully enable your MFA.</Text>

          <View style={{marginBottom: 30}}>
            <Text style={profilestyles.emailInputLabel}>Email Address</Text>
            <TextInput style={profilestyles.emailTextInput} placeholder="Enter Email Address" placeholderTextColor={COLORS.grey1}/>
            {/* Input box is here */}
          </View>

          <Custombutton btntext="Proceed" onpress={() => navigation.navigate("Verifyemailcode")}/>

        </View>
    </Mainwrapper>
  )
}

export default Verifyemail

const styles = StyleSheet.create({})