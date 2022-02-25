import React,{ useEffect, useState} from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { Transactionhistory } from "../../../components";
import { COLORS, FONTS, fontsize, icons } from "../../../constants";
import axiosCustom from "../../../httpRequests/axiosCustom";
import formatData from "../../../utils/fomatTrans";
import { styles } from "./Transactions.styles";

const { Cryingicon } = icons;


  
  const DATA =  [
    {
        "transId": "WZsOkF2oWw",
        "initialBal": "2570",
        "amount": "150",
        "finalBal": "2420",
        "description": "#150 transferred to OBA",
        "from": "EZEKO",
        "to": "OBA",
        "direction": "out",
        "createdAt": "2022-02-15T16:51:40.000Z"
    },
    {
        "transId": "JFox9iGSKJ",
        "initialBal": "2420",
        "amount": "150",
        "finalBal": "2570",
        "description": "#150 transferred from EZEKO",
        "from": "EZEKO",
        "to": "EZEKO",
        "direction": "in",
        "createdAt": "2022-01-31T23:56:07.000Z"
    },
    {
        "transId": "FnF7XtyXrb",
        "initialBal": "2570",
        "amount": "150",
        "finalBal": "2420",
        "description": "#150 transferred to EZEKO",
        "from": "EZEKO",
        "to": "EZEKO",
        "direction": "out",
        "createdAt": "2022-01-31T23:56:00.000Z"
    },
    {
        "transId": "eZx81A14GE",
        "initialBal": "2420",
        "amount": "150",
        "finalBal": "2570",
        "description": "#150 transferred from EZEKO",
        "from": "EZEKO",
        "to": "EZEKO",
        "direction": "in",
        "createdAt": "2022-01-31T23:54:40.000Z"
    },
    {
        "transId": "QLkpxlyiSL",
        "initialBal": "2570",
        "amount": "150",
        "finalBal": "2420",
        "description": "#150 transferred to EZEKO",
        "from": "EZEKO",
        "to": "EZEKO",
        "direction": "out",
        "createdAt": "2022-01-31T23:54:39.000Z"
    },
    {
        "transId": "LdJexVcIIW",
        "initialBal": "2420",
        "amount": "150",
        "finalBal": "2570",
        "description": "#150 transferred from EZEKO",
        "from": "EZEKO",
        "to": "EZEKO",
        "direction": "in",
        "createdAt": "2022-01-31T23:52:49.000Z"
    },
    {
        "transId": "lirXTEm7Zs",
        "initialBal": "2720",
        "amount": "150",
        "finalBal": "2570",
        "description": "#150 transferred to ELON",
        "from": "EZEKO",
        "to": "ELON",
        "direction": "out",
        "createdAt": "2022-01-31T23:48:07.000Z"
    }]

  const EmptyComponent = () => {
    return (
      <View style={styles.emptyListContainer}>
        {/* Crying icons */}
        <Cryingicon />
        <View style={styles.textContainer}>
          <Text style={styles.emptyContainerText}>
            Padi, you have not performed any transactions yet.{" "}
            <Text style={styles.emptyContainerSubText}>Transact Now</Text>
          </Text>
        </View>
      </View>
    );
  };

const Transactions = () => {
  const [transactions, setTransations] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
      getAllTransactions()
  },[])
  const getAllTransactions = async () =>{
    try{
      setLoading(true)
      const response = await axiosCustom.get("/transactions");
      setTransations(response?.data?.data?.transactions)
    }catch(err){
      console.log(err.response)
    }finally{
      setLoading(true)
    }
  }
  const Listheader = () => {

    return (
      <View style={styles.listHeaderContainer}>
        <View>
          <Text style={styles.leftsideHeader}>What you’ve been up to</Text>
        </View>
        <View>
          <Text style={styles.rightsideHeader}>See All</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* heading */}
      <View>
        <Text style={styles.headerText}>Transactions</Text>
      </View>
      <View style={styles.listContainer}>
        {DATA.length > 0 && <Listheader />}

        <FlatList
          style={{ paddingTop: 10 }}
          data={formatData(transactions)}
          // data={[]}
          renderItem={({ item }: any) => (
            <Transactionhistory date={item.time} datas={item.data} />
          )}
          keyExtractor={(item) => item.time}
          ListEmptyComponent={<EmptyComponent />}
        />
      </View>
      <View style={styles.btnSection}>
        <View style={styles.btnBg}>
          <Text style={styles.btnText}>NEW TRANSACTION</Text>
        </View>
      </View>
    </View>
  );
};

export default Transactions;
