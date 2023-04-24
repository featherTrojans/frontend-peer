import { StyleSheet, Text, View, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import React, { useState } from "react";
import { COLORS, FONTS, fontsize, icons } from "../../../constants";
import { Custombutton, Input, Loader, Mainwrapper } from "../../../components";
import { styles } from "../signup/Personal/Personal.styles";
import axiosCustom from "../../../httpRequests/axiosCustom";
import useAlert from "../../../utils/useAlerts";
const { Envelopeicon, Newlogo } = icons;

const Forgetpassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const {errorAlert} = useAlert()


  
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axiosCustom.post("/forgot/password", { email: email.trim() });
      navigation.navigate("Forgetpasswordotp", {
        token: response?.data?.data?.token,
        email: email.trim(),
      });
    } catch (err) {
      errorAlert(err)
    } finally {
      setLoading(false);
    }
  };

  



  return (
    <Mainwrapper >



      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ paddingHorizontal: 25, flex: 1 }}>
        {loading && <Loader />}
        <View style={{ marginTop: 30 }}>
          <View style={{marginBottom: 28}}>
            <Newlogo />
          </View>
          <Text style={{ ...fontsize.bsmall, ...FONTS.bold, marginBottom: 9 }}>
            Forgot Password
          </Text>
          <Text
            style={{ ...fontsize.smallest, ...FONTS.regular, lineHeight: 24 }}
          >
            Kindly input a valid email address linked to your feather account.
          </Text>
        </View>

        <View style={{ marginTop: 30 }}>
          <Input
            placeholder="Email Address"
            name="email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            //   formikProps={formikProps}
            icon={<Envelopeicon />}
          />
        </View>

        <View style={[styles.bottomContainer, {marginBottom: 20}]}>


          <Custombutton
               // onPress={handleSubmit}
            // disabled={isSubmitting}
           btntext="Proceed" onpress={handleSubmit}/>
    

          {/* Have an account */}
          <View style={styles.bottomTextContainer}>
            <Text style={styles.bottomText}>Have an account yet? </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              activeOpacity={0.8}
            >
              <Text style={[styles.bottomText, { ...FONTS.bold }]}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>


    </Mainwrapper>
  );
};

export default Forgetpassword;
