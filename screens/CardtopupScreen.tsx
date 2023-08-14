import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { CardtopupScreenStyles } from "../assets/styles/screens";
import {
  FTHeaderandsubheader,
  FTInput,
  FTTitlepagewrapper,
} from "../components";
import { useForm } from "react-hook-form";
import { VALIDATION } from "../utils";

const {} = CardtopupScreenStyles;

const CardtopupScreen = () => {
  const { control, handleSubmit } = useForm({ mode: "all" });
  return (
    <FTTitlepagewrapper title="Top Up USD Card">
      <FTHeaderandsubheader
        header={"Add funds to USD card"}
        subHeader={
          "Add funds from your Feather Wallet to your Feather Visa USD Card."
        }
      />
      <FTInput
        placeholderText="$"
        name="amount"
        label="Enter Amount"
        control={control}
        rules={VALIDATION.LAST_NAME_VALIDATION}
        mB={15}
        mT={50}
      />
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text>Exchage rate</Text>
        <Text>You get $230.00</Text>
      </View>
    </FTTitlepagewrapper>
  );
};

export default CardtopupScreen;

const styles = StyleSheet.create({});
