import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useState } from "react";
import { MeternumberScreenStyles } from "../assets/styles/screens";
import {
  FTCustombutton,
  FTInput,
  FTKeyboardwrapper,
  FTLoader,
  FTTitlepagewrapper,
} from "../components";
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
  const [loading, setLoading] = useState(false);

  const onsubmit = async (data) => {
    const action = async (pin) => {
      setLoading(true);
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
        errorAlert(err);
      } finally {
        setLoading(false);
      }
    };
    navigation.navigate("transactionpin_screen", { action });
  };

  return (
    <FTTitlepagewrapper title="Meter Number">
      <FTLoader loading={loading} />
      <FTKeyboardwrapper>
        <FTInput
          label="Enter Meter Number"
          placeholderText="Enter Number"
          name="meternumber"
          control={control}
          mB={20}
        />
      </FTKeyboardwrapper>
      <FTCustombutton btntext="Continue" onpress={handleSubmit(onsubmit)} />
    </FTTitlepagewrapper>
  );
};

export default MeternumberScreen;

const styles = StyleSheet.create({});
