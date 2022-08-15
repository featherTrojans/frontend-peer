import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { styles } from "./Changepassword.styles";
import { COLORS, FONTS, fontsize, icons } from "../../../../../constants";
import {
  Backheader,
  Bottombtn,
  Custombutton,
  Input,
  Inputinsettings,
  Loader,
  Mainwrapper,
} from "../../../../../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import Customstatusbar from "../../../../shared/Customstatusbar";
import { useToast } from "react-native-toast-notifications";
import showerror from "../../../../../utils/errorMessage";
import axiosCustom from "../../../../../httpRequests/axiosCustom";
import { AuthContext } from "../../../../../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
const { Backarrow, Lock } = icons;

const Changepassword = () => {
  const toast = useToast();
  const { authdata, setAllowBiometrics } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  // const [oldpassword, setOldpassword] = useState("");
  // const [newpassword, setNewpassword] = useState("");
  // const [confirmpassword, setConfirmpassword] = useState("");

  const navigation = useNavigation();

  const handleSubmit = async (values) => {

    const {currentpassword, newpassword, confirmpassword } = values
    
    // validation
    if (!confirmpassword || !newpassword || !currentpassword) {
      return showerror(toast, null, "all fields are required");
    }
    if (confirmpassword !== newpassword) {
      return showerror(
        toast,
        null,
        "New password and Confirm password don't match"
      );
    }
    try {
      setLoading(true);
      await axiosCustom.put("/auth/password/changepassword", {
        oldpassword: currentpassword,
        newpassword: newpassword,
      });
      setAllowBiometrics(false)
      navigation.navigate("Root");
    } catch (err) {
      showerror(toast, err);
    } finally {
      setLoading(false);
    }
  };

  const validationSchema = Yup.object().shape({
    currentpassword: Yup.string().label("currentpassword").required(),
    newpassword: Yup.string().label("newpassword").required(),
    confirmpassword: Yup.string().label("confirmpassword").required(),
  });

  return (
    <Mainwrapper>
      <Backheader title="Change Password" />

      <ScrollView style={styles.container} contentContainerStyle={{ flex: 1 }}>
        {loading && <Loader />}

        <KeyboardAwareScrollView>
          <View
            style={{
              flex: 1,
              paddingHorizontal: 22,
              marginTop: 10,
              marginBottom: 42,
              // backgroundColor: 'red'
            }}
          >
            <Formik
              initialValues={{
                currentpassword: "",
                newpassword: "",
                confirmpassword: "",
              }}
              validationSchema={validationSchema}
              onSubmit={(values) => handleSubmit(values)}
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
                  <>
                    <Input
                      placeholder="Current Password"
                      name="currentpassword"
                      formikProps={formikProps}
                      icon={<Lock />}
                      password={true}
                    />
                    <Input
                      placeholder="New Password"
                      name="newpassword"
                      formikProps={formikProps}
                      icon={<Lock />}
                      password={true}
                    />
                    <Input
                      placeholder="Confirm Password"
                      name="confirmpassword"
                      formikProps={formikProps}
                      icon={<Lock />}
                      password={true}
                    />

                    <Custombutton btntext="Change PIN" onpress={handleSubmit} />
                  </>
                );
              }}
            </Formik>
            {/* <Text style={styles.changePasswordText}>Change Password</Text>

            <View style={{ marginTop: 42 }}>
              <Inputinsettings
                label="Current Password"
                placeholder="Enter Password"
                value={oldpassword}
                onChangeText={(text) => setOldpassword(text)}
              />
              <Inputinsettings
                label="New Password"
                placeholder="Enter Password"
                value={newpassword}
                onChangeText={(text) => setNewpassword(text)}
              />
              <Inputinsettings
                label="Confirm Password"
                placeholder="Enter Password"
                value={confirmpassword}
                onChangeText={(text) => setConfirmpassword(text)}
              />
            </View> */}
          </View>

          {/* <Bottombtn title="Change Password" onpress={handleSubmit} /> */}
        </KeyboardAwareScrollView>
      </ScrollView>
    </Mainwrapper>
  );
};

export default Changepassword;
