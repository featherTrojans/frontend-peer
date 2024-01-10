import { StyleSheet, Text, View, useWindowDimensions } from "react-native";
import React from "react";

const useDeviceSize = () => {
  const { width } = useWindowDimensions();

  const isLargeDevice =  width > 720;

  return { isLargeDevice, deviceWidth: width };
};

export default useDeviceSize;

const styles = StyleSheet.create({});
