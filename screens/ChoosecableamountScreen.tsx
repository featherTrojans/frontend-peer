import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ChoosecableamountScreenStyles } from "../assets/styles/screens";
import {
  FTCustombutton,
  FTIconwithtitleandinfo,
  FTLoader,
  FTSearchinput,
  FTTitlepagewrapper,
} from "../components";
import { redirectTo } from "../utils";
import { icons } from "../constants";
import { useNavigation } from "@react-navigation/native";
import axiosCustom from "../httpRequests/axiosCustom";
import { FlatList } from "react-native-gesture-handler";
import { useAlert } from "../hooks";
import amountFormatter from "../utils/formatMoney";

const { Bluecardicon } = icons;
const {} = ChoosecableamountScreenStyles;

function isObject(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

const ChoosecableamountScreen = ({ route }) => {
  const biller = route?.params?.biller;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [billeramount, setbilleramount] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredbilleramount, setfilteredbilleramount] = useState([]);
  const { errorAlert } = useAlert();
  useEffect(() => {
    getBillerAmounts();
  }, []);

  const getBillerAmounts = async () => {
    setLoading(true);
    try {
      const response = await axiosCustom.get(`/bills/prices/${biller}`);
      console.log(response.data);
      // if response.data.data is an object, make it an array
      let responseamount = [];
      if (isObject(response.data.data)) {
        responseamount.push(response.data.data);
      } else {
        responseamount = response.data.data;
      }
      setbilleramount(responseamount);
      setfilteredbilleramount(responseamount);
    } catch (err) {
      errorAlert(err);
    } finally {
      setLoading(false);
    }
  };

  const handlesearch = (val) => {
    setfilteredbilleramount(
      billeramount.filter((el) =>
        el?.name?.toLowerCase()?.includes(val?.toLowerCase())
      )
    );
    setSearch(val);
  };
  return (
    <FTTitlepagewrapper title="Choose Cable Amount">
      <FTSearchinput
        value={search}
        onChange={handlesearch}
        placeholder="Search Biller"
      />
      <FTLoader loading={loading} />
      <FlatList
        data={filteredbilleramount}
        ItemSeparatorComponent={() => <View style={{ height: 28 }} />}
        renderItem={({ item }) => {
          const { name, price } = item;
          return (
            <FTIconwithtitleandinfo
              bG="red"
              title={name}
              info={amountFormatter(price)}
              onPress={() =>
                navigation.navigate("cableiuc_screen", { biller, price })
              }
              Icon={Bluecardicon}
            />
          );
        }}
      />
    </FTTitlepagewrapper>
  );
};

export default ChoosecableamountScreen;

const styles = StyleSheet.create({});
