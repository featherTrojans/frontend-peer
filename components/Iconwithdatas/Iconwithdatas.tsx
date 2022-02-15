import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { FONTS, fontsize, icons } from "../../constants";
import { styles } from "./Iconwithdatas.styles";
import { ReactElement } from "react";

const { Forwardarrow, Withdrawicon } = icons;

type dataProps = {
  icon: ReactElement;
  title: string;
  details: string;
};

const Iconwithdatas = ({ icon, title, details }: dataProps) => {
  return (
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
          <Text style={styles.detailsText}>
            {details}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Iconwithdatas;
