import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS, FONTS, fontsize, icons } from "../constants";
import amountFormatter from "../utils/formatMoney";
import { customNavigation } from "../utils/customNavigation";
import { assetsDB, bankLogo } from "../assetdatas";
import { RFValue } from "react-native-responsive-fontsize";
import * as Animatable from "react-native-animatable";
import { FTTransactionhistoryStyles } from "../assets/styles/components";
// import { navigation } from "../utils";
import { useNavigation } from '@react-navigation/native';
import FTIconwithbg from "./FTIconwithbg";
import { FTHorizontaline } from ".";
const {
  container,
  dateText,
  bottomLine,
  historyContainer,
  historyDetailsContainer,
  arrowBg,
  titleText,
  transactionTypeText,
  amountText,
} = FTTransactionhistoryStyles;


const { Arrowin, Arrowout, Bonusicon, Utilitypayment, Utilitylarge } = icons;

const History = ({ data }) => {
  const {
    direction,
    description,
    to,
    amount,
    from,
    title,
    trans_type,
    otherUser,
  } = data;
  const isCredit = direction === "in"
  const priceColor = isCredit ? COLORS.green1 : COLORS.pink1;
  const circleColor = isCredit ? COLORS.green3 : COLORS.red2;
  const transactionType = isCredit ? "From" : "To";
  const transactionValue = isCredit ? from : to;
  const amountSign = isCredit ? "+" : "-";
  const Arrow = isCredit ? Arrowin : Arrowout;
  const networkType = from.toUpperCase();
  const isEtisalat = networkType === "9MOBILE";
  const navigation = useNavigation();



  
  const isUser = (title: string) => {
    const capital = title;

    if (trans_type === "Feather2Feather") {
      return (
        <Text style={{ textTransform: "capitalize" }}>
          {" "}
          {otherUser ? otherUser.fullName: "Fe Fe"} - @
          <Text style={{ textTransform: "lowercase" }}>{transactionValue}</Text>
        </Text>
      );
    } else {
      return (
        <Text style={{ textTransform: "capitalize" }}>{transactionValue}</Text>
      );
    }
  };

  const transactionBadge = () => {
    switch (title) {
      case "Airtime Purchase":
        let airtimeLogo = isEtisalat
          ? assetsDB["bills"]["ETISALAT"]
          : assetsDB["bills"][networkType];
        return <FTIconwithbg imageUrl={airtimeLogo} bG="" size={31} />;
        break;

      case "withdrawal":
        const targetLogo = bankLogo.filter((logo) => logo.name === to);
        return (
          <FTIconwithbg imageUrl={targetLogo[0]["image"]} bG="" size={31} />
        );
        break;

      case "Funds Transfer":
        const targetlogo = bankLogo.filter((logo) => logo.name === to);
        return (
          <FTIconwithbg imageUrl={targetlogo[0]["image"]} bG="" size={31} />
        );
        break;
      case "Utility Payment":
        return (
          <View style={arrowBg}>
            <Utilitypayment />
          </View>
        );
        break;
      case "Wallet Credit":
        if (transactionValue === "Bonus") {
          return (
            <View style={[arrowBg]}>
              <Bonusicon />
            </View>
          );
        } else {
          return <FTIconwithbg Icon={Arrow} bG={circleColor} size={31} />;
        }
        break;

      default:
        return <FTIconwithbg Icon={Arrow} bG={circleColor} size={31} />;
        break;
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={historyContainer}
      onPress={() =>
        navigation.navigate("transacttiondetails_screen", { data: data })
      }
    >
      <View style={historyDetailsContainer}>
        {transactionBadge()}
        <View style={{ flex: 1, marginLeft: 14 }}>
          <View style={historyContainer}>
            <Text style={titleText}>{title}</Text>
            <Text style={[amountText, { color: priceColor }]}>
              {amountSign}N{amountFormatter(amount)}
            </Text>
          </View>
          <Text style={transactionTypeText}>
            {transactionType} : {isUser(title)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Transactionhistory = ({
  datas,
  date,
  index,
}: {
  datas: [];
  date: string;
  index: number;
}) => {

  
  return (
    <Animatable.View
      animation="slideInUp"
      delay={index * 100}
      style={[container]}
    >
      <Text style={dateText}>{date}</Text>
      {datas.map((data, index) => {
        return (
          <Animatable.View animation="slideInUp" delay={index * 50} key={index}>
            <History data={data} />
            {index + 1 !== datas.length && <FTHorizontaline marginV={12} />}
          </Animatable.View>
        );
      })}
    </Animatable.View>
  );
};

export default Transactionhistory;
