import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import * as Yup from "yup";
import { Input } from "../../../../components/index";
import { FONTS, icons } from "../../../../constants";
import { JustifyBetween } from "../../../../global/styles";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import { styles } from "./Security.styles";

const { Lockicondark } = icons;

const Security = ({ navigation }) => {
  const validationSchema = Yup.object().shape({
    password: Yup
    .string()
    .label("Password")
    .required(),
    confirmPassword: Yup
      .string()
      .label("Confirm Password")
      .required()
      .test("Passwords match", "Passwords must match", function (value) {
        return this.parent.password === value;
      }),
  });

  const [password, setPassword] = useState("");
  const [comfirmPassword, setConfirmPassword] = useState("");


  
  const handleSubmitData = async () => {
    try {
      const response = await axiosCustom.post("/auth/password/set", {
        password,
      });
      console.log(response);
      navigation.navigate("Login");
    } catch (err) {
      console.log(err.response);
    }
  };
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
            <View style={[styles.activeDot, { marginRight: 10 }]} />
            <View style={styles.topDots} />
          </View>
        </JustifyBetween>
        {/* personal */}
        <View style={{ marginBottom: 40 }}>
          <Text style={styles.subText}>Security</Text>
        </View>

        <Formik
          initialValues={{
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
            //You want to call handleSubmitData here and pass in the values
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
              <React.Fragment>
                <Input
                  placeholder="Password"
                  name="password"
                  formikProps={formikProps}
                  icon={<Lockicondark />}
                  password
                />

                <Input
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  formikProps={formikProps}
                  icon={<Lockicondark />}
                  password
                />

                <View style={styles.bottomContainer}>
                  <TouchableOpacity
                    style={styles.proceedBtn}
                    activeOpacity={0.8}
                    onPress={() => navigation.navigate("Securepin")}
                  >
                    <Text style={styles.proceedText}>PROCEED</Text>
                  </TouchableOpacity>
                  {/* Have an account */}
                  <View style={styles.bottomTextContainer}>
                    <Text style={styles.bottomText}>Have an account yet?</Text>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={handleSubmit}
                    >
                      <Text style={[styles.bottomText, { ...FONTS.bold }]}>
                        Login
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </React.Fragment>
            );
          }}
        </Formik>

        {/* Input */}

        {/* Proceed Btn */}
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Security;
