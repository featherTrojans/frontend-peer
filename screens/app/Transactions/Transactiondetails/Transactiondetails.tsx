import { StyleSheet, Text, View, StatusBar, ScrollView } from "react-native";
import React from "react";
import { styles } from "./Transactiondetails.styles";
import {
  Backheader,
  Bottombtn,
  Sendingandreceive,
} from "../../../../components";
import { FONTS, fontsize, COLORS, icons } from "../../../../constants";
import { NavigationContainer } from "@react-navigation/native";

// Sendingandreceive

const { Copyclipboard } = icons;

const Transactiondetails = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar />

      <Backheader title="Details" />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 24,
          }}
        >
          <Sendingandreceive />
          <Text style={{ ...fontsize.bxmedium, ...FONTS.bold, marginTop: 26 }}>
            NGN 35,000
          </Text>
        </View>

        {/* The details container */}
        <View style={styles.detailsContainer}>
          <View style={styles.eachDetailContainer}>
            <Text style={styles.eachDetailTitle}>Date & Time</Text>
            <Text style={styles.eachDetailValue}>
              Mon, 25th April ’22 - 3:38PM
            </Text>
          </View>

          <View
            style={[
              styles.eachDetailContainer,
              { flexDirection: "row", alignItems: "center" },
            ]}
          >
            <View>
              <Text style={styles.eachDetailTitle}>Transaction Ref</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.eachDetailValue}>FTH753BU697FK7008</Text>
                <View style={styles.copyClipboardContainer}>
                  <Copyclipboard />
                  <Text style={styles.copyClipboardText}>Copy</Text>
                </View>
              </View>
            </View>
            <View>
              <Text style={styles.eachDetailTitle}>Status</Text>
              <Text style={[styles.eachDetailValue, { color: COLORS.green1 }]}>
                Successful
              </Text>
            </View>
          </View>

          <View style={styles.eachDetailContainer}>
            <Text style={styles.eachDetailTitle}>Receiver</Text>
            <Text style={styles.eachDetailValue}>
              @trojan986 - Oyediran Thomas
            </Text>
          </View>
          <View style={styles.eachDetailContainer}>
            <View style={styles.eachDetailContainer}>
              <Text style={styles.eachDetailTitle}>Location</Text>
              <Text style={styles.eachDetailValue}>
                Eric Moore, Ebutte Meta, Lagos
              </Text>
            </View>
            <Text style={styles.eachDetailTitle}>Total Amount</Text>
            <Text style={styles.eachDetailValue}>
              NGN 35,750.00 + NGN 750.00 Charges
            </Text>
          </View>
        </View>
      </ScrollView>

      <Bottombtn
        title="VIEW OPTIONS"
        bg="#000"
        onpress={() => console.log("View Options clicked")}
      />
    </View>
  );
};

export default Transactiondetails;
