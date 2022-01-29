import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, FONTS, fontsize, icons } from "../../../../../constants";
import { styles } from "./Transfercash.styles";

const { Backarrow, Featherwallet, Bankaccount, Forwardarrow } = icons;

const options = [
  {
    icon: <Featherwallet />,
    type: "Feather Wallet",
    about: "Transfer cash to any feather user.",
  },
  {
    icon: <Bankaccount />,
    type: "Bank Account",
    about: "Transfer cash to any bank in Nigeria.",
  },
];

const Transfercash = () => {
  return (
    <View style={styles.container}>
      <View style={styles.backArrow}>
        <Backarrow />
        <Text style={styles.backArrowText}>Transfer Cash</Text>
      </View>

      <View style={{ marginTop: 37 }}>
        {options.map(({ icon, type, about }, index) => (
          <View key={index} style={styles.optionContainer}>
            <View style={styles.optionDetails}>
              {icon}
              <View style={styles.optionTextContainer}>
                <Text style={styles.optionType}>{type}</Text>
                <Text style={styles.optionAbout}>{about}</Text>
              </View>
            </View>
            <View>
              <Forwardarrow />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Transfercash;
