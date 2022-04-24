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
import { Input, Loader } from "../../../../components/index";
import { FONTS, icons } from "../../../../constants";
import { JustifyBetween } from "../../../../global/styles";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import { styles } from "./Personal.styles";
import { AuthContext } from "../../../../context/AuthContext";
import { useToast } from "react-native-toast-notifications";
import showerror from "../../../../utils/errorMessage";
import Customstatusbar from "../../../shared/Customstatusbar";
import { RFValue } from "react-native-responsive-fontsize";
import DropDownPicker from "react-native-dropdown-picker";
import { SafeAreaView } from "react-native-safe-area-context";

const { Usericondark, Phoneicon, Envelopeicon } = icons;

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object().shape({
  firstName: Yup.string().label("First Name").required(),
  lastName: Yup.string().label("Last Name").required(),
  email: Yup.string().label("Email").email().required(),
  referredBy: Yup.string().label("Referrer"),
  phoneNumber: Yup.string()
    .label("Phone Number")
    .matches(phoneRegExp, "This is not a valid phone number"),
});

const Personal = ({ navigation }) => {
  const { setAuthData } = useContext(AuthContext);
  const toast = useToast();

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Customstatusbar />

          {/* ERROR PAGE */}

          {/* <Text>Sign up page</Text> */}
          {/* Get Started and dots */}

          <JustifyBetween style={{ marginBottom: RFValue(10) }}>
            <View>
              <Text style={styles.header}>Get Started.</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={[styles.activeDot, { marginRight: 10 }]} />
              <View style={[styles.topDots, { marginRight: 10 }]} />
              <View style={styles.topDots} />
            </View>
          </JustifyBetween>
          {/* personal */}
          <View style={{ marginBottom: RFValue(40) }}>
            <Text style={styles.subText}>Personal</Text>
          </View>

          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              phoneNumber: "",
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
                  referredBy: values.referredBy.trim(),
                });
                //store data in context
                // setAuthData(response?.data?.data)
                navigation.navigate("Verification", {
                  email: values.email,
                  phoneNumber: values.phoneNumber,
                  token: response?.data?.data?.token,
                });
              } catch (err) {
                console.log(err.response);
                if (err.response) {
                  if (!err?.response?.data?.data?.isVerified) {
                    return navigation.navigate("Verification", {
                      email: values.email,
                      phoneNumber: values.phoneNumber,
                      token: null,
                    });
                  }
                }
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
                <React.Fragment>
                  {isSubmitting && <Loader />}
                  {/* Input */}
                  <Input
                    placeholder="Firstname"
                    name="firstName"
                    formikProps={formikProps}
                    icon={<Usericondark />}
                  />

                  <Input
                    placeholder="Lastname"
                    name="lastName"
                    formikProps={formikProps}
                    icon={<Usericondark />}
                  />

                  <Input
                    placeholder="Email Address"
                    name="email"
                    formikProps={formikProps}
                    icon={<Envelopeicon />}
                  />

                  <Input
                    placeholder="Phone Number"
                    name="phoneNumber"
                    formikProps={formikProps}
                    icon={<Phoneicon />}
                  />

                  <Input
                    placeholder="Referral Code (Optional)"
                    name="referredBy"
                    formikProps={formikProps}
                    icon={<Phoneicon />}
                  />

                  {/* Proceed Btn */}
                  <View style={styles.bottomContainer}>
                    <TouchableOpacity
                      style={styles.proceedBtn}
                      activeOpacity={0.8}
                      onPress={handleSubmit}
                      disabled={isSubmitting}
                    >
                      <Text style={styles.proceedText}>PROCEED</Text>
                    </TouchableOpacity>

                    {/* Have an account */}
                    <View style={styles.bottomTextContainer}>
                      <Text style={styles.bottomText}>
                        Have an account yet?{" "}
                      </Text>

                      <TouchableOpacity
                        onPress={() => navigation.navigate("Login")}
                        activeOpacity={0.8}
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
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Personal;
