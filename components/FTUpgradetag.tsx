import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { COLORS, FONTS, fontsize, icons } from "../constants";
import { useNavigation } from "@react-navigation/native";

const { Odogwubirdicon, Odogwuarrowup } = icons;

const FTUpgradetag = ({ level }) => {
  const navigation = useNavigation();

  let redirectTo = () => {
    navigation.navigate("accountverification_screen");
  };

  const UpgradeToOdogwu = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={redirectTo}
        style={{
          backgroundColor: COLORS.Tyellow5,
          paddingVertical: 12,
          paddingHorizontal: 30,
          borderRadius: 22,
          alignSelf: "center",
        }}
      >
        <Text
          style={{
            textAlign: "center",
            color: COLORS.yellow6,
            ...fontsize.smallest,
            ...FONTS.semibold,
          }}
        >
          Upgrade to Odogwu
        </Text>
      </TouchableOpacity>
    );
  };

  const OnOdogwu = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={redirectTo}
        style={{
          backgroundColor: COLORS.grey19,
          paddingVertical: 9,
          paddingHorizontal: 14,
          alignItems: "center",
          borderRadius: 22,
          flexDirection: "row",
          justifyContent: "center",
          alignSelf: "center",
        }}
      >
        <Odogwubirdicon />
        <Text
          style={{
            ...fontsize.smallest,
            ...FONTS.bold,
            color: COLORS.blue6,
            marginLeft: 6,
            marginRight: 12,
          }}
        >
          Odogwu
        </Text>
        <Odogwuarrowup />
      </TouchableOpacity>
    );
  };

  const upgradeDecision = (level) => {
    switch (level) {
      case 1:
        return <UpgradeToOdogwu />;
      case 2:
        return <OnOdogwu />;
      default:
        return null;
    }
  };


  return <>{upgradeDecision(level)}</>;
};

export default FTUpgradetag;

const styles = StyleSheet.create({});
