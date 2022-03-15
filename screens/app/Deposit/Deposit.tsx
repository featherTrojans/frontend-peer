import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import LottieView from "lottie-react-native"
import { COLORS, FONTS, fontsize, icons } from "../../../constants";
import { Backheader, Bottombtn, Viewbalance } from "../../../components";
import { styles } from "../Withdraws/Withdraw/Withdraw.styles";
import axiosCustom from "../../../httpRequests/axiosCustom";

const {
  Backarrow,
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
      {/* Information text */}
      <Text style={styles.emptyListText}>
          Padi, you have not performed any cash deposits today, Start Now.
      </Text>
    </View>
  );
};


const Deposit = ({navigation}) => {
  const [active, setActive] = useState("pending");
  const [pending, setPending] = useState([])
  const [accepted, setAccepted] = useState([])

  useEffect(()=>{
    getpendingrequest()
    getacceptedrequest()
  },[])

  console.log(pending, accepted)
  const getpendingrequest = async()=>{
    try{
      const response = await axiosCustom.get("/request/depositor/pending");
      setPending(response.data.data)
    }catch(err){

    }
  }
  const getacceptedrequest = async()=>{
    try{
      const response = await axiosCustom.get("/request/depositor/accepted");
      setAccepted(response.data.data)
    }catch(err){

    }
  }

  // Requestee profile
  const Requesteeprofile = ({ list, onpress}:  any ) => {
    const { image, full_name, username, price, status, base_charge } = list;
    return (
      <TouchableOpacity style={styles.depositProfileContainer} activeOpacity={0.7} onPress={onpress}>
        <View style={styles.depositProfileDetails}>
          {/* Tro replace this with the user image */}
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: COLORS.grey1,
            }}
          />
          <View style={{ marginLeft: 13 }}>
            <Text style={styles.depositProfileName}>{full_name}</Text>
            <Text style={styles.depositAmount}>
              NGN {price}{" "}
              <Text style={styles.depositBasecharge}>
                + NGN {base_charge} Charges
              </Text>
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const REQUESTDATA = active === "pending" ? pending : accepted

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
          renderItem={({ item }) => <Requesteeprofile list={item}    onpress={() =>
            navigation.navigate(
              item.status === "pending"
                ? "Pendingdeposit"
                : "Accepteddeposit"
            )
          } />}
          keyExtractor={(item) => `${item.full_name}`}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Backheader title="Deposit" />

      <View style={{ flex: 1, paddingHorizontal: 15 }}>
      <Viewbalance navigate={() => navigation.navigate("Addcash")}/>
        <View style={{ flex: 1 }}>
          {(pending.length < 1 && accepted.length < 1) ? <Emptyrequest /> : <Requestlist />}
        </View>
      </View>

      {/* <Bottombtn
        title="NEW DEPOSIT"
        onpress={() => console.log("New Transaction clicked")}
      /> */}
    </View>
  );
};

export default Deposit;
