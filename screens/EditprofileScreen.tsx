import {
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { EditprofileScreenStyles } from "../assets/styles/screens";
import {
  FTCustombutton,
  FTInput,
  FTKeyboardwrapper,
  FTTitlepagewrapper,
  FTUserImage,
} from "../components";
import { useForm } from "react-hook-form";
import { VALIDATION, redirectTo, setAuthorizationToken } from "../utils";
import { COLORS, FONTS, fontsize, icons } from "../constants";
import { AuthContext } from "../context/AuthContext";
import useDebounce from "../utils/debounce";
import { ActivityIndicator } from "react-native";
import Changememojicheckicon from "../assets/icons/Changememojicheckicon";
import axiosCustom from "../httpRequests/axiosCustom";
import { useAlert } from "../hooks";
const { Profileediticon } = icons;

const {
  profileHeaderText,
  headerWrap,
  profileWrap,
  headerRightWrap,
  headerRightEditText,
  optionText,
} = EditprofileScreenStyles;

const EditprofileScreen = ({ navigation }) => {
  const { authdata, setAuthData } = useContext(AuthContext);
  const { errorAlert } = useAlert();
  const name = authdata?.userDetails?.fullName
    ? authdata?.userDetails?.fullName.split(" ")
    : [" ", " "];
  const [userinfo, getuserinfo, loadbounce, error] = useDebounce();
  const [gender, setGender] = useState("Select");
  const [showModal, setShowModal] = useState(false);
  const email = authdata?.userDetails?.email?.toLowerCase();
  const { control, handleSubmit, watch } = useForm({
    mode: "all",
    defaultValues: {
      featherTag: authdata?.userDetails?.username,
      firstName: name[1],
      lastName: name[0],
      email: email,
      phoneNumber: authdata?.userDetails?.phoneNumber,
    },
  });
  const usernamename = watch("featherTag", false) || "";

  useEffect(() => {
    if (authdata?.userDetails?.gender) {
      setGender(authdata?.userDetails?.gender);
    }
  }, [authdata?.userDetails?.gender]);

  useEffect(() => {
    getuserinfo(usernamename);
  }, [usernamename]);

  const accountlevel = () => {
    switch (authdata?.userDetails?.userLevel) {
      case 1:
        return "Newbie";
      case 2:
        return "Odogwu";
      case 3:
        return "Veteran";
      default:
        return null;
    }
  };

  const closeGenderModal = (item) => {
    setGender(item);
    setShowModal(false);
  };

  const onsubmit = async (values) => {
    try {
      const data = {
        gender: gender,
        newUsername: values.featherTag,
        firstName: values.firstName.trim(),
        lastName: values.lastName.trim(),
      };
      const response = await axiosCustom.put("/profile/update/basic", data);
      const userdetails = {
        ...authdata?.userDetails,
        username: values.featherTag,
        fullName: `${values.lastName} ${values.firstName}`,
        gender: gender,
      };
      setAuthData({
        ...authdata,
        userDetails: userdetails,
      });

      setAuthorizationToken(response?.data?.data?.token);
      navigation.navigate("Dashboard");
    } catch (err) {
      errorAlert(err);
    }
  };
  const HeaderRight = () => {
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate("changeappearance_screen")}
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <FTUserImage size={35} />
        <View style={headerRightWrap}>
          <Profileediticon />
          <Text style={headerRightEditText}>Edit</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const GenderModal = () => {
    return (
      <FlatList
        data={["Male", "Female"]}
        renderItem={({ item }) => {
          return (
            <Pressable onPress={() => closeGenderModal(item)}>
              <Text style={optionText}>{item}</Text>
            </Pressable>
          );
        }}
        keyExtractor={(item) => item}
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    );
  };

  return (
    <FTTitlepagewrapper
      title="Upload Documents"
      modalChildren={<GenderModal />}
      showModal={showModal}
      setShowModal={setShowModal}
      modalHeight={200}
      rightComponent={<HeaderRight />}
    >
      <FTKeyboardwrapper>
        <View style={headerWrap}>
          <Text style={profileHeaderText}>My Profile</Text>

          {/* <Text
              onPress={() => navigation.navigate("accountverification_screen")}
            >
              {upgradeDecision()}
            </Text> */}
          <View style={[profileWrap, { marginTop: 10 }]}>
            <Text style={{ ...fontsize.smallest, ...FONTS.regular }}>
              Account Level :{" "}
              <Text style={{ ...FONTS.bold }}>{accountlevel()}</Text>
            </Text>
          </View>
        </View>

        <FTInput
          label="Feather Tag"
          placeholderText="Enter here.."
          name="featherTag"
          control={control}
          rules={VALIDATION.USER_NAME_VALIDATION}
        />
        <View
          style={{
            flexDirection: "row",
            marginRight: 5,
            marginBottom: 10,
            alignItems: "flex-end",
            justifyContent: "flex-end",
          }}
        >
          {loadbounce ? (
            <ActivityIndicator size={15} color={COLORS.blue6} />
          ) : userinfo.fullName &&
            usernamename?.toLowerCase() !==
              authdata?.userDetails?.username?.toLowerCase() ? (
            <>
              {/* <WrongIcon /> */}
              <Text
                style={{
                  color: COLORS.blue6,
                  marginLeft: 10,
                  ...fontsize.smaller,
                  ...FONTS.regular,
                }}
              >
                {usernamename} is taken
              </Text>
            </>
          ) : null}
          {(error ||
            usernamename?.toLowerCase() ===
              authdata?.userDetails?.username?.toLowerCase()) && (
            <>
              <Changememojicheckicon />
              <Text
                style={{
                  color: COLORS.blue6,
                  marginLeft: 10,
                  ...fontsize.smaller,
                  ...FONTS.regular,
                }}
              >
                {usernamename}
              </Text>
            </>
          )}
        </View>

        <FTInput
          label="Legal Firstname"
          placeholderText="Enter here.."
          name="firstName"
          control={control}
          rules={VALIDATION.FIRST_NAME_VALIDATION}
          mB={20}
          mT={20}
        />
        <FTInput
          label="Legal Lastname"
          placeholderText="Enter here.."
          name="lastName"
          control={control}
          rules={VALIDATION.LAST_NAME_VALIDATION}
          mB={20}
        />
        <FTInput
          label="Email"
          placeholderText="Enter here.."
          name="email"
          control={control}
          mB={20}
          editable={email ? false : true}
        />
        <FTInput
          label="Phone Number"
          placeholderText="Enter here.."
          name="phoneNumber"
          control={control}
          mB={20}
          editable={false}
        />
        <FTInput
          label="Gender"
          placeholderText={gender}
          name="gender"
          control={control}
          // rules={VALIDATION.GENDER_VALIDATION}
          type="dropdown"
          mB={20}
          onPress={() => setShowModal(true)}
        />
        <FTCustombutton btntext="Submit" onpress={handleSubmit(onsubmit)} />
      </FTKeyboardwrapper>
    </FTTitlepagewrapper>
  );
};

export default EditprofileScreen;

const styles = StyleSheet.create({});
