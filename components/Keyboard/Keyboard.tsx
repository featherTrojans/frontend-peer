import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Numberbtn from "../Numberbtn/Numberbtn";
import { RFValue } from "react-native-responsive-fontsize";
const Keyboard = ({ array, setDigit, removeDigit }) => {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <View style={{ flexDirection: "row" }}>
        {[array[0], array[1], array[2]].map((number, index) => {
          return (
            <Numberbtn
              key={index}
              onpress={number !== "" ? () => setDigit(number) : () => null}
            >
              {number}
            </Numberbtn>
          );
        })}
      </View>
      <View style={{ flexDirection: "row" }}>
        {[array[3], array[4], array[5]].map((number, index) => {
          return (
            <Numberbtn
              key={index}
              onpress={number !== "" ? () => setDigit(number) : () => null}
            >
              {number}
            </Numberbtn>
          );
        })}
      </View>
      <View style={{ flexDirection: "row" }}>
        {[array[6], array[7], array[8]].map((number, index) => {
          return (
            <Numberbtn
              key={index}
              onpress={number !== "" ? () => setDigit(number) : () => null}
            >
              {number}
            </Numberbtn>
          );
        })}
      </View>
      <View style={{ flexDirection: "row" }}>
        {[array[9], array[10]].map((number, index) => {
          return (
            <>
              {number === "" ? (
                <View
                  style={{
                    width: RFValue(60),
                    height: RFValue(60),
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 30,
                    marginHorizontal: RFValue(20),
                    marginVertical: RFValue(10),
                  }}
                ></View>
              ) : (
                <Numberbtn
                  key={index}
                  onpress={number !== "" ? () => setDigit(number) : () => null}
                >
                  {number}
                </Numberbtn>
              )}
            </>
          );
        })}
        <Numberbtn onpress={() => removeDigit()}>X</Numberbtn>
      </View>
    </View>
  );
};

export default Keyboard;

const styles = StyleSheet.create({});
