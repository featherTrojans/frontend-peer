import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { styles } from "./Priceandcharges.styles";

const Priceandcharges = ({amount="35,000.00", charges="750"}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.price}>NGN {amount}</Text>
      <Text style={styles.charges}>Withdrawal Charges : <Text style={styles.chargesAmount}>+ N{charges}</Text></Text>
    </View>
  );
};

export default Priceandcharges;
