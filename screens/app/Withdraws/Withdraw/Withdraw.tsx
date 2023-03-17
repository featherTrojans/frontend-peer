import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, useRef } from "react";
import LottieView from "lottie-react-native";
import { COLORS, icons, SIZES } from "../../../../constants";
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

const { Acceptedcheck, Cryinganimate } = icons;

type DataProps = {
  image: JSX.Element;
  full_name: string;
  username: string;
  price: string;
};

interface withdrawobj {
  agent: string;
  agentUsername: string;
  amount: string;
  charges: string;
  createdAt: string;
  meetupPoint: string;
  negotiatedFee: string;
  phoneNumber: string;
  reference: string;
  status: string;
  total: string;
}

const Withdraw = ({ navigation }) => {
  const { errorAlert } = useAlert();

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
    setLoading(true);
    try {
      const response = await axiosCustom.get("/request/accepted");
      console.log(response.data.data, "Pending request datas");
      setAcceptedRequests(response?.data?.data);
    } catch (err) {
      console.log(err.response);
    } finally {
      setLoading(false);
    }
  };

  const datas = [
    {
      title: "Pending Requests",
      data: [],
    },
    { title: "Accepted Requests", data: [] },
  ];

  const handleWithdraw = (amount) => {
    if (Number(amount) < 200) {
      errorAlert(
        null,
        "You can't make a withdraw request of less than NGN 200"
      );
      return;
    }

    navigation.navigate("Availablelisting", { amount, activate: false });
  };
  return (
    <Mainwrapper>
      <>
        <Backheader title="Withdraw" />
        <View style={{ justifyContent: "space-between", flex: 1 }}>
          <View style={{ paddingHorizontal: 15 }}>
            <Viewbalance />
          </View>

          <View
            style={{
              paddingVertical: 36,
              backgroundColor: "#fff",
              paddingHorizontal: 15,
              borderTopRightRadius: 22,
              borderTopLeftRadius: 22,
            }}
          >
            <Chooseamountmodal
              headerText={"How much do you want to withdraw?"}
              onpress={handleWithdraw}
            />
          </View>
        </View>
      </>
    </Mainwrapper>
  );
};

export default Withdraw;
