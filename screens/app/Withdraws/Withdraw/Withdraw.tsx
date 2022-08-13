import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from "react-native";
import React, { ReactNode, useState, useEffect, useRef } from "react";
import LottieView from "lottie-react-native";
import { COLORS, FONTS, fontsize, icons, SIZES } from "../../../../constants";
import {
  Backheader,
  Bottombtn,
  Custombutton,
  InitialsBg,
  Loader,
  Viewbalance,
} from "../../../../components";
import { styles } from "./Withdraw.styles";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import amountFormatter from "../../../../utils/formatMoney";

import Cryinganim from "../../../../assets/Lottie/animations/feather_cry_emoji.json";
import Customstatusbar from "../../../shared/Customstatusbar";
import { Shadow } from "../../../../constants/theme";
import { RFValue } from "react-native-responsive-fontsize";
import { SafeAreaView } from "react-native-safe-area-context";

const {
  Backarrow,
  Cryingicon,
  Requestee1,
  Requestee2,
  Requestee3,
  Acceptedcheck,
  Emptyicon,
  Cryinganimate,
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
      <LottieView
        source={Cryinganimate}
        autoPlay
        loop
        style={{ width: RFValue(190), height: RFValue(190) }}
      />

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
    <TouchableOpacity
      style={styles.withdrawProfileContainer}
      activeOpacity={0.8}
      onPress={onpress}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
    
        <InitialsBg sideLength={44} name={agent} />
        <View style={styles.namesContainer}>
          <Text style={styles.withdrawProfileName}>{agent}</Text>
          <Text style={styles.withdrawProfileUsername}>
            @{agentUsername.toLowerCase()}
          </Text>
        </View>
      </View>

      <View style={styles.priceAndCheck}>
        <Text style={styles.withdrawProfilePrice}>
          N{amountFormatter(total)}
        </Text>

        {status === "ACCEPTED" && <Acceptedcheck />}
      </View>
    </TouchableOpacity>
  );
};

const Withdraw = ({ navigation }) => {
  const [active, setActive] = useState("pending");
  const [loading, setLoading] = useState(false);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);

  useEffect(() => {
    getPendingRequest();
    getAcceptedRequest();
  }, []);

  const getPendingRequest = async () => {
    setLoading(true);
    try {
      const response = await axiosCustom.get("/request/pending");
      setPendingRequests(response?.data?.data);
    } catch (err) {
      console.log(err.response);
    } finally {
      setLoading(false);
    }
  };

  const getAcceptedRequest = async () => {
    try {
      const response = await axiosCustom.get("/request/accepted");
      setAcceptedRequests(response?.data?.data);
    } catch (err) {
      console.log(err.response);
    }
  };


  const datas = [
    {
      title: "Pending Requests",
      data: [
        { name: "Damilare Seyinde" },
        { name: "Rasaq Momoh" },
        { name: "Peterson Yeyejare" },
      ],
    },
    { title: "Accepted Requests", data: [{name: "Famuagun"}] },
  ];

  const Requestuser = ({ details, accepted }: {details: any , accepted: boolean }) => {
    const {name} = details
    return (
      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              width: 34,
              height: 34,
              backgroundColor: "#8456FF",
              borderRadius: 34 / 2,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: COLORS.white, ...fontsize.smaller, ...FONTS.medium }}>D</Text>

            {accepted && (
              <View style={{ position: "absolute", bottom: -3, right: 0 }}>
                <Acceptedcheck />
              </View>
            )}
          </View>

          <View style={{ marginLeft: 12 }}>
            <Text
              style={{
                ...fontsize.smaller,
                ...FONTS.medium,
                color: COLORS.blue9,
                lineHeight: 27,
              }}
            >
              {name}
            </Text>
            <Text style={{ ...fontsize.smallest, color: COLORS.halfBlack }}>
              12 Mins Away
            </Text>
          </View>
        </View>

        <Text style={{ ...fontsize.smallest, ...FONTS.medium, lineHeight: 27 }}>
          N23,000
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Backheader title="Withdraw" />
      {/* {loading && <Loader />} */}
      <Customstatusbar />
      <View style={{ paddingHorizontal: 15 }}>
        <Viewbalance />
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15, marginTop: 15 }}
        data={datas}
        renderItem={({ item, index }) => {
          const isLast = datas.length === index + 1;
          const { title, data } = item;

          return (
            <View
              style={{
                backgroundColor: COLORS.white,
                width: SIZES.width - 30,
                height: "auto",
                marginRight: isLast ? 0 : 20,
                borderRadius: 15,
                paddingHorizontal: 16,
                paddingVertical: 22,
                alignSelf: "flex-start",
              }}
            >
              <Text
                style={{
                  ...fontsize.smaller,
                  ...FONTS.regular,
                  color: COLORS.blue9,
                  marginBottom: 42,
                }}
              >
                {title}
              </Text>

                {data.length > 0 ?    
                
                
                data.map((info, index) => {
                  const isLastItem = data.length === index + 1;
                  const accepted = title === "Accepted Requests"
                  return (
                    <View key={index}>
                      <Requestuser details={info} accepted={accepted}/>
                      {!isLastItem && (
                        <View
                          style={{
                            marginVertical: 21,
                            backgroundColor: COLORS.borderColor2,
                            height: 0.5,
                          }}
                        />
                      )}
                    </View>
                  );
                })
                
                : 
                
                <View style={{ justifyContent: "center", alignItems: "center", paddingVertical: 50, paddingHorizontal: 30}}>
                  <Emptyicon />
                  <Text style={{textAlign: "center", marginTop: 20, ...fontsize.smaller, ...FONTS.regular}}>Padi, you don’t have any pending withdrawal requests</Text>
                </View>
                
                
                }

              {/* {data.map((info, index) => {
                const isLastItem = data.length === index + 1;
                const accepted = title === "Accepted Requests"
                return (
                  <View key={index}>
                    <Requestuser details={info} accepted={accepted}/>
                    {!isLastItem && (
                      <View
                        style={{
                          marginVertical: 21,
                          backgroundColor: COLORS.borderColor2,
                          height: 0.5,
                        }}
                      />
                    )}
                  </View>
                );
              })} */}


            </View>
          );
        }}
        keyExtractor={(item) => item.title}
      />

      <View
        style={{
          flex: 1,
          paddingHorizontal: 15,
          justifyContent: "flex-end",
          marginBottom: 20,
        }}
      >
        <Custombutton
          btntext="Withdraw Cash"
          onpress={() => console.log("hellow")}
        />
      </View>

      {/* <Bottombtn
        title="NEW WITHDRAWAL"
        onpress={() => navigation.navigate("Requestnew")}
      /> */}
    </SafeAreaView>
  );
};

export default Withdraw;
