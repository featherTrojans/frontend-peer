import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { ChatsScreenStyles, ProfileScreenStyles } from '../assets/styles/screens'
import { FTSearchinput, FTTabWrapper, FTTitlepagewrapper } from '../components'
import { navigation } from '../utils'
import { COLORS, icons } from '../constants'

const {Startnewchaticon} = icons
const {} = ChatsScreenStyles
const {profileHeaderWrap, profileHeaderText} = ProfileScreenStyles

const ChatsScreen = () => {
  return (
    <FTTabWrapper>
      <View style={profileHeaderWrap}>
        <Text style={profileHeaderText}>Conversations</Text>
        <View>
          <Startnewchaticon />
        </View>
      </View>

      <FTSearchinput 
      placeholder="Type to search chat"
      bG={COLORS.blue20}
      />
      
    </FTTabWrapper>
  )
}

export default ChatsScreen

const styles = StyleSheet.create({})