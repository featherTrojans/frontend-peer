import { StyleSheet, Text, View, StatusBar } from "react-native";
import React from "react";
import { Backheader } from "../../../../components";
import { styles } from "./Paybills.styles";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import { ScrollView } from "react-native-gesture-handler";
// import { styles } from './Paybills.styles'

const Paybills = () => {
  const { Networklogos, Electricitybillsicon, Cablestvicon } = icons;

  return (
    <View style={styles.container}>
      <StatusBar />
      <Backheader title="Paybills" />
      <ScrollView
        style={styles.mainContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Airtime purchase and data */}
        <View style={[styles.eachContainer, { backgroundColor: "#EDF7FE" }]}>
          <View style={styles.topRow}>
            <View>
              <Text style={styles.headers}>Airtime & Data</Text>
              <Text style={styles.headers}>Purchase</Text>
            </View>

            <Networklogos />
            {/* images */}
          </View>
          <Text style={styles.headerInfo}>
            Purchase airtime and data from your
          </Text>
          <Text style={styles.headerInfo}>favourite network in Nigeria.</Text>
        </View>

        {/* Electricity Bills and payment  */}
        <View style={[styles.eachContainer, { backgroundColor: "#E0EDD8" }]}>
          <View style={styles.topRow}>
            <View>
            <Text style={styles.headers}>Electricity Bills</Text>
            <Text style={styles.headers}>Payments</Text>
            </View>
            <Electricitybillsicon />
          </View>
          <Text style={styles.headerInfo}>
            Pay your power bills easily, no more
          </Text>
          <Text style={styles.headerInfo}>power outage due to payments</Text>
        </View>

        {/* Electricity Bills and payment  */}
        <View style={[styles.eachContainer, { backgroundColor: "#F1E5FF" }]}>
          <View style={styles.topRow}>
            <View>
            <Text style={styles.headers}>CableTV Subscriptions</Text>
            <Text style={styles.headers}>Payments</Text>
            </View>
            <Cablestvicon />
            
          </View>
          <Text style={styles.headerInfo}>
            Purchase airtime and data from your
          </Text>
          <Text style={styles.headerInfo}>favourite network in Nigeria.</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default Paybills;
