import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  ScrollView,
  Animated,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { styles } from "./Editprofile.styles";
import { COLORS, FONTS, fontsize, icons, SIZES } from "../../../../constants";
import { Bottombtn, Loader } from "../../../../components";
import Defaultuseravatar from "../../../../assets/icons/Defaultuseravatar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { string } from "yup";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AuthContext } from "../../../../context/AuthContext";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import showerror from "../../../../utils/errorMessage";
import { useToast } from "react-native-toast-notifications";
import { useNavigation } from "@react-navigation/native";

const { Backarrow } = icons;

const validationSchema = Yup.object().shape({
  username: Yup.string().label("First Name").required(),
  firstName: Yup.string().label("First Name").required(),
  lastName: Yup.string().label("Last Name").required(),
});

type EditinputProps = {
  label: string;
  value?: string;
  formikprops?: any;
  name?: string;
};

const Editinput = ({ label, value, name, formikprops }: EditinputProps) => {
  if (formikprops) {
    const { values, handleChange, handleBlur } = formikprops;
    return (
      <View style={{ marginBottom: 30 }}>
        {/* Label */}
        <Text style={styles.labelText}>{label}</Text>
        <TextInput
          onChangeText={handleChange(name)}
          onBlur={handleBlur(name)}
          value={values[name]}
          style={styles.textInput}
          placeholder={value}
        />
      </View>
    );
  }
  return (
    <View style={{ marginBottom: 30 }}>
      {/* Label */}
      <Text style={styles.labelText}>{label}</Text>
      <TextInput style={styles.textInput} placeholder={value} />
    </View>
  );
};

const Basicsettings = () => {
  const toast = useToast();
  const { authdata } = useContext(AuthContext);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      snapToAlignment="center"
      contentContainerStyle={{ flex: 1, width: SIZES.width }}
    >
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={{
            username: authdata.username,
            firstName: authdata.fullName.split(" ")[1],
            lastName: authdata.fullName.split(" ")[0],
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            try {
              const response = await axiosCustom.put("/profile/update/basic", {
                username: values.username,
                firstName: values.firstName,
                lastName: values.lastName,
              });
              console.log(response);
              // send success toast message
            } catch (err) {
              showerror(toast, err);
            }
          }}
        >
          {(formikProps) => {
            const { isSubmitting, handleSubmit } = formikProps;
            return (
              <React.Fragment>
                {isSubmitting && <Loader />}
                <View style={styles.avatarContainer}>
                  <View style={styles.avatarBg}>
                    <Defaultuseravatar />
                  </View>
                  <Text style={styles.avatarText}>
                    Tap to change display picture
                  </Text>
                </View>
                <View style={styles.editInputContainer}>
                  <Editinput
                    label="Username"
                    name="username"
                    formikprops={formikProps}
                  />
                  <Editinput
                    label="Firstname"
                    name="firstName"
                    formikprops={formikProps}
                  />
                  <Editinput
                    label="Lastname"
                    name="lastName"
                    formikprops={formikProps}
                  />
                </View>
                <Bottombtn title="Save changes" onpress={handleSubmit} />
              </React.Fragment>
            );
          }}
        </Formik>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
};
const Personalsettings = () => {
  const toast = useToast();
  const { authdata } = useContext(AuthContext);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      snapToAlignment="center"
      contentContainerStyle={{ flex: 1, width: SIZES.width }}
    >
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={{
            gender: "",
            dateOfBirth: "",
            address: "",
            lga:""
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            try {
              const response = await axiosCustom.put("/profile/update/personal", {
                gender: values.gender,
                dateOfBirth: values.dateOfBirth,
                address: values.address,
                lga: values.lga,
              });
              console.log(response);
              // send success toast message
            } catch (err) {
              showerror(toast, err);
            }
          }}
        >
          {(formikprops) => {
            const { isSubmitting, handleSubmit } = formikprops;
            return (
              <React.Fragment>
                {isSubmitting && <Loader />}
                <View style={styles.editInputContainer}>
                  <Editinput
                    formikprops={formikprops}
                    name="gender"
                    label="gender"
                    value="-"
                  />
                  <Editinput
                    formikprops={formikprops}
                    name="dateOfBirth"
                    label="Date of Birth"
                    value="-"
                  />
                  <Editinput
                    formikprops={formikprops}
                    name="address1"
                    label="Address Line 1"
                    value="-"
                  />
                  <Editinput
                    formikprops={formikprops}
                    name="address2"
                    label="Address Line 2"
                    value="-"
                  />
                  <Editinput
                    formikprops={formikprops}
                    name="lga"
                    label="LGA"
                    value="-"
                  />
                </View>
                <Bottombtn title="Save changes" onpress={handleSubmit} />
              </React.Fragment>
            );
          }}
        </Formik>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
};

const Documentsettings = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      snapToAlignment="center"
      contentContainerStyle={{ flex: 1, width: SIZES.width }}
    >
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.documentContainer}>
          <View style={{ marginRight: 35 }}>
            <Text style={styles.identityText}>Identity Verification</Text>
            <Text style={styles.identitySubText}>
              Kindly provide feather with a valid means of identity to upgrade
              your account.
            </Text>
          </View>

          <View style={{ marginTop: 45 }}>
            <Editinput label="ID Type" value="--- Select Type ---" />
            <Editinput label="ID Number" value="Enter valid ID number" />

            <View style={styles.uploadIdBtn}>
              <Text style={styles.uploadIdText}>Upload ID</Text>
            </View>
          </View>
        </View>

        <View style={styles.documentContainer}>
          <View>
            <Text style={styles.identityText}>Utility Bill Verification</Text>
            <Text style={styles.identitySubText}>
              Kindly provide feather with your utility bill carrying your
              address of not more than 3 months back.
            </Text>
          </View>

          <View style={[styles.uploadIdBtn, { marginTop: 42 }]}>
            <Text style={styles.uploadIdText}>Upload Utility Bill</Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
};

const Editprofile = ({}) => {
  const singleWidth = () => {
    let calcWidth = SIZES.width;
    return calcWidth / 3;
  };

  const horizontalOffset = useRef(new Animated.Value(0)).current;
  const scrolling = useRef(new Animated.Value(0)).current;
  const [snap, setSnap] = useState(0);

  const ref = useRef<ScrollView>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    ref.current.scrollTo({
      x: SIZES.width * index,
      y: 0,
      animated: true,
    });
  }, [index]);

  useEffect(() => {
    console.log(scrolling);
  }, [scrolling]);

  const animateToIndex = (indexPoint: number) => {
    setIndex(indexPoint);
    Animated.spring(horizontalOffset, {
      toValue: singleWidth() * indexPoint,
      useNativeDriver: true,
    }).start();
  };

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar />

      <View style={styles.mainHeaderContainer}>
        {/* Icons */}

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            width: 25,
            height: 25,
            // backgroundColor: 'red',
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 25 / 2,
          }}
        >
          <Backarrow />
        </TouchableOpacity>
        <Text style={styles.mainHeaderText}>Edit Profile</Text>
        <View />
      </View>

      <View style={{ position: "relative" }}>
        <View style={styles.subHeaderContainer}>
          <TouchableOpacity
            style={{
              width: singleWidth(),
              justifyContent: "center",
              alignItems: "center",
            }}
            activeOpacity={0.7}
            onPress={() => animateToIndex(0)}
          >
            <Text style={[styles.subheadersText]}>Basic</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ width: singleWidth() }}
            activeOpacity={0.7}
            onPress={() => animateToIndex(1)}
          >
            <Text style={[styles.subheadersText]}>Personal</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ width: singleWidth() }}
            activeOpacity={0.7}
            onPress={() => animateToIndex(2)}
          >
            <Text style={[styles.subheadersText]}>Documents</Text>
          </TouchableOpacity>
        </View>

        <Animated.View
          style={{
            position: "absolute",
            width: singleWidth(),
            height: 1.5,
            backgroundColor: COLORS.blue6,
            bottom: 0,
            left: 0,
            transform: [{ translateX: horizontalOffset }, { scaleX: 0.8 }],
          }}
        />
      </View>

      <Animated.ScrollView
        ref={ref}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment="center"
        // onScroll={Animated.event(
        //   [{
        //     nativeEvent: {
        //       contentOffset: {
        //         x: horizontalOffset,
        //       },
        //     },
        //   }],
        //   { useNativeDriver: true },
        // )}
      >
        <Basicsettings />
        <Personalsettings />
        <Documentsettings />
      </Animated.ScrollView>
    </View>
  );
};

export default Editprofile;
