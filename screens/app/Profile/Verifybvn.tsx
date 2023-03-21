import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import {
  Backheader,
  Custombutton,
  Headerandsubheader,
  Mainwrapper,
} from "../../../components";
import { COLORS } from "../../../constants";
import { profilestyles } from "./Profile.styles";

const Verifybvn = ({ navigation }) => {
  return (
    <Mainwrapper>
      <Backheader />

      <View style={{ paddingHorizontal: 15 }}>
        <Headerandsubheader
          header="Bank Verification
Number"
          subHeader="Verify your BVN and create an account number for you to receive money easily."
        />

        <TextInput
          style={profilestyles.bvnTextinput}
          placeholder="Enter your BVN (11 Digits)"
          placeholderTextColor={COLORS.grey16}
        />

        <Custombutton
          onpress={() => navigation.navigate("Verifybvncode")}
          btntext="Continue"
          bg={COLORS.blue9}
        />
      </View>
    </Mainwrapper>
  );
};

export default Verifybvn;

const styles = StyleSheet.create({});
