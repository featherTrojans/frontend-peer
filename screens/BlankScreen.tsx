import { StyleSheet, Text } from "react-native";
import React from "react";
import { FTMainwrapper } from "../components";
import { Pressable } from "react-native";
import { COLORS } from "../constants";

const BlankScreen = () => {
  return (
    <FTMainwrapper>
      <Pressable
        style={{
          paddingHorizontal: 24,
          paddingVertical: 15,
          marginTop: 40,
          backgroundColor: COLORS.blue1,
        }}
      >
        <Text style={{ color: COLORS.white, textAlign: "center" }}>Check</Text>
      </Pressable>
    </FTMainwrapper>
  );
};

export default BlankScreen;

const styles = StyleSheet.create({});
