import React from "react";
import { StatusBar, View } from "react-native";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { COLORS } from "../../constants";

function Customstatusbar({bg="#F7F8FA"}) {
  const insets = useSafeAreaInsets();

  return (
    <StatusBar
      animated={true}
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
