import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Backheader, Horizontaline, Mainwrapper } from '../../../../../components'
import { electrictystyles } from '../../Electricity/Electricitytype/Electricitytype.styles'
import { icons } from '../../../../../constants'



const {Ekoelectricityicon, IBelectricityicon, Ikejaelectricityicon,Gloicon, Mtnlogo, Forwardarrow} = icons

const Dataprovider = ({navigation, route}) => {

    const {billType} = route.params

    const providertypes = [
        {
          title: "MTN Nigeria",
          logo: "https://firebasestorage.googleapis.com/v0/b/feather-340809.appspot.com/o/application_assets%2Fmtn-logo-40644FC8B0-seeklogo.com.png?alt=media&token=a45a8f22-f6ee-42da-b048-7bb26295d7a1",
          subroute: {
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
          logo: "https://firebasestorage.googleapis.com/v0/b/feather-340809.appspot.com/o/application_assets%2FGlobacom%20Limited%20Logo%20(2).png?alt=media&token=a1bf3984-a862-451e-a8b5-6f3b96b1fea4",
          subroute: {
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
          logo: "https://firebasestorage.googleapis.com/v0/b/feather-340809.appspot.com/o/application_assets%2F9mobile%20Logo%20(1).png?alt=media&token=011b2934-d9b5-449d-89c5-66eb46fff497",
          subroute: {
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
            logo: "https://firebasestorage.googleapis.com/v0/b/feather-340809.appspot.com/o/application_assets%2FAirtel%20Nigeria%20Logo%20(1).png?alt=media&token=5dba1e6a-3cce-43fa-972f-df17926db7ff",
            subroute: {
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
                      image: logo,
                      type: billType,
                      title: title
                    })
                  }
                >
                  <View style={electrictystyles.logoandtitlewrap}>
                    <Image source={{uri: logo}} style={{width: 34, height: 34, borderRadius: 34/2}}/>
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