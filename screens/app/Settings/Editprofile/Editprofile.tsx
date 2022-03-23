import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  ScrollView,
  Animated,
  ActivityIndicator,
  Button,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import { styles } from "./Editprofile.styles";
import { COLORS, FONTS, fontsize, icons, SIZES } from "../../../../constants";
import { Bottombtn, Loader } from "../../../../components";
import DateTimePicker from '@react-native-community/datetimepicker';
import Defaultuseravatar from "../../../../assets/icons/Defaultuseravatar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { string } from "yup";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AuthContext } from "../../../../context/AuthContext";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import showerror from "../../../../utils/errorMessage";
import { useToast } from "react-native-toast-notifications";
import { useNavigation } from "@react-navigation/native";
import Customstatusbar from "../../../shared/Customstatusbar";
import useDebounce from "../../../../utils/debounce";
import DropDownPicker from "react-native-dropdown-picker";
import moment from "moment";

const { Backarrow,Check, WrongIcon } = icons;

const validationSchema = Yup.object().shape({
  firstName: Yup.string().label("First Name").required(),
  lastName: Yup.string().label("Last Name").required(),
});

const validationSchemaTwo = Yup.object().shape({
  // gender: Yup.string().label("gender").required(),
  // dateOfBirth: Yup.string().label("dateOfBirth").required(),
  address: Yup.string().label("address").required(),
  lga: Yup.string().label("lga").required(),
});

type EditinputProps = {
  label: string;
  value?: string;
  formikprops?: any;
  name?: string;
};

const EditinputSpecial = ({ label, value, name, ...props }: EditinputProps) => {
  return (
    <View style={{ marginBottom: 5 }}>
      {/* Label */}
      <Text style={styles.labelText}>{label}</Text>
      <TextInput style={styles.textInput} value={value} {...props} />
    </View>
  );
}
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
  const navigation = useNavigation();
  const { authdata, setAuthData } = useContext(AuthContext);
  const [userinfo, getuserinfo, loadbounce, error] = useDebounce();
  const [usernamename, setusernamename] = useState(authdata?.userDetails?.username)
  // console.log(authdata,"auth datat o")
  const handleUsernameChange = (text: string) => {
    setusernamename(text);
    // and debound
    getuserinfo(text);
  };
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      snapToAlignment="center"
      contentContainerStyle={{ flex: 1, width: SIZES.width }}
    >
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <Formik
          initialValues={{
            
            firstName: authdata?.userDetails?.fullName?.split(" ")[1],
            lastName: authdata?.userDetails?.fullName?.split(" ")[0],
            // username:"",
            // firstName:"",
            // lastName:""
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            try {
              const data =  {
                newUsername: usernamename,
                firstName: values.firstName,
                lastName: values.lastName,
              }
              console.log(data)
              const response = await axiosCustom.put("/profile/update/basic",data);
              // console.log(response);
              const userdetails = {...authdata?.userDetails,username: usernamename,fullName: `${values.lastName} ${values.firstName}`}
              setAuthData({
                ...authdata,
                userDetails:userdetails
              });
              
              // send success toast message
              
              navigation.navigate("Root")
            } catch (err) {
              showerror(toast, err);
            }
          }}
        >
          {(formikProps) => {
            const { isSubmitting, handleSubmit , values} = formikProps;
            // handleUsernameChange(values.username)
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
                  <EditinputSpecial
                    label="Username"
                    name="username"
                    value={usernamename}
                    onChangeText={(text)=>handleUsernameChange(text)}
                  />
                  <View style={styles.namecont}>
              {loadbounce ? (<ActivityIndicator size={15} color={COLORS.blue6} />) :( userinfo.fullName && (usernamename?.toLowerCase() !== authdata?.userDetails?.username?.toLowerCase() )) ? (
              <><WrongIcon /><Text style={styles.name}>{usernamename} is taken</Text></>) : null}
               {(error || (usernamename.toLowerCase() === authdata?.userDetails?.username.toLowerCase() )) && (<>
                <Check />
                <Text style={styles.name}>{usernamename}</Text>
              </>)}
          </View>
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
  const navigation = useNavigation();
  const { authdata, setAuthData } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(authdata?.userDetails?.gender);
  const [items, setItems] = useState([
    { label: "Male", value: "Male" },
    { label: "Female", value: "Female" }
  ]);
  const [date, setDate] = useState(authdata?.userDetails?.dateOfBirth);
  const [show, setShow] = useState(false);

  console.log(date)
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };


  // console.log(authdata,"auth datat o")
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      snapToAlignment="center"
      contentContainerStyle={{ flex: 1, width: SIZES.width }}
    >
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <Formik
           initialValues={{
            // gender: "",
            // dateOfBirth: "",
            address: authdata?.userDetails?.address,
            lga: authdata?.userDetails?.lga,
          }}
          validationSchema={validationSchemaTwo}
          onSubmit={async (values) => {
            try {
              const response = await axiosCustom.put( "/profile/update/personal",
                {gender: value,dateOfBirth: date,
                  address: values.address,lga: values.lga,}
              );
              // console.log(response);
              const userdetails = {...authdata?.userDetails, 
                gender: value, 
                dateOfBirth:date,
                address: values.address,
                lga: values.lga}
              setAuthData({
                ...authdata,
                userDetails:userdetails
              });
              
              // send success toast message
              
              navigation.navigate("Root")
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
                <View style={styles.editInputContainer}>
                  {/* <Editinput
                    formikprops={formikProps}
                    name="gender"
                    label="gender"
                    value="-"
                  /> */}
                  <Text style={styles.labelText}>Gender</Text>
                  <DropDownPicker
                    open={open}
                    value={value}
                    items={items}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setItems}
                    placeholder="Gender"
                    placeholderStyle={{
                      color: COLORS.black,
                      ...fontsize.small,
                      ...FONTS.regular,
                    }}
                    textStyle={{
                      color: COLORS.black,
                      ...fontsize.small,
                      ...FONTS.regular,
                    }}
                    style={{
                      height: 62,
                      borderColor: "#E6E6E6",
                      marginBottom: 30,
                       borderWidth:0,
                      borderBottomWidth:1
                    }}
                    containerStyle={{}}
                    dropDownContainerStyle={{
                      borderColor: COLORS.grey1
                    }}
                  />
                    <View style={{ marginBottom: 30 }}>
                    <Text style={styles.labelText}>Date of Birth</Text>
                      <TouchableOpacity style={{marginTop: 10}} onPress={showDatepicker}>
                        <Text style={{color: COLORS.black,...fontsize.small,...FONTS.regular}}>
                          {moment(date).calendar()}
                        </Text>
                      </TouchableOpacity>
                        {show && ( <DateTimePicker date={new Date()} value={new Date()} mode="date" is24Hour={true} onChange={onChange} maximumDate={new Date()}/>
                    )}
                  </View>
                  {/* <Editinput
                    formikprops={formikProps}
                    name="dateOfBirth"
                    label="Date of Birth"
                    value="-"
                  /> */}
                  <Editinput
                    formikprops={formikProps}
                    name="address"
                    label="Address Line "
                    value="-"
                  />
                  <Editinput
                    formikprops={formikProps}
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

  const activeColor = (activeIndex: number) => {
    return index === activeIndex ? "#003AD6" : "#000000";
  };

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

  // return(
  //   <View style={styles.container}>
  //     <Customstatusbar />
  //     <Text>The basic text</Text>
  //   </View>
  // )
  return (
    <View style={styles.container}>
      <Customstatusbar />

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
              paddingVertical: 24,
            }}
            activeOpacity={0.7}
            onPress={() => animateToIndex(0)}
          >
            <Text style={[styles.subheadersText, { color: activeColor(0) }]}>
              Basic
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ width: singleWidth(), paddingVertical: 24 }}
            activeOpacity={0.7}
            onPress={() => animateToIndex(1)}
          >
            <Text style={[styles.subheadersText, { color: activeColor(1) }]}>
              Personal
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ width: singleWidth(), paddingVertical: 24 }}
            activeOpacity={0.7}
            onPress={() => animateToIndex(2)}
          >
            <Text style={[styles.subheadersText, { color: activeColor(2) }]}>
              Documents
            </Text>
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
