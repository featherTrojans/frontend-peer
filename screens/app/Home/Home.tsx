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
  TouchableOpacity,
} from "react-native";
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
  Cryingicon,
} = icons;

const DATA = [
  {
      "transId": "gIdiHOI6hQ",
      "initialBal": "3200",
      "amount": "100",
      "finalBal": "3100",
      "description": "#100 transferred to elon",
      "from": "EZEKO",
      "to": "elon",
      "direction": "out",
      "createdAt": "2022-01-31T22:49:14.000Z"
  },
  {
      "transId": "dvM60YV55m",
      "initialBal": "3100",
      "amount": "105",
      "finalBal": "2995",
      "description": "#105 transferred to ELON",
      "from": "EZEKO",
      "to": "ELON",
      "direction": "out",
      "createdAt": "2022-01-31T22:51:30.000Z"
  },
  {
      "transId": "4ljCwmQSXp",
      "initialBal": "2965",
      "amount": "5",
      "finalBal": "2970",
      "description": "#5 transferred from ELON",
      "from": "ELON",
      "to": "EZEKO",
      "direction": "in",
      "createdAt": "2022-01-31T23:21:38.000Z"
  },
  {
      "transId": "rOJoN16QP8",
      "initialBal": "2970",
      "amount": "5",
      "finalBal": "2975",
      "description": "#5 transferred from ELON",
      "from": "ELON",
      "to": "EZEKO",
      "direction": "in",
      "createdAt": "2022-01-31T23:21:48.000Z"
  },
  {
      "transId": "1czZV0yeXe",
      "initialBal": "2975",
      "amount": "15",
      "finalBal": "2990",
      "description": "#15 transferred from ELON",
      "from": "ELON",
      "to": "EZEKO",
      "direction": "in",
      "createdAt": "2022-01-31T23:24:43.000Z"
  },
  {
      "transId": "IZGgBU1jV3",
      "initialBal": "2990",
      "amount": "15",
      "finalBal": "2975",
      "description": "#15 transferred to EZEKO",
      "from": "EZEKO",
      "to": "EZEKO",
      "direction": "out",
      "createdAt": "2022-01-31T23:26:01.000Z"
  },
  {
      "transId": "fIjSVjVdyk",
      "initialBal": "2990",
      "amount": "15",
      "finalBal": "3005",
      "description": "#15 transferred from EZEKO",
      "from": "EZEKO",
      "to": "EZEKO",
      "direction": "in",
      "createdAt": "2022-01-31T23:26:01.000Z"
  },
  {
      "transId": "mPhgPmLw7g",
      "initialBal": "3005",
      "amount": "15",
      "finalBal": "2990",
      "description": "#15 transferred to EZEKO",
      "from": "EZEKO",
      "to": "EZEKO",
      "direction": "out",
      "createdAt": "2022-01-31T23:26:24.000Z"
  },
  {
      "transId": "v901tUJPYt",
      "initialBal": "3005",
      "amount": "15",
      "finalBal": "3020",
      "description": "#15 transferred from EZEKO",
      "from": "EZEKO",
      "to": "EZEKO",
      "direction": "in",
      "createdAt": "2022-01-31T23:26:24.000Z"
  },

]



const walletOptions = [
  {
    icon: <Withdraw />,
    title: "Withdraw",
    link:"Withdraw"
  },
  {
    icon: <Deposit />,
    title: "Deposit",
    link:"Deposit"
  },
  {
    icon: <Transfer />,
    title: "Transfer",
    link:"Transfercash"
  }, 
  {
    icon: <Paybills />,
    title: "Paybills",
    link:"Choosewallet"
  },
];


const Home = ({navigation}: {navigation: any}) => {
  console.log(navigation)
  const {setAuthData} = useContext(AuthContext)
  const [info, setInfo] = useState({});
  const [loading, setLoading] = useState(false)
  console.log("I am mounting again")
  useEffect(()=>{
    getDashboardData()
  },[])
  const getDashboardData = async ()=>{
    console.log("I am fetching again")
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
        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate("Notifications")}>
          <Bell />
        </TouchableOpacity>
      </View>

      {/* Wallet info and details */}

      {/* Start of the block */}
      {/*  */}
      <View style={styles.walletBlock}>
        <Viewbalance navigate={() => navigation.navigate("Addcash")}/>
        <View style={styles.walletOptionsContainer}>
          {walletOptions.map(
            ({ icon, title,link }: { icon: JSX.Element; title: string , link:string}) => (
              <TouchableOpacity onPress={()=>navigation.navigate(link)} style={styles.optionContainer} activeOpacity={0.8}>
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
          data={formatData(info?.transactions)}
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
