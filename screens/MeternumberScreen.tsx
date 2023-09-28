import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { MeternumberScreenStyles } from "../assets/styles/screens";
import { FTCustombutton, FTInput, FTTitlepagewrapper } from "../components";
import { useForm } from "react-hook-form";
import axiosCustom from "../httpRequests/axiosCustom";
import { AuthContext } from "../context/AuthContext";
import { useAlert } from "../hooks";

const {} = MeternumberScreenStyles;

const MeternumberScreen = ({ navigation, route }) => {
  const { control, handleSubmit } = useForm({ mode: "all" });
  const { authdata } = useContext(AuthContext);
  const { errorAlert } = useAlert();
  const amount = route?.params?.amount;

  const onsubmit = async (data) => {
    const action = async (pin) => {
      try {
        await axiosCustom.post("/bills/electricity", {
          service: "ibadan",
          amount: amount,
          meter_number: data?.meternumber,
          variation: "prepaid",
          phone: authdata?.userDetails?.phoneNumber,
          userPin: pin,
        });
      } catch (err) {
        console.log(err.response);
        errorAlert(err);
      }
    };
    navigation.navigate("transactionpin_screen", { action });
  };

  return (
    <FTTitlepagewrapper title="Meter Number">
      <FTInput
        label="Enter Meter Number"
        placeholderText="Enter Number"
        name="meternumber"
        control={control}
        mB={20}
      />
      <FTCustombutton btntext="Continue" onpress={handleSubmit(onsubmit)} />
    </FTTitlepagewrapper>
  );
};

export default MeternumberScreen;

const styles = StyleSheet.create({});
