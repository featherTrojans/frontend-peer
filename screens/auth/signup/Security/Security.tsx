import React, { useState, useContext } from "react";
import {
  View,
  Text
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import * as Yup from "yup";
import { Custombutton, Input, Loader } from "../../../../components/index";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import { styles } from "./Security.styles";
import Customstatusbar from "../../../shared/Customstatusbar";
import Globalmodal from "../../../shared/Globalmodal/Globalmodal";
import { SafeAreaView } from "react-native-safe-area-context";
import useAlert from "../../../../utils/useAlerts";

const { Lock, Newlogo, Successcheckanimate, Passwordpinlock } = icons;

const setAuthorizationToken = (token: string) => {
  if (token) {
    axiosCustom.defaults.headers.common["token"] = token;
  }
};

const Security = ({ route, navigation }) => {
  const { token } = route.params;
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState<any>();
  const {errorAlert} = useAlert()
  const validationSchema = Yup.object().shape({
    password: Yup.string().label("Password").required(),
    confirmPassword: Yup.string()
      .label("Confirm Password")
      .required()
      .test("Passwords match", "Passwords must match", function (value) {
        return this.parent.password === value;
      }),
  });

  return (
    <SafeAreaView style={styles.container}>
      <Customstatusbar />

      <KeyboardAwareScrollView contentContainerStyle={{ flex: 1 }}>
        <Globalmodal
          showState={showModal}
          // onBgPress={() => setShowModal(true)}
          btnFunction={() => {
            setShowModal(false);
            navigation.navigate("Welcometochange", {
              fromm: "setup",
              username: result?.username,
              token: result?.token,
            });

            // navigation.navigate("Welcome", {
            //   fromm: "setup",
            //   username: null,
            //   token: result?.token,
            // })
          }}
          btnText="Setup Transaction PIN"
        >
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginVertical: 40,
            }}
          >

            {/* icons is here */}
            <Passwordpinlock />
            <Text style={{ textAlign: "center", ...fontsize.smallest, ...FONTS.regular, color: COLORS.black, paddingHorizontal: 40, marginTop: 34 }}>
              *We take your security and privacy serious, Kindly setup your pin
              to continue on the app
            </Text>
          </View>
        </Globalmodal>

        <View style={{ paddingHorizontal: 25, paddingTop: 30, flex: 1 }}>
          <View
            style={{
              alignItems: "center",
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Newlogo />

            <View style={{ flexDirection: "row" }}>
              <View style={[styles.topDots, { marginRight: 10 }]} />
              <View style={[styles.activeDot, { marginRight: 10 }]} />
              <View style={styles.topDots} />
            </View>
          </View>

          <View style={{ marginTop: 28, marginBottom: 40 }}>
            <Text
              style={{
                ...fontsize.bsmall,
                ...FONTS.medium,
                color: COLORS.black,
                lineHeight: 21,
              }}
            >
              Signup, Join the flock.
            </Text>
            <Text
              style={{
                ...fontsize.smallest,
                color: COLORS.grey16,
                marginTop: 9,
                lineHeight: 21,
              }}
            >
              Create Password
            </Text>
          </View>

          <Formik
            initialValues={{
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {

              if (values.password.length < 8) {
                errorAlert(null,"password should have a minimun of 8 characters");
              }
              try {
                const response = await axiosCustom.put(
                  "auth/password/set",
                  { password: values.password },
                  { headers: { token: token } }
                );

                setShowModal(true);
                setResult(response.data.data);
                setAuthorizationToken(response?.data?.data?.token);

              } catch (err) {
                errorAlert(err);
              }
            }}
          >
            {(formikProps) => {
              const { isSubmitting, handleSubmit } = formikProps;

              return (
                <React.Fragment>
                  {isSubmitting && <Loader />}
                  <Input
                    placeholder="Password"
                    name="password"
                    formikProps={formikProps}
                    icon={<Lock />}
                    password
                  />
                  {/* {isSubmitting && <Loader />} */}
                  <Input
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    formikProps={formikProps}
                    icon={<Lock />}
                    password
                  />
                  <View style={{ marginTop: 7 }}>
                    <Custombutton
                      btntext="Proceed"
                      onpress={() => handleSubmit()}
                    />
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

export default Security;
