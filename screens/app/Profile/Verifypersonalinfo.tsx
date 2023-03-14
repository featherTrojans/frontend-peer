import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Backheader, Headerandsubheader, Horizontaline, Mainwrapper } from '../../../components'
import { COLORS, FONTS, fontsize } from '../../../constants'


const Verifypersonalinfo = () => {
  return (
    <Mainwrapper>
        <Backheader />

        <View style={{paddingHorizontal: 15}}>
        <Headerandsubheader header="Verify Personal Info." subHeader="Kindly input your active phone number that you can reach."/>

        <View style={{marginTop: 40}}>

            <View style={{flexDirection: "row", alignItems: "center"}}>
                <View style={{width: 44, height: 44, backgroundColor: COLORS.lightBlue, borderRadius: 44/2}}>
                    {/* icons */}
                </View>
                <View style={{marginLeft: 14}}>
                    <Text style={{...fontsize.smaller, ...FONTS.semibold, marginBottom: 9}}>Email Address</Text>
                    <Text style={{...fontsize.xsmallest, ...FONTS.regular}}>Verify your email address</Text>
                </View>
            </View>

            <Horizontaline marginV={20}/>

            <View style={{flexDirection: "row", alignItems: "center"}}>
                <View style={{width: 44, height: 44, backgroundColor: COLORS.lightBlue, borderRadius: 44/2}}>
                    {/* icons */}
                </View>
                <View style={{marginLeft: 14}}>
                    <Text style={{...fontsize.smaller, ...FONTS.semibold, marginBottom: 9}}>Selfie Validation</Text>
                    <Text style={{...fontsize.xsmallest, ...FONTS.regular}}>Proceed to use a smart selfie</Text>
                </View>
            </View>



        </View>



      </View>
    </Mainwrapper>
  )
}

export default Verifypersonalinfo

const styles = StyleSheet.create({})