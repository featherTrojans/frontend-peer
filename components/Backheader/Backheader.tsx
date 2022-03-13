import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { icons } from "../../constants";
import { styles } from "./Backheader.styles";
import { useNavigation } from "@react-navigation/native";

const { Backarrow } = icons;

const Backheader = ({ title }: { title: string }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.backArrow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{width: 10, height: 10}}>
          <Backarrow />
        </TouchableOpacity>
        <Text style={styles.backArrowText}>{title}</Text>
      </View>
    </View>
  );
};

export default Backheader;
