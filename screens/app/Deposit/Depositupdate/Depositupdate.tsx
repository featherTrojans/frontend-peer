import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  Animated,
  FlatList,
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
// import { styles } from "./Depositupdate.styles";
import moment from "moment";
import {
  Backheader,
  Bottombtn,
  Custombutton,
  Horizontaline,
  Loader,
  Mainwrapper,
  Viewbalance,
} from "../../../../components";
import LottieView from "lottie-react-native";
import { COLORS, FONTS, fontsize, icons, SIZES } from "../../../../constants";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import amountFormatter from "../../../../utils/formatMoney";
import { AuthContext } from "../../../../context/AuthContext";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import Customstatusbar from "../../../shared/Customstatusbar";
import { getCurrentLocation } from "../../../../utils/customLocation";
import { RFValue } from "react-native-responsive-fontsize";
import { withdrawstyles } from "../../Withdraws/Withdraw/Withdraw.styles";
// import { SafeAreaView } from "react-native-safe-area-context";
const {
  TransferIcon,
  Location,
  Accountbalanceicon,
  Trendingupright,
  Viewrequesteye,
  Viewcashrequesticon,
  Acceptedcheck,
  Cryinganimate,
} = icons;

// const Emptyrequest = () => {
//   return (
//     <View style={styles.emptyListContainer}>
//       {/* Crying icons */}
//       <LottieView
//         source={Cryinganimate}
//         autoPlay
//         loop
//         style={{ width: 190, height: 190 }}
//       />
//       {/* Information text */}
//       <Text style={styles.emptyListText}>
//         Padi, you have not performed any cash deposits today, Start Now.
//       </Text>
//     </View>
//   );
// };

// const StatusUpdate = ({ status, navigation }: any) => {
//   const { authdata } = useContext(AuthContext);
//   return (
//     <>
//       <Customstatusbar />
//       <View style={{ flex: 1 }}>
//         <View style={[styles.contentContainer]}>
//           <View style={styles.topSection}>
//             {/* Icons */}
//             <View style={{ flexDirection: "row" }}>
//               <TransferIcon />
//               <View style={{ marginLeft: 24 }}>
//                 <Text style={styles.lastAmountText}>Last Amount Update</Text>
//                 <Text style={styles.updatedTimeText}>
//                   Updated {moment(status.time).calendar()}
//                 </Text>
//               </View>
//             </View>

//             <Text style={styles.lastAmountPrice}>
//               NGN {amountFormatter(status.status[0].amount)}
//             </Text>

//           </View>

//           <View style={styles.horizontalLine} />

//           <View>
//             <View style={styles.locationIconandText}>
//               {/* icons */}
//               <Location />
//               <Text style={styles.location}>
//                 {status.status[0].locationText}
//               </Text>
//             </View>

//             <View style={styles.expirationContainer}>
//               <Text style={styles.expirationText}>
//                 Expires{" "}
//                 {moment(status.status[0].createdAt).add(1, "days").calendar()}
//               </Text>
//               <TouchableOpacity
//                 onPress={() =>
//                   navigation.navigate("Depositinput", {
//                     type: "update",
//                     reference: status.status[0].reference,
//                   })
//                 }
//               >
//                 <Text style={styles.updateText}>Update</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </View>

//         <View style={styles.contentContainer}>
//           <View style={styles.detailsRow}>
//             <View style={styles.iconAndTitle}>
//               <Accountbalanceicon />
//               <Text style={styles.iconTitle}>Balance</Text>
//             </View>
//             <Text style={styles.iconValue}>
//               N{" "}
//               {amountFormatter(`${status.status[0].balance}`)}
//             </Text>
//           </View>
//           <View style={styles.horizontalLine} />
//           <View style={styles.detailsRow}>
//             <View style={styles.iconAndTitle}>
//               <Trendingupright />
//               <Text style={styles.iconTitle}>My Earnings last 24hrs</Text>
//             </View>
//             <Text style={styles.iconValue}>
//               N {amountFormatter(status.totalEarnings)}
//             </Text>
//           </View>
//         </View>

//         <TouchableOpacity
//           onPress={() => {
//             navigation.navigate("Deposit",{
//               pendingRequests:status.pendingRequests,
//               acceptedRequests:status.acceptedRequests
//             });
//           }}
//           style={styles.bottomBtn}
//           activeOpacity={0.8}
//         >
//           <View style={{ flexDirection: "row", alignItems: "center" }}>
//             <View style={styles.eyeiconBg}>
//               <Viewrequesteye />
//             </View>
//             <Text style={styles.viewRequestText}>
//               View Cash Requests (
//               {status.pendingRequests.length + status.acceptedRequests.length})
//             </Text>
//           </View>

//           <Viewcashrequesticon />
//         </TouchableOpacity>
//       </View>
//     </>
//   );
// };

const Emptyrequest = () => {
  return (
    <View style={withdrawstyles.emptyListContainer}>
      <LottieView
        source={Cryinganimate}
        autoPlay
        loop
        style={{ width: RFValue(103), height: RFValue(103) }}
      />
      <Text style={withdrawstyles.emptyListText}>
        Padi, you don’t have any pending withdrawal requests
      </Text>
    </View>
  );
};

const Depositupdate = ({ navigation, route }) => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [coords, setCoords] = useState<any>({});

  const scrollX = useRef<any>(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);

  const [viewIndex, setViewIndex] = useState<number>(0);

  // i removed changed from the params passed to this useRef below
  const onViewChangeRef = useRef<
    ({ viewableItems, changed }: { viewableItems: any; changed: any }) => void
  >(({ viewableItems, changed }) => {
    setViewIndex(viewableItems[0]?.index);
  });



  // Previous version functions
  // useEffect(() => {
  //   getDepositStatus();
  // },[route.params?.from]);
  // useEffect(() => {
  //   updateDepositLocation();
  // }, [status, coords]);
  // useEffect(() => {
  //   getLocation();
  // }, []);

  // const getLocation = async () => {
  //   try {
  //     const { coordinates, address, locationObj }: any =
  //       await getCurrentLocation();
  //     setCoords({ ...coordinates, locationText: address });
  //   } catch (err) {
  //   } finally {
  //   }
  // };

  // const getDepositStatus = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await axiosCustom.get("/status/get");
  //     setStatus(response.data.data);
  //   } catch (err) {
  //     // maybe show the error
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  // const updateDepositLocation = async () => {

  //   try {
  //     if (status && coords.longitude) {
  //       const response = await axiosCustom.put("/status/location/update", {
  //         longitude: coords.longitude,
  //         latitude: coords.latitude,
  //         locationText: coords.locationText,
  //         reference: status?.status[0]?.reference,
  //       });
  //     }
  //   } catch (err) {
  //   } finally {
  //   }
  // };



  const datas = [
    {
      title: "Pending Requests",
      data: [
        // { name: "Damilare Seyinde" },
        // { name: "Rasaq Momoh" },
        // { name: "Peterson Yeyejare" },
      ],
    },
    { title: "Accepted Requests", data: [] },
  ];

  const Requestuser = ({
    details,
    accepted,
  }: {
    details: any;
    accepted: boolean;
  }) => {
    const { name } = details;
    return (
      <View style={withdrawstyles.requesteeprofilewrap}>
        <View style={withdrawstyles.requesteeprofilewrap}>
          <View style={withdrawstyles.requesteeinitialsbg}>
            <Text style={withdrawstyles.requesteeinitialtext}>D</Text>

            {accepted && (
              <View style={{ position: "absolute", bottom: -3, right: 0 }}>
                <Acceptedcheck />
              </View>
            )}
          </View>

          <View style={{ marginLeft: 12 }}>
            <Text style={withdrawstyles.requesteename}>{name}</Text>
            <Text style={withdrawstyles.requesteedistance}>12 Mins Away</Text>
          </View>
        </View>

        <Text style={withdrawstyles.requestedamount}>N23,000</Text>
      </View>
    );
  };

  return (
    <Mainwrapper>
      <Backheader title="Deposit" />

      <View style={{ paddingHorizontal: 15 }}>
        <Viewbalance />
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15, marginTop: 15 }}
        snapToAlignment="center"
        pagingEnabled
        bounces={false}
        data={datas}
        renderItem={({ item, index }) => {
          const isLast = datas.length === index + 1;
          const { title, data } = item;

          return (
            <View
              style={[
                withdrawstyles.requesteeblock,
                { marginRight: isLast ? 0 : 20 },
              ]}
            >
              <Text style={withdrawstyles.requesteeblocktitle}>{title}</Text>

              {data.length > 0 ? (
                data.map((info, index) => {
                  const isLastItem = data.length === index + 1;
                  const accepted = title === "Accepted Requests";
                  return (
                    <View key={index}>
                      <Requestuser details={info} accepted={accepted} />
                      {!isLastItem && <Horizontaline marginV={21} />}
                    </View>
                  );
                })
              ) : (
                <Emptyrequest />
              )}
            </View>
          );
        }}
        onViewableItemsChanged={onViewChangeRef.current}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        keyExtractor={(item) => item.title}
      />

      {/* Dotes below the scrolls */}
      <View style={withdrawstyles.statusdotwrap}>
        <View style={withdrawstyles.statusdotwrapinner}>
          {datas.map((item, index) => {
            const dotPosition = Animated.divide(scrollX, SIZES.width);

            const dotColor = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [COLORS.grey3, COLORS.black, COLORS.grey3],
              extrapolate: "clamp",
            });
            const dotWidth = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [8, 20, 8],
              extrapolate: "clamp",
            });
            return (
              <Animated.View
                key={index}
                style={[
                  {
                    height: 8,
                    borderRadius: 8 / 2,
                    backgroundColor: dotColor,
                    width: dotWidth,
                  },
                ]}
              />
            );
          })}
        </View>
      </View>

      {/* Bottom Button */}

      <View style={withdrawstyles.bottombtnwrap}>
        <Custombutton
          btntext="View Deposit Details"
          onpress={() => console.log("hellow from deposit")}
        />
      </View>
    </Mainwrapper>
  );
};

export default Depositupdate;
