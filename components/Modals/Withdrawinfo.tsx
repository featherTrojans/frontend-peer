import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { COLORS, FONTS, fontsize, icons } from "../../constants";
import Custombutton from "../Custombutton/Custombutton";
import { useNavigation } from "@react-navigation/native";
import { nameSplitter } from "../../utils/nameSplitter";
import { LocationContext } from "../../context/LocationContext";
import Horizontaline from "../Horizontaline/Horizontaline";
const { Purplechaticon, Editicon } = icons;

const Withdrawinfo = ({ openNextModal, withdrawInfo, closeModal }) => {
  const { coords } = useContext(LocationContext);
  const navigation = useNavigation();
  return (
    <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
      <View
        style={{
          alignItems: "center",
          marginBottom: 40,
          marginHorizontal: 10,
        }}
      >
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: 48 / 2,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: COLORS.blue9,
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              ...fontsize.bbsmall,
              color: COLORS.white,
              ...FONTS.medium,
            }}
          >
            {nameSplitter(withdrawInfo.fullName)}
          </Text>
        </View>
        <Text
          style={{ ...fontsize.small, ...FONTS.medium, color: COLORS.blue9 }}
        >
          {withdrawInfo.fullName}
        </Text>
        <Text
          style={{
            ...fontsize.smallest,
            ...FONTS.regular,
            color: COLORS.halfBlack,
            marginTop: 7,
          }}
        >
          {withdrawInfo.duration} away
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          marginBottom: 10,
          justifyContent: "space-between",
          // padding: 20,
        }}
      >
        <Text>Amount</Text>
        <Text>{withdrawInfo.amount}</Text>
      </View>
      <Horizontaline marginV={5} />
      <View style={{ marginVertical: 25 }}>
        <Text style={{ marginBottom: 10 }}>
          Total Charge (Base Charge + Your Charge)
        </Text>
        <Text>{withdrawInfo.amount}</Text>
      </View>

      <Text
        style={{
          ...fontsize.smallest,
          color: COLORS.blue9,
          ...FONTS.regular,
          marginBottom: 10,
        }}
      >
        Meetup Point (your comfort/safe zone)
      </Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 25,
        }}
      >
        <View>
          <Text
            style={{
              ...fontsize.smallest,
              color: COLORS.blue9,
              ...FONTS.regular,
            }}
          >
            {coords?.locationText}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            closeModal();
            navigation.navigate("Meetuppoint", withdrawInfo);
          }}
        >
          <Editicon />
        </TouchableOpacity>
      </View>
      <Custombutton btntext="Make Payment" onpress={openNextModal} />
    </View>
  );
};

export default Withdrawinfo;

const styles = StyleSheet.create({});
