import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { COLORS, FONTS, fontsize, icons } from "../constants";
import { useNavigation } from "@react-navigation/native";
import amountFormatter from "../utils/formatMoney";
import { customNavigation } from "../utils/customNavigation";
import { assetsDB, bankLogo } from "../assetdatas";
import { RFValue } from "react-native-responsive-fontsize";
import * as Animatable from "react-native-animatable";
import { FTTransactionhistoryStyles } from "../assets/styles/components";
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
  const { direction, description, to, amount, from, title } = data;

  const priceColor = direction === "in" ? COLORS.green1 : COLORS.pink1;
  const circleColor = direction === "in" ? COLORS.green3 : COLORS.red2;
  const transactionType = direction === "in" ? "From" : "To";
  const transactionValue = direction === "in" ? from : to;
  const amountSign = direction === "in" ? "+" : "-";
  const Arrow = direction === "in" ? <Arrowin /> : <Arrowout />;
  const networkType = from.toUpperCase();
  const isEtisalat = networkType === "9MOBILE";

  const isUser = (title: string) => {
    const capital = title;

    if (
      (capital === "Wallet Credit" || capital === "Wallet Debit") &&
      transactionValue.toUpperCase() !== "BONUS"
    ) {
      return (
        <Text>
          @
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
        return (
          <View style={[arrowBg, { borderRadius: RFValue(30) }]}>
            <Image
              source={{
                uri: isEtisalat
                  ? assetsDB["bills"]["ETISALAT"]
                  : assetsDB["bills"][networkType],
              }}
              resizeMode="cover"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: RFValue(62 / 2),
              }}
            />
          </View>
        );
        break;

      case "withdrawal":
        const targetLogo = bankLogo.filter((logo) => logo.name === to);
        const isGt = to === "Guaranty Trust Bank";
        const isFcmb = to === "First City Monument Bank";
        return (
          <View style={arrowBg}>
            <Image
              source={{ uri: targetLogo[0]["image"] }}
              resizeMode={isGt || isFcmb ? "cover" : "contain"}
              resizeMethod="scale"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: RFValue(62 / 2),
              }}
            />
          </View>
        );
        break;

      case "Funds Transfer":
        const targetlogo = bankLogo.filter((logo) => logo.name === to);
        const isGtb = to === "Guaranty Trust Bank";
        const isFcmbc = to === "First City Monument Bank";
        return (
          <View style={arrowBg}>
            <Image
              source={{ uri: targetlogo[0]["image"] }}
              resizeMode={isGtb || isFcmbc ? "cover" : "contain"}
              resizeMethod="scale"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: RFValue(62 / 2),
              }}
            />
          </View>
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
          return (
            <View
              style={[
                arrowBg,
                { backgroundColor: circleColor, borderRadius: 39 / 2 },
              ]}
            >
              {Arrow}
            </View>
          );
        }
        break;

      default:
        return (
          <View
            style={[
              arrowBg,
              { backgroundColor: circleColor, borderRadius: 39 / 2 },
            ]}
          >
            {Arrow}
          </View>
        );
        break;
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={historyContainer}
      onPress={() => customNavigation("Transactiondetails", { data: data })}
    >
      <View style={historyDetailsContainer}>
        {/* {transactionBadge()} */}
        <View>
          
        </View>

        <View>
          <Text style={title}>{title}</Text>
          <Text style={transactionTypeText}>
            {transactionType} : {isUser(title)}
          </Text>
        </View>
      </View>

      <View>
        <Text style={[amount, { color: priceColor }]}>
          {amountSign}N{amountFormatter(amount)}
        </Text>
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
      style={container}
    >
      <Text style={dateText}>{date}</Text>
      {datas.map((data, index) => {
        return (
          <Animatable.View animation="slideInUp" delay={index * 50} key={index}>
            <History data={data} />
            {index + 1 !== datas.length && <View style={bottomLine} />}
          </Animatable.View>
        );
      })}
    </Animatable.View>
  );
};

export default Transactionhistory;
