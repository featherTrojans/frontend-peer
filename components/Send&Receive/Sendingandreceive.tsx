import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { icons, images } from "../../constants";
import { styles } from "./Sendingandreceive.styles";
const { Senderimage, Sendingarrow, Receivingarrow, Receiverimage } = icons;
const { Trustedbadgepng } = images;

const Sendingandreceive = () => {
  return (
    <View style={styles.container}>
      <Senderimage />
      <View style={styles.arrowContainer}>
        <Sendingarrow />
        <Receivingarrow />
      </View>
      <View style={{ position: "relative" }}>
        <Receiverimage />
        <Image
          source={Trustedbadgepng}
          resizeMode="cover"
          style={styles.badgeImage}
        />
      </View>
    </View>
  );
};

export default Sendingandreceive;
