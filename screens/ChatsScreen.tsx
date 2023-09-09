import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import {
  ChatsScreenStyles,
  ProfileScreenStyles,
} from "../assets/styles/screens";
import { FTChatList, FTLoader, FTTabWrapper } from "../components";
import { icons } from "../constants";
import useChats from "../hooks/useChats";
import { useNavigation } from "@react-navigation/native";

const { Startnewchaticon } = icons;
const {} = ChatsScreenStyles;
const { profileHeaderWrap, profileHeaderText } = ProfileScreenStyles;

const ChatsScreen = () => {
  const { allchatdata, loading } = useChats();
  const navigation = useNavigation();

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

      <FTLoader loading={loading} />

      <FTChatList allchatdata={allchatdata} />
    </FTTabWrapper>
  );
};

export default ChatsScreen;

const styles = StyleSheet.create({});
