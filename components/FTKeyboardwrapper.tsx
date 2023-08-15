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

const FTKeyboardwrapper = ({ children }) => {
  return (
    <KeyboardAwareScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1 }}
    >
      {children}
    </KeyboardAwareScrollView>
  );
};

export default FTKeyboardwrapper;

const styles = StyleSheet.create({});
