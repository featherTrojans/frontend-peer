import React from "react";
import { BvnErrorStyles } from "../assets/styles/screens";
import { Text } from "react-native";
import { View } from "react-native";
import { FTCustombutton, FTMainwrapper } from "../components";
// import { navigation } from "../utils";
const { textlarge, textsmall } = BvnErrorStyles;
function BvnErrorScreen({ navigation }) {
  return (
    <FTMainwrapper>
      <View style={{ flex: 1 }}>
        <Text style={textlarge}>Oops, Something went wrong</Text>
        <Text style={textsmall}>Your BVN verification failed</Text>
      </View>

      {/* GO BACK TWICE */}
      <FTCustombutton
        onpress={() => {
          navigation.pop(2);
        }}
        btntext="Retry"
      />
    </FTMainwrapper>
  );
}

export default BvnErrorScreen;
