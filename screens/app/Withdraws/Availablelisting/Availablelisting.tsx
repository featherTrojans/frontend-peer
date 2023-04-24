import { Text, View, Animated } from "react-native";
import React, { useState, useEffect, useContext, useRef } from "react";
import LottieView from "lottie-react-native";

import { icons, COLORS, fontsize, FONTS } from "../../../../constants";
import Map from "../../../shared/map/Map";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import { LocationContext } from "../../../../context/LocationContext";
import { getCurrentLocation } from "../../../../utils/customLocation";
import Customstatusbar from "../../../shared/Customstatusbar";
import { Backheader } from "../../../../components";
import { doesIncludeActiveStates } from "../../../../utils/utils";
import { SafeAreaView } from "react-native-safe-area-context";
import useAlert from "../../../../utils/useAlerts";
import Toast from "react-native-toast-message";
const { Emptyicon, Loadinglocationanimate, Cryinganimate } = icons;

interface agent {
  amount: string;
  duration: string;
  fullName: string;
  latitude: string;
  locationText: string;
  longitude: string;
  reference: string;
  username: string;
}

const Availablelisting = ({ navigation, route }: any) => {
  const amount = route.params?.amount;
  const { setCoords, coords, setDestinationCoords } =
    useContext(LocationContext);
  const { blueAlert } = useAlert();
  const [loading, setLoading] = useState(true);
  const [locationLoading, setLocationLoading] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    blueAlert(
      "Get cash easily from certified agents around you competitive transaction charges and fees"
    );

    return () => {
      Toast.hide();
    };
  }, []);

  const newHeight = animatedHeight.interpolate({
    inputRange: [0, 1],
    outputRange: ["50%", "100%"], // Variness in height
  });

  const rotateX = animatedHeight.interpolate({
    inputRange: [0, 1],
    outputRange: ["180deg", "0deg"], // <-- value that larger than your content's height
  });

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    setDestinationCoords({});
    try {
      setLocationLoading(true);
      const { coordinates, address, locationObj } = await getCurrentLocation();
      if (!doesIncludeActiveStates(locationObj)) {
        navigation.replace("Updatedeposit", { from: "withdrawal" });
      }
      setCoords({ ...coordinates, locationText: address });
      await getAllAgents(address);
    } catch (err) {
    } finally {
      setLocationLoading(false);
    }
  };

  const getAllAgents = async (address: string) => {
    try {
      setLoading(true);
      const response = await axiosCustom.post("/status/find", {
        amount: Number(amount),
        location: address,
      });

      if (response) {
        if (response.data.data) {
          navigation.navigate("Requesterinfo", {
            comingback: "reload",
          });
          return;
        }
      }
    } catch (err) {
      console.log(err.response, "no status found , can you believe that");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.white, marginBottom: 20 }}
    >
      <Customstatusbar />
      {!coords?.latitude ? null : <Map />}

      <Backheader title="Withdraw" />

      {locationLoading || loading ? (
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <View
            style={{
              flex: 0.25,
              backgroundColor: COLORS.white,
              borderTopLeftRadius: 22,
              borderTopRightRadius: 22,
              paddingHorizontal: 15,
              paddingTop: 15,
              alignItems: "center",
            }}
          >
            <LottieView
              source={Loadinglocationanimate}
              autoPlay
              loop
              style={{ height: 14, width: "100%" }}
            />
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  marginTop: 34,
                  marginHorizontal: 52,
                  textAlign: "center",
                  lineHeight: 22,
                  ...fontsize.small,
                  ...FONTS.regular,
                  color: COLORS.grey10,
                }}
              >
                Please be patient while we find peers, businesses and agents
                around you to fulfil your request.
              </Text>
            </View>
          </View>
        </View>
      ) : (
        <>
          <View style={{ flex: 1, justifyContent: "flex-end" }}>
            <View
              style={{
                height: 400,
                backgroundColor: COLORS.white,
                borderTopLeftRadius: 30,
                borderTopRightRadius: 30,
              }}
            >
              <View
                style={{
                  // backgroundColor: "blue",
                  flex: 1,
                  height: 200,
                  // width: SIZES.width - 60,
                  marginBottom: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* <Emptyicon /> */}
                <LottieView
                  source={Cryinganimate}
                  autoPlay
                  loop
                  style={{ height: 120, width: 120 }}
                />
                <Text
                  style={{
                    marginTop: 20,
                    paddingHorizontal: 40,
                    textAlign: "center",
                    lineHeight: 20,
                    ...fontsize.smallest,
                    ...FONTS.regular,
                  }}
                >
                  Padi, you don’t have any accepted withdrawal requests.
                </Text>
              </View>
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default Availablelisting;
