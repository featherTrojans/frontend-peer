import { View, Text } from "react-native";
import React from "react";
import { FTCustombutton, FTMainwrapper, FTSuccessOrError } from "../components";

const TransactionSuccessScreen = ({ navigation }) => {
  return (
    <FTMainwrapper>
      <View style={{ flex: 1, justifyContent: "space-between" }}>
        <FTSuccessOrError />

        <FTCustombutton
          btntext="back Home"
          onpress={() => navigation.navigate("Dashboard")}
        />
      </View>
    </FTMainwrapper>
  );
};

export default TransactionSuccessScreen;
