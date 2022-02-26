import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import { Input } from "../../../../components";
import { styles } from "./Bankaccount.styles";

const { Backarrow, At } = icons;

const SAVEDACCOUNTS = [
  {
    name: "Haruna Boye",
    bank: "Access Bank",
  },
  {
    name: "Opeyemi Also",
    bank: "GT Bank",
  },
  {
    name: "Aisha Bello",
    bank: "Polaris Bank",
  },
  {
    name: "Popoola Maja",
    bank: "Wema Bank",
  },
  {
    name: "John Okafor",
    bank: "Wema Bank",
  },
];

const Saveduser = ({ details }: any) => {
  const { name, bank } = details;

  const getNameAbbr = (data: any) => {
    const splittedName = data.split(" ");
    const first = splittedName[0][0];
    const second = splittedName[1][0];
    return first + second;
  };

  return (
    <View
      style={{
        marginRight: 30,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: 53,
          height: 53,
          backgroundColor: COLORS.blue6,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 53,
        }}
      >
        <Text style={{ color: COLORS.white }}>{getNameAbbr(name)}</Text>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text
          style={{ ...fontsize.small, ...FONTS.regular, textAlign: "center" }}
        >
          {name}
        </Text>
        <Text
          style={{
            ...fontsize.xsmallest,
            ...FONTS.medium,
            textAlign: "center",
          }}
        >
          {bank}
        </Text>
      </View>
    </View>
  );
};

const Bankaccount = () => {
  return (
    <View style={styles.container}>
      <View style={styles.backArrow}>
        <Backarrow />
        <Text style={styles.backArrowText}>Bank Account</Text>
      </View>
      <View>
        <Input icon={<At />} placeholder="N37,580.50" />
      </View>

      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.leftHeader}>Saved Accounts</Text>
        </View>
        <View>
          <Text style={styles.rightHeader}>See More</Text>
        </View>
      </View>

      <View style={{ flex: 1 }}>
        {/* Flatlist container */}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          data={SAVEDACCOUNTS}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => <Saveduser details={item} />}
        />
      </View>
      <View>
        <Input icon={<At />} placeholder="--- Select Bank ---" />
        <Input icon={<At />} placeholder="Account Number" />
        <View style={styles.addAccountContainer}>
          <View style={styles.checkbox} />
          <Text style={styles.checkText}>Add To Saved Accounts</Text>
        </View>
      </View>

      <View style={styles.btcSection}>
        <View style={styles.btnBg}>
          <Text style={styles.btnText}>PROCEED</Text>
        </View>
      </View>
    </View>
  );
};

export default Bankaccount;
