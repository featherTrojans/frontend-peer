import { StyleSheet, View, Image, Pressable } from "react-native";
import React from "react";
import { COLORS, FONTS, fontsize, images } from "../constants";

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
  if (imageurl) {
    console.log(imageurl, "there is a a a");
  }
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
          backgroundColor: memojiobj?.color,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: size / 2,
        }}
        onPress={onpress}
      >
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
    );
  }

  if (imageurl) {
    console.log("i should be here");
    return (
      <Pressable
        style={{
          width: size,
          height: size,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: size / 2,
        }}
        onPress={onpress}
      >
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
      {fullname ? (
        <Text
          style={{
            textAlign: "center",
            ...fontsize.small,
            ...FONTS.regular,
            color: COLORS.blue9,
          }}
        >
          {nameSplitToTwo(fullname)}
        </Text>
      ) : (
        <Text>AA</Text>
      )}
    </Pressable>
  );
};

export default FTOtherImage;

const styles = StyleSheet.create({});
