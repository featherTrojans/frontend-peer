import { StyleSheet, Text, View } from "react-native";
import React from "react";

const FTIconwithbg = ({ Icon, bG, size = 45 }) => {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: bG,
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      {<Icon />}
    </View>
  );
};

export default FTIconwithbg;

const styles = StyleSheet.create({});
