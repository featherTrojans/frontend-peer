import { View, Text } from "react-native";
import React from "react";
import { FTCustombutton, FTInput, FTMainwrapper } from "../components";
import { TextInput } from "react-native-gesture-handler";
import { PhoneRegisterScreenStyles } from "../assets/styles/screens";

const PhoneRegisterScreen = () => {
  const handleSubmit = () => {};
  return (
    <FTMainwrapper>
      <Text>Enter Phone Number</Text>
      {/* <FTInput placeholder="Phone Number / email / username" name="username" /> */}
      <FTCustombutton btntext="Proceed" onpress={handleSubmit} />
      <Text>
        Ensure you can reach this mobile number to get started as this number
        has to be verified.
      </Text>
    </FTMainwrapper>
  );
};

export default PhoneRegisterScreen;
