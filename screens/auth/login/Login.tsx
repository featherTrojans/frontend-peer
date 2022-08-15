import React, { useContext, useEffect } from "react";
import { styles } from "./Login.styles";
import { COLORS, FONTS, fontsize, icons, SIZES } from "../../../constants";

import { useToast } from "react-native-toast-notifications";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
// import * as Keychain from 'react-native-keychain';
import {
  setGenericPassword,
  getGenericPassword,
  ACCESS_CONTROL,
  Options,
  AuthenticationPrompt,
} from "react-native-keychain";
import * as LocalAuthentication from "expo-local-authentication";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Custombutton, Input, Loader } from "../../../components";
import { JustifyBetween } from "../../../global/styles";
import axiosCustom from "../../../httpRequests/axiosCustom";
import showerror from "../../../utils/errorMessage";
import { useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { RFValue } from "react-native-responsive-fontsize";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  getBiometricsAccess,
  getCredentials,
  saveCredentials,
} from "../../../utils/biometrics";
import Customstatusbar from "../../shared/Customstatusbar";

const { Logo, Newlogo, Eyeicon, Usericon, Lock, Passwordhideicon } = icons;

const setAuthorizationToken = (token: string) => {
  if (token) {
    axiosCustom.defaults.headers.common["token"] = token;
  }
};

const validationSchema = Yup.object().shape({
  username: Yup.string().label("username").required(),
  password: Yup.string().label("password").required(),
});

const Login = ({ navigation }: any) => {
  const [hidePassword, setHidePassword] = useState(true);
  const { setToken, allowBiometrics, setAllowBiometrics } =
    useContext(AuthContext);

  const [isBiometricAllowed, setIsBiometricAllowed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [enableBiometrics, setEnableBiometrics] = useState<null | string>(null);
  const toast = useToast();

  const loginFunc = async (values) => {
    setLoading(true);
    try {
      const response = await axiosCustom.post("/auth/signin", {
        username: values.username.trim(),
        password: values.password.trim(),
      });
      if (response.status === 200) {
        const savedDatas = await saveCredentials(
          values.username.trim(),
          values.password.trim()
        );
        setAllowBiometrics(true);
      }

      //store token in ASYNC STORAGE
      //store in context
      const token = response.data.data.token;
      setAuthorizationToken(token);

      // check if token is using 0000
      try {
        await axiosCustom.post(
          "auth/pin/verify",
          { user_pin: "0000" },
          { headers: { token: token } }
        );
        // navigation.navigate("Securepin",{token:result?.token});
        navigation.navigate("Welcometochange", {
          fromm: "login",
          username: values.username,
          token: token,
        });
      } catch (err) {
        // setToken(response.data.data.token)
        navigation.replace("Welcome", {
          fromm: "login",
          username: values.username,
          token: token,
        });
      }
    } catch (err) {
      showerror(toast, err);
    } finally {
      setLoading(false);
    }
  };

  ///To check if the device supports biometrics
  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricAllowed(compatible);
    })();
  });

  useEffect(() => {
    const checkStatus = async () => {
      const response = await getBiometricsAccess();
      console.log(response, "here is it");
      setEnableBiometrics(response);
    };

    checkStatus();
  }, []);

  const biometricsLogin = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Login with Biometrics",
        fallbackLabel: "Enter Password",
        disableDeviceFallback: true,
        cancelLabel: "Cancel",
      });
      setIsAuthenticated(result.success);
      const loginCreds = await getCredentials();
      if (result.success === true) {
        loginFunc(loginCreds);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white3 }}>
      <Customstatusbar />
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          {/* Logo */}

          <View style={{ marginTop: 30 }}>
            <Newlogo />
            <View style={{ marginTop: 28, marginBottom: 40 }}>
              <Text
                style={{
                  ...fontsize.bsmall,
                  ...FONTS.medium,
                  color: COLORS.black,
                  lineHeight: 21,
                  marginBottom: 9,
                }}
              >
                Padi, Welcome Back
              </Text>
              <Text
                style={{
                  ...fontsize.smallest,
                  color: COLORS.grey16,
                  ...FONTS.regular,
                }}
              >
                Sign into your feather account
              </Text>
            </View>
          </View>

          {/* Form */}
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => loginFunc(values)}
          >
            {(formikProps) => {
              const {
                isSubmitting,
                isValid,
                handleBlur,
                errors,
                touched,
                handleChange,
                handleSubmit,
              } = formikProps;
              return (
                <>
                  {/* {isSubmitting && checkIfSubmitting()} */}
                  {loading && <Loader />}


                  {/* Username input */}
                  <Input
                    placeholder="Phone Number / email / username"
                    name="username"
                    formikProps={formikProps}
                    icon={<Usericon />}
                  />


                  {/* Password input */}
                  <Input
                    placeholder="Password"
                    name="password"
                    formikProps={formikProps}
                    icon={<Lock />}
                    password={true}
                  />


                  {/* Bottom text */}
                  <JustifyBetween
                    style={{
                      marginTop: RFValue(16),
                      marginBottom: RFValue(22),
                    }}
                  >
                    <Text
                      style={[
                        styles.biometrics,
                        {
                          opacity:
                            isBiometricAllowed && enableBiometrics ? 1 : 0.2,
                        },
                      ]}
                      onPress={
                        isBiometricAllowed && enableBiometrics
                          ? biometricsLogin
                          : null
                      }
                    >
                      Use Biometrics
                    </Text>

                    <TouchableOpacity
                      onPress={() => navigation.navigate("Forgetpassword")}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.forgetPassword}>
                        Forgot Password?
                      </Text>
                    </TouchableOpacity>
                  </JustifyBetween>

                  <Custombutton btntext="Sign in" onpress={handleSubmit} />
                </>
              );
            }}
          </Formik>

          <View style={styles.haveanaccount}>
            <Text style={styles.haveaccounttext}>Don’t have an account? </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate("Personal")}
            >
              <Text style={styles.registerText}>Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Login;
