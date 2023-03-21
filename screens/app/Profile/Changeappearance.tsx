import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Backheader, Horizontaline, Iconandinfo, Mainwrapper } from '../../../components'
import { COLORS, FONTS, fontsize, icons } from '../../../constants'




const {Bankblueicon} = icons

const Changeappearance = ({navigation}) => {
  return (
    <Mainwrapper>
        <Backheader />

        <View style={{paddingHorizontal: 30}}>
        <Iconandinfo action={() => navigation.navigate("Changememoji")} Icon={Bankblueicon} title="Choose Memoji" info="Select an memoji that best fits you"/>
        <Horizontaline marginV={20}/>
        <Iconandinfo action={() => console.log("here i")} Icon={Bankblueicon} title="Choose Photo" info="Upload photo from your device"/>

        </View>




    </Mainwrapper>
  )
}

export default Changeappearance

const styles = StyleSheet.create({})