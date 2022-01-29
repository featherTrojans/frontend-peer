import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Input } from "../../../components";
import { icons } from "../../../constants";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "./Setup.styles";

const { At, Usericondark } = icons;

const Setup = ({ navigation }) => {
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <StatusBar />
        {/* Header */}
        <View style={{ marginBottom: 31 }}>
          <Text style={styles.headerText}>Set up your unique</Text>
          <Text style={styles.headerText}>feather username.</Text>
        </View>

        {/* Informations */}
        <View style={{ marginBottom: 35 }}>
          <Text style={styles.setupText}>
            We set up a default username for you already, its advisable to
            customise it to your preference.
          </Text>
        </View>

        {/* Input box */}
        <Input icon={<At />} placeholder="feather2923" />
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          {/* Setup later btn */}
          <View style={{ marginBottom: 40 }}>
            <Text style={styles.laterBtn}>SETUP LATER</Text>
          </View>
          {/* Continue btn */}
          <TouchableOpacity
            style={styles.continueBtn}
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Welcome")}
          >
            <Text style={styles.continueText}>CONTINUE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Setup;

