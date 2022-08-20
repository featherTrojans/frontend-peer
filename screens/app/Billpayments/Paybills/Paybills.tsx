import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Button,
} from "react-native";
import React from "react";
import { Backheader, Mainwrapper } from "../../../../components";
import { styles } from "./Paybills.styles";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import { ScrollView } from "react-native-gesture-handler";


const Paybills = ({ navigation }) => {
  const { Networklogos, Electricitybillsicon, Cablestvicon } = icons;

  const paybilltypes = [
    {
      title: "Airtime & Data",
      subtitle: "Purchase",
      info: "Purchase airtime and data from your favourite network in Nigeria.",
      logo: <Networklogos/>,
      route: "Airtimeanddata"
    },
    {
      title: "Electricity Bills",
      subtitle: "Payments",
      info: "Pay your power bills easily, no more power outage due to payments ",
      logo: <Electricitybillsicon/>,
      route: "Electricitytype"
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
    <Mainwrapper >
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
              
            </TouchableOpacity>
          );
        })}


      </ScrollView>
    </Mainwrapper>
  );
};

export default Paybills;
