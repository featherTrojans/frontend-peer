import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Image as RNImage } from "expo-image";
import React, { ReactElement } from "react";
import { images } from "../constants";

const { Notificationimage } = images;

type IconWithBgProps = {
  Icon?: any;
  bG: string;
  size?: number | undefined;
  imageUrl?: string;
  badge?: ReactElement;
  onpress?: any;
};

const FTIconwithbg = ({
  Icon,
  bG,
  size = 45,
  imageUrl,
  badge,
  onpress = () => {},
}: IconWithBgProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onpress}
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: bG,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {badge && (
        <View style={{ position: "absolute", top: 0, right: 0 }}>{badge}</View>
      )}
      {imageUrl ? (
        <View style={{ width: "100%", height: "100%" }}>
          <RNImage
            style={{
              width: "100%",
              height: "100%",
              borderRadius: size / 2,
            }}
            contentFit="contain"
            source={imageUrl}
          />
        </View>
      ) : (
        <Icon />
      )}
    </TouchableOpacity>
  );
};

export default FTIconwithbg;

const styles = StyleSheet.create({});
