import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import { styles } from "./Addcash.styles";

const { Backarrow } = icons;

const Addcash = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Primary Wallet", value: "Primary Wallet" },
    { label: "Bank Account", value: "Bank Account" },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.backArrow}>
        <Backarrow />
        <Text style={styles.backArrowText}>Add Cash</Text>
      </View>

      <View>
        {/* This will contain the dropdown to choose the wallet type needed */}

        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="--- Select Wallet ---"
          placeholderStyle={styles.dropdowPlaceholder}
          textStyle={styles.dropDownText}
          style={styles.dropDown}
          containerStyle={{}}
        />
        {value !== null && (
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceText}>Balance :</Text>
            <Text>{"   "}</Text>
            <Text style={styles.balanceAmount}>NGN 3,895,800.35</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Addcash;
