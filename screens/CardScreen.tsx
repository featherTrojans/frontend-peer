import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CardScreenStyles } from '../assets/styles/screens'
import { FTTabWrapper } from '../components'
import { navigation } from '../utils'



const {} = CardScreenStyles

const CardScreen = () => {
  return (
    <FTTabWrapper>
      <Pressable onPress={() => navigation.navigate("chatsdm_screen")} style={{paddingHorizontal: 20, paddingVertical: 16, backgroundColor: "blue"}}>
        <Text style={{textAlign: "center", color: "white"}}>Click</Text>
      </Pressable>
      <Text>CardScreen</Text>
    </FTTabWrapper>
  )
}

export default CardScreen

const styles = StyleSheet.create({})