import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Backheader, Horizontaline, Mainwrapper } from '../../../../../components'
import { electrictystyles } from '../Electricitytype/Electricitytype.styles'
import { icons } from '../../../../../constants'

const { Forwardarrow, Ekoelectricityicon, IBelectricityicon, Ikejaelectricityicon} = icons





const Electricitymetertype = ({navigation, route}) => {

    const {suboptions, logotype} = route?.params.subdata
    
    const showLogo = (logotype:string) => {
        switch (logotype) {
            case "eko":
                return <Ekoelectricityicon />
                break;
            case "ibadan":
                return <IBelectricityicon />
                break;
            case "ikeja":
                return <Ikejaelectricityicon />
                break;
                
            default:
                break;
        }
    }



  return (
    <Mainwrapper>
        <Backheader title="Select a Bill"/>



        <View style={{ paddingHorizontal: 15 }}>
        <View style={electrictystyles.blockwrap}>
          <Text style={electrictystyles.headertext}>
          Select a bill
          </Text>

            {/* {subdata.logo} */}
          {suboptions.map(({ type, logo }, index) => {
            const isLast = suboptions.length === index + 1;
            return (
              <View key={index}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={electrictystyles.eachoption}
                  onPress={() => console.log("here is")}
                >
                  <View style={electrictystyles.logoandtitlewrap}>
                    {/* {logo} */}
                    {showLogo(logotype)}
                    <Text style={electrictystyles.optiontitle}>{type}</Text>
                  </View>
                  <Forwardarrow />
                </TouchableOpacity>
                {!isLast && <Horizontaline marginV={0} />}
              </View>
            );
          })}
        </View>
      </View>
    </Mainwrapper>
  )
}

export default Electricitymetertype

const styles = StyleSheet.create({})