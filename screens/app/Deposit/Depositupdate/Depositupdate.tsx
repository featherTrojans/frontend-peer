import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  Animated,
  FlatList,
  TouchableOpacity
} from "react-native";
import React, { useContext, useEffect, useRef, useState } from "react";
import moment from "moment";
import {
  Backheader,
  Custombutton,
  Horizontaline,
  Mainwrapper,
  Viewbalance,
} from "../../../../components";
import LottieView from "lottie-react-native";
import { COLORS, FONTS, fontsize, icons, SIZES } from "../../../../constants";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import { getCurrentLocation } from "../../../../utils/customLocation";
import { RFValue } from "react-native-responsive-fontsize";
import { withdrawstyles } from "../../Withdraws/Withdraw/Withdraw.styles";
import useCustomModal from "../../../../utils/useCustomModal";
import Requestuser from "../../../shared/RequestUser";
import amountFormatter from "../../../../utils/formatMoney";
const {
  TransferIcon,
  Location,
  Accountbalanceicon,
  Trendingupright,
  Viewrequesteye,
  Viewcashrequesticon,
  Purplebalanceicon,
  Greenarrowupicon,
  Depositpinlocationicon,
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

const datas = [
  {title: "Pending Requests",data: []},
  { title: "Accepted Requests", data: [] },
];




// MODELS 


interface statusInterface {
  "username": string,
  "fullName": string,
  "longitude": string,
  "latitude": string,
  "locationText": string,
  "amount": string,
  "status": string,
  "reference": string,
  "createdAt": string,
  "totalEarnings": number
}


const Depositupdate = ({ navigation, route }) => {
  const [status, setStatus] = useState<statusInterface | null>(null);
  const [acceptedDeposits, setAcceptedDeposits] = useState([]);
  const [pendingDeposits, setPendingDeposits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [coords, setCoords] = useState<any>({});
  const {CustomModal: DepositdetailsModal, openModal: openDepositdetailsModal} = useCustomModal()
  const {CustomModal, openModal} = useCustomModal()
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
  useEffect(() => {
    getDepositStatus();
  },[route.params?.from]);
  useEffect(() => {
    updateDepositLocation();
  }, [status, coords]);
  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    try {
      const { coordinates, address, locationObj }: any =
        await getCurrentLocation();
      setCoords({ ...coordinates, locationText: address });
    } catch (err) {
    } finally {
    }
  };

  const getDepositStatus = async () => {
    try {
      setLoading(true);
      const response = await axiosCustom.get("/status/get");
      if(response.data.data){
        setStatus({...response.data.data.status[0], totalEarnings: response.data.data.totalEarnings });
        setAcceptedDeposits(response.data.data.acceptedRequests)
        setPendingDeposits(response.data.data.pendingRequests)
      }
    } catch (err) {
      // maybe show the error
    } finally {
      setLoading(false);
    }
  };
  const updateDepositLocation = async () => {

    try {
      if (status && coords.longitude) {
     await axiosCustom.put("/status/location/update", {
          longitude: coords.longitude,
          latitude: coords.latitude,
          locationText: coords.locationText,
          reference: status?.status[0]?.reference,
        });
      }
    } catch (err) {
    } finally {
    }
  };


  return (
    <Mainwrapper>
      <Backheader title="Deposit" />

      <View style={{ paddingHorizontal: 15 }}>
        <Viewbalance />
      </View>

      {/* Deposit details and info modal */}
      <DepositdetailsModal>
        <View >
          <Text style={{...fontsize.smaller, ...FONTS.medium, color: COLORS.blue9}}>Deposit Details</Text>

        <View style={{paddingHorizontal: 45, justifyContent: "center", alignItems: 'center', marginBottom: 50, marginTop: 20}}>
          <View style={{width: 48, height: 48, backgroundColor: COLORS.grey1, borderRadius: 48/2, justifyContent: "center", alignItems: "center"}}>
          {/* icon */}
            <Depositpinlocationicon />
          </View>
          
          <Text style={{textAlign: "center", marginVertical: 22, ...fontsize.smaller, ...FONTS.medium, lineHeight: 22, color: COLORS.blue9}}>Last known location</Text>
          <Text style={{textAlign: 'center', ...fontsize.smaller, ...FONTS.regular, color: COLORS.blue9}}>{status?.locationText}</Text>
        </View>

        <View style={{flexDirection: 'row', justifyContent: "space-between", alignItems: "center"}}>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            {/* iocns */}
            <View style={{width: 26,  height: 26, borderRadius: 26/2, backgroundColor: COLORS.green3, justifyContent: "center", alignItems: "center"}}>
              <Greenarrowupicon />
            </View>
            <Text style={{marginLeft: 12, ...fontsize.smaller, ...FONTS.medium, color: COLORS.blue9}}>My Earnings last 24hrs</Text>
          </View>
          <Text style={{...fontsize.smaller, ...FONTS.medium, color: COLORS.blue9}}>+ N{amountFormatter(status?.totalEarnings)}</Text>
        </View>
        <Horizontaline marginV={20}/>

        <View style={{flexDirection: 'row', justifyContent: "space-between", alignItems: "center"}}>
          <View style={{flexDirection: "row", alignItems: "center"}}>
            {/* iocns */}
            <View style={{width: 26,  height: 26, borderRadius: 26/2, backgroundColor: COLORS.purple3, justifyContent: "center", alignItems: "center"}}>
              <Purplebalanceicon />
            </View>
            <Text style={{marginLeft: 12, ...fontsize.smaller, ...FONTS.medium, color: COLORS.blue9}}>Deposit Balance</Text>
          </View>
          <Text style={{...fontsize.smaller, ...FONTS.medium, color: COLORS.blue9}}>N{amountFormatter(status?.amount)}</Text>
        </View>
        <Horizontaline marginV={20}/>




        <Text style={{textAlign: "center", color: COLORS.red1, ...fontsize.smaller, ...FONTS.medium, marginBottom: 25}}>Expires {moment(status?.createdAt).add(1, "days").calendar()}</Text>

        <Custombutton btntext="Update Deposit" bg={COLORS.blue9} 
        onpress={() => navigation.navigate("Depositstart",{type:"update", reference:status?.reference})}/>





        </View>
      </DepositdetailsModal>

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
          let depositdata = isLast ? acceptedDeposits : pendingDeposits
          const comingFrom = isLast ? 3:2
          return (
            <View
              style={[
                withdrawstyles.requesteeblock,
                { marginRight: isLast ? 0 : 20 },
              ]}
            >
              
              <Text style={withdrawstyles.requesteeblocktitle}>{title}</Text>

              {depositdata.length > 0 ? (
                depositdata.map((info, index) => {
                  const isLastItem = data.length === index + 1;
                  const accepted = title === "Accepted Requests";
                  const datainfo = { ...info, ...info.user}
                  console.log(datainfo )
                  
                  return (
                    <View key={index}>
                      <TouchableOpacity onPress={()=>navigation.navigate("Requesterinfo",{info:datainfo,comingFrom:comingFrom})} activeOpacity={0.8}>
                        <Requestuser details={{name:datainfo.fullName, duration: datainfo.meetupPoint,amount: datainfo.amount}} accepted={accepted} />
                      </TouchableOpacity>
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

         

          {status?.createdAt?
            <View style={withdrawstyles.bottombtnwrap}>
            <Custombutton
            btntext="View Deposit Details"
            bg={COLORS.blue9}
            // onpress={() => navigation.navigate("Cancelrequest")}
              onpress={openDepositdetailsModal}

            />
          </View>
          :
          <View style={withdrawstyles.bottombtnwrap}>
        <Custombutton
              btntext="Create Deposit"
              onpress={() => navigation.navigate("Depositstart",{type:"create", reference:""})}
        />
      </View>

          
          }
      
    </Mainwrapper>
  );
};

export default Depositupdate;
