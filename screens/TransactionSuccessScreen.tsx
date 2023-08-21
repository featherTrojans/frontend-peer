import { View, Text } from "react-native";
import React from "react";
import { FTCustombutton, FTMainwrapper, FTSuccessOrError } from "../components";



const TransactionSuccessScreen = () => {
  return (
    <FTMainwrapper>
      <View style={{flex: 1, justifyContent: "space-between"}}>
      <FTSuccessOrError />

      <FTCustombutton 
      btntext="back Home"
      onpress={() => console.log("yes")}
      />
      </View>

    </FTMainwrapper>
  );
};

export default TransactionSuccessScreen;
