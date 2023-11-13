import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback } from "react";
import { images } from "../constants";
import { HomeScreenStyles } from "../assets/styles/screens";

const { scrollaction, scrollActionImage, scrollactionText } = HomeScreenStyles;

const { Transferimage, Withdrawimage, Billsimage } = images;

const scrollactions = [
  {
    bg: "#EDF3EB",
    text: "Withdraw cash from business and agents near you.",
    image: Withdrawimage,
    modal: 3,
  },
  {
    bg: "#F3EEFB",
    text: "Transfer money to feather users and bank accounts.",
    image: Transferimage,
    modal: 2,
  },
  {
    bg: "#D2EAFD",
    text: "Pay Bills with speed and ease, at good rates.",
    image: Billsimage,
    modal: 4,
  },
];

const FTQuickactions = ({ onpress }) => {

  
  console.log("Quick action rerendeing");

  const renderEachScrollaction = useCallback(({ item, index }) => {
    let { bg, text, image, modal } = item;
    let isLast = index + 1 === scrollactions.length;
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => onpress(modal)}>
        <View
          style={[
            scrollaction,
            { backgroundColor: bg, marginRight: !isLast ? 16 : 0 },
          ]}
        >
          <Image
            style={scrollActionImage}
            source={image}
            defaultSource={image}
          />
          <Text style={scrollactionText}>{text}</Text>
        </View>
      </TouchableOpacity>
    );
  }, []);

  return (
    <FlatList
      data={scrollactions}
      renderItem={renderEachScrollaction}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ marginVertical: 15, paddingHorizontal: 15 }}
    />
  );
};

export default FTQuickactions;

const styles = StyleSheet.create({});
