import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React,{useState, useEffect} from "react";
import { COLORS, FONTS, fontsize, icons } from "../../constants";
import { styles } from "./Transactionhistory.styles";
import { useNavigation } from '@react-navigation/native';
import amountFormatter from "../../utils/formatMoney";


const { Arrowin, Arrowout } = icons;

const History = ({ data }: any) => {
  const navigation = useNavigation()
  const { direction, description, to, amount, from } = data;

  // useEffect(()=>{

  // },[]);


  const priceColor = direction === "in" ? COLORS.green1 : COLORS.pink1;
  const circleColor = direction === "in" ? COLORS.green2 : COLORS.pink1;
  const transactionType = direction === "in" ? "From" : "To";
  const transactionValue = direction === "in" ? from : to;
  const amountSign = direction === "in" ? "+" : "-";
  const Arrow = direction === "in" ? <Arrowin /> : <Arrowout />;
  return (
    <TouchableOpacity 
    activeOpacity={0.8}
    style={styles.historyContainer}
    onPress={() => navigation.navigate("Transactiondetails")}
    >
      <View style={styles.historyDetailsContainer}>
        <View style={[styles.arrowBg, { backgroundColor: circleColor }]}>
          {Arrow}
        </View>
        <View>
          <Text style={styles.title}>{description}</Text>
          <Text style={styles.transactionType}>
            {transactionType} : {transactionValue}
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
      <View></View>
    </View>
  );
};

export default Transactionhistory;
