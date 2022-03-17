import { StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "./Changepassword.styles";
import { COLORS, FONTS, fontsize, icons } from "../../../../../constants";
import { Bottombtn, Inputinsettings } from "../../../../../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import Customstatusbar from "../../../../shared/Customstatusbar";

const { Backarrow } = icons;

const Changepassword = () => {


  const navigation = useNavigation()
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ flex: 1 }}>
            <View style={styles.mainHeaderContainer}>
        {/* Icons */}
        <Customstatusbar />

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: 25,
            height: 25,
            // backgroundColor: 'red',
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 25 / 2,
          }}
        >
          <Backarrow />
        </TouchableOpacity>
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
