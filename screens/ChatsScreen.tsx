import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  ChatsScreenStyles,
  ProfileScreenStyles,
} from "../assets/styles/screens";
import {
  FTChatList,
  FTLoader,
  FTSearchinput,
  FTTabWrapper,
} from "../components";
import { COLORS, icons } from "../constants";
import useChats from "../hooks/useChats";
import { useNavigation } from "@react-navigation/native";

const { Startnewchaticon } = icons;
const {} = ChatsScreenStyles;
const { profileHeaderWrap, profileHeaderText } = ProfileScreenStyles;

const ChatsScreen = () => {
  const { allchatdata, loading } = useChats();
  const navigation = useNavigation();
  const [search, setSearch] = useState("");

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

      <FTSearchinput
        placeholder="Type to search chat"
        bG={COLORS.blue20}
        mB={30}
        mT={30}
        value={search}
        onChange={(val) => setSearch(val)}
      />
      {!loading ? (
        <FTChatList allchatdata={allchatdata} search={search} />
      ) : (
        <ActivityIndicator size="small" color={COLORS.blue9} />
      )}
    </FTTabWrapper>
  );
};

export default ChatsScreen;

const styles = StyleSheet.create({});
