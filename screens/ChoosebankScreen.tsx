import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ChoosebankScreenStyles } from '../assets/styles/screens'
import { FTIconwithtitleandinfo, FTSearchinput, FTTitlepagewrapper } from '../components'
import { COLORS, icons } from '../constants'
import { redirectTo } from '../utils'
const {Smallphoneicon} = icons

const {} = ChoosebankScreenStyles

let bankDatas = [
  {
    name: "First Bank of Nigeria",
    logo: ""
  },
  {
    name: "Guarantee Trust Bank",
    logo: ""
  },
  {
    name: "First City Monument Bank",
    logo: ""
  },
  {
    name: "Moniepoint MFB",
    logo: ""
  },
  {
    name: "Palmpay MFB",
    logo: ""
  },
  {
    name: "Sterling Bank PLC",
    logo: ""
  },
  {
    name: "Kuda Bank MFB",
    logo: ""
  },
]




const ChoosebankScreen = () => {
  return (
    <FTTitlepagewrapper title='Choose bank'>
     <FTSearchinput placeholder="Enter feather tag" />
      <FlatList
        data={bankDatas}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 28 }} />}
        renderItem={({item: {name, logo}}) => {
          return (
            <FTIconwithtitleandinfo
              title={name}
              onPress={() => redirectTo("bankaccountinformation_screen")}
              bG={COLORS.Tblue4}
              Icon={Smallphoneicon}
            />
          );
        }}
      />
    </FTTitlepagewrapper>
  )
}

export default ChoosebankScreen

const styles = StyleSheet.create({})