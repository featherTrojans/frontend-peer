import { StyleSheet, Text, View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { COLORS, FONTS, fontsize, icons } from "../../constants";
import Horizontaline from "../Horizontaline/Horizontaline";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import LottieView from "lottie-react-native";
import { useToast } from "react-native-toast-notifications";
import axiosCustom from "../../httpRequests/axiosCustom";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import Loader from "../Loader/Loader";
import useAlert from "../../utils/useAlerts";
import useCustomModal from "../../utils/useCustomModal";
import { Successmodal } from "..";
import { getFirstName } from "../../utils/nameSplitter";

const { Transacntionpinanimate } = icons;

const Transactionpin = ({ info }) => {
  const navigation = useNavigation();
  const toast = useToast();
  const { authdata } = useContext(AuthContext);
  const [showmodal, setShowModal] = useState(false);
  const [agentInfo, setAgentInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const { errorAlert, blueAlert, purpleAlert, successAlert } = useAlert();
  const { CustomModal, closeModal, openModal } = useCustomModal();

  useEffect(() => {
    firestoreListener();
  }, []);
  useEffect(() => {
    handleReadyToReceive();
  });
  useEffect(() => {
    getAgentInfo();
  }, []);
  useEffect(() => {
    purpleAlert(
      "Kindly note that 3 failed pin attempts - declines the transaction and cancels automatically."
    );
  }, []);

  const handleSucccess = () => {
    openModal();
    successAlert(
      "Your cash withdrawal transaction was successful and you depositor has been credited."
    );
  };
  const getAgentInfo = async () => {
    try {
      const response = await axiosCustom.get(`/user/${info.username}`);
      setAgentInfo(response?.data?.data);
    } catch (err) {}
  };

  const handleReadyToReceive = async () => {
    // create a document first
    try {
      const docRef = await setDoc(doc(db, "withdrawtransfer", info.reference), {
        status: "pending",
      });
      setShowModal(true);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const firestoreListener = async () => {
    try {
      const unsub = onSnapshot(
        doc(db, "withdrawtransfer", info.reference),
        (doc) => {
          if (doc?.data()?.status === "approved") {
            handleSucccess();
          }
          if (doc?.data()?.status === "rejected") {
            errorAlert("unable to verify please try again");
          }
        }
      );
    } catch (e) {
      console.error("Error adding document: ", e);
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
          reasonForCancel: "agent declining withdraw request",
        },
      });
      navigation.navigate("Home");
    } catch (err) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <View>
      {loading && <Loader />}
      <CustomModal hideOnTap={false}>
        <Successmodal
          btnText="Great continue"
          successMsg="Your transaction was successful, cash has been sent to receiver"
          btnFunction={() => {
            navigation.navigate("Transactionsrating", info);
          }}
        />
      </CustomModal>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <LottieView
          source={Transacntionpinanimate}
          loop
          style={{ width: 104, height: 104 }}
        />
      </View>
      <View style={{ marginTop: 34.5 }}>
        <Text
          style={{
            textAlign: "center",
            lineHeight: 22,
            ...fontsize.smaller,
            ...FONTS.medium,
            color: COLORS.blue9,
          }}
        >
          Kindly input your transaction pin on{" "}
          <Text style={{ textTransform: "capitalize" }}>
            {getFirstName(info?.fullName)}
          </Text>{" "}
          device to complete the transaction, don’t worry it’s safe✌🏽
        </Text>

        <Horizontaline marginV={20} />
        <Text
          onPress={handleCancelRequest}
          style={{
            color: COLORS.red4,
            textAlign: "center",
            ...fontsize.smallest,
            ...FONTS.medium,
          }}
        >
          Cancel Request
        </Text>
      </View>
    </View>
  );
};

export default Transactionpin;
