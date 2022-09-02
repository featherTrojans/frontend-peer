import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  Platform,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import * as Print from "expo-print";
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import * as Clipboard from "expo-clipboard";
import moment from "moment";
import { styles } from "./Transactiondetails.styles";
import { assetsDB, bankLogo } from "../../../../assetdatas";
import {
  Backheader,
  Bottombtn,
  Horizontaline,
  Iconwithdatas,
  InitialsBg,
  Mainwrapper,
  Sendingandreceive,
} from "../../../../components";
import { FONTS, fontsize, COLORS, icons } from "../../../../constants";
import { NavigationContainer } from "@react-navigation/native";
import amountFormatter from "../../../../utils/formatMoney";
import Globalmodal from "../../../shared/Globalmodal/Globalmodal";
import Customstatusbar from "../../../shared/Customstatusbar";
import { AuthContext } from "../../../../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";
import useCustomModal from "../../../../utils/useCustomModal";
import { sendEmail } from "../../../../utils/emailSender";


const { Copyclipboard, Sharereceipt, Downloadreceipt, Reporttransactions, Detailsmoreicon, Arrowin, Arrowout } =
  icons;

const Transactiondetails = ({ navigation, route }) => {
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const {CustomModal: TransactiondetailsModal, openModal: openTransactiondetailsModal} = useCustomModal()
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
    charges,
    direction,
    bankDetails
  } = data;
  const total = Number(amount)+Number(charges)
  const isDebit = direction === "out"
  const Arrow = direction === "in" ? <Arrowin /> : <Arrowout />;

  console.log(data, "here is the");
  

  const dt = moment(dateTime);
  const formatDateTime = `${dt.format("ddd")}.  ${dt.format("Do")} ${dt.format(
    "MMMM"
  )}, ${dt.format("YYYY")}`;

  // useEffect(() => {
  //   console.log(data, "Transaction details");
  // });

  const nameSplitter = (name: string) => {
    const splitName = name?.split(" ");

    if (splitName.length > 2) {
      return `${splitName[0][0]}${splitName[1][0]}`;
    } else {
      return `${splitName[0][0]}${splitName[1][0]}`;
    }
  };

  const copyToClipboard = (copiedTest: string) => {
    Clipboard.setString(copiedTest);
  };

  const subscription = Clipboard.addClipboardListener(
    ({ content }: ClipboardEvent) => {
      setCopied(true);
 
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

  const showUserImageOnReceipt = () => {
      if(user.imageUrl !== null){
        return `
        <div style="min-width: 62px; min-height: 62px; border-radius: 32px; display: flex; justify-content: center; align-items: center; color: white; font-weight: bold">
        <img src="${user.imageUrl}" style="width: 62px; height: 62px; border-radius: 32px"  />
        </div>
        `
      }
      else{
        return `
          <img class="user__image" src="https://res.cloudinary.com/gyroscope/image/upload/v1648035185/62x62_feather_dibyrp.svg" />
        `
      }




  }
  const showImageOnReceipt = (name: string, title: string, sender?: string) => {
    const targetLogo = bankLogo.filter((logo) => logo.name === sender);
    switch (title) {
      case "funding":
        return `
        <div style="min-width: 62px; min-height: 62px; border-radius: 32px; background: #001757; display: flex; justify-content: center; align-items: center;">
          <img src="${assetsDB["fund"]["paystack"]}" style="width: 25px; height: 25px" />
        </div>
        
        `;
        break;
      case "Fund Reversal":
        return `
          <div style="min-width: 62px; min-height: 62px; border-radius: 32px; background: #001757; display: flex; justify-content: center; align-items: center;">
            <img src="${assetsDB["fund"]["paystack"]}" style="width: 25px; height: 25px" />
          </div>
          
          `;
        break;
        case "Utility Payment":
          return `
            <div style="min-width: 62px; min-height: 62px; border-radius: 32px; display: flex; justify-content: center; align-items: center;">
              <img src="${assetsDB["others"]["utility"]}" style="width: 62px; height: 62px" />
            </div>
            
            `;
          break;
      // assetsDB["bills"][sender]
      case "Airtime Purchase":
        const networkType = sender?.toUpperCase();
        return `
          <div style="min-width: 62px; min-height: 62px; border-radius: 32px;  display: flex; justify-content: center; align-items: center;">
            <img src="${assetsDB["bills"][networkType]}" style="width: 50px; height: 50px" />
          </div>
          
          `;
        break;
      case "withdrawal":
        return `
            <div style="min-width: 62px; min-height: 62px; border-radius: 32px;  display: flex; justify-content: center; align-items: center;">
              <img src="${targetLogo[0]["image"]}" style="width: 50px; height: 50px" />
            </div>
            
            `;
        break;
      case "Wallet Debit":
      case "Wallet Credit":
        if (sender === "Bonus") {
          return `
        <div style="min-width: 62px; min-height: 62px; border-radius: 32px; display: flex; justify-content: center; align-items: center; color: white; font-weight: bold">
        <img src="${assetsDB["others"]["bonus"]}" style="width: 50px; height: 50px" />
        </div>
        `;
        } else {
          if(otherUser.imageUrl !== null){
            return `
            <div style="min-width: 62px; min-height: 62px; border-radius: 32px; display: flex; justify-content: center; align-items: center; color: white; font-weight: bold">
              <img src="${otherUser.imageUrl}" style="width: 62px; height: 62px; border-radius: 32px"  />
            </div>
            
            `
          }
          return `
        <div style="min-width: 62px; min-height: 62px; border-radius: 32px; background: #7600FF;display: flex; justify-content: center; align-items: center; color: white; font-weight: bold">
        ${nameSplitter(otherUser ? otherUser.fullName : "Feather Africa Inc")}
        </div>
        `;
        }

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
        if (sender === "Bonus") {
          return { senderName: sender, receiverName: receiver };
        } else {
          return {
            senderName: otherUser.fullName,
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
         ${showUserImageOnReceipt()}
        <div class="dashed__line"></div>
        <img class="checked__icon" src="https://res.cloudinary.com/gyroscope/image/upload/v1648035323/greenyy_exqzbx.svg" />
        ${showImageOnReceipt(
          user.fullName,
          title,
          title === "withdrawal" ? receiver : sender
        )}
    </div>
    </div>


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
          <span class="item__right total">NGN ${amountFormatter(total)}</span>
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


  const RightComponent = ({onpress}) => {
    return (
      <TouchableOpacity onPress={onpress} style={{  paddingHorizontal: 10, height: "100%",}}>
        <Detailsmoreicon />
      </TouchableOpacity>
    )
  }


  const Eachoption = ({title, value}) => {
    return(
      <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
            <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.grey16, textTransform: "capitalize"}}>{title}</Text>
            <Text style={{...fontsize.small, ...FONTS.regular, color: COLORS.blue9, textTransform: "capitalize"}}>{value}</Text>
      </View>
    )
  }



  const FeatherTransferDetails = () => {
    if((title === "Wallet Credit" || title === "Wallet Debit") ){
      const senderName = direction === "in" ? otherUser.fullName : user.fullName
      const receiverName = direction === "out" ? otherUser.fullName : user.fullName
      return(
        <>
          <Eachoption title="Sender Name" value={senderName}/>  
          <Horizontaline marginV={18}/>
          <Eachoption title="Receiver Name" value={receiverName}/>  
          <Horizontaline marginV={18}/>
        </>
      )
      
    }
  }


  const BankTransferDetails = () => {
    if(bankDetails){
      return(
        <>
          <Eachoption title="Account Number" value={bankDetails.account_number}/>  
          <Horizontaline marginV={18}/>
          <Eachoption title="Account Name" value={bankDetails.account_name}/>  
          <Horizontaline marginV={18}/>
          <Eachoption title="Bank" value={bankDetails.bank_name}/>
          <Horizontaline marginV={18}/>
        </>
      )
      
    }
  }


  // const {price } = route?.params
  return (
    <Mainwrapper >


      {/* More info about transaction */}
      <TransactiondetailsModal
        // showState={showModal}
        // onBgPress={() => setShowModal(!showModal)}
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
      </TransactiondetailsModal>

      <Backheader title="Transaction Details" rightComponent={<RightComponent onpress={openTransactiondetailsModal}/>}/>

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >

      <View style={{justifyContent: "center", alignItems: "center", marginBottom: 20}}>
      <View style={{backgroundColor: COLORS.white, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 25}}>
        <Text style={{...fontsize.xsmallest, ...FONTS.medium, color: COLORS.blue9}}>{formatDateTime}</Text>
      </View>
      </View>


        {/* Header section showing ref and receiver image */}
        <View
          style={{
            justifyContent: "center",
            // alignItems: "center",
            backgroundColor: COLORS.white,
            padding: 16,
            paddingBottom: 30,
            borderRadius: 15
          }}
        >

          <View style={{flexDirection: "row", alignItems: "center", justifyContent: 'space-between', flex: 1}}>
              <Sendingandreceive
                user={user}
                otherUser={otherUser}
                senderName={typeOfName(title)?.senderName}
                receiverName={typeOfName(title)?.receiverName}
                title={title}
                value={(title === "withdrawal" || title === "Funds Transfer")  ? receiver : sender}
              />

              <View style={{flexDirection: "row", alignItems: "center"}}>
                <View style={{backgroundColor: isDebit ? COLORS.red2 : COLORS.green3, paddingHorizontal: 16, paddingVertical: 8, borderRadius: 18}}>
                  <Text style={{...fontsize.xsmallest, ...FONTS.medium, color: isDebit ? COLORS.red4 : COLORS.green2}}>{isDebit ? "Debit": "Credit"}</Text>
                </View>
                <View style={{width: 28, height: 28, backgroundColor: isDebit ? COLORS.red2 : COLORS.green3, borderRadius: 28/2, justifyContent: "center", alignItems: "center", marginLeft: 6.5}}>
                  {/* icons */}
                  {Arrow}
                </View>
              </View>
          </View>

          <View style={{alignItems: "center"}}>
            <View style={{alignItems: "center"}}>
              <Text style={{...fontsize.smaller, ...FONTS.regular}}>Transaction Ref.</Text>
              <Text style={{...fontsize.xmedium,...FONTS.bold, lineHeight: 39, color: COLORS.blue7, marginTop: 16, marginBottom: 8, textTransform: "uppercase" }}>{transactionRef}</Text>
              <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.grey16}}>Tap to copy reference number</Text>
            </View>
          </View>
          
        </View>



          <View style={{marginTop: 10, backgroundColor: COLORS.white, paddingHorizontal: 18, paddingVertical: 30, borderRadius: 15}}>

              <Eachoption title="Transaction Type" value={title}/>  
              <Horizontaline marginV={18}/>
              {FeatherTransferDetails()}
              {BankTransferDetails()}
              <Eachoption title="Amount" value={ `N${amountFormatter(amount)}`}/>  
              <Horizontaline marginV={18}/>
              <Eachoption title="Transaction Charges" value={ `N${amountFormatter(charges)}`}/>  
              <Horizontaline marginV={18}/>
              <Eachoption title="Total" value={ `N${amountFormatter(total)}`}/>  
              
              


          </View>




        {/* The details container */}

        {/* <View style={{ justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{...fontsize.bsmall, ...FONTS.regular, marginBottom: 16}}>Transaction Ref.</Text>
        <Text style={{...fontsize.bmedium, ...FONTS.bold, color: COLORS.blue7, textTransform: "uppercase"}}>{transactionRef} </Text>
        </View> */}

          {/* <View style={{marginTop: 62, marginBottom: 52}}>
        <View style={{flexDirection: 'row',  justifyContent: "space-between"}}>
          <Text style={{...fontsize.small, ...FONTS.regular, color: COLORS.blue9}}>Receiver</Text>
          <Text style={{...fontsize.small, ...FONTS.bold, color: COLORS.blue9, textTransform: "capitalize"}}>{typeOfName(title)?.receiverName}</Text>
        </View>

        <Horizontaline marginV={22}/>


        <View style={{flexDirection: 'row',  justifyContent: "space-between"}}>
          <Text style={{...fontsize.small, ...FONTS.regular, color: COLORS.blue9}}>Amount</Text>
          <Text style={{...fontsize.small, ...FONTS.bold, color: COLORS.blue9}}>NGN {amountFormatter(amount)}</Text>
        </View>

        <Horizontaline marginV={22}/>


        <View style={{flexDirection: 'row',  justifyContent: "space-between"}}>
          <Text style={{...fontsize.small, ...FONTS.regular, color: COLORS.blue9}}>Transaction Charge</Text>
          <Text style={{...fontsize.small, ...FONTS.bold, color: COLORS.blue9}}>+ NGN {amountFormatter(charges)}</Text>
        </View>

        <Horizontaline marginV={22}/>

        <View style={{flexDirection: 'row',  justifyContent: "space-between"}}>
          <Text style={{...fontsize.small, ...FONTS.regular, color: COLORS.blue9}}>Total</Text>
          <Text style={{...fontsize.small, ...FONTS.bold, color: COLORS.blue6}}>NGN {amountFormatter(total.toString())} </Text>
        </View>
        </View> */}


          {/* <Text style={{textAlign: "center", ...fontsize.small, ...FONTS.regular, color: COLORS.blue9}}
          
          
          >
          If you have an issue with this transaction, 
kindly send a mail with the transaction ref 
to  <Text style={{color: COLORS.blue6}} onPress={() => sendEmail("disputes@feather.africa")}>disputes@feather.africa</Text> 
          </Text> */}




          {/* <View style={styles.eachDetailContainer}>
            <Text style={styles.eachDetailTitle}>Date & Time</Text>
            <Text style={{...fontsize.small, ...FONTS.regular}}>{formatDateTime}</Text>
          </View> */}

          {/* <View
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
          </View> */}

          {/* <View style={styles.eachDetailContainer}>
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
          </View> */}
          {/* <View style={styles.eachDetailContainer}>
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
              <Text style={{ textTransform: "capitalize" }}> Charges</Text>
            </Text>
          </View> */}
      </ScrollView>

      {/* <Bottombtn
        title="VIEW OPTIONS"
        bg="#000"
        onpress={() => setShowModal(true)}
      /> */}
    </Mainwrapper>
  );
};

export default Transactiondetails;
