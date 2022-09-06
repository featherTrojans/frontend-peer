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
import amountFormatter from "../../utils/formatMoney";
import { nameSplitter } from "../../utils/nameSplitter";

  const {
    Acceptedcheck
  } = icons;


const Requestuser = ({
    details,
    accepted = false,
    hideAmount = false
  }: {
    details: any;
    accepted?: boolean;
    hideAmount?:boolean
  }) => {
    const { name, duration, amount } = details;
    return (
      <View style={withdrawstyles.requesteeprofilewrap}>
        <View style={[withdrawstyles.requesteeprofilewrap]}>
          <View style={withdrawstyles.requesteeinitialsbg}>
            <Text style={withdrawstyles.requesteeinitialtext}>{nameSplitter(name)}</Text>

            {accepted && (
              <View style={{ position: "absolute", bottom: -3, right: 0 }}>
                <Acceptedcheck />
              </View>
            )}
          </View>

          <View style={{ marginLeft: 12 }}>
            <Text style={withdrawstyles.requesteename}>{name}</Text>
            <Text style={withdrawstyles.requesteedistance}>{duration}</Text>
          </View>
        </View>
              {!hideAmount && <Text style={withdrawstyles.requestedamount}>N{amountFormatter(amount)}</Text>}
        
      </View>
    );
  };


  export default Requestuser