import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { HomeScreenStyles } from "../assets/styles/screens";
import { useNavigation } from "@react-navigation/native";
import useChats from "../hooks/useChats";
import { icons } from "../constants";
import { FTHorizontaline, FTOtherImage } from ".";

const { Recentconvicon } = icons;
const { conversationWrap, conversationHeader, recentIconWrap, recentconvText } =
  HomeScreenStyles;
const FTConversations = () => {
  const { allchatdata, loading } = useChats();
  const navigation = useNavigation();

  if (allchatdata.length == 0) return null;

  return (
    <View style={[conversationWrap]}>
      <View style={conversationHeader}>
        <View style={recentIconWrap}>
          <Recentconvicon />
          <Text style={recentconvText}>Recent Chats</Text>
        </View>
        {/* <Text style={numberOfUnread}>You have 3 unreads</Text> */}
      </View>

      <FTHorizontaline marginV={15} />

      {loading ? (
        <View style={{ height: 45 }}>
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          data={allchatdata}
          initialNumToRender={5}
          renderItem={({ item }) => {
            return (
              <View style={{ marginHorizontal: 10 }}>
                <FTOtherImage
                  size={45}
                  imageurl={item?.userInfo?.imageUrl}
                  memojiImage={item?.userInfo?.memoji}
                  fullname={item?.userInfo?.fullName}
                  onpress={() => {
                    navigation.navigate("chatsdm_screen", {
                      userInfo: item?.userInfo,
                    });
                  }}
                />
              </View>
            );
          }}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default FTConversations;

const styles = StyleSheet.create({});
