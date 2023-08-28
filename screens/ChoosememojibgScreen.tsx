import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useContext, useState } from "react";
import { FTIconwithbg, FTLoader, FTTitlepagewrapper } from "../components";
import * as Haptics from "expo-haptics";
import { FONTS, fontsize, icons } from "../constants";
import { ChoosememojiScreenStyles } from "../assets/styles/screens";
import { navigation } from "../utils";
import axiosCustom from "../httpRequests/axiosCustom";
import { AuthContext } from "../context/AuthContext";
import { useAlert } from "../hooks";
const { Changememojicheckicon } = icons;
const { memojisWrapper, buttonText, buttonWrap } = ChoosememojiScreenStyles;

const profileColors = [
  {
    color: "#D9D9D9",
  },
  {
    color: "#C8F1CE",
  },
  {
    color: "#CFE9FB",
  },
  {
    color: "#F8EBA7",
  },
  {
    color: "#F5C3BC",
  },
  {
    color: "#DFD2FA",
  },
  {
    color: "#F7CDD7",
  },
  {
    color: "#F6DEAC",
  },
  {
    color: "#F8CDD7",
  },
];
const ColorOption = ({ color, active, setActive }) => {
  return (
    <Pressable
      onPress={() => {
        setActive(color);
        Haptics.selectionAsync();
      }}
    >
      <View
        style={[
          {
            width: 78,
            height: 78,
            borderRadius: 78 / 2,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: color,
          },
        ]}
      >
        {active == color && <Changememojicheckicon />}
      </View>
    </Pressable>
  );
};

const ChoosememojibgScreen = ({ route }) => {
  const [active, setActive] = useState("#D9D9D9");
  const { authdata, setAuthData } = useContext(AuthContext);
  const emojiindex = route?.params?.emojiindex;
  const [loading, setLoading] = useState(false);
  const { errorAlert } = useAlert();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formdata = new FormData();
      formdata.append("color", active);
      formdata.append("index", emojiindex);
      formdata.append("isMemoji", "true");

      await axiosCustom.post("/upload/image", formdata);
      setAuthData({
        ...authdata,
        userDetails: {
          ...authdata.userDetails,
          memoji: {
            index: emojiindex,
            color: active,
          },
        },
      });
      return navigation.navigate("memojisuccess_screen", {
        active,
        emojiindex,
      });
    } catch (err) {
      errorAlert(err);
    } finally {
      setLoading(false);
    }
  };
  console.log(active);
  return (
    <FTTitlepagewrapper title="Background">
      <FTLoader loading={loading} />
      <View style={{ alignItems: "center" }}>
        <Text style={{ marginTop: 15, ...fontsize.smallest, ...FONTS.regular }}>
          Select your preferred background colour
        </Text>
        <View
          style={{
            width: 150,
            height: 150,
            backgroundColor: active,
            borderRadius: 150 / 2,
            marginTop: 66,
            marginBottom: 50,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <FTIconwithbg imageUrl={emojiindex} bG={active} size={150} />
        </View>
      </View>

      <FlatList
        data={profileColors}
        horizontal={false}
        numColumns={3}
        showsHorizontalScrollIndicator={false}
        columnWrapperStyle={memojisWrapper}
        renderItem={({ item: { color }, index }) => {
          return (
            <ColorOption
              key={index}
              color={color}
              active={active}
              setActive={setActive}
            />
          );
        }}
      />

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={handleSubmit}
        style={buttonWrap}
      >
        <Text style={buttonText}>Yay, Save Memoji</Text>
      </TouchableOpacity>
    </FTTitlepagewrapper>
  );
};

export default ChoosememojibgScreen;

const styles = StyleSheet.create({});
