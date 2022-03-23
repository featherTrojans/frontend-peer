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
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import { JustifyBetween } from "../../../../global/styles";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import { styles } from "./Security.styles";
import { AuthContext } from "../../../../context/AuthContext";
import showerror from "../../../../utils/errorMessage";
import { useToast } from "react-native-toast-notifications";
import Customstatusbar from "../../../shared/Customstatusbar";
import Globalmodal from "../../../shared/Globalmodal/Globalmodal";
import LottieView from "lottie-react-native";

const { Lockicondark,Successcheckanimate } = icons;



const setAuthorizationToken = (token: string) => {
  if (token) {
    axiosCustom.defaults.headers.common["token"] = token;
  }
};

const Security = ({ route, navigation }) => {
  const {token} =  route.params;
  const [showModal, setShowModal] = useState(false)
  const [result, setResult] = useState<any>();
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
       <Globalmodal
          showState={showModal}
          // onBgPress={() => setShowModal(true)}
          btnFunction={() =>{
            setShowModal(false);
            navigation.navigate("Welcome", {
              fromm: "setup",
              username: null,
              token: result?.token,
            })
          }
          }
          btnText="continue"
        >
          <View style={{alignItems: 'center', justifyContent: 'center',}}>
            <LottieView
              source={Successcheckanimate}
              autoPlay
              loop
              style={{ width: 148, height: 148 }}
            />
            <View
              style={{ marginTop: 24, marginBottom: 41, marginHorizontal: 25, justifyContent: 'center', alignItems: 'center' }}
            >
              <Text
                style={{
                  ...fontsize.bsmall,
                  ...FONTS.regular,
                  marginBottom: 17,
                }}
              >
                Your feather username is
              </Text>
              <Text
                style={{
                  ...fontsize.bxmedium,
                  ...FONTS.bold,
                  color: COLORS.blue6,
                }}
              >
                @{result?.username}
              </Text>
              <Text
                style={{
                  ...fontsize.bsmall,
                  ...FONTS.regular,
                  marginBottom: 17,
                }}
              >
                and Your transaction pin is
              </Text>
              <Text
                style={{
                  ...fontsize.bxmedium,
                  ...FONTS.bold,
                  color: COLORS.blue6,
                }}
              >
                0000
              </Text>
              <Text
                style={{
                  ...fontsize.bsmall,
                  ...FONTS.regular,
                  marginVertical: 41,
                  textAlign: 'center'
                }}
              >
                This can be used as an account identity to receive payments and
                perform transactions
              </Text>
              <Text
              style={{
                ...fontsize.small,
                ...FONTS.regular,
                color: COLORS.grey2,
                textAlign: "center"
              }}
            >
              *This username and transaction pin can be changed under settings
            </Text>
            </View>
          
          </View>
        </Globalmodal>
      <View style={styles.container}>
        <Customstatusbar />
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
            if( values.password.length < 8){
              return showerror(toast,null,"password should have a minimun of 8 characters");
            }
            try{
              const response = await axiosCustom.put("auth/password/set", {password:values.password},{headers:{token:token}});
              setShowModal(true)
              setResult(response.data.data)
              setAuthorizationToken(response?.data?.data?.token)
              // navigation.navigate("Securepin",{token:result?.token});
              // navigation.navigate("Welcome",{fromm:"setup", username:null,token:response?.data?.data?.token})
            }catch(err){
              showerror(toast,err)
            }
          }}
        >
          {(formikProps) => {
            const {
              isSubmitting,
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
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Security;
