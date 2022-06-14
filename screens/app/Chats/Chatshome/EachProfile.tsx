import { StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from "./Chatshome.styles";
import { useNavigation } from '@react-navigation/native';
import useContact from '../../../../utils/customContact';
import axiosCustom from '../../../../httpRequests/axiosCustom';
import { InitialsBg } from '../../../../components';

  

const Eachprofile = ({
    name,
    username,
    userInfo
  }: {
    name: string;
    username: string;
    userInfo: any
  }) => {
    const navigate = useNavigation()
    return (
      <TouchableOpacity activeOpacity={0.8} style={styles.eachprofileContainer}
      onPress={()=>navigate.navigate("Chatsdm",{userInfo})}>
        <View style={styles.profileAvatar}>
        <InitialsBg sideLength={56} name={name || "0 0"} />
        </View>
  
        <View style={styles.nameAndUsername}>
          <Text style={styles.eachProfileName}>{name}</Text>
          <Text>{username}</Text>
        </View>
      </TouchableOpacity>
    );
};


export default Eachprofile