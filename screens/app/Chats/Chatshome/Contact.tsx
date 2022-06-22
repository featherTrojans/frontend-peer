import { StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from "./Chatshome.styles";
import { useNavigation } from '@react-navigation/native';
import useContact from '../../../../utils/customContact';
import axiosCustom from '../../../../httpRequests/axiosCustom';
import { InitialsBg } from '../../../../components';
import Eachprofile from './EachProfile';

  


const Contact = ({contactsResolved}) => {
    const navigate = useNavigation()
  
    return (

      <FlatList 
      data={contactsResolved}
      horizontal
      bounces={false}
      showsHorizontalScrollIndicator={false}
      initialNumToRender={5}
      maxToRenderPerBatch={5}
      contentContainerStyle={{ marginTop: 25, paddingHorizontal: 9 }}
      renderItem={({item, index}) => {
        const contact = item
        return (
          <Eachprofile userInfo={contact} name={contact.fullName} username={`@${contact.username}`} key={index} />
        )
      }}
      ListFooterComponent={() => {
        return (
            <TouchableOpacity onPress={()=>navigate.navigate("Usersearch",{phoneContact:contactsResolved})} style={styles.seeMoreContainer}>
              <View style={styles.seeMoreBg}>
                <View style={{ flexDirection: "row" }}>
                  <View style={styles.seeMoreDots} />
                  <View style={styles.seeMoreDots} />
                  <View style={[styles.seeMoreDots, { marginRight: 0 }]} />
                </View>
                </View>
              <Text style={styles.seeMoreText}>See More</Text>
            </TouchableOpacity>
        )
      }}
      
      />
    )
}

export default Contact

