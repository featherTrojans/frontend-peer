import { StyleSheet, Text, View } from "react-native";
import React from "react";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";

const useLinking = () => {
  const redirectToSupport = (name: string, email: string) => {
    WebBrowser.openBrowserAsync(
      `https://www.feather.africa/support/app/${name}/${email}`
    );
  };
  const redirecToAbout = () => {
    return WebBrowser.openBrowserAsync(`http://getfeather.africa/`);
  };
  return { redirecToAbout, redirectToSupport };
};

export default useLinking;
