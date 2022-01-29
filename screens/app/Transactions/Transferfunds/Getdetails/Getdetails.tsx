import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, fontsize, icons } from "../../../../../constants";
import { Input } from "../../../../../components";
import { styles } from "./Getdetails.styles";

const { Backarrow, At } = icons;

const Getdetails = () => {
  return (
    <View style={styles.container}>
      <View style={styles.backArrow}>
        <Backarrow />
        <Text style={styles.backArrowText}>Feather Wallet</Text>
      </View>
      <View style={styles.mainTextContainer}>
        <Text style={styles.mainText}>
          Enter the “username” of the feather user you are about to transfer
          cash to.
        </Text>
      </View>

      <View>
        <Input icon={<At />} placeholder="N37,580.50" />
        <Input icon={<At />} placeholder="Enter Username" />
      </View>
    </View>
  );
};

export default Getdetails;
