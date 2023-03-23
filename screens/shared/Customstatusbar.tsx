import React from "react";
import { StatusBar, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { COLORS } from "../../constants";

function Customstatusbar() {
  const insets = useSafeAreaInsets();

  return (
    <StatusBar
      animated={true}
      backgroundColor="#F7F8FA"
      barStyle="dark-content"
      networkActivityIndicatorVisible={true}
      showHideTransition="fade"
      hidden={false}
      translucent={true}
    />
  );
}

export default Customstatusbar;
