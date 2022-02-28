import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableNativeFeedback,
} from "react-native";
import React from "react";
import { COLORS, FONTS, fontsize, icons } from "../../constants";
import { styles } from "./Iconwithdatas.styles";
import { ReactElement } from "react";

const { Forwardarrow, Withdrawicon } = icons;

type dataProps = {
  icon: ReactElement;
  title: string;
  details: string;
  onpress: () => void;
};

const Iconwithdatas = ({ icon, title, details, onpress }: dataProps) => {
  return (
    <TouchableNativeFeedback
      onPress={onpress}
      background={TouchableNativeFeedback.Ripple(COLORS.lightBlue, false)}
    >
      <View style={styles.container}>
        <View>
          {/* This is for the icon */}
          {icon}
        </View>
        {/* Datas */}
        <View style={styles.dataContainer}>
          <View style={styles.topSection}>
            <Text style={styles.titleText}>{title}</Text>
            <Forwardarrow />
          </View>
          <View>
            <Text style={styles.detailsText}>{details}</Text>
          </View>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
};

export default Iconwithdatas;
