import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { ReactNode } from "react";
import { COLORS, FONTS, fontsize, icons } from "../constants";
import { FTIconwithtitleandinfoStyles } from "../assets/styles/components";
import FTIconwithbg from "./FTIconwithbg";
const { mainWrap, iconandinfoWrap, iconBg, titleText, infoText } =
  FTIconwithtitleandinfoStyles;

const { Greaterthanicon } = icons;

type IFTIconwithtitleandInfoProps = {
  Icon?: any;
  bG: string;
  title: string;
  info?: string;
  onPress: () => void;
  rightComponent?: ReactNode;
  mB?: number
  imageUrl?: string
  size?: number
};

const FTIconwithtitleandinfo = ({
  Icon,
  bG,
  title,
  info,
  onPress,
  rightComponent,
  mB,
  imageUrl,
  size=45
}: IFTIconwithtitleandInfoProps) => {
  return (
    <Pressable style={[mainWrap, {marginBottom: mB}]} onPress={onPress}>
      <View style={iconandinfoWrap}>
        <FTIconwithbg size={size} Icon={Icon} bG={bG} imageUrl={imageUrl}/>
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
