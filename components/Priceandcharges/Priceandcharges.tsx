import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { styles } from "./Priceandcharges.styles";
import amountFormatter from "../../utils/formatMoney";

const Priceandcharges = ({amount, charges}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.price}>NGN{amountFormatter(amount)}</Text>
      <Text style={styles.charges}>Withdrawal Charges : <Text style={styles.chargesAmount}>+ N{amountFormatter(charges)}</Text></Text>
    </View>
  );
};

export default Priceandcharges;
