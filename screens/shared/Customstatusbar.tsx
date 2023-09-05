import React from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { COLORS } from "../../constants";
import { StatusBar } from "react-native";
// import { StatusBar } from 'expo-status-bar';

function Customstatusbar({ bg = "#F7F8FA" }) {

  return (
    <StatusBar
      animated={false}
      backgroundColor={bg}
      barStyle="dark-content"
      networkActivityIndicatorVisible={true}
      showHideTransition="fade"
      hidden={false}
      translucent={true}
    />
  );
}

export default Customstatusbar;
