import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { COLORS, icons, images } from "../../constants";
import { styles } from "./Sendingandreceive.styles";
import InitialsBg from "../InitialsBg/InitialsBg";
import { assetsDB, bankLogo } from "../../assetdatas";
import { RFValue } from "react-native-responsive-fontsize";
const {
  Senderimage,
  Sendingarrow,
  Receivingarrow,
  Receiverimage,
  Userdefaultmedium,
  Bonusiconlarge,
  Utilitylarge,
  Dashedline,
  Greencheckicon
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
  otherUser?: any
) => {
  switch (title) {
    case "funding":
      return (
        <View style={[{backgroundColor: COLORS.blue7},styles.typeContainer]}>
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
          <View style={[styles.typeContainer, {backgroundColor: "#001757", borderRadius: RFValue(62 / 2)}]}>
            <Image
              style={styles.imageStyle}
              resizeMode="contain"
              source={{
                uri: assetsDB["fund"]["paystack"],
              }}
            />
          </View>
        );
        break;
    case "Wallet Debit":
      return (        
          <InitialsBg name={receiverName} sideLength={50} />
        
        
      ) 
      break;
    case "Wallet Credit":
      if(senderName === "Bonus"){
        return (
          <Bonusiconlarge />
        );
      }
      else{
        return(
          <InitialsBg name={senderName} sideLength={50} />
        )
      }
      break;
      case "Utility Payment":
        return (
          <View style={[styles.typeContainer, { borderRadius: RFValue(62 / 2)}]}>
            <Utilitylarge />
          </View>
        );
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
          <Image
            style={{width: "50%", height: "50%", borderRadius: 50/2}}
            source={{
              uri: assetsDB["banks"][title],
            }}
          />
        </View>
      );
      break;

    case "withdrawal":
      const targetLogo = bankLogo.filter((logo) => logo.name === value);
      const isGt = value === "Guaranty Trust Bank"
      const isFcmb = value === "First City Monument Bank"
      return (
        <View style={styles.typeContainer}>
          <Image
            style={{width: "100%", height: "100%", borderRadius: 50/2}}
            source={{
              uri: targetLogo[0]["image"],
            }}
            resizeMode={(isGt || isFcmb) ? "cover": "contain"}
            resizeMethod="scale"
          />
        </View>
      );
      break;

    case "Airtime Purchase":
      const networkType = value?.toUpperCase();
      return (
        <View style={[styles.typeContainer, {backgroundColor: "transparent"}]}>
          <Image
            style={{width: "100%", height: "100%", borderRadius: 50/2 }}
            source={{
              uri: assetsDB["bills"][networkType],
            }}
          />
        </View>
      );
      break;

    default:

    return (
      <View>
        <Text>TH</Text>
      </View>
    )
      break;
  }
};

type SendingandreceiveProps = {
  senderName?: string;
  receiverName?: string;
  title?: string;
  value?: string | null;
  user?: any;
  otherUser?: any
};

const Sendingandreceive = ({
  senderName,
  receiverName,
  title,
  value,
  user,
  otherUser
}: SendingandreceiveProps) => {
  return (
    <View style={styles.container}>
      {/* {user.imageUrl !== null ?
      <View>
        <Image
        style={{width: 62, height: 62, borderRadius: 62/2}}
        source={{
          uri: user.imageUrl,
        }}
      />
      </View>  
      :

      <Userdefaultmedium />
        
    
    }
    <View>
      <Dashedline />
    </View> */}
     {((title == "Wallet Credit") || (title == "Wallet Debit")) && otherUser.imageUrl !== null ?
          <View>
          <Image
          style={{width: 50, height: 50, borderRadius: 62/2}}
          source={{
            uri: otherUser.imageUrl,
          }}
        />
        </View> 
        :
        
        <View style={{ position: "relative" }}>
        {/* <Receiverimage /> */}
        {showImage(senderName, receiverName, title, value, otherUser)}
      </View>
    
    }
      
    </View>
  );
};

export default Sendingandreceive;
