import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Transactionhistory } from "../../../components";
import { COLORS, FONTS, fontsize, icons } from "../../../constants";
import { styles } from "./Transactions.styles";

const { Cryingicon } = icons;

const Transactions = () => {
  const DATA = [
    {
      time: "Today",
      data: [
        {
          direction: "in",
          title: "Wallet Funding",
          to: "Primary Wallet",
          price: 13400,
        },
        {
          direction: "out",
          title: "Funds Transfer",
          to: "@destiny_child007",
          price: 53600,
        },
        {
          direction: "out",
          title: "Funds Transfer",
          to: "@destiny_child007",
          price: 53600,
        },
        {
          direction: "out",
          title: "Funds Transfer",
          to: "@destiny_child007",
          price: 53600,
        },
      ],
    },
    {
      time: "Yesterday",
      data: [
        {
          direction: "in",
          title: "Spending",
          to: "Primar",
          price: 13400,
        },
        {
          direction: "out",
          title: "Funds Sending",
          to: "@destiny_child",
          price: 53600,
        },
      ],
    },
    {
      time: "12-22-2022",
      data: [
        {
          direction: "in",
          title: "Spending",
          to: "Primar",
          price: 13400,
        },
        {
          direction: "out",
          title: "Funds Sending",
          to: "@destiny_child",
          price: 53600,
        },
      ],
    },
    {
      time: "19-02-2022",
      data: [
        {
          direction: "in",
          title: "Spending",
          to: "Primar",
          price: 13400,
        },
        {
          direction: "out",
          title: "Funds Sending",
          to: "@destiny_child",
          price: 53600,
        },
      ],
    },
    {
      time: "13-07-2021",
      data: [
        {
          direction: "in",
          title: "Spending",
          to: "Primar",
          price: 13400,
        },
        {
          direction: "in",
          title: "Spending",
          to: "Primar",
          price: 13400,
        },
        {
          direction: "out",
          title: "Funds Sending",
          to: "@destiny_child",
          price: 53600,
        },
      ],
    },
    {
      time: "23-10-2021",
      data: [
        {
          direction: "in",
          title: "Spending",
          to: "Primar",
          price: 13400,
        },
      ],
    },
    {
      time: "04-11-2021",
      data: [
        {
          direction: "in",
          title: "Spending",
          to: "Primar",
          price: 13400,
        },
        {
          direction: "in",
          title: "Spending",
          to: "Primar",
          price: 13400,
        },
        {
          direction: "in",
          title: "Spending",
          to: "Primar",
          price: 13400,
        },
      ],
    },
  ];

  const EmptyComponent = () => {
    return (
      <View style={styles.emptyListContainer}>
        {/* Crying icons */}
        <Cryingicon />
        <View style={styles.textContainer}>
          <Text style={styles.emptyContainerText}>
            Padi, you have not performed any transactions yet.{" "}
            <Text style={styles.emptyContainerSubText}>Transact Now</Text>
          </Text>
        </View>
      </View>
    );
  };

  const Listheader = () => {
    return (
      <View style={styles.listHeaderContainer}>
        <View>
          <Text style={styles.leftsideHeader}>What you’ve been up to</Text>
        </View>
        <View>
          <Text style={styles.rightsideHeader}>See All</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* heading */}
      <View>
        <Text style={styles.headerText}>Transactions</Text>
      </View>
      <View style={styles.listContainer}>
        {DATA.length > 0 && <Listheader />}

        <FlatList
          style={{ paddingTop: 10 }}
          data={DATA}
          renderItem={({ item }: any) => (
            <Transactionhistory date={item.time} datas={item.data} />
          )}
          keyExtractor={(item) => item.time}
          ListEmptyComponent={<EmptyComponent />}
        />
      </View>
      <View style={styles.btnSection}>
        <View style={styles.btnBg}>
          <Text style={styles.btnText}>NEW TRANSACTION</Text>
        </View>
      </View>
    </View>
  );
};

export default Transactions;
