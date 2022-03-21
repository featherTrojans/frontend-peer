import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import { Input } from "../../../../components";
import { styles } from "../../signup/Personal/Personal.styles";

const { Lockicondark,  } = icons;

const Setnewpassword = ({ navigation }) => {
  return (
    <View
      style={{ flex: 1, backgroundColor: COLORS.white, paddingHorizontal: 25 }}
    >
      <View style={{ marginTop: 34 }}>
        <Text style={{ ...fontsize.big, ...FONTS.bold, marginBottom: 30 }}>
        Set New Password
        </Text>
        <Text style={{ ...fontsize.bsmall, ...FONTS.regular, lineHeight: 24 }}>
        Set up your new password, to continue this process and have access to your account.
        </Text>
      </View>

      <View style={{ marginTop: 30 }}>
        <Input
          placeholder="Password"
          name="password"
          //   formikProps={formikProps}
          icon={<Lockicondark />}
        />
          <Input
          placeholder="Confirm Password"
          name="confirmPassword"
          //   formikProps={formikProps}
          icon={<Lockicondark />}
        />
      </View>

      <View style={[styles.bottomContainer, { flex: 1 }]}>
        <TouchableOpacity
          style={styles.proceedBtn}
          activeOpacity={0.8}
          onPress={() => navigation.navigate("Forgetpasswordotp")}
          // onPress={handleSubmit}
          // disabled={isSubmitting}
        >
          <Text style={styles.proceedText}>PROCEED</Text>
        </TouchableOpacity>

        {/* Have an account */}
        <View style={styles.bottomTextContainer}>
          <Text style={styles.bottomText}>Have an account yet?</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            activeOpacity={0.8}
          >
            <Text style={[styles.bottomText, { ...FONTS.bold }]}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Setnewpassword;
