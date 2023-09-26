import {
  Text,
  View,
  ScrollView,
  Platform,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import * as Print from "expo-print";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import moment from "moment";
import {
  FTHorizontaline,
  FTIconwithbg,
  FTTitlepagewrapper,
} from "../components";
import { COLORS, FONTS, fontsize, icons } from "../constants";
import amountFormatter from "../utils/formatMoney";
import { TransactiondetailsScreenStyles } from "../assets/styles/screens";
import { transactionBadge } from "../components/FTTransactionhistory";

const {
  eachDetailContainer,
  eachDetailTitle,
  eachDetailValue,
  eachOptionWrapper,
  amountText,
  amountTextValue,
  transactionStatusWrap,
  statusThumpBg,
  statusThumbText,
  statusTextBg,
  statusText,
} = TransactiondetailsScreenStyles;

type IStatusProps=  "success" | "failed" | "pending"



const transactionStatus = (status: IStatusProps) => {
  switch (status.toLowerCase()) {
    case "success":
      return (
        <View style={transactionStatusWrap}>
          <View style={[statusThumpBg, { backgroundColor: COLORS.Tgreen }]}>
            <Text style={statusThumbText}>👍🏽</Text>
          </View>
          <View style={[statusTextBg, { backgroundColor: COLORS.Tgreen }]}>
            <Text style={[statusText, { color: COLORS.green1 }]}>
              Successful
            </Text>
          </View>
        </View>
      );
      break;
    case "pending":
      return (
        <View style={transactionStatusWrap}>
          <View style={[statusThumpBg, { backgroundColor: COLORS.Tyellow }]}>
            <Text style={statusThumbText}>✍🏽</Text>
          </View>
          <View style={[statusTextBg, { backgroundColor: COLORS.Tyellow }]}>
            <Text style={[statusText, { color: COLORS.yellow1 }]}>
              Pending
            </Text>
          </View>
        </View>
      );
      break;
    case "failed":
      return (
        <View style={transactionStatusWrap}>
          <View style={[statusThumpBg, { backgroundColor: COLORS.Tred }]}>
            <Text style={statusThumbText}>👎🏽</Text>
          </View>
          <View style={[statusTextBg, { backgroundColor: COLORS.Tred }]}>
            <Text style={[statusText, { color: COLORS.red5 }]}>
              Failed
            </Text>
          </View>
        </View>
      );
      break;

    default:
      return (
        null
      );
      break;
  }
};

const {
  Sharereceipt,
  Downloadreceipt,
  Reporttransactions,
  Arrowin,
  Arrowout,
  Dashedlineicon,
} = icons;

const TransactionDetailsScreen = ({ navigation, route }) => {
  const [showModal, setShowModal] = useState(false);


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
    charges,
    direction,
    bankDetails,
    status
  } = data;
  const total = Number(amount);

  const dt = moment(dateTime);
  const formatDateTime = `${dt.format("ddd")}. ${dt.format( "MMM")}, ${dt.format("YYYY")}`;

  const saveFile = async (filePath: string) => {
    const albumName = "Feather";
    const permission = await MediaLibrary.requestPermissionsAsync();

    let asset;
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

  const typeOfName = (title: string) => {
    switch (title) {
      case "Wallet Credit":
        if (sender === "Bonus") {
          return { senderName: sender, receiverName: receiver };
        } else {
          return {
            senderName: otherUser ? otherUser.fullName : sender.split("-")[0],
            receiverName: user.fullName,
          };
        }
        break;

      case "Wallet Debit":
        return { senderName: user.fullName, receiverName: otherUser?.fullName };
        break;
      case "funding":
      case "Fund Reversal":
      case "escrow":
      case "Airtime Purchase":
      case "withdrawal":
        return { senderName: sender, receiverName: receiver };
        break;
      default:
        return { senderName: sender, receiverName: receiver };
        break;
    }
  };

  const htmlContent = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
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
              font-family: 'Nunito Sans', sans-serif;
              
           
          }
          img.logo{
            max-width: 200px;
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
              align-items: center;
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


    <p class="transaction__text">This is the transaction report between <span class="transaction__names">${
      typeOfName(title)?.senderName !== "Bonus"
        ? typeOfName(title)?.senderName
        : "FEATHER"
    }</span> and <span class="transaction__names">${
    typeOfName(title)?.receiverName
  }</span></p>
  
    <h3 class="transaction__heading">Transaction Ref.</h3>
   <p class="transaction__ref">${transactionRef}</p>
  
   <ul class="list">
        <li class="item">
        <span class="item__left">Sender Name </span>
        <span class="item__right receiver">${
          typeOfName(title)?.senderName !== "Bonus"
            ? typeOfName(title)?.senderName
            : "FEATHER"
        }</span>
      </li>
       <li class="item">
           <span class="item__left">Receiver </span>
           <span class="item__right receiver">${
             typeOfName(title)?.receiverName
           }</span>
       </li>
       <li class="item">
          <span class="item__left">Amount </span>
          <span class="item__right">NGN ${amountFormatter(amount)}</span>
      </li>
      <li class="item">
          <span class="item__left">Transaction Charge </span>
          <span class="item__right">+ NGN ${amountFormatter(charges)}</span>
      </li>
      <li class="item">
          <span class="item__left">Total</span>
          <span class="item__right total">NGN ${amountFormatter(
            total.toString()
          )}</span>
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

  const Eachoption = ({ title, value, mT = 0, mB = 0 }) => {
    return (
      <View style={[eachDetailContainer, { marginTop: mT, marginBottom: mB }]}>
        <Text style={eachDetailTitle}>{title}</Text>
        <Text style={eachDetailValue}>{value}</Text>
      </View>
    );
  };

  const FeatherTransferDetails = () => {
    if (title === "Wallet Credit" || title === "Wallet Debit") {
      const senderName =
        direction === "in"
          ? sender === "Bonus"
            ? "Feather"
            : otherUser
            ? otherUser.fullName
            : sender.split("-")[0]
          : user.fullName;
      const receiverName =
        direction === "out"
          ? sender === "Bonus"
            ? "Feather"
            : otherUser
            ? otherUser.fullName
            : sender.split("-")[0]
          : user.fullName;
      return (
        <>
          <Eachoption title="Sender Name" mB={18} mT={18} value={senderName} />
          <Eachoption title="Receiver Name" value={receiverName} />
        </>
      );
    }
  };

  const BankTransferDetails = () => {
    if (bankDetails) {
      return (
        <>
          <Eachoption
            title="Account Name"
            mB={18}
            mT={18}
            value={bankDetails.account_name}
          />
          <Eachoption
            title="Account Number"
            value={bankDetails.account_number}
            mB={18}
          />
          <Eachoption title="Bank" value={bankDetails.bank_name} />
        </>
      );
    }
  };

  const AirtimePurchase = () => {
    if (title === "Airtime Purchase") {
      const receiverPhone = receiver;
      const networkName = sender;
      return (
        <>
          <Eachoption
            title="Phone Number"
            mB={18}
            mT={18}
            value={receiverPhone}
          />
          <Eachoption title="Network Type" value={networkName} />
        </>
      );
    }
  };

  return (
    <FTTitlepagewrapper title="Transaction Details" childBg={COLORS.white3} headerBg={COLORS.white3}>
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {transactionBadge(title, direction, sender, receiver, 50)}

          {transactionStatus("success")}


          <FTIconwithbg
            bG={COLORS.blue9}
            Icon={Sharereceipt}
            onpress={() => shareReceipt(htmlContent)}
          />
        </View>

        <View style={eachOptionWrapper}>
          <View
            style={{
              alignSelf: "center",
              alignItems: "center",
              marginBottom: 40,
            }}
          >
            <Text style={amountText}>Amount</Text>
            <Text style={amountTextValue}>N{amountFormatter(amount)}</Text>
          </View>
          <Dashedlineicon />
          <Eachoption mT={24} title="Ref. Number" value={transactionRef} />
          {FeatherTransferDetails()}
          {BankTransferDetails()}
          {AirtimePurchase()}
          <Eachoption title="Payment Method" mB={18} mT={18} value={title} />
          <Eachoption title="Payment Time" value={formatDateTime} mB={24} />
          <Dashedlineicon />
          <Eachoption
            title="Charges"
            value={`N${amountFormatter(charges)}`}
            mT={24}
            mB={18}
          />
          <Eachoption
            title="Total Paid"
            value={`N${amountFormatter(total.toString())}`}
          />
        </View>
      </ScrollView>
    </FTTitlepagewrapper>
  );
};

export default TransactionDetailsScreen;
