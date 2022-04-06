import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { styles } from "./Requesterdetails.styles";
import { COLORS } from "../../constants";
import InitialsBg from "../InitialsBg/InitialsBg";

type RequesterdetailsProps = {
  image?: string;
  name: string;
  distance: string;
  duration: string;
};

const Requesterdetails = ({
  image,
  name,
  distance,
  duration,
}: RequesterdetailsProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageBorder}>
        {/* To replace this with the user image */}
        <InitialsBg sideLength={47} name={name} />
      </View>

      <View style={{ marginLeft: 15 }}>
        <Text style={styles.profileName}>{name}</Text>
        <Text style={styles.distanceDuration}>
          {/* {distance} */}
          {duration} away
        </Text>
      </View>
    </View>
  );
};

export default Requesterdetails;
