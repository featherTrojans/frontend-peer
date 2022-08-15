import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
// import { styles } from "./Changepassword.styles";
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
import { styles } from "../Changepassword/Changepassword.styles";
import { useNavigation } from "@react-navigation/native";
import Customstatusbar from "../../../../shared/Customstatusbar";
import axiosCustom from "../../../../../httpRequests/axiosCustom";
import showerror from "../../../../../utils/errorMessage";
import { useToast } from "react-native-toast-notifications";

const { Backarrow, Lock } = icons;

const Changepin = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);




  // const [oldpin, setOldpin] = useState("");
  // const [newpin, setNewpin] = useState("");
  // const [confirmpin, setConfirmpin] = useState("");

  const handleSubmit = async (values) => {
    const {oldpin, newpin, confirmpin} = values
    // validation
    if (newpin.length !== 4 || oldpin.length !== 4 || confirmpin.length !== 4) {
      return showerror(toast, null, "length of pin must be equal to 4");
    }
    if (newpin !== confirmpin) {
      return showerror(toast, null, "new pin and confirm pin don't match");
    }
    try {
      setLoading(true);
      try {
        await axiosCustom.post("/auth/pin/verify", {
          user_pin: oldpin,
          pin: oldpin,
        });
      } catch (err) {
        console.log(err.response);
        setLoading(false);
        return showerror(toast, null, "current pin is incorrect");
      }
      await axiosCustom.put("/auth/pin/set", { pin: newpin, user_pin: newpin });
      navigation.navigate("Root");
    } catch (err) {
      console.log(err.response);
      showerror(toast, null, "unable to reset pin, please try again later");
    } finally {
      setLoading(false);
    }
  };

  const validationSchema = Yup.object().shape({
    oldpin: Yup.string().label("oldpin").required(),
    newpin: Yup.string().label("newpin").required(),
    confirmpin: Yup.string().label("confirmpin").required(),
  });

  return (
    <Mainwrapper>
      <Backheader title="Change PIN" />

      <ScrollView style={styles.container} contentContainerStyle={{ flex: 1 }}>
        {loading && <Loader />}

        <KeyboardAwareScrollView>
          <View
            style={{
              flex: 1,
              paddingHorizontal: 22,
              marginTop: 10,
              marginBottom: 42,
            }}
          >
            <Formik
              initialValues={{
                oldpin: "",
                newpin: "",
                confirmpin: "",
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
                      placeholder="Current PIN"
                      name="oldpin"
                      formikProps={formikProps}
                      icon={<Lock />}
                      password={true}
                      maxLength={4}
                      keyboardType={"numeric"}
                    />
                    <Input
                      placeholder="New PIN"
                      name="newpin"
                      formikProps={formikProps}
                      icon={<Lock />}
                      password={true}
                      maxLength={4}
                      keyboardType={"numeric"}
                    />
                    <Input
                      placeholder="Confirm PIN"
                      name="confirmpin"
                      formikProps={formikProps}
                      icon={<Lock />}
                      password={true}
                      maxLength={4}
                      keyboardType={"numeric"}
                    />

                    <Custombutton btntext="Change PIN" onpress={handleSubmit}/>


                  </>
                );
              }}
            </Formik>

            
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
    </Mainwrapper>
  );
};

export default Changepin;
