import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Image as RNImage } from "expo-image";
import { COLORS, FONTS, fontsize, icons, images } from "../constants";
import { assetsDB, bankLogo } from "../assetdatas";
import { RFValue } from "react-native-responsive-fontsize";
import { nameSplitToTwo } from "../utils/nameSplitter";

const { Bonusiconlarge, Utilitylarge, Logoavatar } = icons;

interface SendingandreceiveProps {
  senderName?: string;
  receiverName?: string;
  title?: string;
  value?: string | null;
  user?: any;
  otherUser?: any;
  transId?: string;
}

const InitialsBgColor = ({ name }) => {
  return (
    <View
      style={{
        width: 50,
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.purple3,
        borderRadius: 50 / 2,
      }}
    >
      {name && (
        <Text style={{ color: COLORS.purple2 }}>{nameSplitToTwo(name)}</Text>
      )}
    </View>
  );
};

const showImage = (
  senderName,
  receiverName,
  title,
  value,
  otherUser,
  transId = ""
) => {
  const isVFD = transId?.includes("Feather", 0);

  switch (title) {
    case "funding":
      return (
        <View
          style={[
            { backgroundColor: isVFD ? COLORS.white : COLORS.blue7 },
            styles.typeContainer,
          ]}
        >
          <RNImage
            style={{
              width: isVFD ? "100%" : "50%",
              height: isVFD ? "100%" : "50%",
            }}
            source={
              !isVFD ? assetsDB["fund"]["paystack"] : assetsDB["fund"]["VFD"]
            }
          />
        </View>
      );
      break;
    case "Fund Reversal":
      return <Logoavatar />;
      break;
    case "Wallet Debit":
      return <InitialsBgColor name={receiverName} />;
      break;
    case "Wallet Credit":
      if (senderName === "Bonus") {
        return <Bonusiconlarge />;
      } else {
        return <InitialsBgColor name={senderName} />;
      }
      break;
    case "Utility Payment":
      return <Utilitylarge />;
      break;

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
          <RNImage
            style={{ width: "50%", height: "50%", borderRadius: 50 / 2 }}
            source={assetsDB["banks"][title]}
          />
        </View>
      );
      break;

    case "withdrawal":
      const targetLogo = bankLogo.filter((logo) => logo.name === value);
      const isGt = value === "Guaranty Trust Bank";
      const isFcmb = value === "First City Monument Bank";
      return (
        <View style={styles.typeContainer}>
          <RNImage
            style={{ width: "100%", height: "100%", borderRadius: 50 / 2 }}
            source={targetLogo[0]["image"]}
            contentFit={isGt || isFcmb ? "cover" : "contain"}
          />
        </View>
      );
      break;
    case "Funds Transfer":
      const targetlogo = bankLogo.filter((logo) => logo.name === value);
      const isGtb = value === "Guaranty Trust Bank";
      const isFcmbc = value === "First City Monument Bank";
      return (
        <View style={styles.typeContainer}>
          <RNImage
            style={{ width: "100%", height: "100%", borderRadius: 50 / 2 }}
            source={targetlogo[0]["image"]}
            contentFit={isGtb || isFcmbc ? "cover" : "contain"}
          />
        </View>
      );
      break;

    case "Airtime Purchase":
      const networkType = value?.toUpperCase() || "MTN";
      const isEtisalat = networkType === "9MOBILE";
      return (
        <View
          style={[styles.typeContainer, { backgroundColor: "transparent" }]}
        >
          <RNImage
            style={{ width: "100%", height: "100%", borderRadius: 50 / 2 }}
            source={
              isEtisalat
                ? assetsDB["bills"]["ETISALAT"]
                : assetsDB["bills"][networkType]
            }
          />
        </View>
      );
      break;

    default:
      return (
        <View>
          <Text>TH</Text>
        </View>
      );
      break;
  }
};

const Sendingandreceive = ({
  senderName,
  receiverName,
  title,
  value,
  user,
  otherUser,
  transId,
}: SendingandreceiveProps) => {
  return (
    <View style={styles.container}>
      {(title == "Wallet Credit" || title == "Wallet Debit") && otherUser ? (
        <View>
          {otherUser.imageUrl !== null ? (
            <RNImage
              style={{ width: 50, height: 50, borderRadius: 62 / 2 }}
              contentFit="cover"
              source={otherUser.imageUrl}
            />
          ) : (
            showImage(senderName, receiverName, title, value, otherUser)
          )}
        </View>
      ) : (
        <View style={{ position: "relative" }}>
          {showImage(
            senderName,
            receiverName,
            title,
            value,
            otherUser,
            transId
          )}
        </View>
      )}
    </View>
  );
};

export default Sendingandreceive;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  arrowContainer: {
    marginHorizontal: RFValue(30),
  },
  badgeImage: {
    position: "absolute",
    left: -10,
  },
  ///Show Images styles
  typeContainer: {
    width: 50,
    height: 50,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50 / 2,
  },
  imageStyle: {
    width: "50%",
    height: "50%",
  },
});
