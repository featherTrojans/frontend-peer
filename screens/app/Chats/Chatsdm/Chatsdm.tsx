import { StyleSheet, Text, View, Image, StatusBar } from "react-native";
import React from "react";
import { styles } from "./Chatsdm.styles";
import { COLORS, FONTS, fontsize, icons, images } from "../../../../constants";
// import { StatusBar } from 'expo-status-bar'

const { Backarrow } = icons;
const { Chatimage } = images;

const Chatsdm = () => {
  return (
    <View style={styles.container}>
      {/* header section */}
      <StatusBar />
      
      <View style={styles.chatHeader}>
        <Backarrow />
        <View style={styles.headerDetailsContainer}>
          {/* Image */}
          {/* <Image source={Chatimage} resizeMode="cover" /> */}
          <View  style={{width: 50, height: 50, backgroundColor: COLORS.grey3, borderRadius: 25}}/>
          <View style={{ marginLeft: 20 }}>
            <Text style={styles.chatName}>Stephene Adegoke</Text>
            <View style={styles.chatStatusContainer}>
              <View style={styles.chatStatusDot} />
              <Text style={styles.chatStatusText}>Online</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.messageAreaContainer}>
      {/* Messages area */}
      {/* message input box */}
      </View>
    </View>
  );
};

export default Chatsdm;
