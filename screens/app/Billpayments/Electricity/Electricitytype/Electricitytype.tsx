import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
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
      logo: "https://firebasestorage.googleapis.com/v0/b/feather-340809.appspot.com/o/application_assets%2FekoElectrical.png?alt=media&token=38d87321-ca72-4c34-a21c-88ac94e12692",
      subroute: {
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
      logo: "https://firebasestorage.googleapis.com/v0/b/feather-340809.appspot.com/o/application_assets%2Fibedc.png?alt=media&token=d5269971-41f8-4b31-805f-f060f3151443",
      subroute: {
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
      logo: "https://firebasestorage.googleapis.com/v0/b/feather-340809.appspot.com/o/application_assets%2FikejaElectric.png?alt=media&token=30f4eef9-6edb-4a61-b7aa-92b1a0324417",
      subroute: {
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
                      logo: logo,
                    })
                  }
                >
                  <View style={electrictystyles.logoandtitlewrap}>
                    <Image
                      style={{ width: 34, height: 34, borderRadius: 34 / 2 }}
                      source={{
                        uri: logo,
                      }}
                    />
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
