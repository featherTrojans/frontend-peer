import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { ReactNode, useState, useEffect, useRef } from "react";
import LottieView from "lottie-react-native";
import { COLORS, FONTS, fontsize, icons, SIZES } from "../../../../constants";
import {
  Backheader,
  Bottombtn,
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

const {
  Backarrow,
  Cryingicon,
  Requestee1,
  Requestee2,
  Requestee3,
  Acceptedcheck,
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
        style={{ width: RFValue(190), height:  RFValue(190)}}
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
        {/* Image */}
        {/* {image} */}
        {/* <View
          style={{
            width: 44,
            height: 44,
            backgroundColor: COLORS.grey1,
            borderRadius: 44 / 2,
          }}
        /> */}
        <InitialsBg sideLength={44} name={agent} />
        <View style={styles.namesContainer}>
          <Text style={styles.withdrawProfileName}>{agent}</Text>
          <Text style={styles.withdrawProfileUsername}>@{agentUsername}</Text>
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

const Withdraw = ({ navigation, route }) => {
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

  const [index, setIndex] = useState(0);

  const activeColor = (activeIndex: number) => {
    return index === activeIndex ? "#003AD6" : "#000000";
  };
  const animateToIndex = (indexPoint: number) => {
    setIndex(indexPoint);
    setActive(["pending", "accepted"][indexPoint]);
    Animated.spring(horizontalOffset, {
      toValue: singleWidth() * indexPoint,
      useNativeDriver: true,
    }).start();
  };
  const singleWidth = () => {
    let calcWidth = SIZES.width;
    return calcWidth / 2;
  };
  const horizontalOffset = useRef(new Animated.Value(0)).current;

  const REQUESTDATA = active === "pending" ? pendingRequests : acceptedRequests;

  const Requestlist = () => {
    return (
      <View style={styles.requestContainer}>
        <View style={{ position: "relative", marginTop: RFValue(30), ...Shadow }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              style={{
                width: singleWidth(),
                paddingVertical: RFValue(24),
              }}
              activeOpacity={0.7}
              onPress={() => animateToIndex(0)}
            >
              <Text
                style={[
                  {
                    ...fontsize.smallest,
                    ...FONTS.regular,
                    textAlign: "center",
                    color: activeColor(0),
                  },
                ]}
              >
                Pending Requests ({pendingRequests.length})
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ width: singleWidth(), paddingVertical: RFValue(24)}}
              activeOpacity={0.7}
              onPress={() => animateToIndex(1)}
            >
              <Text
                style={[
                  {
                    ...fontsize.smallest,
                    ...FONTS.regular,
                    textAlign: "center",
                    color: activeColor(1),
                  },
                ]}
              >
                Accepted Requests ({acceptedRequests.length})
              </Text>
            </TouchableOpacity>
          </View>

          <Animated.View
            style={{
              position: "absolute",
              width: singleWidth(),
              height: 1.5,
              backgroundColor: COLORS.blue6,
              bottom: 0,
              left: 0,
              transform: [{ translateX: horizontalOffset }, { scaleX: 1 }],
            }}
          />
        </View>

        <FlatList
          data={REQUESTDATA}
          renderItem={({ item }) => (
            <Requesteeprofile
              list={item}
              onpress={() =>
                navigation.navigate(
                  item.status === "PENDING"
                    ? "Pendingwithdraw"
                    : "Acceptedwithdraw",
                  { requestInfo: item }
                )
              }
            />
          )}
          keyExtractor={(item) => `${item.reference}`}
          ListEmptyComponent={() => (
            <View style={{flex: 1, justifyContent: 'center', alignItems: "center"}}>
              <Text style={{...fontsize.small, ...FONTS.regular, color: COLORS.black, marginTop: RFValue(70), marginHorizontal: RFValue(50), textAlign: 'center', lineHeight: 24}}>Sorry you have no available request at the moment.</Text>
            </View>
          )}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Backheader title="Withdraw" />
      {loading && <Loader />}
      <Customstatusbar />
      <View style={{ flex: 1, paddingHorizontal: 15 }}>
        <Viewbalance />
        <View style={{ flex: 1 }}>
          {pendingRequests.length < 1 && acceptedRequests.length < 1 ? (
            <Emptyrequest />
          ) : (
            <Requestlist />
          )}
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
