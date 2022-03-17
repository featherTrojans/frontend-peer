import React from "react";
import { StatusBar } from "react-native";

function Customstatusbar() {
  return (
    <StatusBar
      animated={true}
      backgroundColor="#F7F8FA"
      barStyle="dark-content"
      networkActivityIndicatorVisible={true}
      showHideTransition="fade"
      hidden={false}
    />
  );
}

export default Customstatusbar;
