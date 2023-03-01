import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import MapView from "react-native-maps";
import LottieView from "lottie-react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import LoadingOptions from "../../../assets/Lottie/animations/loadingRequest.json";
import { COLORS, FONTS, fontsize, icons } from "../../../constants";
import { withdrawstyles } from "./Withdrawal.styles";

const { Merchanticon, Phoneicon, Withdrawchaticon, Cancelwithdrawicon } = icons;

const optionactions = [
  {
    title: "Merchant Info",
    Icon: Merchanticon,
  },
  {
    title: "Phone",
    Icon: Phoneicon,
  },
  {
    title: "Chat",
    Icon: Withdrawchaticon,
  },
  {
    title: "Cancel",
    Icon: Cancelwithdrawicon,
  },
];

const Withdrawlisting = () => {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <View style={{ flex: 1 }}>
      <MapView style={{ flex: 1 }} />

      {loading ? (
        <View style={withdrawstyles.loadingListingWrap}>
          <LottieView
            autoPlay
            source={LoadingOptions}
            style={{ width: "100%" }}
          />
          <Text style={withdrawstyles.loadingListingInfo}>
            Please be patient while we find peers, businesses and agents around
            you to fulfil your request.
          </Text>
        </View>
      ) : (
        <BottomSheet
          index={0}
          snapPoints={["40%", "50%"]}
          style={{ paddingHorizontal: 15 }}
        >
          <View style={{}}>
            <Text style={withdrawstyles.durationAway}>2 Mins Away</Text>

            <View style={withdrawstyles.listInfoWrap}>
              <View style={withdrawstyles.listUserBg}>
                {/* user dp icons */}
              </View>
              <View style={{ marginLeft: 16 }}>
                <Text style={withdrawstyles.listUserFullname}>
                  Mayowa Adekoya
                </Text>
                <Text style={withdrawstyles.noOfTransaction}>
                  33 Transactions
                </Text>
              </View>
            </View>

            <View
              style={{
                height: 53,
                backgroundColor: COLORS.lightgray,
                marginTop: 20,
              }}
            ></View>

            <View style={withdrawstyles.listActionWrap}>
              {optionactions.map(({ title, Icon }, index) => {
                return (
                  <View style={{ alignItems: "center" }} key={index}>
                    <View style={withdrawstyles.listActionBg}>
                      <Icon />
                    </View>
                    <Text style={withdrawstyles.listActionTitle}>{title}</Text>
                  </View>
                );
              })}
            </View>
            <View></View>
          </View>
        </BottomSheet>
      )}
    </View>
  );
};

export default Withdrawlisting;

const styles = StyleSheet.create({});
