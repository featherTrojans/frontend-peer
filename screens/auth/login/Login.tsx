import { useContext, useEffect } from "react";
import { styles } from "./Login.styles";
import { COLORS, icons, SIZES } from "../../../constants";


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
  KeyboardAvoidingView
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
// import * as Keychain from 'react-native-keychain';
import {setGenericPassword, getGenericPassword,ACCESS_CONTROL, Options, AuthenticationPrompt} from "react-native-keychain"
import * as LocalAuthentication from "expo-local-authentication";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Input, Loader } from "../../../components";
import { JustifyBetween } from "../../../global/styles";
import axiosCustom from "../../../httpRequests/axiosCustom";
import showerror from "../../../utils/errorMessage";
import { useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { RFValue } from "react-native-responsive-fontsize";
import { SafeAreaView } from "react-native-safe-area-context";

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
  const { setToken } = useContext(AuthContext);
  const [isBiometricAllowed, setIsBiometricAllowed] = useState(false)
  const [authenticated, setIsAuthenticated] = useState(false) 


  const LOGIN_SERVICE = "LOGIN_SERVICE"
  const CREDENTIALS_STORAGE_OPTIONS: Options = {
    accessControl: ACCESS_CONTROL.BIOMETRY_CURRENT_SET_OR_DEVICE_PASSCODE,
    service: LOGIN_SERVICE
  }


    const username = 'Charuka';
  const password = 'iTsAsEcReT';
  

  // const storeIt = async () => {
  //   await setGenericPassword(username, password, CREDENTIALS_STORAGE_OPTIONS);
  // }


  const checkUserStatus = async () => {
    try {
      const credentials = await getGenericPassword(CREDENTIALS_STORAGE_OPTIONS);
      if (credentials) {
        console.log(
          'Credentials successfully loaded for user ' + credentials.username
        );
      } else {
        console.log('No credentials stored');
      }
    } catch (error) {
      console.log('Keychain couldn\'t be accessed!', error);
    }
  }

  // useEffect(() => {
  //   storeIt()
    
  // },[])

  ///To check if the devuce supports biometrics
  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync()
      setIsBiometricAllowed(compatible)
    })()
  })


  const onAuthenticate = async () => {

    try {
      const result = await  LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate with Biometrics',
        fallbackLabel: ' Enter Password',
      });
      setIsAuthenticated(result.success)
      checkUserStatus()
      console.log(result.success, "Auth is successful ")
      

    } catch (error) {
      console.log(error)
    }
    
    
  }



  


 

  const toast = useToast();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.blue6 }}>
      <KeyboardAwareScrollView >
        <View style={styles.container}>
          {/* Logo */}
          <View style={styles.logoWrapper}>
            <Newlogo />
          </View>

          <StatusBar
            animated={true}
            backgroundColor="#003AD6"
            barStyle="light-content"
            networkActivityIndicatorVisible={true}
            showHideTransition="fade"
            hidden={false}
          />

          {/* Form */}
          <Formik
            initialValues={{
              username: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              try {
                const response = await axiosCustom.post("/auth/signin", {
                  username: values.username.trim(),
                  password: values.password.trim(),
                });
                if(response.status === 200){
                console.log(response, "here is the response")
                await setGenericPassword("Okikiola", "Omotosho", CREDENTIALS_STORAGE_OPTIONS)
                // storeIt()
                  // I want to save the usernam and password to keychain from here
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
                  navigation.navigate("Welcome", {
                    fromm: "login",
                    username: values.username,
                    token: token,
                  });
                }
              } catch (err) {
                showerror(toast, err);
              }


            }}
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
                  {isSubmitting && <Loader />}
                  {/* <Loader /> */}

                  {/* Phone or tag input */}
                  <View
                    style={[
                      styles.inputContainer,
                      { marginBottom: RFValue(15) },
                    ]}
                  >
                    <View style={styles.inputiconwrapper}>
                      <Usericon />
                    </View>
                    <TextInput
                      style={styles.textInput}
                      placeholder="Enter your phone or feather tag"
                      placeholderTextColor={COLORS.white}
                      underlineColorAndroid="transparent"
                      onChangeText={handleChange("username")}
                      onBlur={handleBlur("username")}
                      selectionColor={COLORS.white}
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
                      secureTextEntry={hidePassword}
                      underlineColorAndroid="transparent"
                      onChangeText={handleChange("password")}
                      onBlur={handleBlur("password")}
                      selectionColor={COLORS.white}
                    />
                    <TouchableOpacity
                      onPress={() => setHidePassword(!hidePassword)}
                      activeOpacity={0.8}
                    >
                      {hidePassword ? <Eyeicon /> : <Passwordhideicon />}
                    </TouchableOpacity>
                  </View>
                  {/* Bottom text */}
                  <JustifyBetween
                    style={{
                      marginTop: RFValue(30),
                      marginBottom: RFValue(70),
                    }}
                  >
                    <Text style={[styles.biometrics, { opacity: isBiometricAllowed ? 1 : 0.2 }]} onPress={() => onAuthenticate()}>
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

                  {/* Login btn */}
                  <TouchableOpacity
                    onPress={() => handleSubmit()}
                    style={styles.loginbtn}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.loginbtnText}>Log in</Text>
                  </TouchableOpacity>
                </>
              );
            }}
          </Formik>

          <View style={styles.haveanaccount}>
            <Text style={styles.haveaccounttext}>
              Don’t have an account yet?{" "}
            </Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => navigation.navigate("Personal")}
            >
              <Text style={styles.registerText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Login;
