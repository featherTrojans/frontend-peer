import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { COLORS, FONTS, fontsize } from "../constants";
import { nameSplitter } from "../utils/nameSplitter";

interface InitialsBgProps {
  sideLength: number;
  name: string;
  bg?: string;
};

const InitialsBg = ({ sideLength, name, bg }: InitialsBgProps) => {
  const [defaultColor, setDefaultColor] = useState("gray")
  

  const colors = [
    "#F1E5FF",
    "#E0EDD8",
    "#E6ECFF",
    "#FCF3D1",
    "#DBDCDD",
    "#E6ECFF",
    "#FFE3E3",
    "#FFF5E5",
    "#E5FAF6"
  ];
  useEffect(()=>{
    const color = bg? bg : colors[Math.floor(Math.random() * colors.length)];
    setDefaultColor(color)
  },[])

  return (
    <View
      style={[styles.initialTextBg,{
        width:  sideLength,
        height: sideLength,
        backgroundColor: defaultColor,
        borderRadius: sideLength /2 
        
      }]}
    >
      <Text style={styles.initialText}>{name.toUpperCase()}</Text>
    </View> 
  );
};

export default InitialsBg;


const styles = StyleSheet.create({
  initialTextBg:{
    justifyContent: "center",
    alignItems: "center",
  },
  initialText: {
      ...fontsize.small, 
      ...FONTS.medium,
      color: COLORS.blue9
  }
})

