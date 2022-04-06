import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { COLORS, icons, images } from "../../constants";
import { styles } from "./Sendingandreceive.styles";
import InitialsBg from "../InitialsBg/InitialsBg";
import { assetsDB, bankLogo } from "../../assetdatas";
const {
  Senderimage,
  Sendingarrow,
  Receivingarrow,
  Receiverimage,
  Userdefaultmedium,
} = icons;
const { Trustedbadgepng } = images;

// Wallet Credit
// Wallet Debit
// Funding

const showImage = (
  senderName: string,
  receiverName: string,
  title: string | null,
  value?: string,
) => {
  switch (title) {
    case "funding":
      return (
        <View style={styles.typeContainer}>
          <Image
            style={styles.imageStyle}
            source={{
              uri: assetsDB["fund"]["paystack"],
            }}
          />
        </View>
      );
      break;
      case "Fund Reversal":
        return (
          <View style={styles.typeContainer}>
            <Image
              style={styles.imageStyle}
              source={{
                uri: assetsDB["fund"]["paystack"],
              }}
            />
          </View>
        );
        break;
    case "Wallet Debit":
      return <InitialsBg name={receiverName} sideLength={62} />;

      break;
    case "Wallet Credit":
      return <InitialsBg name={senderName} sideLength={62} />;

    case "GTB":
    case "FIRST":
    case "ZENITH":
    case "ACCESS":
    case "STANBIC":
    case "DIAMOND":
    case "SKYE":
    case "WEMA":
    case "FCMB":
    case "FIDELITY":
    case "UBA":
    case "UNION":
    case "ECOBANK":
    case "HERITAGE":
    case "UNITY":
    case "STERLING":
    case "JAIZ":
    case "KEYSTONE":
    case "KUDA":
    case "POLARIS":
    case "PAYCOM":
    case "PROVIDUS":
    case "TAJ":
      return (
        <View style={styles.typeContainer}>
          <Image
            style={styles.imageStyle}
            source={{
              uri: assetsDB["banks"][title],
            }}
          />
        </View>
      );
      break;

    case "withdrawal":
      const targetLogo = bankLogo.filter((logo) => logo.name === value);
      return (
        <View style={styles.typeContainer}>
          <Image
            style={styles.imageStyle}
            source={{
              uri: targetLogo[0]["image"],
            }}
          />
        </View>
      );
      break;

    case "Airtime Purchase":
      const networkType = value?.toUpperCase();
      return (
        <View style={[styles.typeContainer, {backgroundColor: "transparent"}]}>
          <Image
            style={styles.imageStyle}
            source={{
              uri: assetsDB["bills"][networkType],
            }}
          />
        </View>
      );
      break;

    default:
      break;
  }
};

type SendingandreceiveProps = {
  senderName?: string;
  receiverName?: string;
  title?: string;
  value?: string | null;
};

const Sendingandreceive = ({
  senderName,
  receiverName,
  title,
  value,
}: SendingandreceiveProps) => {
  return (
    <View style={styles.container}>
      <Userdefaultmedium />

      <View style={styles.arrowContainer}>
        <Sendingarrow />
        <Receivingarrow />
      </View>
      <View style={{ position: "relative" }}>
        {/* <Receiverimage /> */}
        {showImage(senderName, receiverName, title, value)}
      </View>
    </View>
  );
};

export default Sendingandreceive;
