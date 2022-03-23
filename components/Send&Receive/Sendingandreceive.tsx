import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { COLORS, icons, images } from "../../constants";
import { styles } from "./Sendingandreceive.styles";
import InitialsBg from "../InitialsBg/InitialsBg";
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

const assetsDB = {
  banks: {
    GTB: "https://raw.githubusercontent.com/PaystackHQ/nigerialogos/master/logos/guaranty_trust_bank/guaranty_trust_bank.png",
    FIRST:
      "https://raw.githubusercontent.com/PaystackHQ/nigerialogos/master/logos/first_bank/first_bank.png",
    ZENITH:
      "https://raw.githubusercontent.com/PaystackHQ/nigerialogos/master/logos/zenith_bank/zenith_bank.png",
    ACCESS:
      "https://raw.githubusercontent.com/PaystackHQ/nigerialogos/master/logos/access_bank/access_bank.png",
    STANBIC:
      "https://raw.githubusercontent.com/PaystackHQ/nigerialogos/master/logos/stanbic_ibtc/stanbic_ibtc.png",
    DIAMOND:
      "https://raw.githubusercontent.com/PaystackHQ/nigerialogos/master/logos/access_bank/access_bank.png",
    SKYE: "https://raw.githubusercontent.com/PaystackHQ/nigerialogos/master/logos/polaris_bank/polaris_bank.png",
    WEMA: "https://raw.githubusercontent.com/PaystackHQ/nigerialogos/master/logos/wema_bank/wema_bank.png",
    FCMB: "https://raw.githubusercontent.com/PaystackHQ/nigerialogos/master/logos/fcmb/fcmb.png",
    FIDELITY:
      "https://raw.githubusercontent.com/PaystackHQ/nigerialogos/master/logos/fidelity_bank/fidelity_bank.png",
    UBA: "https://raw.githubusercontent.com/PaystackHQ/nigerialogos/master/logos/united_bank_for_africa/united_bank_for_africa.png",
    UNION:
      "https://raw.githubusercontent.com/PaystackHQ/nigerialogos/master/logos/fidelity_bank/fidelity_bank.png",
    ECOBANK:
      "https://raw.githubusercontent.com/PaystackHQ/nigerialogos/master/logos/ecobank/ecobank.png",
    HERITAGE:
      "https://raw.githubusercontent.com/PaystackHQ/nigerialogos/master/logos/heritage_bank/heritage_bank.png",
    UNITY:
      "https://explain.com.ng/wp-content/uploads/2021/03/WeChat-Image_20210323235401.jpg",
    STERLING:
      "https://raw.githubusercontent.com/PaystackHQ/nigerialogos/master/logos/sterling_bank/sterling_bank.png",
    JAIZ: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSiQ7OKpP8Eys6O2KgXQLs80w6Gv1aO7NpXw&usqp=CAU",
    KEYSTONE:
      "https://raw.githubusercontent.com/PaystackHQ/nigerialogos/master/logos/keystone_bank/keystone_bank.png",
    KUDA: "https://raw.githubusercontent.com/PaystackHQ/nigerialogos/master/logos/kuda_bank/kuda_bank.png",
    POLARIS:
      "https://raw.githubusercontent.com/PaystackHQ/nigerialogos/master/logos/polaris_bank/polaris_bank.png",
    PAYCOM: "https://asset.brandfetch.io/id2FbKPB40/idW2zUwfi4.png",
    PROVIDUS:
      "https://providusbank.com/wp-content/uploads/2022/02/Providus-Bank-Logo.png",
    TAJ: "https://www.tajbank.com/site-assets/uploads/2019/08/tajbank-logo-xlarge-1024x426.png",
  },

  fund: {
    paystack:
      "https://raw.githubusercontent.com/PaystackHQ/nigerialogos/master/logos/paystack/paystack.png",
  },

  bills: {
    MTN: "https://raw.githubusercontent.com/PaystackHQ/nigerialogos/master/logos/mtn/mtn.png",
    AIRTEL:
      "https://raw.githubusercontent.com/PaystackHQ/nigerialogos/master/logos/airtel/airtel.png",
    ETISALAT:
      "https://raw.githubusercontent.com/PaystackHQ/nigerialogos/master/logos/9mobile/9mobile.png",
    GLO: "https://raw.githubusercontent.com/PaystackHQ/nigerialogos/master/logos/glo/glo.png",
  },
};

const showImage = (name: string, title: string | null) => {
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
      return <InitialsBg name={name} sideLength={62} />;

      break;
    case "Wallet Credit":
      return <InitialsBg name={name} sideLength={62} />;

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
        {showImage(receiverName, title)}

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
