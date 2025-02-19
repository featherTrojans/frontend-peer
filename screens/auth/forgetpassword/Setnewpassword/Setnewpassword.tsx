import {
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import { FONTS, fontsize, icons } from "../../../../constants";
import {
  Custombutton,
  Input,
  Loader,
  Mainwrapper,
  Successmodal,
} from "../../../../components";
import { styles } from "../../signup/Personal/Personal.styles";
import { Formik } from "formik";
import * as Yup from "yup";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import useAlert from "../../../../utils/useAlerts";
import { removeBiometricsAccess } from "../../../../utils/biometrics";
import useCustomModal from "../../../../utils/useCustomModal";

const { Lockicondark } = icons;

const Setnewpassword = ({ navigation, route }) => {
  const { code, token } = route.params;
  const { errorAlert } = useAlert();
  const { CustomModal, openModal, closeModal } = useCustomModal();
  const validationSchema = Yup.object().shape({
    password: Yup.string().label("Password").required(),
    confirmPassword: Yup.string()
      .label("Confirm Password")
      .required()
      .test("Passwords match", "Passwords must match", function (value) {
        return this.parent.password === value;
      }),
  });

  let closeSucessModal = () => {
    closeModal();
    navigation.navigate("Login");
  };

  return (
    <Mainwrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View style={{ paddingHorizontal: 25, flex: 1 }}>
          <CustomModal>
            <Successmodal
              successMsg="Your Pasword has been changed successfully"
              btnText="Done, Proceed"
              btnFunction={closeSucessModal}
            />
          </CustomModal>

          <View style={{ marginTop: 34 }}>
            <Text
              style={{ ...fontsize.bmedium, ...FONTS.bold, marginBottom: 20 }}
            >
              Set New Password
            </Text>
            <Text
              style={{ ...fontsize.small, ...FONTS.regular, lineHeight: 24 }}
            >
              Set up your new password, to continue this process and have access
              to your account.
            </Text>
          </View>
          <Formik
            initialValues={{
              password: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              //  do validation
              console.log(values.password.length, "here");
              if (values.password.length < 8) {
                return errorAlert(
                  "Password should have a minimun of 8 characters"
                );
              }
              try {
                //send the request
                const response = await axiosCustom.put(
                  "/new/password",
                  { password: values.password.trim(), code: code },
                  { headers: { token: token } }
                );
                //store data in context
                removeBiometricsAccess();
                openModal();
              } catch (err) {
                // error handling
                errorAlert(err);
              }
              //You want to call handleSubmitData here and pass in the values
            }}
          >
            {(formikProps) => {
              const { isSubmitting, handleSubmit } = formikProps;
              return (
                <React.Fragment>
                  {isSubmitting && <Loader />}
                  <View style={{ marginTop: 30 }}>
                    <Input
                      placeholder="Password"
                      name="password"
                      formikProps={formikProps}
                      icon={<Lockicondark />}
                    />
                    <Input
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      formikProps={formikProps}
                      icon={<Lockicondark />}
                    />
                  </View>

                  <View style={[styles.bottomContainer, { flex: 1 }]}>
                    <Custombutton
                      btntext="Proceed"
                      onpress={handleSubmit}
                      disable={isSubmitting}
                    />
                    {/* Have an account */}
                    <View style={styles.bottomTextContainer}>
                      <Text style={styles.bottomText}>
                        Have an account yet?
                      </Text>

                      <View style={[styles.bottomContainer, { flex: 1 }]}>
                        <TouchableOpacity
                          style={styles.proceedBtn}
                          activeOpacity={0.8}
                          onPress={handleSubmit}
                          // onPress={handleSubmit}
                          // disabled={isSubmitting}
                        >
                          <Text style={styles.proceedText}>PROCEED</Text>
                        </TouchableOpacity>

                        {/* Have an account */}
                        <View style={styles.bottomTextContainer}>
                          <Text style={styles.bottomText}>
                            Have an account yet?
                          </Text>

                          <TouchableOpacity
                            onPress={() => navigation.navigate("Login")}
                            activeOpacity={0.8}
                          >
                            <Text
                              style={[styles.bottomText, { ...FONTS.bold }]}
                            >
                              Login
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </React.Fragment>
              );
            }}
          </Formik>
        </View>
      </KeyboardAvoidingView>
    </Mainwrapper>
  );
};

export default Setnewpassword;
