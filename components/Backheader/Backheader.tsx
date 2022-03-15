import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { icons } from "../../constants";
import { styles } from "./Backheader.styles";
import { useNavigation } from "@react-navigation/native";

const { Backarrow } = icons;

const Backheader = ({ title }: { title: string }) => {

  const navigation = useNavigation()


  return (
    <View style={styles.container}>
      <View style={styles.backArrow}>
        <TouchableOpacity 
        onPress={() => navigation.goBack()}  
        style={{
          width: 25, 
          height: 25, 
          // backgroundColor: 'red', 
          justifyContent: 'center', 
          alignItems: 'center', 
          borderRadius: 25/2
          }}>
          <Backarrow />
        </TouchableOpacity>
        <Text style={styles.backArrowText}>{title}</Text>
      </View>
    </View>
  );
};

export default Backheader;
