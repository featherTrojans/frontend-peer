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

import { redirectTo } from "../utils";
import { AuthContext } from "../context/AuthContext";
import axiosCustom from "../httpRequests/axiosCustom";

import { COLORS, icons } from "../constants";
import { useAlert } from "../hooks";
import { allMemojis } from "../assetdatas";

const { Changememojicheckicon, Choosememojiicon, Cameraicon } = icons;

const {} = ChangeappearanceScreenStyles;

const ChangeappearanceScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const { authdata, setAuthData, setAllowBiometrics } = useContext(AuthContext);
  const { successAlert } = useAlert();

  const handleImageUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
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

        await axiosCustom.post("/upload/image", formdata);

        setAuthData({
          ...authdata,
          userDetails: {
            ...authdata?.userDetails,
            imageUrl: result.uri,
            memoji: {},
          },
        });
        const form2 = new FormData();
        form2.append("isMemoji", "false");
        await axiosCustom.post("/upload/image", form2);
        successAlert("Profile image succesfully updated");
        navigation.navigate("Dashboard")
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
        imageUrl={allMemojis["male"]["darkSkinned"][0]}
        title="Choose Memoji"
        onPress={() => navigation.navigate("choosememoji_screen")}
        bG={COLORS.Tyellow3}
        mB={20}
      />
      <FTIconwithtitleandinfo
        Icon={Cameraicon}
        title="Choose Photo"
        onPress={handleImageUpload}
        bG={COLORS.white3}
      />
    </FTTitlepagewrapper>
  );
};

export default ChangeappearanceScreen;

const styles = StyleSheet.create({});
