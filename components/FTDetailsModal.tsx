import { StyleSheet, Text, View } from "react-native";
import React from "react";
import FTIconwithbg from "./FTIconwithbg";
import { FTCustombutton } from ".";
import { COLORS, FONTS, fontsize } from "../constants";
import { FTDetailsModalStyles } from "../assets/styles/components";
const { modalTitleText, detailsWrap, dataTitle, dataSubtitle } =
  FTDetailsModalStyles;

type IFTDetailsModalProps = {
  Icon?: any;
  bG?: string;
  title: string;
  modalTitle: string;
  info?: string;
  onPress: () => void;
  extraComponent?: any;
  mB?: number;
  mT?: number;
  imageUrl?: string;
  size?: number;
};

const FTDetailsModal = ({
  Icon,
  bG = "#fff",
  title,
  modalTitle,
  info,
  onPress,
  extraComponent,
  mB,
  mT,
  imageUrl,
  size = 45,
}: IFTDetailsModalProps) => {
  return (
    <View>
      <Text style={modalTitleText}>{modalTitle}</Text>
      <View style={detailsWrap}>
        <FTIconwithbg size={size} Icon={Icon} bG={bG} imageUrl={imageUrl} />
        <View style={{ marginLeft: 16 }}>
          <Text style={dataTitle}>{title}</Text>
          <Text style={dataSubtitle}>{info}</Text>
        </View>
      </View>
      {extraComponent}
      <FTCustombutton btntext="Proceed" onpress={onPress} />
    </View>
  );
};

export default FTDetailsModal;

const styles = StyleSheet.create({});
