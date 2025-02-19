import { StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from "./Chatshome.styles";
import { useNavigation } from '@react-navigation/native';
import useContact from '../../../../utils/customContact';
import axiosCustom from '../../../../httpRequests/axiosCustom';
import { InitialsBg } from '../../../../components';
import Eachprofile from './EachProfile';
import { COLORS, FONTS, fontsize } from '../../../../constants';

  


const Contact = () => {
    const navigation = useNavigation()
    const { contactsResolved } = useContact();

    return (
      <View style={{backgroundColor: COLORS.white, borderRadius: 15, paddingVertical: 20, paddingHorizontal: 16, minHeight: 162}}>

        <View style={{flexDirection: 'row', justifyContent: "space-between"}}>
          <Text style={{...fontsize.smallest, ...FONTS.medium, color: COLORS.blue9}}>Feather users in your contact</Text>
          <TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate("Usersearch",contactsResolved)}>
            <Text style={{...fontsize.smallest, ...FONTS.medium, color: COLORS.purple2}}>See more</Text>
          </TouchableOpacity>
        </View>







      <FlatList 
      data={contactsResolved}      
      horizontal
      bounces={false}
      showsHorizontalScrollIndicator={false}
      initialNumToRender={5}
      maxToRenderPerBatch={5}
      contentContainerStyle={{ marginTop: 25, paddingHorizontal: 9, flex: contactsResolved.length < 1 ? 1 : 0}}
      renderItem={({item, index}) => {
        const contact = item
        return (
          <Eachprofile userInfo={contact} name={contact.fullName} username={`@${contact.username}`} key={index} />
        )
      }}
      ListEmptyComponent={() => {
        return (
          <View style={{flex: 1,flexDirection: 'row', alignItems: 'center', justifyContent: "center", }}>
            <Text style={{textAlign: "center", ...fontsize.smallest, ...FONTS.regular, color: COLORS.grey16}}>No feather user in your contacts. <Text style={{color: COLORS.blue9, ...FONTS.bold}}>Invite</Text></Text>
            </View>
        )
      }}
      
      />
      </View>
    )
}

export default Contact

