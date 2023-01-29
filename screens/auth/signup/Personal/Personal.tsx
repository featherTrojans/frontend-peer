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
import { Custombutton, Input, Loader, Mainwrapper } from "../../../../components/index";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import { JustifyBetween } from "../../../../global/styles";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import { styles } from "./Personal.styles";
import { AuthContext } from "../../../../context/AuthContext";
// import { useToast } from "react-native-toast-notifications";
import showerror from "../../../../utils/errorMessage";
import Customstatusbar from "../../../shared/Customstatusbar";
import { RFValue } from "react-native-responsive-fontsize";
// import DropDownPicker from "react-native-dropdown-picker";
import { SafeAreaView } from "react-native-safe-area-context";
import Lock from "../../../../assets/icons/Lock";
import useAlert from "../../../../utils/useAlerts";


const { Usericondark, Phoneicon, Envelopeicon, Newlogo } = icons;

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object().shape({
  firstName: Yup.string().label("First Name").required(),
  lastName: Yup.string().label("Last Name").required(),
  email: Yup.string().label("Email").email().required(),
  referredBy: Yup.string().label("Referrer"),
  password:Yup.string().required().min(8),
  phoneNumber: Yup.string()
    .label("Phone Number")
    .matches(phoneRegExp, "This is not a valid phone number"),
});

const Personal = ({ navigation }) => {
  const { setAuthData } = useContext(AuthContext);
  // const toast = useToast();
  const {errorAlert } = useAlert()

  return (
    <Mainwrapper >






      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={{flex: 1, paddingHorizontal: 25}}>

      

            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: 30}}>
              <Newlogo />
            </View>


            <View style={{marginTop: 28, marginBottom: 40}}>
            <Text style={{...fontsize.bsmall, ...FONTS.medium, color: COLORS.black, lineHeight: 21, marginBottom: 9}}>Signup, Join the flock.</Text>
            <Text style={{...fontsize.smallest, color: COLORS.grey16, ...FONTS.regular}}>Personal Information</Text>
          </View>

            
          
       

          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              phoneNumber: "",
              password:"",
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
                errorAlert(err);
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
                    inputbg={COLORS.white}
                  />

                  <Input  
                    placeholder="Lastname"
                    name="lastName"
                    formikProps={formikProps}
                    icon={<Usericondark />}
                    inputbg={COLORS.white}
                  />

                  <Input
                    placeholder="Email Address"
                    name="email"
                    formikProps={formikProps}
                    icon={<Envelopeicon />}
                    inputbg={COLORS.white}
                  />

                  <Input
                    placeholder="Phone Number"
                    name="phoneNumber"
                    formikProps={formikProps}
                    icon={<Phoneicon />}
                    inputbg={COLORS.white}
                  />
                   <Input
                    placeholder="Password"
                    name="password"
                    formikProps={formikProps}
                    icon={<Lock />}
                    password={true}
                    inputbg={COLORS.white}
                  />

                  <Input
                    placeholder="Referral Code (Optional)"
                    name="referredBy"
                    formikProps={formikProps}
                    icon={<Phoneicon />}
                    inputbg={COLORS.white}
                  />

                  {/* Proceed Btn */}
                  <View style={styles.bottomContainer}>



                     <Custombutton btntext="Sign up" onpress={()=>{
                      const errorvalues = Object.values(errors)
                      if(errorvalues.length > 0){
                        return errorAlert(null, errorvalues[0])
                      }
                      handleSubmit()
                      }} disable={isSubmitting}/> 
                    {/* <TouchableOpacity
                      style={styles.proceedBtn}
                      activeOpacity={0.8}
                      onPress={handleSubmit}
                      disabled={isSubmitting}
                    >
                      <Text style={styles.proceedText}>PROCEED</Text>
                    </TouchableOpacity> */}




                    {/* Have an account */}
                    <View style={styles.bottomTextContainer}>
                      <Text style={styles.bottomText}>
                      Already have an account? {" "}
                      </Text>

                      <TouchableOpacity
                        onPress={() => navigation.navigate("Login")}
                        activeOpacity={0.8}
                      >
                        <Text style={[styles.bottomText, { ...FONTS.bold }]}>
                          Sign in
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
    </Mainwrapper>
  );
};

export default Personal;
