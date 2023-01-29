import { StyleSheet, Text, View, StatusBar } from "react-native";
import React, { useState, useContext } from "react";
// import DropDownPicker from "react-native-dropdown-picker";

import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import { styles } from "./Addcash.styles";
import { Bottombtn } from "../../../../components";
import { NavigationContainer } from "@react-navigation/native";
import { AuthContext } from "../../../../context/AuthContext";
import amountFormatter from "../../../../utils/formatMoney";
import * as SMS from "expo-sms";
import Customstatusbar from "../../../shared/Customstatusbar";
import { SafeAreaView } from "react-native-safe-area-context";
import { RFValue } from "react-native-responsive-fontsize";

const { Backarrow } = icons;

const Addcash = ({ navigation }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const { authdata } = useContext(AuthContext);
  const [items, setItems] = useState([
    { label: "Primary Wallet", value: "Primary Wallet" },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, paddingTop: RFValue(20) }}>
        <Customstatusbar />
        {/* <View style={styles.backArrow}>
        <Backarrow />
        <Text style={styles.backArrowText}>Add Cash</Text>
      </View> */}

        <View style={{ flex: 1, paddingHorizontal: 15 }}>
          {/* This will contain the dropdown to choose the wallet type needed */}

          {/* <DropDownPicker
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
            dropDownContainerStyle={{
              borderColor: COLORS.grey1,
            }}
          /> */}


          
          {value !== null && (
            <View style={styles.balanceContainer}>
              <Text style={styles.balanceText}>Balance :</Text>
              <Text>{"   "}</Text>
              <Text style={styles.balanceAmount}>
                NGN {amountFormatter(authdata.walletBal)}
              </Text>
            </View>
          )}
        </View>
        <Bottombtn
          title="CONTINUE"
          onpress={() => navigation.navigate("Choosewallet")}
        />
      </View>
    </SafeAreaView>
  );
};

export default Addcash;
