import { StyleSheet, Text, View, Image } from "react-native";
import React, { ReactElement } from "react";
import { images } from "../constants";

const { Notificationimage } = images;

type IconWithBgProps = {
  Icon?: any;
  bG: string;
  size?: number | undefined;
  imageUrl?: string;
  badge?: ReactElement;
};

const FTIconwithbg = ({
  Icon,
  bG,
  size = 45,
  imageUrl,
  badge,
}: IconWithBgProps) => {
  return (
    <View
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
        <Image
          style={{
            width: "100%",
            height: "100%",
            borderRadius: size / 2,
          }}
          resizeMode="contain"
          resizeMethod="scale"
          source={{ uri: imageUrl }}
        />
      ) : (
        <Icon />
      )}
    </View>
  );
};

export default FTIconwithbg;

const styles = StyleSheet.create({});
