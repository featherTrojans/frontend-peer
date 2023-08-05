import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ChatsScreenStyles } from '../assets/styles/screens'
import { FTTabWrapper, FTTitlepagewrapper } from '../components'
import { navigation } from '../utils'


const {} = ChatsScreenStyles

const ChatsScreen = () => {
  return (
    <FTTabWrapper>
      <Pressable onPress={() => navigation.navigate("chatsdm_screen")} style={{paddingHorizontal: 20, paddingVertical: 16, backgroundColor: "blue"}}>
        <Text style={{textAlign: "center", color: "white"}}>Click</Text>
      </Pressable>
      <Text>ChatsScreen</Text>
    </FTTabWrapper>
  )
}

export default ChatsScreen

const styles = StyleSheet.create({})