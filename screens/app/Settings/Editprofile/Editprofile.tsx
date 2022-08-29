import {
  Text,
  View,
  ScrollView,

  TouchableOpacity,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import * as ImagePicker from "expo-image-picker";
import { styles } from "./Editprofile.styles";
import { COLORS, FONTS, fontsize, icons, SIZES } from "../../../../constants";
import {
  Backheader,
  Bottombtn,
  Custombutton,
  Input,
  Loader,
  Mainwrapper,
  Upgrademodal,
} from "../../../../components";
import Defaultuseravatar from "../../../../assets/icons/Defaultuseravatar";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { AuthContext } from "../../../../context/AuthContext";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import showerror from "../../../../utils/errorMessage";
import { useToast } from "react-native-toast-notifications";
import { useNavigation } from "@react-navigation/native";
import Customstatusbar from "../../../shared/Customstatusbar";
import useDebounce from "../../../../utils/debounce";

import { SafeAreaView } from "react-native-safe-area-context";
import useCustomModal from "../../../../utils/useCustomModal";

const {
  Backarrow,
  Check,
  WrongIcon,
  Usericondark,
  Envelopeicon,
  Phoneicon,
  Memoji1,
} = icons;

const setAuthorizationToken = (token: string) => {
  if (token) {
    axiosCustom.defaults.headers.common["token"] = token;
  }
};

const validationSchema = Yup.object().shape({
  userName: Yup.string().label("username").required(),
  firstName: Yup.string().label("First Name").required(),
  lastName: Yup.string().label("Last Name").required(),
  email: Yup.string().label("Last Name").required(),
  phone: Yup.string().label("email").required(),
});
const usertype = "newbie";



const Editprofile = ({}) => {

  const toast = useToast();
    const navigation = useNavigation();
    const { authdata, setAuthData, setAllowBiometrics } = useContext(AuthContext);
    const [userinfo, getuserinfo, loadbounce, error] = useDebounce();
    const {CustomModal, openModal} = useCustomModal()
    const [usernamename, setusernamename] = useState(
      authdata?.userDetails?.username
    );
    const [loading, setLoading] = useState(false);
    const handleUsernameChange = (text: string) => {
      setusernamename(text);
      // and debound
      getuserinfo(text);
    };
  
    const handleImageUpload = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      // console.log(result);

      if (!result.cancelled) {
        try {
          setLoading(true);
          const formdata = new FormData();
          console.log(result)
          formdata.append('file', {
            uri: result.uri,
            type: "Image/jpeg",
            name: "from eht e e"
          });
          formdata.append('name', 'Gyroscope');
          // console.log(result.uri, "this is the image url");
          const response = await axiosCustom.post("/upload/image",formdata);
          console.log(response, "Uploaded response");
          
          // setUserData({ ...userData, user: response });
        } catch (err) {
          console.log(err.response.data);
        } finally {
          setLoading(false);
        }
     
      }
  
      
    };

  const HeaderRightSide = () => {
    const userTypeBg = (usertype: string) => {
      switch (usertype) {
        case "newbie":
          return COLORS.green2;
          break;
        case "odogwu":
          return COLORS.blue6;
          break;
        case "agent":
          return "#8456FF";
          break;

        default:
          return COLORS.green2;
          break;
      }
    };

    return (
      <View style={styles.headerRightwrapper}>
        <Memoji1 />

        <View
          style={[
            styles.headerRightmemojibg,
            { backgroundColor: userTypeBg(usertype) },
          ]}
        >
          <Text style={styles.headerRightUsertype}>{usertype}</Text>
        </View>
      </View>
    );
  };



  return (
    <Mainwrapper>
      <Backheader
        title="Edit Profile"
        rightComponent={<HeaderRightSide />}
        bg={COLORS.white3}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
        snapToAlignment="center"
        contentContainerStyle={{ flex: 1 }}
      >
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <View style={{ paddingHorizontal: 15, marginBottom: 50 }}>
            <TouchableOpacity activeOpacity={0.8} onPress={handleImageUpload}>
              <View style={styles.avatarProfileWrap}>
                <View style={styles.avatarBg}>
                  <Defaultuseravatar />
                </View>
                <View style={{ marginLeft: 15 }}>
                  <Text style={styles.avatarFullname}>
                    {authdata?.userDetails?.fullName}
                  </Text>
                  <Text style={styles.avatarUsername}>
                    @{authdata?.userDetails?.username}
                  </Text>
                </View>
              </View>
  
              <Text style={styles.avatarText}>Tap to Edit</Text>
            </TouchableOpacity>
  
            <CustomModal>
                <Upgrademodal />
            </CustomModal>
  
  
  
            {usertype === "newbie" && 
              <View style={styles.upgradeBtnWrap}>
              <TouchableOpacity activeOpacity={0.8} onPress={openModal} style={styles.upgradeBtnBg}>
                <Text style={styles.upgradeBtnText}>Upgrade</Text>
              </TouchableOpacity>
            </View>
            
            }
            
          </View>
  
          <Formik
            initialValues={{
              username: authdata?.userDetails?.username,
              firstName: authdata?.userDetails?.fullName?.split(" ")[1],
              lastName: authdata?.userDetails?.fullName?.split(" ")[0],
              email: authdata?.userDetails?.email,
              phone: authdata?.userDetails?.phoneNumber,
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              try {
                const data = {
                  newUsername: values.username.trim(),
                  firstName: values.firstName.trim(),
                  lastName: values.lastName.trim(),
                };
                const response = await axiosCustom.put(
                  "/profile/update/basic",
                  data
                );
                const userdetails = {
                  ...authdata?.userDetails,
                  username: usernamename,
                  fullName: `${values.lastName} ${values.firstName}`,
                };
                setAuthData({
                  ...authdata,
                  userDetails: userdetails,
                });
  
                // set new token
                setAuthorizationToken(response?.data?.data?.token);
                //Disable Biometrics
                setAllowBiometrics(false);
                navigation.navigate("Root");
              } catch (err) {
                // send success toast message
                showerror(toast, err);
              }
            }}
          >
            {(formikProps) => {
              const { isSubmitting, handleSubmit, values } = formikProps;
              return (
                <React.Fragment>
                  {isSubmitting && <Loader />}
  
                  <View style={styles.editInputContainer}>
                    {/* Debounce check for username */}
                    {/* <View style={styles.namecont}>
                      {loadbounce ? (
                        <ActivityIndicator size={15} color={COLORS.blue6} />
                      ) : userinfo.fullName &&
                        usernamename?.toLowerCase() !==
                          authdata?.userDetails?.username?.toLowerCase() ? (
                        <>
                          <WrongIcon />
                          <Text style={styles.name}>{usernamename} is taken</Text>
                        </>
                      ) : null}
                      {(error ||
                        usernamename.toLowerCase() ===
                          authdata?.userDetails?.username.toLowerCase()) && (
                        <>
                          <Check />
                          <Text style={styles.name}>{usernamename}</Text>
                        </>
                      )}
                    </View> */}
  
                    <Input
                      placeholder="Username"
                      name="username"
                      formikProps={formikProps}
                      icon={<Usericondark />}
                      value={values.username}
                    />
  
                    <Input
                      placeholder="Firstname"
                      name="firstName"
                      formikProps={formikProps}
                      icon={<Usericondark />}
                      value={values.firstName}
                    />
  
                    <Input
                      placeholder="Lastname"
                      name="lastName"
                      formikProps={formikProps}
                      icon={<Usericondark />}
                      value={values.lastName}
                    />
  
                    <Input
                      placeholder="Phone Number"
                      name="phoneNumber"
                      formikProps={formikProps}
                      icon={<Phoneicon />}
                      value={values.phone}
                      editable={false}
                    />
  
                    <Input
                      placeholder="Email Address"
                      name="email"
                      formikProps={formikProps}
                      icon={<Envelopeicon />}
                      value={values.email}
                      editable={false}
                    />
                    <Custombutton btntext="Save Changes" onpress={handleSubmit} />
                  </View>
                </React.Fragment>
              );
            }}
          </Formik>
  
          {usertype === "odogwu" && <TouchableOpacity activeOpacity={0.8} style={styles.becomeandagentwrap}>
            <Text style={styles.becomeanagenttext}>Became an Agent</Text>
            <View style={styles.becomeagentredbg}>
              <Text style={styles.becomeagentnewtext}>New</Text>
            </View>
          </TouchableOpacity>}
  
  
        </KeyboardAwareScrollView>
      </ScrollView>
    </Mainwrapper>
  );
};

export default Editprofile;
