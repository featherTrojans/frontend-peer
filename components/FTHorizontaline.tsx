import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../constants";

type IHorizontalLineProps = {
  marginV?: number;
  mT?: number;
  mB?: number;
  bG?: string
};

const Horizontaline = ({ marginV, mT, mB, bG="transaparent"  }: IHorizontalLineProps) => {
  return (
    <View
      style={{
        marginTop: mT,
        marginBottom: mB,
        marginVertical: marginV,
        backgroundColor: bG,
        height: 0.5,
      }}
    />
  );
};

export default Horizontaline;

const styles = StyleSheet.create({});
