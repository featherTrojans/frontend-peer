import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  useRef,
} from "react";
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
  Platform,
} from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import LottieView from "lottie-react-native";
import { Service, Transactionhistory, Viewbalance } from "../../../components";
import { COLORS, FONTS, fontsize, icons } from "../../../constants";
import { AuthContext } from "../../../context/AuthContext";
import axiosCustom from "../../../httpRequests/axiosCustom";
import formatData from "../../../utils/fomatTrans";
import { styles } from "./Home.styles";
import { customNavigation } from "../../../utils/customNavigation";

const {
  Profilepics,
  Bell,
  Arrowright,
  Eyecrossed,
  Withdraw,
  Paybills,
  Transfer,
  Deposit,
  Smalluseravatar,
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
    link: "Depositupdate",
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
  const { setAuthData, authdata, messageToken } = useContext(AuthContext);
  // const [info, setInfo] = useState({});
  const histories = formatData(authdata?.transactions);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [extractedToken, setExtractedToken] = useState()

  // const setMessageToken = async () => {
  //   try {
  //     const response = await axiosCustom.post("/auth/token/create", {messageToken: "ExponentPushToken[HtMvcuJzxC2c3PxLxJewxg]"})
  //     console.log(response, "Here is the response data")
  //   } catch (err) {
  //     console.log(err.response.data)
  //   }
  // }

  const tokenExtractor = (string: any) => {
    const firstIndex = string.indexOf("[")
    return string.slice(firstIndex+1, -1)
  }
  useEffect(() => {
    console.log(authdata, "here is the authdat")
  }, [])

  useEffect(() => {
    // setMessageToken()
    console.log(messageToken, "This is my token messagedstss")
    if(messageToken){
     setExtractedToken(tokenExtractor(messageToken))
    }
    console.log(extractedToken, 'Extracted token')
    
    sendAnotherToken()
  },[extractedToken,messageToken])

  const sendAnotherToken = async ()=>{
    try{
      const response = await axiosCustom.post("/auth/token/create",{messageToken: `ExponentPushToken[${extractedToken}]`})
      console.log(response)
    }catch(err){
      console.log(err.response.data)
    }
  }

  //setting up websocket
  useEffect(() => {
    const ws = new WebSocket(
      `wss://feather.com.ng:3300/balance/${authdata.userId}`,
      "realtime"
    );
    ws.onmessage = (data) => {
      // i want to update the context
      if (data.data == authdata.walletBal) return;
      setAuthData({ ...authdata, walletBal: data.data });
    };

    return ws.close();
  }, []);

  useEffect(() => {
    getDashboardData();
  }, [authdata.walletBal]);

  const getDashboardData = async () => {
    console.log("I am fetching again from home");
    setLoading(true);
    try {
      const response = await axiosCustom.get("/dashboard");
      // setInfo(response?.data?.data);
      setAuthData(response?.data?.data);
    } catch (err) {
      console.log(err.response);
  } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const onRefreshFunc = useCallback(() => {
    setRefreshing(true);
    getDashboardData();
  }, []);

  const EmptyComponent = () => {
    return (
      <View style={styles.emptyContainer}>
        {/* Crying icons */}
        <LottieView
          source={Cryinganimate}
          autoPlay
          loop
          style={{ width: 190, height: 190 }}
        />
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
    if (value?.split(" ").length > 1) {
      return value?.split(" ")[1];
    } else {
      return value;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <View style={styles.headerContainer}>
        {/* user profile and notification icon */}
        <View style={styles.profileContainer}>

          <View>
          {/* <Profilepics /> */}
          {/* <Useravatar /> */}
          <Smalluseravatar />
          {/* <Defaultuseravatar /> */}
          </View>


          <View style={styles.profileNameContainer}>
            <Text style={styles.profileName}>
              Welcome, {nameToShow(authdata?.fullName)}✌🏽
            </Text>
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
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefreshFunc}
            progressBackgroundColor="white"
            colors={["#003AD6"]}
            tintColor={"#003AD6"}
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
                  key={title}
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
            <TouchableOpacity onPress={() => navigation.push("Transactions")}>
              <Text style={styles.seeAll}>See All</Text>
            </TouchableOpacity>
          </View>

          {histories.length === 0 ? (
            <EmptyComponent />
          ) : (
            histories.map((history) => (
              <Transactionhistory date={history.time} datas={history.data}  key={history.time}/>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
