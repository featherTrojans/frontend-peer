import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  Platform,
  TouchableOpacity,
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

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Feather Transactions</title>
        <style>
            body {
                font-size: 16px;
            }

            h1 {
                text-align: center,
                color: "red"
            }
            p{
              font-size: 16px, 
              color: "black", 
              text-align: center
            }
            div{
              max-width: 225px, width: "100%",display: "flex", justify-content: "space-between", align-items: "center"
            }
        </style>
    </head>
    <body>
    
        <img
      src="https://res.cloudinary.com/gyroscope/image/upload/v1647941538/feather-transaction_qeslnn.svg" style={{max-width: 106px, width: "100%", object-fit: "cover"}}/>

      <h1 >Transaction Summary</h1>

      <div>
            
            <div style={{width: 62px, height: 62px, border-radius: 32px, background-color: #707070, padding: 20px}}>1</div>
            <div style={{width: 62px, height: 62px, border-radius: 32px, background-color: #707070}}>2</div>
            
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
            senderName={user?.fullName}
            receiverName={otherUser?.fullName}
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
              {receiver} - {user?.fullName}
            </Text>
          </View>

          <View style={styles.eachDetailContainer}>
            <Text style={styles.eachDetailTitle}>Sender</Text>
            <Text style={styles.eachDetailValue}>
              {sender} - {otherUser && otherUser.fullName}
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
