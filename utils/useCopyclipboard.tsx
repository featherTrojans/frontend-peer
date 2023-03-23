
import * as Clipboard from "expo-clipboard";
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import useAlert from "./useAlerts";




const useCopyclipboard = (alertText: string) => {


  const {successAlert} = useAlert()

  const copyToClipboard = (copiedTest: string) => {
    Clipboard.setString(copiedTest);
  };

 

  return {
    copyToClipboard
  }
}

export default useCopyclipboard

