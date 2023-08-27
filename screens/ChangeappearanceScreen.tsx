import { StyleSheet, Text, View, Pressable, FlatList } from "react-native";
import * as ImagePicker from "expo-image-picker";
import React, { useContext, useState } from "react";
import {
  ChangeappearanceScreenStyles,
  ProfileScreenStyles,
} from "../assets/styles/screens";
import {
  FTIconwithtitleandinfo,
  FTLoader,
  FTTitlepagewrapper,
} from "../components";
import { icons } from "../constants";
import { redirectTo } from "../utils";
import { AuthContext } from "../context/AuthContext";
import axiosCustom from "../httpRequests/axiosCustom";
redirectTo;
const { Changememojicheckicon } = icons;

const {} = ChangeappearanceScreenStyles;

const ChangeappearanceScreen = () => {
  const [loading, setLoading] = useState(false);
  const { authdata, setAuthData, setAllowBiometrics } = useContext(AuthContext);

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

        formdata.append("file", {
          uri: result.uri,
          type: "Image/jpeg",
          name: "image1",
        });
        formdata.append("name", authdata?.userDetails?.username);
        // console.log(result.uri, "this is the image url");
        setAuthData({
          ...authdata,
          userDetails: { ...authdata?.userDetails, imageUrl: result.uri },
        });
        const response = await axiosCustom.post("/upload/image", formdata);
      } catch (err) {
        console.log(err.response.data);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <FTTitlepagewrapper title="Change Appearance">
      <FTLoader loading={loading} />
      <FTIconwithtitleandinfo
        Icon={Changememojicheckicon}
        title="Choose Memoji"
        onPress={() => redirectTo("choosememoji_screen")}
        bG="blue"
        mB={20}
      />
      <FTIconwithtitleandinfo
        Icon={Changememojicheckicon}
        title="Choose Photo"
        onPress={handleImageUpload}
        bG="blue"
      />
    </FTTitlepagewrapper>
  );
};

export default ChangeappearanceScreen;

const styles = StyleSheet.create({});
