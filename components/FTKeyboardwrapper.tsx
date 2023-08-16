import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

const FTKeyboardwrapper = ({ children }) => {
  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1 }}
      enableAutomaticScroll
      extraScrollHeight={getStatusBarHeight(true) + 20}
    >
      {children}
    </KeyboardAwareScrollView>
  );
};

export default FTKeyboardwrapper;

const styles = StyleSheet.create({});
