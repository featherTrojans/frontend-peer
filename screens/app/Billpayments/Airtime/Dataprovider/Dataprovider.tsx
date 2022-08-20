import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Backheader, Horizontaline, Mainwrapper } from '../../../../../components'
import { electrictystyles } from '../../Electricity/Electricitytype/Electricitytype.styles'
import { icons } from '../../../../../constants'



const {Ekoelectricityicon, IBelectricityicon, Ikejaelectricityicon,Gloicon, Mtnlogo, Forwardarrow} = icons

const Dataprovider = ({navigation}) => {


    const providertypes = [
        {
          title: "MTN Nigeria",
          logo: <Mtnlogo />,
          subroute: {
            logotype: "mtn",
            suboptions: [
                {
                  type: " 500MB Data Package - N350",
                },
                {
                  type: " 500MB Data Package - N350",
                },
                {
                  type: " 500MB Data Package - N350",
                },
                {
                  type: " 500MB Data Package - N350",
                },
                {
                  type: " 500MB Data Package - N350",
                },
                {
                  type: " 500MB Data Package - N350",
                },
                {
                  type: " 500MB Data Package - N350",
                },
                {
                  type: " 500MB Data Package - N350",
                },
                {
                  type: " 500MB Data Package - N354",
                },
                {
                  type: " 500MB Data Package - N350",
                },
                {
                  type: " 500MB Data Package - N350",
                },
                {
                  type: " 500MB Data Package - N350",
                },
                {
                  type: " 500MB Data Package - N350",
                },
                {
                  type: " 500MB Data Package - N356",
                },
                {
                  type: " 500MB Data Package - N357",
                },
                {
                  type: " 500MB Data Package - N359",
                },
              ],
          },
        },
        {
          title: "Globacom",
          logo: <Gloicon />,
          subroute: {
            logotype: "glo",
            suboptions: [
              {
                type: " 500MB Data Package - N350",
              },
              {
                type: " 500MB Data Package - N350",
              },
              {
                type: " 500MB Data Package - N350",
              },
              {
                type: " 500MB Data Package - N350",
              },
              {
                type: " 500MB Data Package - N350",
              },
              {
                type: " 500MB Data Package - N350",
              },
              {
                type: " 500MB Data Package - N350",
              },
              {
                type: " 500MB Data Package - N350",
              },
              {
                type: " 500MB Data Package - N354",
              },
              {
                type: " 500MB Data Package - N350",
              },
              {
                type: " 500MB Data Package - N350",
              },
              {
                type: " 500MB Data Package - N350",
              },
              {
                type: " 500MB Data Package - N350",
              },
              {
                type: " 500MB Data Package - N356",
              },
              {
                type: " 500MB Data Package - N357",
              },
              {
                type: " 500MB Data Package - N359",
              },
            ],
          },
        },
        {
          title: "9 Mobile",
          logo: <Ikejaelectricityicon />,
          subroute: {
            logotype: "ikeja",
            suboptions: [
                {
                  type: " 500MB Data Package - N350",
                },
                {
                  type: " 500MB Data Package - N350",
                },
                {
                  type: " 500MB Data Package - N350",
                },
                {
                  type: " 500MB Data Package - N350",
                },
                {
                  type: " 500MB Data Package - N350",
                },
                {
                  type: " 500MB Data Package - N350",
                },
                {
                  type: " 500MB Data Package - N350",
                },
                {
                  type: " 500MB Data Package - N350",
                },
                {
                  type: " 500MB Data Package - N354",
                },
                {
                  type: " 500MB Data Package - N350",
                },
                {
                  type: " 500MB Data Package - N350",
                },
                {
                  type: " 500MB Data Package - N350",
                },
                {
                  type: " 500MB Data Package - N350",
                },
                {
                  type: " 500MB Data Package - N356",
                },
                {
                  type: " 500MB Data Package - N357",
                },
                {
                  type: " 500MB Data Package - N359",
                },
              ],
          },
        },
        {
            title: "Airtel Nigeria",
            logo: <Ikejaelectricityicon />,
            subroute: {
              logotype: "ikeja",
              suboptions: [
                {
                  type: " 500MB Data Package - N350",
                },
                {
                  type: " 500MB Data Package - N350",
                },
                {
                  type: " 500MB Data Package - N350",
                },
                {
                  type: " 500MB Data Package - N350",
                },
                {
                  type: " 500MB Data Package - N350",
                },
                {
                  type: " 500MB Data Package - N350",
                },
                {
                  type: " 500MB Data Package - N350",
                },
                {
                  type: " 500MB Data Package - N350",
                },
                {
                  type: " 500MB Data Package - N354",
                },
                {
                  type: " 500MB Data Package - N350",
                },
                {
                  type: " 500MB Data Package - N350",
                },
                {
                  type: " 500MB Data Package - N350",
                },
                {
                  type: " 500MB Data Package - N350",
                },
                {
                  type: " 500MB Data Package - N356",
                },
                {
                  type: " 500MB Data Package - N357",
                },
                {
                  type: " 500MB Data Package - N359",
                },
              ],
            },
          },
      ];



  return (
    <Mainwrapper>
        <Backheader title="Select Provider"/>
        <View style={{paddingHorizontal: 15}}>
        <View style={electrictystyles.blockwrap}>
          <Text style={electrictystyles.headertext}>
            Choose your preferred provider
          </Text>

          {providertypes.map(({ title, logo, subroute }, index) => {
            const isLast = providertypes.length === index + 1;
            return (
              <View key={index}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={electrictystyles.eachoption}
                  onPress={() =>
                    navigation.navigate("Dataplan", {
                      subdata: subroute,
                    })
                  }
                >
                  <View style={electrictystyles.logoandtitlewrap}>
                    {logo}
                    <Text style={electrictystyles.optiontitle}>{title}</Text>
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

export default Dataprovider

const styles = StyleSheet.create({})