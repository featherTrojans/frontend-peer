import { View, Text } from "react-native";
import React from "react";
import { navigation } from "../utils";

// auth/signin/confirm
const PhoneVerificationScreen = ({ route }) => {
  const phonenumber = route.params.phonenumber;

  const handlelogin = () => {
    navigation.navigate("welcome_screen");
  };
  return (
    <View>
      <Text>PhoneVerificationScreen</Text>
      <Text>{phonenumber}</Text>
    </View>
  );
};

export default PhoneVerificationScreen;
