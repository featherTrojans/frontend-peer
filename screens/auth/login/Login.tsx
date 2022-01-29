import {  styles } from "./Login.styles";
import { COLORS, icons } from "../../../constants";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Input } from "../../../components";
import { JustifyBetween } from "../../../global/styles";

const { Logo, Eyeicon, Usericon, Lock } = icons;

const Login = ({ navigation }: any) => {
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        {/* Logo */}
        <View style={styles.logoWrapper}>
          <Logo />
        </View>

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
            Don’t have an account yet?
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Signup")}
          >
            <Text style={styles.registerText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Login;
