import {  styles } from "./Login.styles";
import { COLORS, icons } from "../../../constants";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Input, Loader } from "../../../components";
import { JustifyBetween } from "../../../global/styles";
import axiosCustom from "../../../httpRequests/axiosCustom";

const { Logo,Newlogo, Eyeicon, Usericon, Lock } = icons;

const setAuthorizationToken = (token:string)=>{
  if (token){
    axiosCustom.defaults.headers.common["token"] = token
  }
}

const validationSchema = Yup.object().shape({
  username: Yup
  .string()
  .label('username')
  .required(),
  password: Yup
  .string()
  .label('password')
  .required()
})

const Login = ({ navigation }: any) => {
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        {/* Logo */}
        <View style={styles.logoWrapper}>
          <Newlogo />
        </View>

        {/* Form */}
        <Formik 
          initialValues={{
            username:"",
            password:""
          }}
          validationSchema={validationSchema}
          onSubmit={async (values)=>{
            try{
              const response = await axiosCustom.post("/auth/signin",{username:values.username,password:values.password})
              //store token in ASYNC STORAGE
              //store in context
              console.log(response)
              setAuthorizationToken(response.data.data.token)
              navigation.navigate("Welcome")
            }catch(err){
              console.log(err.response)
            }
            console.log(values);
          }}
        >
          {
            (formikProps)=>{
              const { isSubmitting, isValid, handleBlur, errors, touched, handleChange, handleSubmit } = formikProps;
              return(<>
              {isSubmitting && <Loader />}
                {/* Phone or tag input */}
                  <View style={[styles.inputContainer, { marginBottom: 15 }]}>
                  <View style={styles.inputiconwrapper}>
                    <Usericon />
                  </View>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter your phone or feather tag"
                    placeholderTextColor={COLORS.white}
                    underlineColorAndroid="transparent"
                    onChangeText={handleChange("username")}
                    onBlur={handleBlur("username")}
                  />
                </View>

                {/* Password input */}
                <View style={styles.inputContainer}>
                  <View style={styles.inputiconwrapper}>
                    <Lock />
                  </View>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Enter your password"
                    placeholderTextColor={COLORS.white}
                    secureTextEntry
                    underlineColorAndroid="transparent"
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                  />
                  <View>
                    <Eyeicon />
                  </View>
                </View>
                {/* Bottom text */}
                <JustifyBetween style={{ marginTop: 30, marginBottom: 70 }}>
                  <Text style={styles.biometrics}>Use Biometrics</Text>
                  <Text style={styles.forgetPassword}>Forgot Password?</Text>
                </JustifyBetween>

                {/* Login btn */}
                <TouchableOpacity onPress={handleSubmit} style={styles.loginbtn}>
                  <Text style={styles.loginbtnText}>Log in</Text>
                </TouchableOpacity>
              </>
              )
            }
          }
        </Formik>

        <View style={styles.haveanaccount}>
          <Text style={styles.haveaccounttext}>
            Don’t have an account yet?
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => navigation.navigate("Signup")}
          >
            <Text style={styles.registerText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Login;
