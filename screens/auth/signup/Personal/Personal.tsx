import React, { useState } from "react";
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Formik } from "formik";
import * as Yup from "yup"
import { Input } from "../../../../components/index";
import { FONTS, icons } from "../../../../constants";
import { JustifyBetween } from "../../../../global/styles";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import { styles } from "./Personal.styles";

const { Usericondark, Phoneicon, Envelopeicon, Cancelicon } = icons;



const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const validationSchema = Yup.object().shape({
  firstName: Yup
  .string()
  .label('First Name')
  .required(),
  lastName: Yup
  .string()
  .label('Last Name')
  .required(),
  email:  Yup
  .string()
  .label("Email")
  .email()
  .required(),
  phoneNumber: Yup
  .string()
  .label("Phone Number")
  .matches(phoneRegExp, 'This is not a valid phone number')
})



const Personal = ({ navigation }) => {
 
  const handleSubmitData = async () => {

  };
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <StatusBar />
        
        {/* ERROR PAGE */}
        {/* <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Oops, error creating your account, email already in use</Text>
          <Cancelicon />
        </View> */}

        {/* <Text>Sign up page</Text> */}
        {/* Get Started and dots */}
        <JustifyBetween style={{ marginBottom: 10 }}>
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
        <View style={{ marginBottom: 40 }}>
          <Text style={styles.subText}>Personal</Text>
        </View>

        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values,{setSubmitting}) => {
            console.log(values);
            try {
              //send the request
              const response = await axiosCustom.post("auth/signup", values);
              //store data in context
              console.log(response);
              navigation.navigate("Verification");
            } catch (err) {
              // error handling
              console.log(err.response);
            }
            //You want to call handleSubmitData here and pass in the values
          }}
        >
          {(formikProps) => {

          const { isSubmitting, isValid, handleBlur, errors, touched, handleChange, handleSubmit } = formikProps;
            return (
              <React.Fragment>
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

                {/* Proceed Btn */}
                <View style={styles.bottomContainer}>
                  <TouchableOpacity
                    style={styles.proceedBtn}
                    activeOpacity={0.8}
                    onPress={handleSubmit}
                    disabled={isSubmitting}
                  >
                    <Text style={styles.proceedText}>
                      {isSubmitting?"loading ...":"PROCEED"}
                    </Text>
                  </TouchableOpacity>

                  {/* Have an account */}
                  <View style={styles.bottomTextContainer}>
                    <Text style={styles.bottomText}>Have an account yet?</Text>
                    
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
  );
};

export default Personal;

// const styles = StyleSheet.create({
//   container: {
//     // flex: 1,
//     width: SIZES.width,
//     height: SIZES.height,
//     backgroundColor: COLORS.white,
//     paddingHorizontal: 25,
//     paddingTop: 25,
//   },
//   header: {
//     ...fontsize.big,
//     ...FONTS.bold,
//     color: COLORS.black,
//   },
//   topDots: {
//     width: 8,
//     height: 8,
//     backgroundColor: COLORS.grey1,
//     borderRadius: 16,
//   },
//   subText: {
//     color: COLORS.grey5,
//     ...fontsize.medium,
//     ...FONTS.regular
//   },
//   proceedBtn: {
//     backgroundColor: COLORS.blue6,
//     justifyContent: "center",
//     alignItems: "center",
//     height: 62,
//     borderRadius: 10,
//   },
//   proceedText: {
//     color: COLORS.white,
//     ...fontsize.smallest,
//     ...FONTS.bold,
//   },
//   bottomContainer:{
//     flex: 1,
//     justifyContent: "flex-end",
//     marginBottom: 80
//   },
//   bottomTextContainer: {
//     flexDirection: "row",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: 28,
//   },
//   bottomText: {
//     ...fontsize.small,
//     ...FONTS.regular,
//     color: COLORS.black,
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });
