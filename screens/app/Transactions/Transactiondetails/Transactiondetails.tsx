import { StyleSheet, Text, View, StatusBar, ScrollView, Platform } from "react-native";
import React, { useEffect, useState } from "react";
import * as Print from "expo-print"
import * as MediaLibrary from "expo-media-library";
import * as Sharing from "expo-sharing";
import * as FileSystem from 'expo-file-system';
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

// Sendingandreceive

const { Copyclipboard, Sharereceipt, Downloadreceipt, Reporttransactions } =
  icons;

const Transactiondetails = ({ navigation, route }) => {
  const [showModal, setShowModal] = useState(false);

  const { data } = route.params;

  const { amount, createdAt: dateTime, from: sender, to: receiver,  transId: transactionRef } = data;

  const dt = moment(dateTime);
  const formatDateTime = `${dt.format("ddd")},  ${dt.format("Do")} ${dt.format(
    "MMM"
  )} '${dt.format("YY")} - ${dt.format("LT")}`;






  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Pdf Content</title>
        <style>
            body {
                font-size: 16px;
                color: rgb(255, 196, 0);
            }

            h1 {
                text-align: center;
            }
        </style>
    </head>
    <body>
        <h1>Hello, Welcome to Feather!</h1>
    </body>
    </html>
`;

const shareReceipt = async (html) => {
  setShowModal(!showModal)
  const { uri } = await Print.printToFileAsync({ html });
  Sharing.shareAsync(uri)

}

const createAndSavePDF = async (html) => {
  try {
    const { uri } = await Print.printToFileAsync({ html });
    if (Platform.OS === "ios") {
      await Sharing.shareAsync(uri);
    } else {
      const permission = await MediaLibrary.requestPermissionsAsync();

      if (permission.granted) {
        console.log(uri)
      //  const localuri = await FileSystem.downloadAsync("http://gahp.net/wp-content/uploads/2017/09/sample.pdf", FileSystem.documentDirectory + "sample.pdf")
      //   const asset = await MediaLibrary.createAssetAsync(localuri.toString())
      // const album = await MediaLibrary.createAlbumAsync("Feather", asset);
      }
    }

  } catch (error) {
    console.error(error);
  }
};





  const reportTransaction = () => {
    setShowModal(false)
    navigation.navigate("Transactiondispute")
  }

  // const {price } = route?.params
  return (
    <View style={styles.container}>
      <StatusBar />

      <Globalmodal
        showState={showModal}
        onBgPress={() => setShowModal(!showModal)}
      >
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
          onpress={() => createAndSavePDF(htmlContent)}
        />
        <Iconwithdatas
          icon={<Reporttransactions />}
          iconBg="#001757"
          title="Report Transaction"
          details="Have issues with this transaction?"
          onpress={() => reportTransaction()}
        />
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
          <Sendingandreceive />
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
                <View style={styles.copyClipboardContainer}>
                  <Copyclipboard />
                  <Text style={styles.copyClipboardText}>Copy</Text>
                </View>
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
            <Text style={styles.eachDetailValue}>{receiver}</Text>
          </View>

          <View style={styles.eachDetailContainer}>
            <Text style={styles.eachDetailTitle}>Sender</Text>
            <Text style={styles.eachDetailValue}>{sender}</Text>
          </View>
          <View style={styles.eachDetailContainer}>
            <View style={styles.eachDetailContainer}>
              <Text style={styles.eachDetailTitle}>Meetup Point</Text>
              <Text style={styles.eachDetailValue}>
                Eric Moore, Ebutte Meta, Lagos
              </Text>
            </View>
            <Text style={styles.eachDetailTitle}>Total Amount</Text>
            <Text
              style={[styles.eachDetailValue, { textTransform: "uppercase" }]}
            >
              NGN {amountFormatter(amount)} + NGN 0.00 <Text style={{textTransform: 'capitalize'}}>Charges</Text>
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
