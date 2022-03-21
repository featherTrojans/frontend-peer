import { StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Backheader, Bottombtn } from "../../../../../components";
import { COLORS, FONTS, fontsize, icons } from "../../../../../constants";
import Globalmodal from "../../../../shared/Globalmodal/Globalmodal";
import LottieView from "lottie-react-native";
import DropDownPicker from "react-native-dropdown-picker";

const { Addressbook, Inputdropdown, Successcheckanimate } = icons;

type PaybillsinputProps = {
  inputSymbol: string;
  rightIcon?: JSX.Element;
  placeholder: string;
  editable?: boolean
  value?:any,
  onChangeText?:any,
  keyboardType?:any
};

const Paybillsinput = ({
  inputSymbol,
  rightIcon,
  placeholder,
  
}: PaybillsinputProps) => {
  return (
    <View
      style={{
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.paybillInput,
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 20,
        marginBottom: 15,
      }}
    >
      <Text style={{ ...fontsize.bsmall }}>{inputSymbol}</Text>
      <Text style={{ marginLeft: 15.5, marginRight: 16.5 }}>|</Text>
      <TextInput
        style={{ flex: 1, height: 62 }}
        placeholder={placeholder}
        placeholderTextColor={COLORS.black}
      />
      {rightIcon}
    </View>
  );
};

const Electricitydetails = ({ navigation, route }) => {
    const {amount} = route.params
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [phone, setPhone] = useState<null | string>(null);
    const [meterNumber, setMeterNumber] = useState<null | string>(null)
    const [items, setItems] = useState([
      { label: "@    |    abuja-electric", value: "abuja-electric" },
      { label: "@    |    eko-electric", value: "eko-electric" },
      { label: "@    |    ibadan-electric", value: "ibadan-electric" },
      { label: "@    |    ikeja-electric ", value: "ikeja-electric " },
      { label: "@    |    jos-electric", value: "jos-electric" },
      { label: "@    |    kaduna-electric", value: "kaduna-electric" },
      { label: "@    |    kano-electric", value: "kano-electric" },
      { label: "@    |    portharcourt-electric", value: "portharcourt-electric" }
    ]);
    const [open2, setOpen2] = useState(false);
    const [value2, setValue2] = useState(null);
    const [items2, setItems2] = useState([
      { label: "@    |    prepaid", value: "prepaid" },
      { label: "@    |    postpaid", value: "postpaid" },
    ]);

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, backgroundColor: COLORS.white }}
      contentContainerStyle={{ flex: 1 }}
    >
      <Backheader title="Electricity Bill Payments" />


      <KeyboardAwareScrollView style={{ paddingHorizontal: 15, flex: 1 }}>
        <Text
          style={{
            marginTop: 16,
            ...fontsize.bsmall,
            ...FONTS.regular,
            marginRight: 55,
          }}
        >
          Select your preferred network provider and receivers phone number.
        </Text>

        <View style={{ marginTop: 40, flex: 1 , minHeight: 400}}>
          <Paybillsinput inputSymbol="#" placeholder={amount}  editable={false}  />
          <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder="@    |    Electricity Company"
                placeholderStyle={{
                  color: COLORS.black,
                  ...fontsize.small,
                  ...FONTS.regular,
                }}
                textStyle={{
                  color: COLORS.black,
                  ...fontsize.small,
                  ...FONTS.regular,
                }}
                style={{
                  height: 62,
                  paddingLeft: 20,
                  borderColor: "#E6E6E6",
                  marginBottom: 15
                }}
                containerStyle={{}}
                dropDownContainerStyle={{
                  borderColor: COLORS.grey1,
                  zIndex: 2
                }}
              />
              <DropDownPicker
                open={open2}
                value={value2}
                items={items2}
                setOpen={setOpen2}
                setValue={setValue2}
                setItems={setItems2}
                placeholder="@    |    Enter Meter Type"
                placeholderStyle={{
                  color: COLORS.black,
                  ...fontsize.small,
                  ...FONTS.regular,
                }}
                textStyle={{
                  color: COLORS.black,
                  ...fontsize.small,
                  ...FONTS.regular,
                }}
                style={{
                  height: 62,
                  paddingLeft: 20,
                  borderColor: "#E6E6E6",
                  marginBottom: 15,
                  zIndex: 1
                }}
                containerStyle={{}}
                dropDownContainerStyle={{
                  borderColor: COLORS.grey1,
                  zIndex: 1
                }}
              />
          <Paybillsinput inputSymbol="#" placeholder="Enter Meter Number"
           value={meterNumber}
           keyboardType={"numeric"}
           onChangeText={(text:string)=>setMeterNumber(text)} />
          <Paybillsinput
              value={phone}
              onChangeText={(text:string)=>setPhone(text)}
              inputSymbol="#"
              placeholder="08012345678"
              keyboardType={"numeric"}
              rightIcon={<Addressbook />}
            />
        </View>
      </KeyboardAwareScrollView>
      <Bottombtn
        title="proceed"
        onpress={() => navigation.navigate("Airtimepurchasepin",{type:"electricity", data:{
          amount:amount,
          phone:phone,  
          service:value,
          variation: value2,
          meter_number: meterNumber
        }})}
      />
    </KeyboardAwareScrollView>
  );
};

export default Electricitydetails;

const styles = StyleSheet.create({});
