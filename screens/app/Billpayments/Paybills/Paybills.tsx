import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Button,
} from "react-native";
import React from "react";
import { Backheader } from "../../../../components";
import { styles } from "./Paybills.styles";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import { ScrollView } from "react-native-gesture-handler";
import Customstatusbar from "../../../shared/Customstatusbar";
import { chatOnWhatsapp } from "../../../../utils/userDeviceFunctions";
import { SafeAreaView } from "react-native-safe-area-context";
// import { styles } from './Paybills.styles'

const Paybills = ({ navigation }) => {
  const { Networklogos, Electricitybillsicon, Cablestvicon } = icons;

  const paybilltypes = [
    {
      title: "Airtime & Data",
      subtitle: "Purchase",
      info: "Purchase airtime and data from your favourite network in Nigeria.",
      logo: <Networklogos/>,
      route: "Airtimedetails"
    },
    {
      title: "Electricity Bills",
      subtitle: "Payments",
      info: "Pay your power bills easily, no more power outage due to payments ",
      logo: <Electricitybillsicon/>,
      route: "Electricityamount"
    },
    {
      title: "CableTV Subscriptions",
      subtitle: "Payment",
      info: "Purchase your cable tv subscriptions from your favorite providers",
      logo: <Cablestvicon/>,
      route: "Electricityamount"
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Customstatusbar />
      <Backheader title="Paybills" />
      <ScrollView
        style={styles.mainContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Airtime purchase and data */}

        {paybilltypes.map(({ title, subtitle, logo, info, route }, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.eachContainer}
              activeOpacity={0.8}
              onPress={() => navigation.navigate(route)}
            >
              <View style={styles.topRow}>
                <View>
                  <Text style={styles.headers}>{title}</Text>
                  <Text style={styles.headers}>{subtitle}</Text>
                </View>

                {logo}
                {/* images */}
              </View>
              <Text style={styles.headerInfo}>
                {info}
              </Text>
              {/* <Text style={styles.headerInfo}>
                favourite network in Nigeria.
              </Text> */}
            </TouchableOpacity>
          );
        })}

        {/* Electricity Bills and payment  */}
        {/* <TouchableOpacity
          style={[styles.eachContainer, { backgroundColor: "#E0EDD8" }]}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("Electricityamount")}
        >
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
        </TouchableOpacity> */}

        {/* Electricity Bills and payment  */}
        {/* <TouchableOpacity
          style={[styles.eachContainer, { backgroundColor: "#F1E5FF" }]}
          activeOpacity={0.8}
        >
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
            <View style={{flexDirection: "row", justifyContent: "space-between"}}>
            <Text style={styles.headerInfo}>favourite network in Nigeria.</Text>
          </View>
        </TouchableOpacity> */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Paybills;
