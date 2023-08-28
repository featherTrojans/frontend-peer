import { StyleSheet, View, Image, Pressable } from "react-native";
import React from "react";
import { images } from "../constants";

import { allMemojis } from "../assetdatas";
import { nameSplitToTwo } from "../utils/nameSplitter";
import { Text } from "react-native";

const { Notificationimage } = images;

type IconWithBgProps = {
  size?: number | undefined;
  imageurl: null | string;
  iconsize?: number;
  memojiImage: object | string;
  fullname?: string;
  onpress?: any;
};

const FTOtherImage = ({
  size = 45,
  imageurl = "",
  memojiImage = {},
  fullname = "A A",
  iconsize = 30,
  onpress = () => {},
}: IconWithBgProps) => {
  let memojiobj = {};

  if (memojiImage) {
    if (typeof memojiImage == "string") {
      memojiobj = JSON.parse(memojiImage);
    } else {
      memojiobj = memojiImage;
    }
  }

  if (memojiImage) {
    return (
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: memojiobj?.color,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Pressable onPress={onpress} style={{ width: "100%", height: "100%" }}>
          <Image
            style={{
              width: "100%",
              height: "100%",
              borderRadius: size / 2,
            }}
            resizeMode="contain"
            resizeMethod="scale"
            source={{ uri: memojiobj?.index }}
          />
        </Pressable>
      </View>
    );
  }
  if (imageurl) {
    return (
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Pressable onPress={onpress} style={{ width: "100%", height: "100%" }}>
          <Image
            style={{
              width: "100%",
              height: "100%",
              borderRadius: size / 2,
            }}
            resizeMode="cover"
            resizeMethod="scale"
            source={{ uri: imageurl }}
          />
        </Pressable>
      </View>
    );
  }

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: "#D9D9D9",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Pressable
        onPress={onpress}
        style={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ textAlign: "center" }}>{nameSplitToTwo(fullname)}</Text>
      </Pressable>
    </View>
  );
};

export default FTOtherImage;

const styles = StyleSheet.create({});
