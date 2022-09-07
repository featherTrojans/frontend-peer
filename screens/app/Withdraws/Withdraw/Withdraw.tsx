import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Animated,
  ActivityIndicator
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import LottieView from "lottie-react-native";
import { COLORS, FONTS, fontsize, icons, SIZES } from "../../../../constants";
import {
  Backheader,
  Chooseamountmodal,
  Custombutton,
  Horizontaline,
  Mainwrapper,
  Viewbalance,
} from "../../../../components";
import { withdrawstyles } from "./Withdraw.styles";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import { RFValue } from "react-native-responsive-fontsize";
import useCustomModal from "../../../../utils/useCustomModal";
import Requestuser from "../../../shared/RequestUser";
import useAlert from "../../../../utils/useAlerts";

const {
  Acceptedcheck,
  Cryinganimate,
} = icons;

type DataProps = {
  image: JSX.Element;
  full_name: string;
  username: string;
  price: string;
};

interface withdrawobj {
  "agent": string,
  "agentUsername": string,
  "amount":string,
  "charges": string,
  "createdAt": string,
  "meetupPoint": string,
  "negotiatedFee": string,
  "phoneNumber": string,
  "reference": string,
  "status": string,
  "total": string,
}

// Component to show when the list is empty
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


const Withdraw = ({ navigation }) => {
  const [active, setActive] = useState("pending");
  const [loading, setLoading] = useState(true);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [acceptedRequests, setAcceptedRequests] = useState([]);
  const { CustomModal ,openModal, closeModal} = useCustomModal()
  const scrollX = useRef<any>(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList>(null);
  const {errorAlert} = useAlert()
  const [viewIndex, setViewIndex] = useState<number>(0);

  // i removed changed from the params passed to this useRef below
  const onViewChangeRef = useRef<
    ({ viewableItems, changed }: { viewableItems: any; changed: any }) => void
  >(({ viewableItems, changed }) => {
    setViewIndex(viewableItems[0]?.index);
  });

  useEffect(() => {
    getPendingRequest();
    getAcceptedRequest();
  }, []);

  const getPendingRequest = async () => {
    setLoading(true);
    try {
      const response = await axiosCustom.get("/request/pending");
      console.log(response.data.data, "Pending request datas");
      setPendingRequests(response?.data?.data);
      
    } catch (err) {
      console.log(err.response);
    } finally {
      setLoading(false);
    }
  };

  const getAcceptedRequest = async () => {
    setLoading(true)
    try {
      const response = await axiosCustom.get("/request/accepted");
      console.log(response.data.data, "Pending request datas");
      setAcceptedRequests(response?.data?.data);
    } catch (err) {
      console.log(err.response);
    }finally{
      setLoading(false)
    }
  };

  const datas = [
    {
      title: "Pending Requests",
      data: [],
    },
    { title: "Accepted Requests", data: [] },
  ];



  const handleWithdraw = (amount)=>{
      if(Number(amount) < 200 ){
        errorAlert(null,"You can't make a withdraw request of less than NGN 200")
        return
      }
      closeModal()
      navigation.navigate("Availablelisting",amount);
  }
  return (
    <Mainwrapper>
      <>
      <CustomModal>
        <Chooseamountmodal headerText={"How much do you want to withdraw?"} onpress={handleWithdraw} />
      </CustomModal>
      <Backheader title="Withdraw" />
      <View style={{ paddingHorizontal: 15 }}>
        <Viewbalance />
      </View>

      {loading? (<View style={{flex: 1, justifyContent:"center"}}>
        <ActivityIndicator color={"#000"} size="large" />
      </View>) :(
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
          const comingFrom = isLast ? 1 : 0;
          const { title} = item;
          let data = pendingRequests
          if(isLast){
            data = acceptedRequests
          }  
          return (
            <View
              style={[withdrawstyles.requesteeblock, { marginRight: isLast ? 0 : 20 }]}
            >
              <Text style={withdrawstyles.requesteeblocktitle}>{title}</Text>

              {data.length > 0 ? (
                data.map((info, index) => {
                  const isLastItem = data.length === index + 1;
                  const accepted = title === "Accepted Requests";
                  return (
                    <TouchableOpacity activeOpacity={0.8} onPress={()=>navigation.navigate("Requesterinfo", {info:{...info,fullName:info.agent,username:info.agentUsername, userUid: info.agentId } , comingFrom:comingFrom })} key={index}>
                      <Requestuser hideAmount={true} details={{name:info.agent, duration:info.meetupPoint, amount:info.amount}} accepted={accepted} />
                      {!isLastItem && <Horizontaline marginV={21} />}
                    </TouchableOpacity>
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
      ) }
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
          btntext="Withdraw Cash"
          onpress={()=>openModal()}
        />
      </View>

    </>
    </Mainwrapper>
  );
};

export default Withdraw;
