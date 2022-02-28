import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import { Bottombtn, Sendingandreceive } from "../../../../components";
import { styles } from "./Summary.styles";


const { Backarrow } = icons;

const tableDatas = [
  {
    title: "Receiver",
    value: "@suzzy_bcroft",
  },
  {
    title: " Amount",
    value: "NGN 35,000.00",
  },
  {
    title: "Withdrawal Charge",
    value: "+ NGN 750",
  },
];

const Summary = () => {
  return (
    <View style={styles.container}>
      {/* icon on the left and text in the middle */}

      <View style={styles.backArrow}>
        <Backarrow />
        <View style={styles.backArrowTextContainer}>
          <Text style={styles.backArrowText}>Transaction Summary</Text>
        </View>
        <View />
      </View>

      <View style={{ alignItems: "center", justifyContent: 'center' }}>
        {/* Sending and receiver component */}
        <Sendingandreceive />

        {/* text of notification */}
        <View style={styles.notifyingTextContainer}>
          <Text style={styles.notifyingText}>
            You are initiating a payment transaction to{" "}
            <Text style={styles.notifyingSubText}>Susan Becroft</Text>
          </Text>
        </View>
      </View>

      <View style={styles.tablesContainer}>
        {/* A table showin the transaction details */}

        {tableDatas.map(({ title, value }, index) => (
          <View key={index}>
            <View style={styles.tableContainer}>
              <Text style={styles.tableTitle}>{title}</Text>
              <Text style={styles.tableValue}>{value}</Text>
            </View>
            <View style={styles.bottomLine} />
          </View>
        ))}

        <View style={styles.tableContainer}>
          <Text style={styles.tableTitle}>Total</Text>
          <Text style={styles.tableValue}>NGN 35,750.00</Text>
        </View>
      </View>

      {/* Continue button below */}
      <Bottombtn title="CONTINUE" onpress={() => console.log("Continue btn clicked")}/>
      {/* <View>
        <View style={styles.btnBg}>
          <Text style={styles.btnText}>CONTINUE</Text>
        </View>
      </View> */}
    </View>
  );
};

export default Summary;
