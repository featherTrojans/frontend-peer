import React from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import { Input, Loader } from "../../../components";
import { icons } from "../../../constants";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { styles } from "./Setup.styles";
import axiosCustom from "../../../httpRequests/axiosCustom";

const { At, Usericondark } = icons;

const validationSchema = Yup.object().shape({
  username: Yup.string().label("Username").required(),
});

const setAuthorizationToken = (token:string)=>{
  if (token){
    axiosCustom.defaults.headers.common["token"] = token
  }
}

const Setup = ({route, navigation }) => {
  const {token} = route.params
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <StatusBar />
        {/* Header */}
        <View style={{ marginBottom: 31 }}>
          <Text style={styles.headerText}>Set up your unique</Text>
          <Text style={styles.headerText}>feather username.</Text>
        </View>

        {/* Informations */}
        <View style={{ marginBottom: 35 }}>
          <Text style={styles.setupText}>
            We set up a default username for you already, its advisable to
            customise it to your preference.
          </Text>
        </View>

        <Formik
          initialValues={{
            username: "",
          }}
          validationSchema={validationSchema}
          onSubmit={ async (values) => {
            console.log(values);
            try{
              const response = await axiosCustom.put("/auth/username/set",{newUsername:values.username},{headers:{token:token}})
              console.log(response)
              setAuthorizationToken(response.data.data.token)
              navigation.navigate("Welcome")
            }catch(err){
              console.log(err.response)
            }
          }}
        >
          {(formikProps) => {
            const { isSubmitting, isValid, handleBlur, errors, handleSubmit } = formikProps;
            return (
              <React.Fragment>
                {isSubmitting && <Loader />}
                <Input
                  placeholder="feather2923"
                  formikProps={formikProps}
                  name="username"
                  icon={<At />}
                />

                <View style={{ flex: 1, justifyContent: "flex-end" }}>
                  {/* Setup later btn */}
                  <View style={{ marginBottom: 40 }}>
                    <Text style={styles.laterBtn}>SETUP LATER</Text>
                  </View>
                  {/* Continue btn */}
                  <TouchableOpacity
                    style={styles.continueBtn}
                    activeOpacity={0.8}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.continueText}>CONTINUE</Text>
                  </TouchableOpacity>
                </View>
              </React.Fragment>
            );
          }}
        </Formik>
        {/* Input box */}
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Setup;
