import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Animated,
  } from "react-native";
  import React from "react";
  import { COLORS, FONTS, fontsize, icons, SIZES } from "../../constants";
  import { withdrawstyles } from "../app/Withdraws/Withdraw/Withdraw.styles";

  const {
    Acceptedcheck
  } = icons;


const Requestuser = ({
    details,
    accepted = false,
  }: {
    details: any;
    accepted?: boolean;
  }) => {
    const { name } = details;
    return (
      <View style={withdrawstyles.requesteeprofilewrap}>
        <View style={[withdrawstyles.requesteeprofilewrap]}>
          <View style={withdrawstyles.requesteeinitialsbg}>
            <Text style={withdrawstyles.requesteeinitialtext}>D</Text>

            {accepted && (
              <View style={{ position: "absolute", bottom: -3, right: 0 }}>
                <Acceptedcheck />
              </View>
            )}
          </View>

          <View style={{ marginLeft: 12 }}>
            <Text style={withdrawstyles.requesteename}>{name}</Text>
            <Text style={withdrawstyles.requesteedistance}>12 Mins Away</Text>
          </View>
        </View>

        <Text style={withdrawstyles.requestedamount}>N23,000</Text>
      </View>
    );
  };


  export default Requestuser