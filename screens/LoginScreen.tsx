import React, { useContext, useEffect } from "react";
import { COLORS, FONTS, fontsize, icons, SIZES } from "../constants";

import { View, Text, TouchableOpacity } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";

import * as LocalAuthentication from "expo-local-authentication";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { FTCustombutton, FTInput, FTLoader, FTMainwrapper } from "../components";
import axiosCustom from "../httpRequests/axiosCustom";
import { useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { RFValue } from "react-native-responsive-fontsize";
import {
  getBiometricsAccess,
  getCredentials,
  saveCredentials,
} from "../utils/biometrics";
import { LoginScreenStyles } from "../assets/styles/screens";
import { useAlert } from "../hooks";

const {
  container,
  logoWrapper,
  inputContainer,
  textInput,
  inputiconwrapper,
  biometrics,
  forgetPassword,
  loginbtn,
  loginbtnText,
  haveaccounttext,
  haveanaccount,
  registerText,
} = LoginScreenStyles;

const { Newlogo, Transfericon } = icons;

const setAuthorizationToken = (token: string) => {
  if (token) {
    axiosCustom.defaults.headers.common["token"] = token;
  }
};

const validationSchema = Yup.object().shape({
  username: Yup.string().label("username").required(),
  password: Yup.string().label("password").required(),
});

const LoginScreen = ({ navigation }: any) => {
  const [hidePassword, setHidePassword] = useState(true);
  const { setToken, allowBiometrics, setAllowBiometrics } =
    useContext(AuthContext);
  const { errorAlert } = useAlert();

  const [isBiometricAllowed, setIsBiometricAllowed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [enableBiometrics, setEnableBiometrics] = useState<null | string>(null);

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
      const token = response.data.data.token;
      setAuthorizationToken(token);
      try {
        await axiosCustom.post(
          "auth/pin/verify",
          { user_pin: "0000" },
          { headers: { token: token } }
        );
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
      console.log("there is an err");
      errorAlert(err);
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
    <FTMainwrapper>
      <KeyboardAwareScrollView>
        <View style={container}>
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
                  {loading && <FTLoader />}

                  <FTInput
                    placeholder="Phone Number / email / username"
                    name="username"
                    formikProps={formikProps}
                    icon={<Transfericon />}
                  />

                  <FTInput
                    placeholder="Password"
                    name="password"
                    formikProps={formikProps}
                    icon={<Transfericon />}
                    password={true}
                  />

                  <View
                    style={{
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: RFValue(16),
                      marginBottom: RFValue(22),
                    }}
                  >
                    <Text
                      style={[
                        biometrics,
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
                  </View>

                  <FTCustombutton btntext="Sign in" onpress={handleSubmit} />
                </>
              );
            }}
          </Formik>

          <View style={haveanaccount}>
            <Text style={haveaccounttext}>Don’t have an account? </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </FTMainwrapper>
  );
};

export default LoginScreen;
