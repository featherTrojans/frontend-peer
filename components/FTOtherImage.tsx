import { StyleSheet, View, Image, Pressable } from "react-native";
import React from "react";
import { Image as RNImage } from "expo-image";
import { COLORS, FONTS, fontsize, images } from "../constants";

import { allMemojis } from "../assetdatas";
import {
  nameSplitToTwo,
  nameSplitter,
  nameSplitterFirstName,
} from "../utils/nameSplitter";
import { FTInitialsBg } from ".";

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
          justifyContent: "center",
          alignItems: "center",
          borderRadius: size / 2,
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

  if (!fullname) {
    return (
      <Pressable onPress={onpress} hitSlop={25}>
        <FTInitialsBg sideLength={size} name={""} />
      </Pressable>
    );
  }
  return (
    <Pressable onPress={onpress} hitSlop={25}>
      {fullname ? (
        <FTInitialsBg sideLength={size} name={nameSplitter(fullname)} />
      ) : (
        " "
      )}
    </Pressable>
  );
};

export default FTOtherImage;

const styles = StyleSheet.create({});
// {nameSplitter(fullname)}
