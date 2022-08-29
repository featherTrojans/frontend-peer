import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, FONTS, fontsize } from '../../constants'
import Horizontaline from '../Horizontaline/Horizontaline'
import { styles } from '../../screens/app/Chats/Chatsdm/Chatsdm.styles'
import Custombutton from '../Custombutton/Custombutton'



const amounts = [
    { name: "50", value: 50 },
    { name: "100", value: 100 },
    { name: "200", value: 200 },
    { name: "500", value: 500 },
  ];
const Negotiatecharge = () => {
  return (
    <View>
      <Text style={{...fontsize.smaller, ...FONTS.medium, color: COLORS.blue9, marginBottom: 10}}>Negotiate Charge</Text>
      <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.grey16}}>Add a fair amount to the base charge as fee </Text>


    <View style={{ marginVertical: 53}}>
        {/* Inout */}
        <TextInput
            style={styles.addedAmountText}
            keyboardType="numeric"
            placeholder="N0.00"
            //  value={amount}
            //  onChangeText={handleAmountChange}
          />
        {/* pirce to pick */}

        <View style={[styles.amountOptionsContainer, {marginBottom: 0, marginTop: 36}]}>
        {amounts.map((item, index) => {
          return (
            <TouchableOpacity
              onPress={() => console.log(item.name)}
              activeOpacity={0.8}
              key={index}
              style={styles.amountOption}
            >
              <Text style={styles.amountOptionText}>N{item.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

     
    </View>

        <View style={{marginBottom: 30}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.blue9}}>Base Charge </Text>
        <Text style={{...fontsize.smallest, ...FONTS.medium, color: COLORS.purple4}}>+N500.00</Text>
      </View>
      <Horizontaline marginV={20}/>
      <Text style={{marginBottom: 16, ...fontsize.smallest, ...FONTS.regular, color: COLORS.blue9}}>Total Charge (Base Charge + Your Charge)</Text>
      <Text style={{...fontsize.smaller, ...FONTS.bold, color: COLORS.blue9}}>N550.00</Text>
      </View>
      <Custombutton btntext='Yeah, Proceed' onpress={() => console.log('negotiate chnare')}/>
    </View>
  )
}

export default Negotiatecharge
