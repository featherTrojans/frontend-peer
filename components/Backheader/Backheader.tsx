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

const Backheader = ({
  title,
  showArrow = true,
  mb = 20
}: {
  title?: string;
  showArrow?: boolean;
  mb?: number
}) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.container, {marginBottom: mb}]}>
      <View style={styles.backArrowContainer}>
        {showArrow && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backArrowIcon}
          >
            <Backarrow />
          </TouchableOpacity>
        )}

        <Text style={styles.backArrowText}>{title}</Text>
      </View>
    </View>
  );
};

export default Backheader;
