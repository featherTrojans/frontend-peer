import { StyleSheet, Text, View, ScrollView, StatusBar } from "react-native";
import React from "react";
import { styles } from "./Deposit.styles";
import { Backheader, Iconwithdatas, Viewbalance } from "../../../components";
import { icons } from "../../../constants";
import { TouchableOpacity } from "@gorhom/bottom-sheet";

const { Withdrawicon, Depositicon, SadEmoji , TransferIcon, Location} = icons;
const Deposit = () => {
    return (
        <View style={styles.container}>
          <StatusBar />
          <Backheader title="Deposit" />
          <Viewbalance />
          
        </View>
      );
}

export default Deposit
