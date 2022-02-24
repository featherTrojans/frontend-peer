import React, {useState, useEffect, useContext} from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  ScrollView,
  FlatList,
  SafeAreaView,
} from "react-native";
import { Service, Transactionhistory, Viewbalance } from "../../../components";
import { COLORS, FONTS, fontsize, icons } from "../../../constants";
import { AuthContext } from "../../../context/AuthContext";
import axiosCustom from "../../../httpRequests/axiosCustom";
import { styles } from "./Home.styles";

const {
  Profilepics,
  Bell,
  Arrowright,
  Eyecrossed,
  Withdraw,
  Paybills,
  Transfer,
  Deposit,
  Cryingicon,
} = icons;

const DATA = [
  {
    time: "Today",
    data: [
      {
        direction: "in",
        title: "Wallet Funding",
        to: "Primary Wallet",
        price: 13400,
      },
      {
        direction: "out",
        title: "Funds Transfer",
        to: "@destiny_child007",
        price: 53600,
      },
      {
        direction: "out",
        title: "Funds Transfer",
        to: "@destiny_child007",
        price: 53600,
      },
      {
        direction: "out",
        title: "Funds Transfer",
        to: "@destiny_child007",
        price: 53600,
      },
    ],
  },
  {
    time: "Yesterday",
    data: [
      {
        direction: "in",
        title: "Spending",
        to: "Primar",
        price: 13400,
      },
      {
        direction: "out",
        title: "Funds Sending",
        to: "@destiny_child",
        price: 53600,
      },
    ],
  },
  {
    time: "12-22-2022",
    data: [
      {
        direction: "in",
        title: "Spending",
        to: "Primar",
        price: 13400,
      },
      {
        direction: "out",
        title: "Funds Sending",
        to: "@destiny_child",
        price: 53600,
      },
    ],
  },
  {
    time: "19-02-2022",
    data: [
      {
        direction: "in",
        title: "Spending",
        to: "Primar",
        price: 13400,
      },
      {
        direction: "out",
        title: "Funds Sending",
        to: "@destiny_child",
        price: 53600,
      },
    ],
  },
  {
    time: "13-07-2021",
    data: [
      {
        direction: "in",
        title: "Spending",
        to: "Primar",
        price: 13400,
      },
      {
        direction: "in",
        title: "Spending",
        to: "Primar",
        price: 13400,
      },
      {
        direction: "out",
        title: "Funds Sending",
        to: "@destiny_child",
        price: 53600,
      },
    ],
  },
  {
    time: "23-10-2021",
    data: [
      {
        direction: "in",
        title: "Spending",
        to: "Primar",
        price: 13400,
      },
    ],
  },
  {
    time: "04-11-2021",
    data: [
      {
        direction: "in",
        title: "Spending",
        to: "Primar",
        price: 13400,
      },
      {
        direction: "in",
        title: "Spending",
        to: "Primar",
        price: 13400,
      },
      {
        direction: "in",
        title: "Spending",
        to: "Primar",
        price: 13400,
      },
    ],
  },
];

const walletOptions = [
  {
    icon: <Withdraw />,
    title: "Withdraw",
  },
  {
    icon: <Deposit />,
    title: "Deposit",
  },
  {
    icon: <Transfer />,
    title: "Transfer",
  },
  {
    icon: <Paybills />,
    title: "Paybills",
  },
];


const Home = () => {
  const {setAuthData} = useContext(AuthContext)
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(false)
  useEffect(()=>{
    getDashboardData()
  },[])
  const getDashboardData = async ()=>{
    setLoading(true)
    try{
      const response = await axiosCustom.get("/dashboard")
      setInfo(response?.data?.data)
      setAuthData(response?.data?.data)
    }catch(err){
      console.log(err.response);
    }finally{
      setLoading(false)
    }
  }
  const EmptyComponent = () => {
    return (
      <View style={styles.emptyContainer}>
        {/* Crying icons */}
        <Cryingicon />
        <View style={{ marginHorizontal: 50 }}>
          <Text style={styles.emptyText}>
            Padi, you have not performed any transactions yet.{" "}
            <Text style={styles.transactNow}>Transact Now</Text>
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.headerContainer}>
        {/* user profile and notification icon */}

        <View style={styles.profileContainer}>
          <Profilepics />
          <View style={styles.profileNameContainer}>
            <Text style={styles.profileName}>{info?.fullName}</Text>
            <Text style={styles.profileUsername}>@{info?.username}</Text>
          </View>
        </View>
        <View>
          <Bell />
        </View>
      </View>

      {/* Wallet info and details */}

      {/* Start of the block */}
      {/*  */}
      <View style={styles.walletBlock}>
        <Viewbalance/>
        <View style={styles.walletOptionsContainer}>
          {walletOptions.map(
            ({ icon, title }: { icon: JSX.Element; title: string }) => (
              <View style={styles.optionContainer}>
                <View style={styles.optionIconBg}>
                  {/* Icon will be inside this */}
                  {icon}
                </View>
                <Text style={styles.optionTitle}>{title}</Text>
              </View>
            )
          )}
        </View>
      </View>

      {/* End of the block */}

      {/* Transaction history lists header*/}
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.transactionHeader}>
          <View>
            <Text style={styles.transactionHistory}>Transaction History</Text>
          </View>
          <View>
            <Text style={styles.seeAll}>See All</Text>
          </View>
        </View>

        {/* Flastlist containing the historys */}

        <FlatList
          contentContainerStyle={DATA.length === 0 && styles.centerEmptySet}
          data={DATA}
          renderItem={({ item }: any) => (
            <Transactionhistory date={item.time} datas={item.data} />
          )}
          keyExtractor={(item) => item.time}
          ListEmptyComponent={<EmptyComponent />}
        />
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default Home;
