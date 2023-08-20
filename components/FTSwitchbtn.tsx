import { StyleSheet, Text, View, Switch } from "react-native";
import React, { useState } from "react";
import { COLORS } from "../constants";

type IFTSwitchProps = {
  action: () => void;
};

const FTSwitchbtn = ({ action }: IFTSwitchProps) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => {
    // You can perform any action here
    setIsEnabled((previousState) => !previousState);
    action();
  };

  return (
    <Switch
      trackColor={{ false: COLORS.grey1, true: COLORS.blue17 }}
      thumbColor={isEnabled ? COLORS.blue16 : COLORS.grey18}
      ios_backgroundColor={COLORS.grey1}
      onValueChange={toggleSwitch}
      value={isEnabled}
    />
  );
};

export default FTSwitchbtn;

const styles = StyleSheet.create({});
