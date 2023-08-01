import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Customstatusbar from '../screens/shared/Customstatusbar';


const FTTabWrapper =({
    children,
    bgColor = "#FFF",
  }: {
    children: any;
    bgColor?: string;
  }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bgColor }} edges={["top"]}>
      <Customstatusbar />
      <View style={{ flex: 1, paddingHorizontal: 15 }}>{children}</View>
    </SafeAreaView>
  )
}

export default FTTabWrapper

const styles = StyleSheet.create({})