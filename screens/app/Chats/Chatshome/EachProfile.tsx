import { StyleSheet, Text, View, TouchableOpacity, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { styles } from "./Chatshome.styles";
import { useNavigation } from '@react-navigation/native';
import useContact from '../../../../utils/customContact';
import axiosCustom from '../../../../httpRequests/axiosCustom';
import { InitialsBg } from '../../../../components';
import { nameSplitter } from '../../../../utils/nameSplitter';
import { COLORS, FONTS, fontsize } from '../../../../constants';
  

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
        {/* <InitialsBg sideLength={31} name={name || "0 0"} /> */}


        <View style={{width: 32, height: 32,borderRadius: 32/2, justifyContent: "center", alignItems: "center", backgroundColor: COLORS.blue9}}>
          <Text style={{color: COLORS.white, ...fontsize.smallest, ...FONTS.medium}}>{nameSplitter(name).toUpperCase()}</Text>
        </View>
  
        <View style={styles.nameAndUsername}>
          <Text style={styles.eachProfileName}>{name}</Text>
          <Text style={styles.eachProfileUsername}>{username}</Text>
        </View>
      </TouchableOpacity>
    );
};


export default Eachprofile