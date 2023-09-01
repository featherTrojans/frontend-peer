import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { ReactElement, ReactNode } from "react";
import { COLORS, FONTS, fontsize, icons } from "../constants";
import { FTIconwithtitleandinfoStyles } from "../assets/styles/components";
import FTIconwithbg from "./FTIconwithbg";
import FTOtherImage from "./FTOtherImage";
const { mainWrap, iconandinfoWrap, iconBg, titleText, infoText } =
  FTIconwithtitleandinfoStyles;

const { Greaterthanicon } = icons;

type IFTIconwithtitleandInfoProps = {
  Icon?: any;
  bG?: string;
  title: string;
  info?: string;
  onPress: () => void;
  rightComponent?: ReactNode;
  mB?: number;
  mT?: number;
  imageUrl?: string;
  size?: number;
  badge?: ReactElement;
  profile?: boolean;
  userInfo?: {};
};

const FTIconwithtitleandinfo = ({
  Icon,
  bG = "#fff",
  title,
  info,
  onPress,
  rightComponent,
  mB,
  mT,
  imageUrl,
  size = 45,
  badge,
  profile = false,
  userInfo = {},
}: IFTIconwithtitleandInfoProps) => {
  return (
    <Pressable
      hitSlop={30}
      style={[mainWrap, { marginBottom: mB, marginTop: mT }]}
      onPress={onPress}
    >
      <View style={iconandinfoWrap}>
        {profile ? (
          <FTOtherImage
            imageurl={userInfo?.imageUrl}
            memojiImage={userInfo?.memoji}
            fullname={userInfo?.fullName}
            size={size}
          />
        ) : (
          <FTIconwithbg
            badge={badge}
            size={size}
            Icon={Icon}
            bG={bG}
            imageUrl={imageUrl}
          />
        )}
        <View style={{ marginLeft: 20 }}>
          <Text style={titleText}>{title}</Text>
          {info && <Text style={infoText}>{info}</Text>}
        </View>
      </View>
      <View>{rightComponent ? rightComponent : <Greaterthanicon />}</View>
    </Pressable>
  );
};

export default FTIconwithtitleandinfo;

const styles = StyleSheet.create({});
