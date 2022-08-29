import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Custombutton, Mainwrapper } from '../../../components'
import { COLORS, FONTS, fontsize } from '../../../constants'


const Getstarted = ({navigation}) => {
  return (
    <Mainwrapper>
      <Text style={{textAlign: "center", ...fontsize.bbsmall,...FONTS.medium, lineHeight: 25, marginTop: 40}}>The coolest & more convenient way to <Text style={{color: COLORS.blue6}}>withdraw</Text> your cash.</Text>

    <View style={{ justifyContent: "center", alignItems: "center"}}>
        <View style={{width: 340, height: 340, backgroundColor: COLORS.purple3, marginTop: 55, marginBottom: 75}} />
    </View>

    <View style={{paddingHorizontal: 10}}>
        <Custombutton btntext='Sign In' onpress={() => navigation.navigate("Login")}/>
        <View style={{marginTop: 10, marginBottom: 40}}>
            <Custombutton btntext='Create Account' bg={COLORS.blue9} onpress={() =>navigation.navigate('Personal')}/>

        </View>

        <Text style={{...fontsize.smallest, ...FONTS.regular, lineHeight: 20, textAlign: "center", color: COLORS.grey5}}>By tapping Create Account and using Feather, you agree to our  <Text style={{color: COLORS.blue9}}>Terms of Service</Text>  &  <Text style={{color: COLORS.blue9}}>Privacy Policy</Text></Text>
    </View>


    </Mainwrapper>
  )
}

export default Getstarted

const styles = StyleSheet.create({})