import { View, Text } from "react-native";
import React from "react";
import { FTCustombutton, FTMainwrapper, FTSuccessOrError } from "../components";
import Customstatusbar from "./shared/Customstatusbar";

const TransactionSuccessScreen = ({ navigation }) => {
  return (
    <FTMainwrapper pB={20}>
      <Customstatusbar />
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
