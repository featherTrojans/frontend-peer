import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";
import React from "react";
import { icons } from "../../constants";
import { styles } from "./Backheader.styles";
import { useNavigation } from "@react-navigation/native";

const { Backarrow } = icons;

const Backheader = ({ title }: { title?: string }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.backArrowContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backArrowIcon}
        >
          <Backarrow />
        </TouchableOpacity>
        <Text style={styles.backArrowText}>{title}</Text>
      </View>
    </View>
  );
};

export default Backheader;
