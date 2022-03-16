import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { ReactNode, useState, useEffect } from "react";
import LottieView from "lottie-react-native"
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import { Backheader, Bottombtn, Loader, Viewbalance } from "../../../../components";
import { styles } from "./Withdraw.styles";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import amountFormatter from "../../../../utils/formatMoney";

import Cryinganim from "../../../../assets/Lottie/animations/feather_cry_emoji.json"

const {
  Backarrow,
  Cryingicon,
  Requestee1,
  Requestee2,
  Requestee3,
  Acceptedcheck,
  Cryinganimate
} = icons;

type DataProps = {
  image: JSX.Element;
  full_name: string;
  username: string;
  price: string;
};



// Component to show when the list is empty
const Emptyrequest = () => {
  return (
    <View style={styles.emptyListContainer}>
      {/* Crying icons */}
      <LottieView source={Cryinganimate} autoPlay loop style={{width: 190, height: 190}}/>

      <Text style={styles.emptyListText}>
        Padi, you have not performed any cash request today, Start Later.
      </Text>
    </View>
  );
};

// Requestee profile
const Requesteeprofile = ({ list, onpress }: any) => {
  const { image, agent, agentUsername, total, status } = list;
  
  return (
    <TouchableOpacity style={styles.withdrawProfileContainer} activeOpacity={0.8} onPress={onpress}>
      <View style={{ flexDirection: "row" }}>
        {/* Image */}
        {image}

        <View style={styles.namesContainer}>
          <Text style={styles.withdrawProfileName}>{agent}</Text>
          <Text style={styles.withdrawProfileUsername}>@{agentUsername}</Text>
        </View>
      </View>

      <View style={styles.priceAndCheck}>
        <Text style={styles.withdrawProfilePrice}>N{amountFormatter(total)}</Text>

        {status === "ACCEPTED" && <Acceptedcheck />}
      </View>
    </TouchableOpacity>
  );
};

const Withdraw = ({ navigation }) => {
  const [active, setActive] = useState("pending");
  const [loading, setLoading] = useState(false);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState([])
  
  useEffect(()=>{
    getPendingRequest();
    getAcceptedRequest();
  },[])
  const getPendingRequest = async ()=>{
    setLoading(true)
    try{
        const response = await axiosCustom.get("/request/pending")
        setPendingRequests(response?.data?.data)
        
    }catch(err){
      console.log(err.response)
    }finally{
      setLoading(false)
    }
  }
  const getAcceptedRequest = async ()=>{
    try{
      const response = await axiosCustom.get("/request/accepted")
      setAcceptedRequests(response?.data?.data)
    }catch(err){
      console.log(err.response)
    }
  }

  const REQUESTDATA = active === "pending" ? pendingRequests: acceptedRequests;

  const Requestlist = () => {
    return (
      <View style={styles.requestContainer}>
        
        <View style={styles.listHeaderContainer}>
          <TouchableOpacity onPress={() => setActive("pending")}>
            <Text
              style={[
                styles.listHeaderText,
                active === "pending" && styles.activeStyles,
              ]}
            >
              Pending Requests
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setActive("accepted")}>
            <Text
              style={[
                styles.listHeaderText,
                active === "accepted" && styles.activeStyles,
              ]}
            >
              Accepted Requests
            </Text>
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={REQUESTDATA}
          renderItem={({ item }) => (
            <Requesteeprofile
              list={item}
              onpress={() =>navigation.navigate(item.status === "PENDING"? "Pendingwithdraw": "Acceptedwithdraw",{requestInfo:item})}
            />
          )}
          keyExtractor={(item) => `${item.reference}`}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Backheader title="Withdraw" />
      {loading && <Loader />}
      <View style={{ flex: 1, paddingHorizontal: 15 }}>
      <Viewbalance />
        <View style={{ flex: 1 }}>
          {(pendingRequests.length < 1 && acceptedRequests.length < 1)  ? <Emptyrequest /> : <Requestlist />}
        </View>
      </View>

      <Bottombtn
        title="NEW WITHDRAWAL"
        onpress={() => navigation.navigate("Requestnew")}
      />
    </View>
  );
};

export default Withdraw;
