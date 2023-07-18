import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LottieView from "lottie-react-native";
import { emptycompstyles } from './Emptycomponent.styles'
import { COLORS, FONTS, fontsize, icons } from '../../constants';



const {Cryinganimate} = icons




const Emptycomponent = ({size=110, msg}: {size: number, msg: string}) => {
  return (
    <View style={emptycompstyles.emptyContainer}>
        {/* Crying icons */}
        <LottieView
          source={Cryinganimate}
          autoPlay
          loop
          style={{ width: size, height: size }}
        />
        <View style={{ marginHorizontal: 50 }}>
          <Text style={emptycompstyles.emptyText}>
                {msg}
          </Text>
        </View>

        <View style={{alignSelf: "center", marginTop: 37, paddingVertical: 11, paddingHorizontal: 24, backgroundColor: "#F3F5FE", borderRadius: 10}}>
              <Text style={{...fontsize.xxsmallest, ...FONTS.semibold, color: COLORS.blue16}}>Perform a transaction</Text>
            </View>
      </View>
  )
}

export default Emptycomponent

const styles = StyleSheet.create({})