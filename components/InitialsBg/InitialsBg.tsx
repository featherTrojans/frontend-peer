import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FONTS, fontsize } from "../../constants";

type InitialsBgProps = {
  sideLength: number;
  name: string;
};

const InitialsBg = ({ sideLength, name }: InitialsBgProps) => {
  const nameSplitter = () => {
    const splitName = name?.split(" ");

    if (splitName) {
      return `${splitName[0][0]}${splitName[1][0]}`;
    }
  };

  const colors = [
    "#BBE0FD",
    "#FFF5E5",
    "#E5FAF6",
    "#F1E5FF",
    "#FDD2DE",
    "#E5FAE9",
    "#F8FAE5",
    "#E0EDD8",
    "#D2EAFD",
    "#FCF3D1",
    "#DEE0E5",
    "#E3CCFF"
  ];
  // const color = '#' + Math.random().toString(16).substr(-6);
  const color = colors[Math.floor(Math.random() * colors.length)];

  return (
    <View
      style={{
        width: sideLength,
        height: sideLength,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: color,
        borderRadius: sideLength / 2,
      }}
    >
      <Text style={{ ...fontsize.bsmall, ...FONTS.medium }}>
        {nameSplitter()}
      </Text>
    </View>
  );
};

export default InitialsBg;
111;
const styles = StyleSheet.create({});
