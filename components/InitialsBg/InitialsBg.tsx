import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, FONTS, fontsize } from "../../constants";
import { nameSplitter } from "../../utils/nameSplitter";
import { styles } from "./InitialsBg.styles";
import { RFValue } from "react-native-responsive-fontsize";
// import UserAvatar from "@muhzi/react-native-user-avatar";

type InitialsBgProps = {
  sideLength: number;
  name: string;
  bg?: string;
};

const InitialsBg = ({ sideLength, name, bg }: InitialsBgProps) => {
  const [defaultColor, setDefaultColor] = useState("gray")

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
    "#E3CCFF",
  ];
  useEffect(()=>{
    const color = bg? bg : colors[Math.floor(Math.random() * colors.length)];
    setDefaultColor(color)
  },[])

  return (
    <View
      style={{
        width:  sideLength,
        height: sideLength,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: defaultColor,
        borderRadius: sideLength /2,
      }}
    >
      <Text style={styles.initialText}>{nameSplitter(name).toUpperCase()}</Text>
    </View> 
  );
};

export default InitialsBg;


