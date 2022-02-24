import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, FONTS, fontsize, icons } from "../../constants";
import { styles } from "./Transactionhistory.styles";

const { Arrowin, Arrowout } = icons;

const History = ({ data }: any) => {
  const { direction, description, to, amount } = data;

  const priceColor = direction === "in" ? COLORS.green1 : COLORS.pink1;
  const circleColor = direction === "in" ? COLORS.green2 : COLORS.pink1;
  const transactionType = direction === "in" ? "From" : "To";
  const amountSign = direction === "in" ? "+" : "-";
  const Arrow = direction === "in" ? <Arrowin /> : <Arrowout />;
  return (
    <View style={styles.historyContainer}>
      <View style={styles.historyDetailsContainer}>
        <View style={[styles.arrowBg, { backgroundColor: circleColor }]}>
          {Arrow}
        </View>
        <View>
          <Text style={styles.title}>{description}</Text>
          <Text style={styles.transactionType}>
            {transactionType} : {to}
          </Text>
        </View>
      </View>
      <View>
        <Text style={[styles.amount, { color: priceColor }]}>
          {amountSign} {amount}
        </Text>
      </View>
    </View>
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
      <View></View>
    </View>
  );
};

export default Transactionhistory;
