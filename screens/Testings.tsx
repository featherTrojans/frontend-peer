import {
  StyleSheet,
  Text,
  View,
  Alert,
  TouchableOpacity,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import { makePhoneCall, sendMessage } from "../utils/userDeviceFunctions";
import * as FileSystem from "expo-file-system";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import * as MediaLibrary from "expo-media-library";
import { usePushNotification } from "../navigation";
// usePushNotification

const Testings = () => {
  const { sendPushNotification, expoPushToken } = usePushNotification();

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
    const { uri } = await Print.printToFileAsync({ html });
    if (uri) {
      saveFile(uri);
      // Alert("Download Complete,", uri, "Here is the URI");
    }
  };

  // async function download2() {
  //   const fileUrl =
  //     "https://res.cloudinary.com/gyroscope/image/upload/v1607166530/hau3vqkefftkhdaric0b.png";
  //   const fileName = `${Date.now()}.png`;

  //   FileSystem.downloadAsync(fileUrl, FileSystem.documentDirectory + fileName)
  //     .then(({ uri }) => {
  //       saveFile(uri); // This saves it to the users device
  //       console.log(uri);
  //       Alert.alert("Finished downloading to ", uri);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // }

  async function saveFile(filePath) {
    const albumName = "Downloads";
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
  }

  return (
    <View style={styles.container}>
      <Button
        title="Download invoice & print"
        onPress={() => shareReceipt(htmlContent)}
      ></Button>
    </View>
  );
};

export default Testings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: 40,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
