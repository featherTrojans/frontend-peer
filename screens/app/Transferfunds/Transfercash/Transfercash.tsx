import { StyleSheet, Text, View } from "react-native";
import React from "react";
// import { COLORS, FONTS, fontsize, icons } from "../../../../../constants";
import { COLORS, icons } from "../../../../constants";
import { styles } from "./Transfercash.styles";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import { Backheader } from "../../../../components";


const { Backarrow, Featherwallet, Bankaccount, Forwardarrow } = icons;

const options = [
  {
    icon: <Featherwallet />,
    type: "Feather Wallet",
    about: "Transfer cash to any feather user.",
    nextscreen:"Getdetails"
  },
  {
    icon: <Bankaccount />,
    type: "Bank Account",
    about: "Transfer cash to any bank in Nigeria.",
    nextscreen:"Getdetails"
  },
];

const Transfercash = ({navigation}) => {
  return (
    <View style={styles.container}>

      <Backheader title="Transfer Cash"/>
      {/* <View style={styles.backArrow}>
        <Backarrow />
        <Text style={styles.backArrowText}>Transfer Cash</Text>
      </View> */}

      <View style={{ marginTop: 20 }}>
        {options.map(({ icon, type, about, nextscreen }, index) => (
          <TouchableOpacity onPress={()=>navigation.navigate("TransferInput",{nextscreen})} key={index} style={styles.optionContainer}>
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
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Transfercash;
