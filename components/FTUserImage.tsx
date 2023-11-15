import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Image as RNImage } from "expo-image";
import React, { useContext } from "react";
import { images } from "../constants";
import { AuthContext } from "../context/AuthContext";
import { allMemojis } from "../assetdatas";

const { Notificationimage } = images;

type IconWithBgProps = {
  size?: number | undefined;
  onpress?: any;
  iconsize?: number;
};

const FTUserImage = ({
  size = 45,
  iconsize = 30,
  onpress = () => {},
}: IconWithBgProps) => {
  const { authdata } = useContext(AuthContext);
  const imageurl = authdata?.userDetails?.imageUrl;
  const memojiImage = authdata?.userDetails?.memoji;
  const gender = authdata?.userDetails?.gender?.toLowerCase() || "male";
  let memojiobj = {};

  if (memojiImage) {
    if (typeof memojiImage == "string") {
      memojiobj = JSON.parse(memojiImage);
    } else {
      memojiobj = memojiImage;
    }
  }

  if (memojiobj.color) {
    return (
      <Pressable
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: memojiobj?.color,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={onpress}
      >
        <RNImage
          style={{
            width: "100%",
            height: "100%",
            borderRadius: size / 2,
          }}
          contentFit="contain"
          source={memojiobj?.index}
        />
      </Pressable>
    );
  }

  if (imageurl) {
    return (
      <Pressable
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={onpress}
      >
        <RNImage
          style={{
            width: "100%",
            height: "100%",
            borderRadius: size / 2,
          }}
          contentFit="cover"
          source={imageurl}
        />
      </Pressable>
    );
  }

  return (
    <Pressable
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: "#D9D9D9",
        justifyContent: "center",
        alignItems: "center",
      }}
      onPress={onpress}
    >
      <RNImage
        style={{
          width: "100%",
          height: "100%",
          borderRadius: size / 2,
        }}
        contentFit="contain"
        // resizeMethod="scale"
        source={allMemojis[gender]["lightSkinned"][0]}
        // defaultSource={{ uri: allMemojis[gender]["lightSkinned"][0]}}
      />
    </Pressable>
  );
};

export default FTUserImage;

const styles = StyleSheet.create({});
