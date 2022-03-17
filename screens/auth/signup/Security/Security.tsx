import React, { useState, useContext } from "react";
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
import { Input, Loader } from "../../../../components/index";
import { FONTS, icons } from "../../../../constants";
import { JustifyBetween } from "../../../../global/styles";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import { styles } from "./Security.styles";
import { AuthContext } from "../../../../context/AuthContext";
import showerror from "../../../../utils/errorMessage";
import { useToast } from "react-native-toast-notifications";
import Customstatusbar from "../../../shared/Customstatusbar";

const { Lockicondark } = icons;

const Security = ({ route, navigation }) => {
  const {token} =  route.params;
  const toast = useToast();
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

  
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>

        <Customstatusbar />
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
          onSubmit={async (values,{setSubmitting}) => {
            //  do validation
            if( values.password.length < 8){
              return showerror(toast,null,"password should have a minimun of 8 characters");
            }
            try {
              //send the request
              const response = await axiosCustom.put("auth/password/set", {password:values.password},{headers:{token:token}});
              //store data in context
              console.log(response)
              navigation.navigate("Securepin",{token:response?.data?.data?.token});
            } catch (err) {
              // error handling
              showerror(toast,err)
            }
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
                {isSubmitting && <Loader />}
                <Input
                  placeholder="Password"
                  name="password"
                  formikProps={formikProps}
                  icon={<Lockicondark />}
                  password
                />
                  {isSubmitting && <Loader />}
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
                    onPress={handleSubmit}
                  >
                    <Text style={styles.proceedText}>PROCEED</Text>
                  </TouchableOpacity>
                  {/* Have an account */}
                  <View style={styles.bottomTextContainer}>
                    <Text style={styles.bottomText}>Have an account yet? </Text>
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => navigation.navigate("Login")}
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
