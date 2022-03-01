import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { styles } from "./Priceandcharges.styles";

const Priceandcharges = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.price}>NGN 35,000.00</Text>
      <Text style={styles.charges}>Withdrawal Charges : <Text style={styles.chargesAmount}>+ N750</Text></Text>
    </View>
  );
};

export default Priceandcharges;
