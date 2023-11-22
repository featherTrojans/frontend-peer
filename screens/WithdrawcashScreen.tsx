import { Linking, Platform, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  FTCustombutton,
  FTEmptycomponent,
  FTIconwithbg,
  FTTitlepagewrapper,
} from "../components";
import { COLORS, icons } from "../constants";
import axiosCustom from "../httpRequests/axiosCustom";
import { makePhoneCall } from "../utils";
import { useAlert } from "../hooks";
import { TouchableOpacity } from "react-native-gesture-handler";
import LottieView from "lottie-react-native";
import { LocationContext } from "../context/LocationContext";
import {
  getCoordinateFromAddress,
  getCurrentLocation,
} from "../utils/customLocation";
import { WithdrawcashScreenStyles } from "../assets/styles/screens";
import amountFormatter from "../utils/formatMoney";
const {
  container,
  withdrawalInfoWrap,
  withdrawalProfileWrap,
  withdrawalProfileName,
  amountOfTransaction,
  locationInfoWrap,
  locationDistance,
  locationAddress,
  viewOnMapWrap,
  viewOnMapText,
  withdrawalActionWrap,
  withdrawalActionTitle,
  loadingWrapper,
  searchingNearbyText,
} = WithdrawcashScreenStyles;

const {
  Blacksendicon,
  Cancelwithdrawicon,
  Phoneicon,
  Chaticon,
  PulsingCircle,
  Withdrawsearchicon,
} = icons;

const viewonmap = (lat, lng) => {
  const scheme = Platform.select({
    ios: "maps://0,0?q=",
    android: "geo:0,0?q=",
  });
  const latLng = `${lat},${lng}`;
  const label = "Merchant Location";
  const url = Platform.select({
    ios: `${scheme}${label}@${latLng}`,
    android: `${scheme}${latLng}(${label})`,
  });
  Linking.openURL(url);
};

const WithdrawcashScreen = ({ route, navigation }) => {
  const amount = route.params?.amount;
  const agentinfo = route.params?.info;
  const { errorAlert } = useAlert();
  const { setCoords, coords, setDestinationCoords } =
    useContext(LocationContext);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(agentinfo);
  const [noagent, setnoagent] = useState(false);
  const [latlong, setlatlong] = useState([]);
  useEffect(() => {
    if (!agentinfo) {
      getLocationAndAgents();
    }
  }, []);

  useEffect(() => {
    if (info?.meetupPoint) {
      getCoordinateFromAddress(info?.meetupPoint).then((coords) =>
        setlatlong({ lat: coords.latitude, long: coords.longitude })
      );
    }
  }, [info]);



  const getAllAgents = async (address: string) => {
    console.log("trying to fetch agent datats")
    try {
      const response2 = await axiosCustom.post("/status/find", {
        amount: Number(amount),
        location: address,
      });
      console.log(response2, "here is the find response")
      const response = await axiosCustom.get("/request/accepted");
      setInfo(response?.data?.data);
      if (response.data && response.data.data.length > 0) {
        setInfo(response?.data?.data[0]);
      }
    } catch (err) {
      setnoagent(true);
    } finally {
    }
  };

  const getLocationAndAgents = async () => {
    setnoagent(false);
    setDestinationCoords({});
    try {
      setLoading(true);
      const { coordinates, address, locationObj } = await getCurrentLocation();
      console.log(address, "here is the address")
      setCoords({ ...coordinates, locationText: address });
      const agentResponse = await getAllAgents(address);
      console.log(agentResponse, "here is the agents dara")

    } catch (err) {
      console.log("maybe this is where it is failing, acan't get address");
    } finally {
      setLoading(false);
    }
  };


  const handleCancelRequest = async () => {
    setLoading(true);
    try {
      await axiosCustom({
        method: "DELETE",
        url: "/request/cancel",
        data: {
          reference: info.reference,
          reasonForCancel: "Mistake cash request",
        },
      });
    } catch (err) {
      errorAlert(err);
    } finally {
      setLoading(false);
    }
  };

  const action = (charge) => {
    const action2 = async (pin) => {
      const response = await axiosCustom.post("/request/approve", {
        reference: info.reference,
        user_pin: pin,
        agreedCharge: Number(charge + amount),
      });
      try {
        navigation.navigate("transactionsuccess_screen");
      } catch (err) {
        throw err;
      }
    };
    const summaryinfo = {
      amount: amount,
      transactionDatas: [
        {
          leftSide: "Merchant Name",
          rightSide: info.agent,
        },
        {
          leftSide: "Merchant ID",
          rightSide: `${info.agentUsername}`,
        },
        {
          leftSide: "Charges",
          rightSide: `N${amountFormatter(charge)}`,
        },
        {
          leftSide: "Total to be sent",
          rightSide: `N${amountFormatter(amount + charge)}`,
        },
      ],
    };
    navigation.navigate("transactionsummary_screen", {
      summaryinfo,
      action: action2,
    });
  };



  const handlesubmit = async () => {
    try {
      navigation.navigate("amounttosend_screen", {
        nextScreen: "choosefeatheruser_screen",
        onsubmit: action,
      });
    } catch (err) {}
  };
  const withdrawcashActions = [
    {
      Icon: Phoneicon,
      bg: COLORS.Tgreen3,
      title: "Phone",
      action: () => makePhoneCall(info.phoneNumber),
    },
    {
      Icon: Chaticon,
      bg: COLORS.Tyellow4,
      title: "Chat",
      action: () =>
        navigation.navigate("Chatsdm", {
          userInfo: {},
          chatwithid: info.agentUsername,
        }),
    },
    {
      Icon: Cancelwithdrawicon,
      bg: COLORS.Tred4,
      title: "Cancel",
      action: () => handleCancelRequest(),
    },
  ];

  if (noagent) {
    return (
      <FTTitlepagewrapper title="Withdraw Cash">
        <View style={loadingWrapper}>
          <FTEmptycomponent
            msg="Padi, sorry couldn’t find any merchants around you."
            showTransact={false}
            size={150}
          />
        </View>
        <FTCustombutton
          onpress={getLocationAndAgents}
          btntext="Search Again"
          bg={COLORS.blue9}
        />
      </FTTitlepagewrapper>
    );
  }

  if (!info || loading) {
    return (
      <FTTitlepagewrapper title="Withdraw Cash">
        <View style={loadingWrapper}>
          <LottieView
            source={PulsingCircle}
            autoPlay
            loop
            style={{ width: 500, height: 500 }}
          />
          <View style={{ position: "absolute" }}>
            <Withdrawsearchicon />
          </View>
        </View>
        <Text style={searchingNearbyText}>
          Searching for nearby merchants...
        </Text>
      </FTTitlepagewrapper>
    );
  }

  return (
    <FTTitlepagewrapper title="Withdraw Cash">
      <View style={container}>
        <View style={withdrawalInfoWrap}>
          <View style={withdrawalProfileWrap}>
            <FTIconwithbg Icon={Blacksendicon} bG={COLORS.Tblue} size={86} />

            <Text style={withdrawalProfileName}>{info?.agent}</Text>
            <Text style={amountOfTransaction}>33 Transactions</Text>
          </View>

          <View style={locationInfoWrap}>
            <Text style={locationDistance}>15 Mins Away</Text>
            <Text style={locationAddress}>{info.meetupPoint}</Text>
            <View style={viewOnMapWrap}>
              <Text
                onPress={() => viewonmap(latlong?.lat, latlong?.long)}
                style={viewOnMapText}
              >
                View on maps
              </Text>
            </View>
          </View>

          <View style={withdrawalActionWrap}>
            {withdrawcashActions.map(({ Icon, bg, title, action }) => {
              return (
                <TouchableOpacity activeOpacity={0.7} onPress={action}>
                  <View style={{ alignItems: "center" }}>
                    <FTIconwithbg Icon={Icon} bG={bg} />
                    <Text style={withdrawalActionTitle}>{title}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>

      <FTCustombutton
        onpress={handlesubmit}
        btntext="Pay Merchant"
        bg={COLORS.blue9}
      />
    </FTTitlepagewrapper>
  );
};

export default WithdrawcashScreen;

const styles = StyleSheet.create({});
