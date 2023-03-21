import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Backheader, Headerandsubheader, Horizontaline, Iconandinfo, Mainwrapper } from '../../../components'
import { COLORS, FONTS, fontsize, icons } from '../../../constants'



const {Bankblueicon} = icons

const Verifypersonalinfo = ({navigation}) => {
  return (
    <Mainwrapper>
        <Backheader />

        <View style={{paddingHorizontal: 15}}>
            <Iconandinfo action={() => navigation.navigate("Verifyemail")} Icon={Bankblueicon} title="Email Address" info="Verify your email address"/>
            <Horizontaline marginV={20}/>
            <Iconandinfo action={() => console.log("helws")} Icon={Bankblueicon} title="Adress Verification" info="Proceed to use a smart selfie"/>
            <Horizontaline marginV={20}/>
            <Iconandinfo action={() => console.log("helws")} Icon={Bankblueicon} title="Selfie Validation" info="Proceed to use a smart selfie"/>


        </View>

    </Mainwrapper>
  )
}

export default Verifypersonalinfo

const styles = StyleSheet.create({})