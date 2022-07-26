import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { COLORS, FONTS, fontsize, icons } from "../../../constants";
import { Input, Loader } from "../../../components";
import { styles } from "../signup/Personal/Personal.styles";
import axiosCustom from "../../../httpRequests/axiosCustom";
import { useToast } from "react-native-toast-notifications";
import showerror from "../../../utils/errorMessage";
import { SafeAreaView } from "react-native-safe-area-context";
import Customstatusbar from "../../shared/Customstatusbar";
const { Envelopeicon } = icons;

const Forgetpassword = ({ navigation }) => {
  const toast = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);


  
  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await axiosCustom.post("/forgot/password", { email });
      navigation.navigate("Forgetpasswordotp", {
        token: response?.data?.data?.token,
        email: email,
      });
    } catch (err) {
      showerror(toast, err);
    } finally {
      setLoading(false);
    }
  };

  



  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 1 }}>
      <Customstatusbar />
      <View style={{ paddingHorizontal: 25, flex: 1 }}>
        {loading && <Loader />}
        <View style={{ marginTop: 34 }}>
          <Text style={{ ...fontsize.big, ...FONTS.bold, marginBottom: 30 }}>
            Forgot Password
          </Text>
          <Text
            style={{ ...fontsize.bsmall, ...FONTS.regular, lineHeight: 24 }}
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
            <Text style={styles.bottomText}>Have an account yet? </Text>

            <TouchableOpacity
              onPress={() => navigation.navigate("Login")}
              activeOpacity={0.8}
            >
              <Text style={[styles.bottomText, { ...FONTS.bold }]}>Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Forgetpassword;
