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
  iconBg?: string;
  title: string;
  details: string;
  onpress: () => void;
};

const Iconwithdatas = ({
  icon,
  iconBg,
  title,
  details,
  onpress,
}: dataProps) => {
  return (
    <TouchableNativeFeedback
      onPress={onpress}
      background={TouchableNativeFeedback.Ripple(COLORS.lightBlue, false)}
    >
      <View style={styles.container}>
        <View style={{flexDirection: "row", flex: 1}}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: iconBg ? iconBg : "" },
            ]}
          >
            {icon}
          </View>
          {/* Datas */}
          <View style={styles.dataContainer}>
            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.detailsText}>{details}</Text>
          </View>
        </View>
        
        <Forwardarrow />

      </View>
    </TouchableNativeFeedback>
  );
};

export default Iconwithdatas;
