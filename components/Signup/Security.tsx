import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Input } from "../index";
import { COLORS, FONTS, fontsize, icons, SIZES } from "../../constants";
import { JustifyBetween } from "../../global/styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const { Usericondark, Phoneicon, Envelopeicon, Lockicondark } = icons;

const Security = () => {
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <StatusBar />
        {/* <Text>Sign up page</Text> */}
        {/* Get Started and dots */}
        <JustifyBetween style={{ marginBottom: 10 }}>
          <View>
            <Text style={styles.header}>Get Started.</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <View style={[styles.topDots, { marginRight: 10 }]} />
            <View style={[styles.topDots, { marginRight: 10 }]} />
            <View style={styles.topDots} />
          </View>
        </JustifyBetween>
        {/* personal */}
        <View style={{ marginBottom: 40 }}>
        <Text style={styles.subText}>
            Security
          </Text>
        </View>
        {/* Input */}
        <Input placeholder="Password" icon={<Lockicondark />} password />
        <Input
          placeholder="Confirm Password"
          icon={<Lockicondark />}
          password
        />

        {/* Proceed Btn */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.proceedBtn} activeOpacity={0.8}>
            <Text style={styles.proceedText}>PROCEED</Text>
          </TouchableOpacity>
          {/* Have an account */}
          <View style={styles.bottomTextContainer}>
            <Text style={styles.bottomText}>Have an account yet?</Text>
            <TouchableOpacity>
              <Text style={[styles.bottomText, { ...FONTS.bold }]}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Security;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: SIZES.width,
    height: SIZES.height,
    backgroundColor: COLORS.white,
    paddingHorizontal: 25,
    paddingTop: 25,
  },
  header: {
    ...fontsize.big,
    ...FONTS.bold,
    color: COLORS.black,
  },
  topDots: {
    width: 8,
    height: 8,
    backgroundColor: COLORS.grey1,
    borderRadius: 16,
  },
  subText: { 
    color: COLORS.grey5, 
    ...fontsize.medium, 
    ...FONTS.regular 
  },
  proceedBtn: {
    backgroundColor: COLORS.blue6,
    justifyContent: "center",
    alignItems: "center",
    height: 62,
    borderRadius: 10,
  },
  proceedText: {
    color: COLORS.white,
    ...fontsize.smallest,
    ...FONTS.bold,
  },
  bottomContainer: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 80,
  },
  bottomTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 28,
  },
  bottomText: {
    ...fontsize.small,
    ...FONTS.regular,
    color: COLORS.black,
    alignItems: "center",
    justifyContent: "center",
  },
});
