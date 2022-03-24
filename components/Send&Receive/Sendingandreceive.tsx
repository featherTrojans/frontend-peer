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



const showImage = (senderName: string, receiverName: string, title: string | null, value?: string) => {
  switch (title) {
    case "funding":
      return (
        <View
          style={{
            width: 62,
            height: 62,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 62 / 2,
            backgroundColor: "#001757",
          }}
        >
          <Image
            style={{
              width: "50%",
              height: "50%",
              // borderRadius: 62 / 2,
            }}
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
        <View
          style={{
            width: 62,
            height: 62,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 62 / 2,
            borderColor: COLORS.blue6,
            borderWidth: 1
          }}
        >
          <Image
            style={{
              width: "60%",
              height: "60%",
              // borderRadius: 62 / 2,
            }}
            source={{
              uri: assetsDB["banks"][title],
            }}
          />
        </View>
      );
      break;

      case "withdrawal":
        const targetLogo = bankLogo.filter(logo => logo.name === value)
      return (
        <View
          style={{
            width: 62,
            height: 62,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 62 / 2,
            borderColor: COLORS.blue6,
            borderWidth: 1
          }}
        >
          <Image
            style={{
              width: "60%",
              height: "60%",
              // borderRadius: 62 / 2,
            }}
            source={{
              uri: targetLogo[0]["image"],
            }}
          />
        </View>
      );
      break;
    
      case "Airtime Purchase":
      return (
        <View
          style={{
            width: 62,
            height: 62,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 62 / 2,
            borderColor: COLORS.blue6,
            borderWidth: 1
          }}
        >
          <Image
            style={{
              width: "60%",
              height: "60%",
              // borderRadius: 62 / 2,
            }}
            source={{
              uri: assetsDB["bills"][value],
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
  value
}: SendingandreceiveProps) => {
  return (
    <View style={styles.container}>
      {/* <Senderimage /> */}
      {/* {showImage(senderName, "Wallet Credit")} */}
      <Userdefaultmedium />

      <View style={styles.arrowContainer}>
        <Sendingarrow />
        <Receivingarrow />
      </View>
      <View style={{ position: "relative" }}>
        {/* <Receiverimage /> */}
        {showImage(senderName, receiverName, title, value)}

        {/* <Image
          source={Trustedbadgepng}
          resizeMode="cover"
          style={styles.badgeImage}
        /> */}
      </View>
    </View>
  );
};

export default Sendingandreceive;
