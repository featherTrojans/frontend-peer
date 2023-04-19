import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Custombutton, Mainwrapper } from "../../../components";
import { COLORS, FONTS, fontsize, images } from "../../../constants";
import { RFValue } from "react-native-responsive-fontsize";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";

const { Getstartedimage } = images;
const Getstarted = ({ navigation }) => {




  const insets = useSafeAreaInsets();



  return (
    <Mainwrapper>
      <Text
        style={{
          textAlign: "center",
          ...fontsize.bbsmall,
          ...FONTS.medium,
          lineHeight: 25,
          marginTop: RFValue(30),
          marginHorizontal: 40,
        }}
      >
        The coolest & more convenient way to{" "}
        <Text style={{ color: COLORS.blue6 }}>withdraw</Text> your cash.
      </Text>

      <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Image
          style={{ width: RFValue(340), height: RFValue(340) }}
          source={Getstartedimage}
        />
      </View>

      <View style={{ paddingHorizontal: 10 }}>
        <Custombutton
          btntext="Sign In"
          onpress={() => navigation.navigate("Login")}
        />
        <View style={{ marginTop: 10, marginBottom: RFValue(40) }}>
          <Custombutton
            btntext="Create Account"
            bg={COLORS.blue9}
            onpress={() => navigation.navigate("Personal")}
          />
        </View>

        <Text
          style={{
            ...fontsize.smallest,
            ...FONTS.regular,
            lineHeight: 20,
            textAlign: "center",
            color: COLORS.grey5,
            paddingHorizontal: 30,
          }}
        >
          By tapping Create Account and using Feather, you agree to our{" "}
          <Text style={{ color: COLORS.blue9 }}>Terms of Service</Text> &{" "}
          <Text style={{ color: COLORS.blue9 }}>Privacy Policy</Text>
        </Text>
      </View>
    </Mainwrapper>
  );
};

export default Getstarted;

const styles = StyleSheet.create({});
