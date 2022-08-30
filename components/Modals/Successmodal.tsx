import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from "lottie-react-native";
import { FONTS, fontsize, icons } from '../../constants'
import Custombutton from '../Custombutton/Custombutton'
import { RFValue } from 'react-native-responsive-fontsize'




const {Successcheckanimate} = icons
const Successalert = ({successMsg, btnText, btnFunction}: {successMsg: string, btnText: string, btnFunction: () => void}) => {
  return (
    <View>

    <View style={{justifyContent: 'center', alignItems: 'center', marginBottom: 27}}>

        <LottieView
            source={Successcheckanimate}
            autoPlay
            loop
            style={{ width: RFValue(106), height: RFValue(106) }}
          />
      <Text style={{textAlign: "center", ...fontsize.smaller, ...FONTS.regular, lineHeight: 20, paddingHorizontal: 30}}>{successMsg}</Text>

      </View>
      
      <Custombutton btntext={btnText} onpress={btnFunction}/>
    </View>
  )
}

export default Successalert

const styles = StyleSheet.create({})