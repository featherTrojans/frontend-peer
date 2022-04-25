import { StyleSheet, Text, View, FlatList, StatusBar } from "react-native";
import React, { useContext, useState } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import {
  Backheader,
  Bottombtn,
  Input,
  Loader,
  Sendingandreceive,
} from "../../../../components";
import { styles } from "./Bankaccount.styles";
import Globalmodal from "../../../shared/Globalmodal/Globalmodal";
import DropDownPicker from "react-native-dropdown-picker";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import showerror from "../../../../utils/errorMessage";
import { useToast } from "react-native-toast-notifications";
import amountFormatter from "../../../../utils/formatMoney";
import Customstatusbar from "../../../shared/Customstatusbar";
import { AuthContext } from "../../../../context/AuthContext";
import { SafeAreaView } from "react-native-safe-area-context";

const { Backarrow, At } = icons;

const availableBanks = [
  { label: "GTB", value: "GTB" },
  { label: "FIRST", value: "FIRST" },
  { label: "ZENITH", value: "ZENITH" },
  { label: "ACCESS", value: "ACCESS" },
  { label: "STANBIC", value: "STANBIC" },
  { label: "DIAMOND", value: "DIAMOND" },
  { label: "SKYE", value: "SKYE" },
  { label: "WEMA", value: "WEMA" },
  { label: "FCMB", value: "FCMB" },
  { label: "FIDELITY", value: "FIDELITY" },
  { label: "UBA", value: "UBA" },
  { label: "UNION", value: "UNION" },
  { label: "ECOBANK", value: "ECOBANK" },
  { label: "HERITAGE", value: "HERITAGE" },
  { label: "UNITY", value: "UNITY" },
  { label: "STERLING", value: "STERLING" },
  { label: "JAIZ", value: "JAIZ" },
  { label: "KEYSTONE", value: "KEYSTONE" },
  { label: "KUDA", value: "KUDA" },
  { label: "POLARIS", value: "POLARIS" },
  { label: "PAYCOM", value: "PAYCOM" },
  { label: "PROVIDUS", value: "PROVIDUS" },
  { label: "TAJ", value: "TAJ" },
];
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

const Bankaccount = ({ navigation, route }) => {
  const { amount } = route.params;
  const { authdata } = useContext(AuthContext);
  // const amount=500
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [showmodal, setShowModal] = useState(false);
  const [checked, setChecked] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(availableBanks);
  const [accountnum, setAccountnum] = useState("");
  const [accountInfomation, setAccountInformation] = useState({});

  const getBankCharges = () => {
    if (amount <= 5000) {
      return "N10.00";
    }
    if (amount > 5000 && amount <= 50000) {
      return "N25.00";
    }
    if (amount > 50000) {
      return "N50.00";
    }
  };
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axiosCustom({
        method: "post",
        url: "/account/get",
        data: { account_number: accountnum, bank_name: value },
      });
      setAccountInformation(response?.data?.data);

      setShowModal(true);
    } catch (err) {
      showerror(toast, err);
    } finally {
      setLoading(false);
    }
    // () => navigation.push("Transferpin")
  };

  return (
    <SafeAreaView style={styles.container}>
      {loading && <Loader />}
      <Customstatusbar />
      <Backheader title="Bank Account" />
      <Globalmodal
        showState={showmodal}
        onBgPress={() => setShowModal(!showmodal)}
        btnFunction={() => {
          navigation.navigate("TransferpinBank", { amount, accountInfomation });
          setShowModal(false);
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              alignSelf: "flex-start",
              ...fontsize.bsmall,
              ...FONTS.medium,
            }}
          >
            Transfer Summary
          </Text>

          <Sendingandreceive
            senderName={authdata?.userDetails?.fullName}
            receiverName={"Am Zm"}
            title={value && value}
          />

          <Text style={{ ...fontsize.bmedium, ...FONTS.bold }}>
            NGN {amountFormatter(amount)}
          </Text>
          <Text
            style={{
              backgroundColor: COLORS.lightBlue,
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 30,
              marginTop: 16,
            }}
          >
            Transfer Charges:
            <Text style={{ ...FONTS.bold }}> + {getBankCharges()}</Text>
          </Text>
          <Text
            style={{
              textAlign: "center",
              marginHorizontal: 40,
              marginVertical: 40,
              ...fontsize.bsmall,
              ...FONTS.regular,
            }}
          >
            Are you sure you want to transfer cash to{" "}
            {accountInfomation?.bank_name} -{" "}
            <Text style={{ textTransform: "capitalize" }}>
              {accountInfomation?.account_name}
            </Text>{" "}
            ?
          </Text>
        </View>
      </Globalmodal>
      <View style={{ flex: 1, paddingHorizontal: 25 }}>
        <Input
          icon={<At />}
          placeholder="N37,580.50"
          editable={false}
          value={amount}
        />

        {/* <View style={styles.headerContainer}>
          <Text style={styles.leftHeader}>Saved Accounts</Text>
          <Text style={styles.rightHeader}>See More</Text>
        </View> */}

        {/* <View style={{ marginVertical: 35 }}>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            data={SAVEDACCOUNTS}
            keyExtractor={(item) => item.name}
            renderItem={({ item }) => <Saveduser details={item} />}
          />
        </View> */}

        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="--- Select Bank ---"
          placeholderStyle={styles.dropdowPlaceholder}
          textStyle={styles.dropDownText}
          style={styles.dropDown}
          containerStyle={{}}
          dropDownContainerStyle={{
            borderColor: COLORS.grey1,
            zIndex: 1,
          }}
        />
        {/* <Input icon={<At />} placeholder="--- Select Bank ---" /> */}
        <Input
          icon={<At />}
          placeholder="Account Number"
          value={accountnum}
          onChangeText={(text) => setAccountnum(text)}
          keyboardType="number-pad"
        />
        {/* <View style={styles.addAccountContainer}>
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
        </View> */}
      </View>

      <Bottombtn title="PROCEED" onpress={handleSubmit} />
    </SafeAreaView>
  );
};

export default Bankaccount;
