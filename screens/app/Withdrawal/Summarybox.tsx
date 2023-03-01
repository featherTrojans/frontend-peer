import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, FONTS, fontsize, icons } from "../../../constants";
import { Horizontaline } from "../../../components";
import { withdrawstyles } from "./Withdrawal.styles";

const { Summaryicon } = icons;

const summaries = [
  {
    title: "Merchant",
    value: "Debbytoye_Thrift Ventures",
  },
  {
    title: "Withdraw Amount",
    value: "N50,00.00",
  },
  {
    title: "Charges",
    value: "+N750.00",
  },
  {
    title: "Total Amount to pay",
    value: "N50,550.00",
  },
];

const Eachsummary = ({ title, value }) => {
  return (
    <>
      <Horizontaline marginV={18} />
      <View style={withdrawstyles.eachSummaryWrap}>
        <Text style={withdrawstyles.eachSummaryTitle}>{title}</Text>
        <Text style={withdrawstyles.eachSummaryValue}>{value}</Text>
      </View>
    </>
  );
};

const Summarybox = () => {
  return (
    <View style={withdrawstyles.summaryboxWrap}>
      <View style={withdrawstyles.summaryIconTextWrap}>
        {/* icons */}
        <Summaryicon />
        <Text style={withdrawstyles.summaryText}>Transaction Summary</Text>
      </View>

      {summaries.map(({ title, value }, index) => {
        return <Eachsummary title={title} value={value} key={index} />;
      })}
    </View>
  );
};

export default Summarybox;

const styles = StyleSheet.create({});
