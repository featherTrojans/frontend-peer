import {
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { COLORS, FONTS, fontsize, icons } from "../../../constants";
import Horizontaline from "../../../components/Horizontaline/Horizontaline";
import Custombutton from "../../../components/Custombutton/Custombutton";
import Map from "../../shared/map/Map";
import {
  Backheader,
  Chooseamountmodal,
  Loader,
  Mainwrapper,
  Negotiatecharge,
  Successmodal,
  Viewbalance,
} from "../../../components";
import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper";
import axiosCustom from "../../../httpRequests/axiosCustom";
import useAlert from "../../../utils/useAlerts";
import { makePhoneCall } from "../../../utils/userDeviceFunctions";
import amountFormatter from "../../../utils/formatMoney";
import { nameSplitter } from "../../../utils/nameSplitter";
import useCustomModal from "../../../utils/useCustomModal";

const { Purplechaticon, Cancelrequest, Greenphoneicon } = icons;

interface withdrawobj {
  reference: string;
  amount: string;
  charges: string;
  total: string;
  negotiatedFee: string;
  agent: string;
  agentUsername: string;
  phoneNumber: string;
  status: string;
  meetupPoint: string;
  createdAt: string;
  agentImage: null;
}

const Requesterinfo = ({ navigation, route }) => {
  const comingback = route?.params?.comingback;
  const [loading, setLoading] = useState(false);
  const [screenLoading, setScreenLoading] = useState(true);
  const [withdrawscreen, setWithdrawrequest] = useState(true);
  const {
    CustomModal: NegotiateChargeModal,
    openModal: openNegotiateChargeModal,
    closeModal: closeNegotiateChargeModal,
  } = useCustomModal();
  const {
    CustomModal: SuccessCutomModal,
    openModal: openSuccessModal,
    closeModal: closeSuccessModal,
  } = useCustomModal();
  const { errorAlert, blueAlert } = useAlert();
  const snapPoints = useMemo(() => ["60%", "85%"], []);
  const [info, setInfo] = useState<withdrawobj>({
    reference: "",
    amount: "",
    charges: "",
    total: "",
    negotiatedFee: "",
    agent: "",
    agentUsername: "",
    phoneNumber: "",
    status: "",
    meetupPoint: "",
    createdAt: "",
    agentImage: null,
  });

  console.log(comingback, "alright alright");
  useEffect(() => {
    getWithdrawRequest();
  }, [comingback]);
  const getWithdrawRequest = async () => {
    setScreenLoading(true);
    try {
      const response = await axiosCustom.get("/request/accepted");
      setInfo(response?.data?.data);
      console.log("should get here baah");
      console.log(response.data.data, "request datas");
      if (response.data && response.data.data.length > 0) {
        setInfo(response?.data?.data[0]);
        setWithdrawrequest(false);
      }
    } catch (err) {
      console.log(err.response);
    } finally {
      setScreenLoading(false);
    }
  };

  const handleNextNegotiateCharge = async (amount) => {
    try {
      setLoading(true);
      await axiosCustom.put("/request/negotiate", {
        negotiatedFee: amount,
        reference: info?.reference,
      });
      openSuccessModal();
      closeNegotiateChargeModal();
    } catch (err) {
      errorAlert(err);
    }
    setLoading(false);
  };
  const handleSuccessBtn = () => {
    closeSuccessModal();
    navigation.navigate("Home");
  };
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

  if (screenLoading) {
    return (
      <Mainwrapper>
        <>
          <Backheader title="Withdraw" />
          <View style={{ justifyContent: "center", flex: 1 }}>
            <ActivityIndicator />
          </View>
        </>
      </Mainwrapper>
    );
  }

  if (withdrawscreen) {
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
  }

  return (
    <View style={{ paddingTop: getStatusBarHeight(true), flex: 1 }}>
      <Map tolocation={info.meetupPoint} />
      <Backheader title="Withdraw" />
      {loading && <Loader />}

      <SuccessCutomModal>
        <Successmodal
          btnText="Yeah, Proceed"
          successMsg="Renegotiate Charge successful"
          btnFunction={handleSuccessBtn}
        />
      </SuccessCutomModal>
      <NegotiateChargeModal>
        <Negotiatecharge
          info={info}
          defaultAmount={info.negotiatedFee}
          openNextModal={handleNextNegotiateCharge}
          withdrawAmount={0}
        />
      </NegotiateChargeModal>

      <View
        style={{
          flex: 1,
          justifyContent: "flex-end",
          paddingHorizontal: 15,
          paddingBottom: getBottomSpace() + 20,
        }}
      >
        <BottomSheet snapPoints={snapPoints}>
          <BottomSheetScrollView showsVerticalScrollIndicator={false}>
            <View style={{ paddingHorizontal: 15, marginBottom: 100 }}>
              <View style={{ alignItems: "center", marginBottom: 40 }}>
                <View
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 48 / 2,
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: COLORS.blue9,
                    marginBottom: 22,
                  }}
                >
                  {info.agentImage ? (
                    <Image
                      style={{ width: 60, height: 60, borderRadius: 60 / 2 }}
                      source={{
                        uri: info.agentImage,
                      }}
                    />
                  ) : (
                    <Text
                      style={{
                        ...fontsize.bbsmall,
                        color: COLORS.white,
                        ...FONTS.medium,
                      }}
                    >
                      {nameSplitter(info.agent)}
                    </Text>
                  )}
                </View>
                <Text
                  style={{
                    ...fontsize.small,
                    ...FONTS.medium,
                    color: COLORS.blue9,
                  }}
                >
                  {info.agent}
                </Text>
                {/* <Text
                  style={{
                    ...fontsize.smallest,
                    ...FONTS.regular,
                    color: COLORS.halfBlack,
                    marginTop: 7,
                  }}
                >
                  {info.meetupPoint} Mins Away
                </Text> */}
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{
                    ...fontsize.smallest,
                    color: COLORS.blue9,
                    ...FONTS.regular,
                  }}
                >
                  Amount
                </Text>
                <Text
                  style={{
                    ...fontsize.smallest,
                    color: COLORS.blue9,
                    ...FONTS.regular,
                  }}
                >
                  +N{amountFormatter(info.amount)}
                </Text>
              </View>
              <Horizontaline marginV={20} />
              <Text
                style={{
                  marginBottom: 16,
                  ...fontsize.smallest,
                  ...FONTS.regular,
                }}
              >
                Total Charge (Base Charge)
              </Text>
              <Text
                style={{
                  ...fontsize.smaller,
                  ...FONTS.bold,
                  color: COLORS.purple2,
                }}
              >
                N
                {amountFormatter(
                  (
                    Number(info.amount) +
                    Number(info.charges) +
                    Number(info.negotiatedFee)
                  ).toString()
                )}{" "}
              </Text>

              <View style={{ marginTop: 32, marginBottom: 40 }}>
                <Text
                  style={{
                    ...fontsize.smallest,
                    ...FONTS.regular,
                    color: COLORS.blue9,
                  }}
                >
                  Meetup Point (your comfort/safe zone)
                </Text>
                <View style={{ marginTop: 15 }}>
                  <View>
                    <Text
                      style={{
                        ...fontsize.smallest,
                        ...FONTS.medium,
                        color: COLORS.blue9,
                      }}
                    >
                      {info.meetupPoint}
                    </Text>
                  </View>
                </View>
              </View>

              <Text
                style={{
                  ...fontsize.smaller,
                  ...FONTS.medium,
                  color: COLORS.grey16,
                }}
              >
                More Actions
              </Text>

              <View style={{ marginVertical: 30 }}>
                <View>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Chatsdm", { userInfo: info })
                    }
                    style={{ flexDirection: "row", alignItems: "center" }}
                  >
                    <View
                      style={{
                        width: 32,
                        height: 32,
                        backgroundColor: COLORS.purple3,
                        borderRadius: 32 / 2,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Purplechaticon />
                    </View>
                    <View style={{ marginLeft: 18 }}>
                      <Text
                        style={{
                          ...fontsize.smallest,
                          ...FONTS.medium,
                          color: COLORS.blue9,
                        }}
                      >
                        Chat {info.agent.split(" ")[0]}
                      </Text>
                      <Text
                        style={{
                          ...fontsize.smallest,
                          ...FONTS.regular,
                          color: COLORS.grey2,
                          marginTop: 5,
                        }}
                      >
                        Discuss conversations via chat
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <Horizontaline marginV={21} />

                <View>
                  <TouchableOpacity
                    onPress={() => makePhoneCall(info?.phoneNumber)}
                    style={{ flexDirection: "row", alignItems: "center" }}
                  >
                    <View
                      style={{
                        width: 32,
                        height: 32,
                        backgroundColor: COLORS.green3,
                        borderRadius: 32 / 2,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Greenphoneicon />
                    </View>
                    <View style={{ marginLeft: 18 }}>
                      <Text
                        style={{
                          ...fontsize.smallest,
                          ...FONTS.medium,
                          color: COLORS.blue9,
                        }}
                      >
                        Phone Call
                      </Text>
                      <Text
                        style={{
                          ...fontsize.smallest,
                          ...FONTS.regular,
                          color: COLORS.grey2,
                          marginTop: 5,
                        }}
                      >
                        Make a phone call to communicate
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>

                <Horizontaline marginV={21} />

                <View>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Cancelrequest", info.reference)
                    }
                    style={{ flexDirection: "row", alignItems: "center" }}
                  >
                    <View
                      style={{
                        width: 32,
                        height: 32,
                        backgroundColor: COLORS.red2,
                        borderRadius: 32 / 2,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Cancelrequest />
                    </View>
                    <View style={{ marginLeft: 18 }}>
                      <Text
                        style={{
                          ...fontsize.smallest,
                          ...FONTS.medium,
                          color: COLORS.blue9,
                        }}
                      >
                        Cancel Request
                      </Text>
                      <Text
                        style={{
                          ...fontsize.smallest,
                          ...FONTS.regular,
                          color: COLORS.grey2,
                          marginTop: 5,
                        }}
                      >
                        Cancel this transaction right now
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <Custombutton
                btntext="Make Payment"
                onpress={() => {
                  navigation.navigate("Safetycautions", {
                    info: info,
                    comingFrom: 0,
                  });
                }}
              />
            </View>
          </BottomSheetScrollView>
        </BottomSheet>
      </View>
    </View>
  );
};

export default Requesterinfo;
