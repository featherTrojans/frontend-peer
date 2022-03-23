import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  Platform,
  TouchableOpacity,
  Image
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import * as Print from "expo-print";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import * as Clipboard from "expo-clipboard";
import moment from "moment";
import { styles } from "./Transactiondetails.styles";
import {
  Backheader,
  Bottombtn,
  Iconwithdatas,
  InitialsBg,
  Sendingandreceive,

} from "../../../../components";
import { FONTS, fontsize, COLORS, icons } from "../../../../constants";
import { NavigationContainer } from "@react-navigation/native";
import amountFormatter from "../../../../utils/formatMoney";
import Globalmodal from "../../../shared/Globalmodal/Globalmodal";
import Customstatusbar from "../../../shared/Customstatusbar";
import { AuthContext } from "../../../../context/AuthContext";


// Sendingandreceive

const { Copyclipboard, Sharereceipt, Downloadreceipt, Reporttransactions } =
  icons;

const Transactiondetails = ({ navigation, route }) => {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyColor = copied ? COLORS.blue6 : COLORS.grey2;
  const { data } = route.params;

  const {
    amount,
    createdAt: dateTime,
    from: sender,
    to: receiver,
    transId: transactionRef,
    location: meetupPoint,
    title,
    user,
    otherUser,
  } = data;


  const dt = moment(dateTime);
  const formatDateTime = `${dt.format("ddd")},  ${dt.format("Do")} ${dt.format(
    "MMM"
  )} '${dt.format("YY")} - ${dt.format("LT")}`;

  useEffect(() => {
    console.log(data, "Transaction details");
  });

  const nameSplitter = (name: string) => {
    const splitName = name?.split(" ");

    if (splitName.length > 2) {
      return `${splitName[0][0]}${splitName[1][0]}`;
    }else{
      return `${splitName[0][0]}${splitName[1][0]}`;
    }
  };

  const copyToClipboard = (copiedTest: string) => {
    Clipboard.setString(copiedTest);
  };

  const subscription = Clipboard.addClipboardListener(
    ({ content }: ClipboardEvent) => {
      setCopied(true);
      console.log("hellow");
    }
  );

  // Clipboard.removeClipboardListener(subscription);

  const saveFile = async (filePath: string) => {
    const albumName = "Feather";
    const permission = await MediaLibrary.requestPermissionsAsync();

    let asset = null;
    if (permission.granted) {
      try {
        asset = await MediaLibrary.createAssetAsync(filePath);
      } catch (e) {
        console.error("MediaLibrary.createAssetAsync failed", e);
      }

      if (asset) {
        try {
          let album = await MediaLibrary.getAlbumAsync(albumName);
          if (album) {
            await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
          } else {
            album = await MediaLibrary.createAlbumAsync(
              albumName,
              asset,
              false
            );
          }
          // const assetResult = await MediaLibrary.getAssetsAsync({
          //   first: 1,
          //   album,
          //   sortBy: MediaLibrary.SortBy.creationTime,
          // });
          // asset = await assetResult.assets[0];
        } catch (e) {
          console.error(" failed", e);
        }
      } else {
        console.error("unable to use MediaLibrary, can not create assets");
      }
    }
  };

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

  const showImageOnReceipt = (name, title) => {
    switch (title) {
      case "funding":
        return `
        <div style="min-width: 62px; min-height: 62px; border-radius: 32px; background: #001757; display: flex; justify-content: center; align-items: center;">
          <img src="${assetsDB['fund']["paystack"]}" style="width: 25px; height: 25px" />
        </div>
        
        `;
        break;
      case "Wallet Debit":
        case "Wallet Credit":
        return `
        <div style="min-width: 62px; min-height: 62px; border-radius: 32px; background: #7600FF;display: flex; justify-content: center; align-items: center; color: white; font-weight: bold">
        ${nameSplitter(otherUser ? otherUser.fullName : "Feather Africa Inc")}
        </div>
        
        `;
        break;
      default:
        return `
        <div style="min-width: 62px; min-height: 62px; border-radius: 32px; background: #7600FF;display: flex; justify-content: center; align-items: center; color: white; font-weight: bold">
        ${nameSplitter(user.fullName)}
        </div>
        `;
        
        break;
    }
  };





  const typeOfName = (title: string) => {
    switch (title) {
      case "Wallet Credit":
        return {senderName: otherUser.fullName, receiverName: user.fullName}
        break;
        case "Wallet Debit":
          return {senderName: user.fullName, receiverName: otherUser ? otherUser.fullName : "EScrow"}
          case "funding":
            return {senderName: sender, receiverName: receiver}
          case "escrow":
            return {senderName: sender, receiverName: receiver}
      default:
        break;
    }
  }


  const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Feather Transactions</title>
      <style> 
   @page { margin: 20px; } 
</style>
      <style>
          body {
              font-size: 16px;
              padding: 50px;
              display: flex;
              flex-direction: column;
              
           
          }
          img.logo{
            max-width: 106px;
            width: 100%;
            object-fit: cover
            align-self: start;
            justify-self: start;
           
          }
          .container{
           
              display: flex:
              flex-direction: column;
              justify-content: center;
              align-items: center;
          }
          p{
            font-size: 16px;
            color: black;
            text-align: center
          }
          .div{
            max-width: 225px;
          width: "100%";
          display: flex;
           justify-content: space-between;
            align-items: center;
          }
  
          .transaction{
            font-size: 16px;
            margint-top: 30px;
            text-align: center;
          }
          .avatars{
            margin: 0px auto;
            margin-top: 45px;
            margin-bottom: 34px;
            max-width: 224px;
            width: 100%;
              display: flex;
              justify-content: space-between;
              margin-bottom: 20px;
              align-items: center;
              position: relative;
          }
          .avatars__container{
            position: relative;
          }
          .dashed__line{
            width: 100%;
            position: absolute,
            top: 0;
            left: 0;
            border-bottom: .5px dashed grey;
            
          }
          img.checked__icon{
            position: absolute;
            top: 30%;
            left: 50%;
            justify-self: center;
            align-self: center;
            text-align: center;
            margin: 0px auto;
          }
          .avatar__one{
              min-width: 62px;
              min-height: 62px;
              background-color: gray;
              border-radius: 100%;
          }
          .transaction__text{
            margin: 0px auto;
            max-width: 300px;
            width: 100%;
            font-size: 16px;
            color: black;
              text-align: center;
              margin-bottom: 42px;
              line-height: 24px;
          }
          span.transaction__names{
            text-transform: uppercase;
          }
          .transaction__heading{
            font-size: 16px;
              text-align: center;
          }
          .transaction__ref{
              font-size: 30px;
              font-weight: bold;
              color: #001757;
              text-transform: uppercase;
              margin-bottom: 62px
          }
          .list{
            margin: 0px auto;
            max-width: 320px;
            width: 100%;

          }
          .item{
              display: flex;
              justify-content: space-between;
              margin-bottom: 10px;
              border-bottom: 0.5px;
              border-color: rgba(112, 112,112, .3);
          }
          .item__left{
            font-size: 14px
          }
          .item__right{
            font-size: 14px;
            font-weight:bold;
            line-height: 30px;
          }
           .receiver{
            text-transform: capitalize;
          }
          .total{
            color: #003AD6;
          }
          .footer{
            margin:  70px auto;
            max-width: 300px;
            width: 100%;
              text-align: center;
          }
      </style>
  </head>
  <body>
  
      <img class="logo"
    src="https://res.cloudinary.com/gyroscope/image/upload/v1647941538/feather-transaction_qeslnn.svg" />
  

    <div class="container">
    <h1 class="transaction">Transaction Summary</h1>
  
    <div class="avatars__container">
    <div class="avatars">
        <img class="user__image" src="https://res.cloudinary.com/gyroscope/image/upload/v1648035185/62x62_feather_dibyrp.svg" />
        <div class="dashed__line"></div>
        <img class="checked__icon" src="https://res.cloudinary.com/gyroscope/image/upload/v1648035323/greenyy_exqzbx.svg" />
        
        
        ${showImageOnReceipt(user.fullName, title)}
    </div>
    </div>


    <p class="transaction__text">This is the transaction report between <span class="transaction__names">${typeOfName(title)?.senderName}</span> and <span class="transaction__names">${typeOfName(title)?.receiverName}</span></p>
  
    <h3 class="transaction__heading">Transaction Ref.</h3>
   <p class="transaction__ref">${transactionRef}</p>
  
   <ul class="list">
       <li class="item">
           <span class="item__left">Receiver </span>
           <span class="item__right receiver">${typeOfName(title)?.receiverName}</span>
       </li>
       <li class="item">
          <span class="item__left">Amount </span>
          <span class="item__right">NGN ${amountFormatter(amount)}</span>
      </li>
      <li class="item">
          <span class="item__left">Transaction Charge </span>
          <span class="item__right">+ NGN 00.00</span>
      </li>
      <li class="item">
          <span class="item__left">Total</span>
          <span class="item__right total">NGN ${amountFormatter(amount)}</span>
      </li>
   </ul>
  
   <p class="footer">If you have an issue with this transaction kindly send a mail with transaction ref to <a href="disputes@feather.africa">disputes@feather.africa</a></p>

   </div>
  </body>
  
  
  
  </html>
`;

  const shareReceipt = async (html) => {
    setShowModal(!showModal);
    const { uri } = await Print.printToFileAsync({ html });
    Sharing.shareAsync(uri);
  };

  const downloadReceipt = async (html) => {
    try {
      const { uri } = await Print.printToFileAsync({ html });
      if (Platform.OS === "ios") {
        await Sharing.shareAsync(uri);
      } else {
        saveFile(uri);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const reportTransaction = () => {
    setShowModal(false);
    navigation.navigate("Transactiondispute");
  };

  // const {price } = route?.params
  return (
    <View style={styles.container}>
      <Customstatusbar />
      <Globalmodal
        showState={showModal}
        onBgPress={() => setShowModal(!showModal)}
      >
        <>
          <Iconwithdatas
            icon={<Sharereceipt />}
            iconBg="#001757"
            title="Share Receipt"
            details="Share a copy of your transaction."
            onpress={() => shareReceipt(htmlContent)}
          />
          <Iconwithdatas
            icon={<Downloadreceipt />}
            iconBg="#001757"
            title="Download Receipt"
            details="Generate a .pdf copy of this transaction."
            onpress={() => downloadReceipt(htmlContent)}
          />
          <Iconwithdatas
            icon={<Reporttransactions />}
            iconBg="#001757"
            title="Report Transaction"
            details="Have issues with this transaction?"
            onpress={() => reportTransaction()}
          />
        </>
      </Globalmodal>

      <Backheader title="Details" />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: 4,
          }}
        >
          <Sendingandreceive
            senderName={typeOfName(title)?.senderName}
            receiverName={typeOfName(title)?.receiverName}
            title={title}
          />
          <Text style={{ ...fontsize.bxmedium, ...FONTS.bold, marginTop: 8 }}>
            NGN {amountFormatter(amount)}
          </Text>
        </View>

        {/* The details container */}
        <View style={styles.detailsContainer}>
          <View style={styles.eachDetailContainer}>
            <Text style={styles.eachDetailTitle}>Date & Time</Text>
            <Text style={styles.eachDetailValue}>{formatDateTime}</Text>
          </View>

          <View
            style={[
              styles.eachDetailContainer,
              { flexDirection: "row", alignItems: "center" },
            ]}
          >
            <View>
              <Text style={styles.eachDetailTitle}>Transaction Ref</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text
                  style={[
                    styles.eachDetailValue,
                    { textTransform: "uppercase" },
                  ]}
                >
                  {transactionRef}
                </Text>
                <TouchableOpacity
                  style={styles.copyClipboardContainer}
                  onPress={() => copyToClipboard(transactionRef)}
                >
                  <Copyclipboard />
                  <Text
                    style={[styles.copyClipboardText, { color: copyColor }]}
                  >
                    {copied ? "Copied" : "Copy"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <Text style={styles.eachDetailTitle}>Status</Text>
              <Text style={[styles.eachDetailValue, { color: COLORS.green1 }]}>
                Successful
              </Text>
            </View>
          </View>

          <View style={styles.eachDetailContainer}>
            <Text style={styles.eachDetailTitle}>Receiver</Text>
            <Text style={styles.eachDetailValue}>
              {receiver} - {typeOfName(title)?.receiverName}
            </Text>
          </View>

          <View style={styles.eachDetailContainer}>
            <Text style={styles.eachDetailTitle}>Sender</Text>
            <Text style={styles.eachDetailValue}>
              {sender} - {typeOfName(title)?.senderName}
            </Text>
          </View>
          <View style={styles.eachDetailContainer}>
            {meetupPoint && (
              <View style={styles.eachDetailContainer}>
                <Text style={styles.eachDetailTitle}>{meetupPoint}</Text>
                <Text style={styles.eachDetailValue}>
                  Eric Moore, Ebutte Meta, Lagos
                </Text>
              </View>
            )}

            <Text style={styles.eachDetailTitle}>Total Amount</Text>
            <Text
              style={[styles.eachDetailValue, { textTransform: "uppercase" }]}
            >
              NGN {amountFormatter(amount)} + NGN 0.00
              <Text style={{ textTransform: "capitalize" }}>Charges</Text>
            </Text>
          </View>
        </View>
      </ScrollView>

      <Bottombtn
        title="VIEW OPTIONS"
        bg="#000"
        onpress={() => setShowModal(true)}
      />
    </View>
  );
};

export default Transactiondetails;
