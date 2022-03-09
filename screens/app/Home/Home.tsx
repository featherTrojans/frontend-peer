import React, { useState, useEffect, useContext, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  ScrollView,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import LottieView from "lottie-react-native"
import { Service, Transactionhistory, Viewbalance } from "../../../components";
import { COLORS, FONTS, fontsize, icons } from "../../../constants";
import { AuthContext } from "../../../context/AuthContext";
import axiosCustom from "../../../httpRequests/axiosCustom";
import formatData from "../../../utils/fomatTrans";
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
  Cryinganimate,
} = icons;



const walletOptions = [
  {
    icon: <Withdraw />,
    title: "Withdraw",
    link: "Withdraw",
  },
  {
    icon: <Deposit />,
    title: "Deposit",
    link:"Depositupdate"
  },
  {
    icon: <Transfer />,
    title: "Transfer",
    link: "Transfercash",
  },
  {
    icon: <Paybills />,
    title: "Paybills",
    link: "Choosewallet",
  },
];

const Home = ({ navigation }: { navigation: any }) => {
  
  const {setAuthData, authdata } = useContext(AuthContext);
  // const [info, setInfo] = useState({});
  const histories = formatData(authdata?.transactions)
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false)


  useEffect(() => {
    getDashboardData();
  }, []);


  const getDashboardData = async () => {
    console.log("I am fetching again");
    setLoading(true);
    try {
      const response = await axiosCustom.get("/dashboard");
      // setInfo(response?.data?.data);
      setAuthData(response?.data?.data);
    } catch (err) {
      console.log(err.response);
    } finally {
      setLoading(false);
      setRefreshing(false) 
    }
  };

 
  const onRefreshFunc = useCallback(() => {
    setRefreshing(true);
    getDashboardData()
  }, []);

  const EmptyComponent = () => {
    return (
      <View style={styles.emptyContainer}>
        {/* Crying icons */}
        <LottieView source={Cryinganimate} autoPlay loop style={{width: 190, height: 190}}/>
        <View style={{ marginHorizontal: 50 }}>
          <Text style={styles.emptyText}>
            Padi, you have not performed any transactions yet.{" "}
            <Text style={styles.transactNow}>Transact Now</Text>
          </Text>
        </View>
      </View>
    );
  };

  const nameToShow = (value: string) => {
    if(value?.split(' ').length > 1){
      return value?.split(" ")[1]
    }
    else{
      return value
    }
  }

  

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.headerContainer}>
        {/* user profile and notification icon */}
        <View style={styles.profileContainer}>
          <Profilepics />
          <View style={styles.profileNameContainer}>
            <Text style={styles.profileName}>Welcome, {nameToShow(authdata?.fullName)}</Text>
            <Text style={styles.profileUsername}>@{authdata?.username}</Text>
          </View>
        </View>
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => navigation.navigate("Notifications")}
        >
          <Bell />
        </TouchableOpacity>
      </View>

      {/* Wallet info and details */}

      {/* Start of the block */}
      {/*  */}

      <ScrollView
       refreshControl={
         <RefreshControl 
         refreshing={refreshing}
         onRefresh={onRefreshFunc}
         progressBackgroundColor="white"
         colors={['#003AD6']}
         tintColor={'#003AD6'}
         />
       }
      >
        <View style={styles.walletBlock}>
          <Viewbalance navigate={() => navigation.navigate("Addcash")} />
          <View style={styles.walletOptionsContainer}>
            {walletOptions.map(
              ({
                icon,
                title,
                link,
              }: {
                icon: JSX.Element;
                title: string;
                link: string;
              }) => (
                <TouchableOpacity
                  onPress={() => navigation.navigate(link)}
                  style={styles.optionContainer}
                  activeOpacity={0.8}
                >
                  <View style={styles.optionIconBg}>
                    {/* Icon will be inside this */}
                    {icon}
                  </View>
                  <Text style={styles.optionTitle}>{title}</Text>
                </TouchableOpacity>
              )
            )}
          </View>
        </View>

        {/* End of the block */}

        {/* Transaction history lists header*/}
        <View style={{ flex: 1 }}>
          <View style={styles.transactionHeader}>
            <View>
              <Text style={styles.transactionHistory}>Transaction History</Text>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate("Transactions")}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          {/* Flastlist containing the historys */}

          {/* <FlatList
            contentContainerStyle={DATA.length === 0 && styles.centerEmptySet}
            // data={formatData(info?.transactions)}
            data={DATA}
            renderItem={({ item }: any) => (
              <Transactionhistory date={item.time} datas={DATA} />
              // <Transactionhistory date={item.time} datas={item.data} />
            )}
            keyExtractor={(item) => item.time}
            ListEmptyComponent={<EmptyComponent />}
          /> */}

          {histories.length === 0 ? <EmptyComponent /> : histories.map(history => <Transactionhistory date={history.time} datas={history.data} />)}
          

        
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
