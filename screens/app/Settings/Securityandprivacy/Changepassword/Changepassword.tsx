import { StyleSheet, Text, View, TextInput, ScrollView } from "react-native";
import React from "react";
import { styles } from "./Changepassword.styles";
import { COLORS, FONTS, fontsize, icons } from "../../../../../constants";
import { Bottombtn, Inputinsettings } from "../../../../../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const { Backarrow } = icons;

const Changepassword = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flex: 1 }}>
      <View style={styles.mainHeaderContainer}>
        {/* Icons */}
        <Backarrow />
        <Text style={styles.mainHeaderText}>Security & Privacy</Text>
        <View />
      </View>

      <KeyboardAwareScrollView >
        <View
          style={{
            flex: 1,
            paddingHorizontal: 22,
            marginTop: 20,
            marginBottom: 42,
          }}
        >
          <Text style={styles.changePasswordText}>Change Password</Text>

          <View style={{ marginTop: 42 }}>
            <Inputinsettings
              label="Current Password"
              placeholder="Enter Password"
            />
            <Inputinsettings
              label="New Password"
              placeholder="Enter Password"
            />
            <Inputinsettings
              label="New Password"
              placeholder="Enter Password"
            />
          </View>
        </View>
        <Bottombtn
          title="Change Password"
          onpress={() => console.log("Changed password clicked")}
        />
      </KeyboardAwareScrollView>
    </ScrollView>
  );
};

export default Changepassword;
