import { StyleSheet, Text, View, FlatList, StatusBar } from "react-native";
import React, { useState } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import { Backheader, Bottombtn, Input } from "../../../../components";
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
  const [checked, setChecked] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar />
      <Backheader title="Bank Account" />

      <View style={{ flex: 1, paddingHorizontal: 25 }}>
        <Input icon={<At />} placeholder="N37,580.50" />

        <View style={styles.headerContainer}>
          <Text style={styles.leftHeader}>Saved Accounts</Text>
          <Text style={styles.rightHeader}>See More</Text>
        </View>

        <View style={{ marginVertical: 35 }}>
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

        <Input icon={<At />} placeholder="--- Select Bank ---" />
        <Input icon={<At />} placeholder="Account Number" />
        <View style={styles.addAccountContainer}>
          <BouncyCheckbox
            size={18}
            fillColor={COLORS.blue6}
            unfillColor={COLORS.white}
            text={"Add To Saved Accounts"}
            iconStyle={[
              styles.checkbox,
              {
                borderColor: checked ? COLORS.blue6 : COLORS.checkBorder,
                borderRadius: 5,
              },
            ]}
            onPress={(isChecked: boolean) => {
              setChecked(!checked);
            }}
            textStyle={[styles.checkboxText, { textDecorationLine: "none" }]}
            style={{
              alignItems: "center",
            }}
          />
        </View>
      </View>

      <Bottombtn
        title="PROCEED"
        onpress={() => console.log("Bank accout proceded")}
      />
    </View>
  );
};

export default Bankaccount;
