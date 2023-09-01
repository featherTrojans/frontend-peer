import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import {
  ChatsScreenStyles,
  ProfileScreenStyles,
} from "../assets/styles/screens";
import { FTChatList, FTTabWrapper } from "../components";
import { navigation } from "../utils";
import { icons } from "../constants";
import { AuthContext } from "../context/AuthContext";
import useChats from "../hooks/useChats";

const { Startnewchaticon } = icons;
const {} = ChatsScreenStyles;
const { profileHeaderWrap, profileHeaderText } = ProfileScreenStyles;

const ChatsScreen = () => {
  const { authdata } = useContext(AuthContext);
  const authId = authdata?.userDetails?.userUid;
  const { loading, chats, chattwos } = useChats();

  return (
    <FTTabWrapper>
      <View style={profileHeaderWrap}>
        <Text style={profileHeaderText}>Conversations</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("startnewschat_screen");
          }}
        >
          <Startnewchaticon />
        </TouchableOpacity>
      </View>

      <FTChatList chats={chats} chattwos={chattwos} authId={authId} />
    </FTTabWrapper>
  );
};

export default ChatsScreen;

const styles = StyleSheet.create({});
