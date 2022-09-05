
import * as Clipboard from "expo-clipboard";
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import useAlert from "./useAlerts";




const useCopyclipboard = (alertText: string) => {


  const {successAlert} = useAlert()

  const copyToClipboard = (copiedTest: string) => {
    Clipboard.setString(copiedTest);
  };

  const subscription = Clipboard.addClipboardListener(
    ({ content }: ClipboardEvent) => {
    //   setCopied(true);
      successAlert(alertText, true)
    }
  );
  Clipboard.removeClipboardListener(subscription);

  return {
    copyToClipboard
  }
}

export default useCopyclipboard

