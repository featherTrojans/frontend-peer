import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { COLORS, icons } from "../constants";



const { Newlogowhite } = icons;

const Loader = ({ loading = false }) => {
  return (
    <Modal
      isVisible={loading}
      backdropColor="#11141A"
      backdropOpacity={0.5}
      style={{ margin: 0 }}
      animationIn="fadeIn"
      animationOut="fadeOut"
    >
      <View>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({});
