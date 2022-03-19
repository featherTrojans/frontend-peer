import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { icons, images } from "../../constants";
import { styles } from "./Sendingandreceive.styles";
import InitialsBg from "../InitialsBg/InitialsBg";
const { Senderimage, Sendingarrow, Receivingarrow, Receiverimage } = icons;
const { Trustedbadgepng } = images;



type SendingandreceiveProps = {
  senderName: string,
  receiverName: string
}

const Sendingandreceive = ({senderName, receiverName}: SendingandreceiveProps) => {
  return (
    <View style={styles.container}>
      {/* <Senderimage /> */}
      <InitialsBg name={senderName} sideLength={62}/>
      <View style={styles.arrowContainer}>
        <Sendingarrow />
        <Receivingarrow />
      </View>
      <View style={{ position: "relative" }}>
        {/* <Receiverimage /> */}
        <InitialsBg name={receiverName} sideLength={62}/>
        {/* <Image
          source={Trustedbadgepng}
          resizeMode="cover"
          style={styles.badgeImage}
        /> */}
      </View>
    </View>
  );
};

export default Sendingandreceive;
