import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import {
  Backheader,
  Horizontaline,
  Mainwrapper,
} from "../../../../../components";
import { COLORS, FONTS, fontsize, icons } from "../../../../../constants";
import { electrictystyles } from "./Electricitytype.styles";

const {
  Forwardarrow,
  Ekoelectricityicon,
  IBelectricityicon,
  Ikejaelectricityicon,
} = icons;

const Electricitytype = ({ navigation }) => {
  const providertypes = [
    {
      title: "Eko Electricity",
      logo: <Ekoelectricityicon />,
      subroute: {
        logotype: "eko",
        suboptions: [
          {
            type: "Eko Electricity Distribution Postpaid",
          },
          {
            type: "Eko Electricity Distribution Prepaid",
          },
        ],
      },
    },
    {
      title: "Ibadan Disco",
      logo: <IBelectricityicon />,
      subroute: {
        logotype: "ibadan",
        suboptions: [
          {
            type: "Ibadan Disco Distribution Postpaid",
          },
          {
            type: "Ibadan Disco Distribution Prepaid",
          },
        ],
      },
    },
    {
      title: "Ikeja Electric",
      logo: <Ikejaelectricityicon />,
      subroute: {
        logotype: "ikeja",
        suboptions: [
          {
            type: "Ikeja Electricity Distribution Postpaid",
          },
          {
            type: "Ikeja Electricity Distribution Prepaid",
          },
        ],
      },
    },
  ];

  return (
    <Mainwrapper>
      <Backheader title="Select Provider" />

      <View style={{ paddingHorizontal: 15 }}>
        <View style={electrictystyles.blockwrap}>
          <Text style={electrictystyles.headertext}>
            Choose your preferred provider
          </Text>

          {providertypes.map(({ title, logo, subroute }, index) => {
            const isLast = providertypes.length === index + 1;
            return (
              <View key={index}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={electrictystyles.eachoption}
                  onPress={() =>
                    navigation.navigate("Electricitymetertype", {
                      subdata: subroute,
                    })
                  }
                >
                  <View style={electrictystyles.logoandtitlewrap}>
                    {logo}
                    <Text style={electrictystyles.optiontitle}>{title}</Text>
                  </View>
                  <Forwardarrow />
                </TouchableOpacity>
                {!isLast && <Horizontaline marginV={0} />}
              </View>
            );
          })}
        </View>
      </View>
    </Mainwrapper>
  );
};

export default Electricitytype;

const styles = StyleSheet.create({});
