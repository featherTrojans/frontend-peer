import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Backheader, Headerandsubheader, Mainwrapper } from '../../../components'

const Verifyemail = () => {
  return (
    <Mainwrapper>
        <Backheader />
        <View style={{paddingHorizontal: 15}}>

        <Headerandsubheader header="Verify Email" subHeader="An OTP has been sent to your email to verify your email address"/>
        </View>
    </Mainwrapper>
  )
}

export default Verifyemail

const styles = StyleSheet.create({})