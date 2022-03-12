import { StyleSheet, Text, View, Alert, TouchableOpacity, Button } from 'react-native'
import React, {useState} from 'react'
import { makePhoneCall, sendMessage } from '../utils/userDeviceFunctions';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';


const Testings = () => {

  async function download2() {
    const fileUrl = 'https://res.cloudinary.com/gyroscope/image/upload/v1607166530/hau3vqkefftkhdaric0b.png';
    const fileName = `${Date.now()}.png`;

    FileSystem.downloadAsync(fileUrl, FileSystem.documentDirectory + fileName)
      .then(({ uri }) => {
        Alert.alert('Finished downloading to ', uri);
        saveFile(uri);
      })
      .catch((error) => {
        console.error(error);
      });
  }


  async function saveFile(filePath) {
    const albumName = 'Feather';
    const permission = await MediaLibrary.requestPermissionsAsync();

    let asset = null;
    if (permission.granted) {
      try {
        asset = await MediaLibrary.createAssetAsync(filePath);
      } catch (e) {
        console.error('MediaLibrary.createAssetAsync failed', e);
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
          const assetResult = await MediaLibrary.getAssetsAsync({
            first: 1,
            album,
            sortBy: MediaLibrary.SortBy.creationTime,
          });
          asset = await assetResult.assets[0];
        } catch (e) {
          console.error(' failed', e);
        }
      } else {
        console.error('unable to use MediaLibrary, can not create assets');
      }
    }
  }




  return (
    <View style={styles.container}>
      <Button title="Download invoice & print" onPress={download2}></Button>
    </View>
  )
}

export default Testings

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 40,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
})
