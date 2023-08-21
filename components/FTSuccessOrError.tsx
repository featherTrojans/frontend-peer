import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, FONTS, fontsize, icons } from "../constants";
import { FTSuccessOrErrorStyles } from "../assets/styles/components";
const { Successicon, Erroricon } = icons;

const { container, messageTitleText, messageInfoText } = FTSuccessOrErrorStyles;



type IFTSuccessorErrorProps = {
    error?: boolean,
    messageTitle?: string,
    messageInfo?: string
}

const FTSuccessOrError = ({ error = false, messageTitle, messageInfo }: IFTSuccessorErrorProps) => {
  let MSG_TITLE = !error ? "Payment Success!" : "Oops, something went wrong!";
  let MSG_INFO = !error
    ? "Your payment has been successfully done"
    : "Your payment failed, try again";
  return (
    <View style={container}>
      {!error ? <Successicon /> : <Erroricon />}
      <Text style={messageTitleText}>{messageTitle || MSG_TITLE}</Text>
      <Text style={messageInfoText}>{messageInfo || MSG_INFO}</Text>
    </View>
  );
};

export default FTSuccessOrError;

const styles = StyleSheet.create({});
