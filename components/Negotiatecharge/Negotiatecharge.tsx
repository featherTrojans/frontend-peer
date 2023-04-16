import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Pressable,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { COLORS, FONTS, fontsize } from "../../constants";
import Horizontaline from "../Horizontaline/Horizontaline";
import { styles } from "../../screens/app/Chats/Chatsdm/Chatsdm.styles";
import Custombutton from "../Custombutton/Custombutton";
import amountFormatter from "../../utils/formatMoney";
import useAlert from "../../utils/useAlerts";

const amounts = [
  { name: "50", value: 50 },
  { name: "100", value: 100 },
  { name: "200", value: 200 },
  { name: "500", value: 500 },
];
const Negotiatecharge = ({ openNextModal, info, withdrawAmount, defaultAmount = "0" }) => {
  const {blueAlert} = useAlert()
  const [amount, setAmount] = useState(`${defaultAmount}`);
  const textInputRef = useRef<TextInput>(null);
  
  
  useEffect(()=>{
    blueAlert(`Add shikini cash to the base charge to withdraw your amount of ${withdrawAmount}`)
  },[])
  
  const handleAmountChange = (value) => {
    setAmount(value);
  };
  return (
    <View>
      <Text
        style={{
          ...fontsize.smaller,
          ...FONTS.medium,
          color: COLORS.blue9,
          marginBottom: 10,
        }}
      >
        Negotiate Charge
      </Text>
      <Text
        style={{ ...fontsize.smallest, ...FONTS.regular, color: COLORS.grey16 }}
      >
        Add a fair amount to the base charge as fee{" "}
      </Text>

      <View style={{ marginVertical: 53 }}>
        {/* Inout */}
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <TextInput
            ref={textInputRef}
            style={styles.addedAmountText}
            keyboardType="numeric"
            placeholder="N0.00"
            value={amount}
            onChangeText={handleAmountChange}
          />
          <Pressable
            onPress={() => textInputRef?.current?.focus()}
            hitSlop={10}
          >
            {({ pressed }) => (
              <Text
                style={{
                  ...fontsize.smallest,
                  ...FONTS.regular,
                  color: COLORS.grey16,
                }}
              >
                Tap to add custom amount
              </Text>
            )}
          </Pressable>
        </View>

        {/* pirce to pick */}

        <View
          style={[
            styles.amountOptionsContainer,
            { marginBottom: 0, marginTop: 36 },
          ]}
        >
          {amounts.map((item, index) => {
            return (
              <TouchableOpacity
                onPress={() => handleAmountChange(item.name)}
                activeOpacity={0.8}
                key={index}
                style={styles.amountOption}
              >
                <Text style={styles.amountOptionText}>N{item.name}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={{ marginBottom: 30 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              ...fontsize.smallest,
              ...FONTS.regular,
              color: COLORS.blue9,
            }}
          >
            Base Charge{" "}
          </Text>
          <Text
            style={{
              ...fontsize.smallest,
              ...FONTS.medium,
              color: COLORS.purple4,
            }}
          >
            +N{amountFormatter(info?.charges)}
          </Text>
        </View>
        <Horizontaline marginV={20} />
        <Text
          style={{
            marginBottom: 16,
            ...fontsize.smallest,
            ...FONTS.regular,
            color: COLORS.blue9,
          }}
        >
          Total Charge (Base Charge + Your Charge)
        </Text>
        <Text
          style={{ ...fontsize.smaller, ...FONTS.bold, color: COLORS.blue9 }}
        >
          N{amountFormatter(`${Number(amount) + Number(info?.charges)}`)}
        </Text>
      </View>
      <Custombutton
        btntext="Yeah, Proceed"
        onpress={() => openNextModal(amount)}
      />
    </View>
  );
};

export default Negotiatecharge;
