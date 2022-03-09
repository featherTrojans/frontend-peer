import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import LottieView from "lottie-react-native"

import { Bottombtn, Transactionhistory } from "../../../../components";
import { COLORS, icons } from "../../../../constants";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import formatData from "../../../../utils/fomatTrans";


import { styles } from "./Transaction.styles";

const { Cryinganimate } = icons;

const DATA = [
  {
    transId: "WZsOkF2oWw",
    initialBal: "2570",
    amount: "150",
    finalBal: "2420",
    description: "#150 transferred to OBA",
    from: "EZEKO",
    to: "OBA",
    direction: "out",
    createdAt: "2022-02-15T16:51:40.000Z",
  },
  {
    transId: "JFox9iGSKJ",
    initialBal: "2420",
    amount: "150",
    finalBal: "2570",
    description: "#150 transferred from EZEKO",
    from: "EZEKO",
    to: "EZEKO",
    direction: "in",
    createdAt: "2022-01-31T23:56:07.000Z",
  },
  {
    transId: "FnF7XtyXrb",
    initialBal: "2570",
    amount: "150",
    finalBal: "2420",
    description: "#150 transferred to EZEKO",
    from: "EZEKO",
    to: "EZEKO",
    direction: "out",
    createdAt: "2022-01-31T23:56:00.000Z",
  },
  {
    transId: "eZx81A14GE",
    initialBal: "2420",
    amount: "150",
    finalBal: "2570",
    description: "#150 transferred from EZEKO",
    from: "EZEKO",
    to: "EZEKO",
    direction: "in",
    createdAt: "2022-01-31T23:54:40.000Z",
  },
  {
    transId: "QLkpxlyiSL",
    initialBal: "2570",
    amount: "150",
    finalBal: "2420",
    description: "#150 transferred to EZEKO",
    from: "EZEKO",
    to: "EZEKO",
    direction: "out",
    createdAt: "2022-01-31T23:54:39.000Z",
  },
  {
    transId: "LdJexVcIIW",
    initialBal: "2420",
    amount: "150",
    finalBal: "2570",
    description: "#150 transferred from EZEKO",
    from: "EZEKO",
    to: "EZEKO",
    direction: "in",
    createdAt: "2022-01-31T23:52:49.000Z",
  },
  {
    transId: "lirXTEm7Zs",
    initialBal: "2720",
    amount: "150",
    finalBal: "2570",
    description: "#150 transferred to ELON",
    from: "EZEKO",
    to: "ELON",
    direction: "out",
    createdAt: "2022-01-31T23:48:07.000Z",
  },
];

const EmptyComponent = () => {
  return (
    <View style={styles.emptyListContainer}>
      {/* Crying icons */}
      {/* <Cryingicon /> */}
      <LottieView source={Cryinganimate} autoPlay loop style={{width: 190, height: 190}}/>
      <View style={styles.textContainer}>
        <Text style={styles.emptyContainerText}>
          Padi, you have not performed any transactions yet.{" "}
          <Text style={styles.emptyContainerSubText}>Transact Now</Text>
        </Text>
      </View>
    </View>
  );
};

const Transactions = ({navigation}: any) => {
  const [transactions, setTransations] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllTransactions();
  }, []);
  const getAllTransactions = async () => {
    try {
      setLoading(true);
      const response = await axiosCustom.get("/transactions");
      console.log(response)
      setTransations(response?.data?.data?.transactions);
    } catch (err) {
      console.log(err.response);
    } finally {
      setLoading(true);
    }
  };
  const Listheader = () => {
    return (
      <View style={styles.listHeaderContainer}>
        <View>
          <Text style={styles.leftsideHeader}>What you’ve been up to</Text>
        </View>
        {/* <View>
          <Text style={styles.rightsideHeader}>See All</Text>
        </View> */}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* heading */}
      <View style={styles.contentContainer}>
        <Text style={styles.headerText}>History</Text>

        <View style={styles.listContainer}>
          {DATA.length > 0 && <Listheader />}

          <FlatList
            style={{ paddingTop: 10 }}
            data={formatData(transactions)}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }: any) => (
              <Transactionhistory date={item.time} datas={item.data} />
            )}
            keyExtractor={(item) => item.time}
            ListEmptyComponent={<EmptyComponent />}
          />
        </View>
      </View>

      {/* <Bottombtn
        title="+ NEW TRANSACTIONS"
        onpress={() =>navigation.navigate("Newtransactions")}
      /> */}
    </View>
  );
};

export default Transactions;
