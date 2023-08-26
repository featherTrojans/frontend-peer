import { Linking, Platform, StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import {
  FTCustombutton,
  FTIconwithbg,
  FTTitlepagewrapper,
} from "../components";
import { COLORS, FONTS, fontsize, icons } from "../constants";
import axiosCustom from "../httpRequests/axiosCustom";
import { makePhoneCall, navigation } from "../utils";
import { useAlert } from "../hooks";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LocationContext } from "../context/LocationContext";
import { getCurrentLocation } from "../utils/customLocation";

const { Blacksendicon, Cancelwithdrawicon, Phoneicon, Chaticon } = icons;

// {
//   reference: "",
//   amount: "",
//   charges: "",
//   total: "",
//   negotiatedFee: "",
//   agent: "",
//   agentUsername: "",
//   phoneNumber: "",
//   status: "",
//   meetupPoint: "",
//   createdAt: "",
//   agentImage: null,
// }

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

const WithdrawcashScreen = ({ route }) => {
  const amount = route.params?.amount;
  const agentinfo = route.params?.info;
  const { errorAlert } = useAlert();
  const { setCoords, coords, setDestinationCoords } =
    useContext(LocationContext);
  const [loading, setLoading] = useState(false);
  const [info, setInfo] = useState(agentinfo);
  const [noagent, setnoagent] = useState(false);

  useEffect(() => {
    if (!agentinfo) {
      getLocationAndAgents();
    }
  }, []);

  const getLocationAndAgents = async () => {
    setnoagent(false);
    setDestinationCoords({});
    try {
      setLoading(true);
      const { coordinates, address, locationObj } = await getCurrentLocation();
      setCoords({ ...coordinates, locationText: address });
      await getAllAgents(address);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };
  const getAllAgents = async (address: string) => {
    try {
      await axiosCustom.post("/status/find", {
        amount: Number(amount),
        location: address,
      });
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
          rightSide: `N${charge}`,
        },
        {
          leftSide: "Total to be sent",
          rightSide: `N${amount + charge}`,
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
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Paid, sorry couldn’t find any merchants around you</Text>
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
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>SearchIcons</Text>
        </View>
        <Text style={{ textAlign: "center", marginBottom: 20 }}>
          Searching for nearby merchants...
        </Text>
      </FTTitlepagewrapper>
    );
  }

  return (
    <FTTitlepagewrapper title="Withdraw Cash">
      <View style={{ flex: 1, paddingBottom: 60 }}>
        <View
          style={{
            alignSelf: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ alignSelf: "center", alignItems: "center" }}>
            <FTIconwithbg Icon={Blacksendicon} bG={COLORS.Tblue} size={86} />

            <Text
              style={{
                ...fontsize.bsmall,
                ...FONTS.bold,
                color: COLORS.blue9,
                marginBottom: 13,
                marginTop: 35,
              }}
            >
              {info?.agent}
            </Text>
            <Text
              style={{
                ...fontsize.smallest,
                ...FONTS.semibold,
                color: COLORS.grey2,
              }}
            >
              33 Transactions
            </Text>
          </View>

          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={{ ...fontsize.bxmedium, ...FONTS.bold }}>
              15 Mins Away
            </Text>
            <Text
              style={{
                ...fontsize.smallest,
                ...FONTS.regular,
                color: COLORS.blue9,
                marginTop: 25,
                marginBottom: 30,
              }}
            >
              {info.meetupPoint}
            </Text>
            <View
              style={{
                backgroundColor: COLORS.Tblue6,
                paddingVertical: 12,
                paddingHorizontal: 20,
                alignSelf: "center",
                borderRadius: 10,
              }}
            >
              <Text
                onPress={() => viewonmap()}
                style={{
                  ...fontsize.xxsmallest,
                  ...FONTS.semibold,
                  color: COLORS.blue16,
                }}
              >
                View on maps
              </Text>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              width: 250,
              justifyContent: "space-between",
            }}
          >
            {withdrawcashActions.map(({ Icon, bg, title, action }) => {
              return (
                <TouchableOpacity onPress={action}>
                  <View style={{ alignItems: "center" }}>
                    <FTIconwithbg Icon={Icon} bG={bg} />
                    <Text
                      style={{
                        ...fontsize.xxsmallest,
                        ...FONTS.medium,
                        color: COLORS.blue9,
                        marginTop: 15,
                      }}
                    >
                      {title}
                    </Text>
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
