import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import LottieView from "lottie-react-native";
import { COLORS, FONTS, fontsize, icons, SIZES } from "../../../constants";
import {
  Backheader,
  Bottombtn,
  InitialsBg,
  Viewbalance,
} from "../../../components";
import { styles } from "../Withdraws/Withdraw/Withdraw.styles";
import axiosCustom from "../../../httpRequests/axiosCustom";
import Customstatusbar from "../../shared/Customstatusbar";
import Usericondark from "../../../assets/icons/Usericondark";
import { Shadow } from "../../../constants/theme";

const {
  Backarrow,
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
        style={{ width: 190, height: 190 }}
      />
      {/* Information text */}
      <Text style={styles.emptyListText}>
        Padi, you have not performed any cash deposits today, Start Now.
      </Text>
    </View>
  );
};

const Deposit = ({ navigation }) => {
  const [active, setActive] = useState("pending");
  const [pending, setPending] = useState([]);
  const [accepted, setAccepted] = useState([]);
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

  useEffect(() => {
    getpendingrequest();
    getacceptedrequest();
  }, []);

  
  const getpendingrequest = async () => {
    try {
      const response = await axiosCustom.get("/request/depositor/pending");
      
      setPending(response.data.data);
    } catch (err) {}
  };
  const getacceptedrequest = async () => {
    try {
      const response = await axiosCustom.get("/request/depositor/accepted");
      
      setAccepted(response.data.data);
    } catch (err) {}
  };

  // Requestee profile
  const Requesteeprofile = ({ list, onpress }: any) => {
    const { reference, charges, status, full_name, user, amount } = list;
    return (
      <TouchableOpacity
        style={styles.depositProfileContainer}
        activeOpacity={0.7}
        onPress={onpress}
      >
        <View style={styles.depositProfileDetails}>
          {/* Tro replace this with the user image */}
          <InitialsBg sideLength={44} name={user?.fullName} />
          <View style={{ marginLeft: 13 }}>
            <Text style={styles.depositProfileName}>{user?.fullName}</Text>
            <Text style={styles.depositAmount}>
              NGN {amount}{" "}
              <Text style={styles.depositBasecharge}>
                + NGN {charges} Charges
              </Text>
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const REQUESTDATA = active === "pending" ? pending : accepted;

  const Requestlist = () => {
    return (
      <View style={styles.requestContainer}>
        <View style={{ position: "relative", marginTop: 30, ...Shadow }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              style={{
                width: singleWidth(),
                paddingVertical: 24,
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
                Pending Requests ({pending.length})
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ width: singleWidth(), paddingVertical: 24 }}
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
                Accepted Requests ({accepted.length})
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
          contentContainerStyle={{ marginTop: 30 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (

            <View style={{flex: 1, justifyContent: 'center', alignItems: "center"}}>
              <Text style={{...fontsize.small, ...FONTS.regular, color: COLORS.black, marginTop: 70, marginHorizontal: 50, textAlign: 'center', lineHeight: 24}}>Sorry you have no available request at the moment.</Text>
            </View>
          )}
          renderItem={({ item }) => (
            <Requesteeprofile
              list={item}
              onpress={() =>
                navigation.navigate(
                  item.status === "PENDING"
                    ? "Pendingdeposit"
                    : "Accepteddeposit",
                  { requestInfo: item }
                )
              }
            />
          )}
          keyExtractor={(item) => `${item.reference}`}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Backheader title="Deposit" />
      <Customstatusbar />
      <View style={{ flex: 1, paddingHorizontal: 15 }}>
        <Viewbalance />

        
        <View style={{ flex: 1 }}>
          {pending.length < 1 && accepted.length < 1 ? (
            <Emptyrequest />
          ) : (
            <Requestlist />
          )}
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
