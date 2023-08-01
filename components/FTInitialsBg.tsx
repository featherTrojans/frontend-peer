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
        
      }]}
    >
      <Text style={styles.initialText}>{nameSplitter(name).toUpperCase()}</Text>
    </View> 
  );
};

export default InitialsBg;


const styles = StyleSheet.create({
  initialTextBg:{
    justifyContent: "center",
        alignItems: "center",
        borderTopRightRadius: 17, 
        borderBottomLeftRadius: 17,
        borderBottomRightRadius: 17,
        borderTopLeftRadius: 10,
  },
  initialText: {
      ...fontsize.smallest, 
      ...FONTS.medium
  }
})

