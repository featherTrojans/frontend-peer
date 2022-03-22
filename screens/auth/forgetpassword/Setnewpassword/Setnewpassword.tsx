import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React,{useState} from "react";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import { Input, Loader } from "../../../../components";
import { styles } from "../../signup/Personal/Personal.styles";
import { useToast } from "react-native-toast-notifications";
import { Formik } from "formik";
import * as Yup from "yup";
import showerror from "../../../../utils/errorMessage";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import Globalmodal from "../../../shared/Globalmodal/Globalmodal";
import LottieView from "lottie-react-native"
const { Lockicondark, Successcheckanimate } = icons;

const Setnewpassword = ({ navigation , route}) => {
  const {code, token} = route.params
  const [showModal, setShowModal] = useState<boolean>(false)
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
    
    <View
      style={{ flex: 1, backgroundColor: COLORS.white, paddingHorizontal: 25 }}
    >

      <Globalmodal
          showState={showModal}
          onBgPress={() => setShowModal(true)}
          btnFunction={() =>{
              navigation.navigate("Login")
              setShowModal(false)
            }}
          btnText="Continue"
        >
          <View style={{marginBottom: 50, justifyContent: 'center', alignItems: 'center', marginHorizontal: 85}}>
              <LottieView source={Successcheckanimate} style={{width: 148, height: 148}} autoPlay loop/>
              <Text style={{...fontsize.bsmall, ...FONTS.regular, marginTop: 17, textAlign: 'center'}}>Your Pasword has been chnaged successfully </Text>
          </View>
        </Globalmodal>
      <View style={{ marginTop: 34 }}>
        <Text style={{ ...fontsize.big, ...FONTS.bold, marginBottom: 30 }}>
        Set New Password
        </Text>
        <Text style={{ ...fontsize.bsmall, ...FONTS.regular, lineHeight: 24 }}>
        Set up your new password, to continue this process and have access to your account.
        </Text>
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
              const response = await axiosCustom.put("/new/password", {password:values.password, code:code},{headers:{token:token}});
              //store data in context
              // console.log(response)
              setShowModal(true)
              // GLobal succss then to login
              // navigation.navigate("Securepin",{token:response?.data?.data?.token});
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
          return(
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
                <Text style={styles.bottomText}>Have an account yet?</Text>
      
                <TouchableOpacity
                  onPress={() => navigation.navigate("Login")}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.bottomText, { ...FONTS.bold }]}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
            </React.Fragment>)}}
            </Formik>
    </View>
  );
};

export default Setnewpassword;
