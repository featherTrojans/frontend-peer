import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TouchableHighlight,
  Alert,
  ScrollView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import * as Yup from "yup";

import { PersonalRegisterScreenStyles } from "../assets/styles/screens/personalregister.style";
import {
  FTBackheader,
  FTCustombutton,
  FTInput,
  FTMainwrapper,
  FTTitlepagewrapper,
} from "../components";
import axiosCustom from "../httpRequests/axiosCustom";
import Loader from "../components/FTLoader";

PersonalRegisterScreenStyles;

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object().shape({
  firstName: Yup.string().label("First Name").required(),
  lastName: Yup.string().label("Last Name").required(),
  email: Yup.string().label("Email").email().required(),
  referredBy: Yup.string().label("Referrer"),
  password: Yup.string().required().min(8),
  phoneNumber: Yup.string()
    .label("Phone Number")
    .matches(phoneRegExp, "This is not a valid phone number"),
});

const Personal = ({ navigation }) => {
  //   const { setAuthData } = useContext(AuthContext);
  //   const toast = useToast();
  //   const { errorAlert } = useAlert();

  return (
    <FTTitlepagewrapper>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, paddingHorizontal: 25 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: 30,
            }}
          ></View>

          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              phoneNumber: "",
              password: "",
              referredBy: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              try {
                //send the request
                const response = await axiosCustom.post("auth/signup", {
                  firstName: values.firstName.trim(),
                  lastName: values.lastName.trim(),
                  email: values.email.trim(),
                  phoneNumber: values.phoneNumber.trim(),
                  password: values.password,
                  referredBy: values.referredBy.trim(),
                });
                navigation.navigate("Verification", {
                  email: values.email,
                  phoneNumber: values.phoneNumber,
                  token: response?.data?.data?.token,
                });
              } catch (err) {
                if (err.response) {
                  if (!err?.response?.data?.data?.isVerified) {
                    return navigation.navigate("Verification", {
                      email: values.email,
                      phoneNumber: values.phoneNumber,
                      token: null,
                    });
                  }
                }
                // errorAlert(err);
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
                <React.Fragment>
                  {isSubmitting && <Loader />}
                  {/* Input */}
                  <FTInput
                    placeholderText="Enter your name"
                    name="firstName"
                    label="Legal Firstname"
                    formikProps={formikProps}
                  />
                  <FTInput
                    placeholderText="Enter your name"
                    name="lastName"
                    label="Legal Lastname"
                    formikProps={formikProps}
                  />
                  <FTInput
                    placeholderText="Enter valid email address"
                    name="email"
                    label="Email"
                    formikProps={formikProps}
                  />

                  <FTInput
                    placeholderText="--- Select Gender ---"
                    name="gender"
                    label="Gender"
                    formikProps={formikProps}
                  />

                  {/* Proceed Btn */}
                  <View>
                    <FTCustombutton
                      disable={isSubmitting}
                      btntext="Sign up"
                      onpress={() => {
                        const errorvalues = Object.values(errors);
                        if (errorvalues.length > 0) {
                          //   return errorAlert(null, errorvalues[0]);
                        }
                        handleSubmit();
                      }}
                    />

                    {/* Have an account */}
                    {/* <View style={styles.bottomTextContainer}>
                      <Text style={styles.bottomText}>
                        Already have an account?{" "}
                      </Text>

                      <TouchableOpacity
                        onPress={() => navigation.navigate("Login")}
                        activeOpacity={0.8}
                      >
                        <Text style={[styles.bottomText, { ...FONTS.bold }]}>
                          Sign in
                        </Text>
                      </TouchableOpacity>
                    </View> */}
                  </View>
                </React.Fragment>
              );
            }}
          </Formik>
        </View>
      </KeyboardAwareScrollView>
    </FTTitlepagewrapper>
  );
};

export default Personal;
