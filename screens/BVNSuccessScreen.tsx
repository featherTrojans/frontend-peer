import { View, Text } from "react-native";
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FTCustombutton, FTMainwrapper } from "../components";

import { useNavigation } from "@react-navigation/native";

const BVNSuccessScreen = () => {
  const navigation = useNavigation();
  const { token } = useContext(AuthContext);
  const shareAccountDetails = () => {};

  return (
    <FTMainwrapper>
      <Text>BVN Verification Successful!</Text>
      <Text>A free bank account has been created for you</Text>
      <View>
        <Text>4363544665</Text>
        <Text>Tap to copy account no</Text>
        <Text>Account Name</Text>
        <Text>Feather - Sarah Obanikoro</Text>
      </View>
      <Text>
        Money sent to this account number, will be directly funded into your
        feather primary wallet
      </Text>
      {!token && (
        <View>
          <FTCustombutton
            onpress={() => {
              navigation.navigate("feathertag_screen");
            }}
            btntext="Continue"
          />
        </View>
      )}
      {token && (
        <View>
          <FTCustombutton
            onpress={shareAccountDetails}
            btntext="Share Account Details"
          />
          <FTCustombutton
            onpress={() => {
              navigation.navigate("Dashboard");
            }}
            btntext="Back to home"
          />
        </View>
      )}
    </FTMainwrapper>
  );
};

export default BVNSuccessScreen;
