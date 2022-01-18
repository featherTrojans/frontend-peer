import { LoginContainer, LoginText, LogoWrapper } from "./Login.styles";
import { COLORS, FONTS, icons, fontsize } from "../../../constants";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Input } from "../../../components";
import { JustifyBetween } from "../../../global/styles";

const { Logo, Eyeicon, Usericon, Lock } = icons;

const Login = ({navigation}: any) => {
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        {/* Logo */}
        <LogoWrapper>
          <Logo />
        </LogoWrapper>

        {/* Form */}

        {/* Phone or tag input */}
        <View style={[styles.inputContainer, { marginBottom: 15 }]}>
          <View style={styles.inputiconwrapper}>
            <Usericon />
          </View>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your phone or feather tag"
            placeholderTextColor={COLORS.white}
            underlineColorAndroid="transparent"
          />
        </View>

        {/* Password input */}
        <View style={styles.inputContainer}>
          <View style={styles.inputiconwrapper}>
            <Lock />
          </View>
          <TextInput
            style={styles.textInput}
            placeholder="Enter your password"
            placeholderTextColor={COLORS.white}
            secureTextEntry
            underlineColorAndroid="transparent"
          />
          <View>
            <Eyeicon />
          </View>
        </View>

        {/* Bottom text */}
        <JustifyBetween style={{ marginTop: 30, marginBottom: 70 }}>
          <Text style={styles.biometrics}>Use Biometrics</Text>
          <Text style={styles.forgetPassword}>Forgot Password?</Text>
        </JustifyBetween>

        {/* Login btn */}
        <View style={styles.loginbtn}>
          <Text style={styles.loginbtnText}>Log in</Text>
        </View>

        <View style={styles.haveanaccount}>
          <Text style={styles.haveaccounttext}>
            Don’t have an account yet?{" "}
          </Text>
          <TouchableOpacity activeOpacity={0.8} onPress={()=> navigation.navigate("Signup")}>
            <Text style={{ color: COLORS.yellow1, ...FONTS.bold }}>
              Register
            </Text>

            </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 25,
    backgroundColor: COLORS.blue6,
  },
  inputContainer: {
    height: 62,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderColor: COLORS.inputBorderColor,
    backgroundColor: COLORS.blue6,
  },
  textInput: {
    flex: 1,
    borderColor: COLORS.white,
    color: COLORS.white,
    ...FONTS.light,
    ...fontsize.small,
    paddingLeft: 12.5,
  },
  inputiconwrapper: {
    borderRightWidth: 1,
    borderColor: COLORS.white,
    paddingRight: 12,
  },
  biometrics: {
    ...fontsize.smaller,
    ...FONTS.regular,
    color: COLORS.white,
  },
  forgetPassword: {
    ...fontsize.smaller,
    ...FONTS.bold,
    color: COLORS.white,
  },
  loginbtn: {
    backgroundColor: COLORS.white,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    height: 62,
    marginBottom: 38,
  },
  loginbtnText: {
    ...fontsize.small,
    ...FONTS.bold,
    color: COLORS.blue6,
  },
  haveanaccount: {
    marginBottom: 81,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'row'
  },
  haveaccounttext: {
    color: COLORS.white,
    ...fontsize.small,
    ...FONTS.regular,
    //  fontSize: 14
  },
});
