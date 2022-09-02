import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";
import React, { ReactChild, ReactElement } from "react";
import { COLORS, icons } from "../../constants";
import { styles } from "./Backheader.styles";
import { useNavigation } from "@react-navigation/native";

const { Backarrow } = icons;

const Backheader = ({
  title,
  showArrow = true,
  mb = 20,
  bg= "#fff",
  rightComponent,

}: {
  title?: string;
  showArrow?: boolean;
  mb?: number,
  bg?: string,
  rightComponent?: any
}) => {
  const navigation = useNavigation();

  return (
    <View style={[styles.container, {marginBottom: mb, backgroundColor: bg }]}>
      <View style={styles.backArrowContainer}>


        {showArrow && (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.backArrowIcon, {paddingLeft: 15, paddingRight: 10}]}
          >
            <Backarrow />
          </TouchableOpacity>
        )}


        <Text style={[styles.backArrowText, {paddingLeft: showArrow ? 0: 15}]}>{title}</Text>
      </View>
      {rightComponent}
    </View>
  );
};

export default Backheader;
