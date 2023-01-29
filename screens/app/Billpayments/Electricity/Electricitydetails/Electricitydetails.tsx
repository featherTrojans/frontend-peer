import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useContext, useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Backheader, Bottombtn } from "../../../../../components";
import { COLORS, FONTS, fontsize, icons } from "../../../../../constants";
import Globalmodal from "../../../../shared/Globalmodal/Globalmodal";
import LottieView from "lottie-react-native";
// import DropDownPicker from "react-native-dropdown-picker";
// import { useToast } from "react-native-toast-notifications";
import showerror from "../../../../../utils/errorMessage";
import { AuthContext } from "../../../../../context/AuthContext";
import { styles } from "../../Airtime/Airtimedetails/Airtimedetails.styles";
import styled from "styled-components";
import { SafeAreaView } from "react-native-safe-area-context";

const { Addressbook, Inputdropdown, Successcheckanimate } = icons;

type PaybillsinputProps = {
  inputSymbol: string;
  rightIcon?: JSX.Element;
  placeholder: string;
  editable?: boolean;
  value?: any;
  onChangeText?: any;
  keyboardType?: any;
};

const Paybillsinput = ({
  inputSymbol,
  rightIcon,
  placeholder,
  editable = true,
  ...props
}: PaybillsinputProps) => {
  return (
    <View style={styles.paybillsInput}>
      <Text style={styles.atSymbol}>{inputSymbol}</Text>
      <Text style={styles.boundaryLine}>|</Text>
      <TextInput
        editable={editable}
        style={{ flex: 1, height: 62 }}
        placeholder={placeholder}
        placeholderTextColor={COLORS.black}
        {...props}
      />
      {rightIcon}
    </View>
  );
};

const Electricitydetails = ({ navigation, route }) => {
  const { amount } = route.params;
  // const toast = useToast();
  const { authdata } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [phone, setPhone] = useState<null | string>(
    authdata?.userDetails?.phoneNumber
  );
  const [meterNumber, setMeterNumber] = useState<null | string>(null);
  const [items, setItems] = useState([
    { label: "@    |    abuja-electric", value: "abuja-electric" },
    { label: "@    |    eko-electric", value: "eko-electric" },
    { label: "@    |    ibadan-electric", value: "ibadan-electric" },
    { label: "@    |    ikeja-electric ", value: "ikeja-electric " },
    { label: "@    |    jos-electric", value: "jos-electric" },
    { label: "@    |    kaduna-electric", value: "kaduna-electric" },
    { label: "@    |    kano-electric", value: "kano-electric" },
    {
      label: "@    |    portharcourt-electric",
      value: "portharcourt-electric",
    },
  ]);
  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [items2, setItems2] = useState([
    { label: "@    |    prepaid", value: "prepaid" },
    { label: "@    |    postpaid", value: "postpaid" },
  ]);

  const handleToNext = () => {
    if (!amount || !phone || !value || !value2 || !meterNumber) {
      // return showerror(toast, null, "All fields are complusory");
    }
    navigation.navigate("Airtimepurchasepin", {
      type: "electricity",
      data: {
        amount: amount,
        phone: phone,
        service: value,
        variation: value2,
        meter_number: meterNumber,
      },
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: COLORS.white }}
      contentContainerStyle={{ flex: 1 }}
    >
      <Backheader title="Electricity Bill Payments" />

      <KeyboardAwareScrollView style={{ paddingHorizontal: 15, flex: 1 }}>
        <Text style={styles.headerText}>
          Select your preferred electricity provider in any part of Nigeria.
        </Text>

        <View style={styles.inputsContainer}>
          <Paybillsinput
            inputSymbol="#"
            placeholder={amount}
            editable={false}
          />
          {/* <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}s
            setItems={setItems}
            placeholder="@    |    Electricity Company"
            placeholderStyle={styles.placeholderStyle}
            textStyle={styles.textStyle}
            style={styles.dropDownStyle}
            dropDownContainerStyle={styles.dropdownContainerStyle}
          />
          <DropDownPicker
            open={open2}
            value={value2}
            items={items2}
            setOpen={setOpen2}
            setValue={setValue2}
            setItems={setItems2}
            placeholder="@    |    Enter Meter Type"
            placeholderStyle={styles.placeholderStyle}
            textStyle={styles.textStyle}
            style={[styles.dropDownStyle, { zIndex: 1 }]}
            dropDownContainerStyle={styles.dropdownContainerStyle}
          /> */}
          <Paybillsinput
            inputSymbol="#"
            placeholder="Enter Meter Number"
            value={meterNumber}
            keyboardType={"numeric"}
            onChangeText={(text: string) => setMeterNumber(text)}
          />
          <Paybillsinput
            value={phone}
            onChangeText={(text: string) => setPhone(text)}
            inputSymbol="#"
            placeholder="08000000000"
            keyboardType={"numeric"}
            // rightIcon={<Addressbook />}
          />
        </View>
      </KeyboardAwareScrollView>
      <Bottombtn title="proceed" onpress={handleToNext} />
    </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Electricitydetails;
