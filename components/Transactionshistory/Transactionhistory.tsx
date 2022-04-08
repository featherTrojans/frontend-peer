import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { Shadow } from "react-native-shadow-2";
import { COLORS, FONTS, fontsize, icons } from "../../constants";
import { styles } from "./Transactionhistory.styles";
import { useNavigation } from "@react-navigation/native";
import amountFormatter from "../../utils/formatMoney";
import { customNavigation } from "../../utils/customNavigation";
import { assetsDB, bankLogo } from "../../assetdatas";
import { RFValue } from "react-native-responsive-fontsize";

const { Arrowin, Arrowout, Bonusicon } = icons;

const History = ({ data }) => {
  // const navigation = useNavigation()
  const { direction, description, to, amount, from, title } = data;

  // useEffect(()=>{

  // },[]);

  const priceColor = direction === "in" ? COLORS.green1 : COLORS.pink1;
  const circleColor = direction === "in" ? COLORS.green2 : COLORS.pink1;
  const transactionType = direction === "in" ? "From" : "To";
  const transactionValue = direction === "in" ? from : to;
  const amountSign = direction === "in" ? "+" : "-";
  const Arrow = direction === "in" ? <Arrowin /> : <Arrowout />;
  const networkType = from.toUpperCase();

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
          <View style={[styles.arrowBg, { borderRadius: RFValue(30) }]}>
            <Image
              source={{ uri: assetsDB["bills"][networkType] }}
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
        return (
          <View style={styles.arrowBg}>
            <Image
              source={{ uri: targetLogo[0]["image"] }}
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
      case "Wallet Credit":
        if (transactionValue === "Bonus") {

          return (
            <View style={[styles.arrowBg ]}>
              <Bonusicon />
            </View>
          );
        } else {
          return (
            <View style={[styles.arrowBg, { backgroundColor: circleColor }]}>
              {Arrow}
            </View>
          );
        }

        break;

      default:
        return (
          <View style={[styles.arrowBg, { backgroundColor: circleColor }]}>
            {Arrow}
          </View>
        );
        break;
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.historyContainer}
      onPress={() => customNavigation("Transactiondetails", { data: data })}
    >
      <View style={styles.historyDetailsContainer}>
        {transactionBadge()}

        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.transactionType}>
            {transactionType} : {isUser(title)}
          </Text>
        </View>
      </View>
      <View>
        <Text style={[styles.amount, { color: priceColor }]}>
          {amountSign}N{amountFormatter(amount)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const Transactionhistory = ({ datas, date }: { datas: []; date: string }) => {
  return (
    <View style={styles.container}>
      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>{date}</Text>
      </View>
      {datas.map((data, index) => {
        return (
          <View key={index}>
            <History data={data} />
            {index + 1 !== datas.length && <View style={styles.bottomLine} />}
          </View>
        );
      })}
    </View>
  );
};

export default Transactionhistory;
