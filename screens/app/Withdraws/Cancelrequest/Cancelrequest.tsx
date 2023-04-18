import { StyleSheet, Text, View, StatusBar, TextInput } from "react-native";
import React, { useState } from "react";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import LottieView from "lottie-react-native";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import { styles } from "./Cancelrequest.styles";
import {
  Backheader,
  Bottombtn,
  Custombutton,
  Horizontaline,
  Loader,
  Mainwrapper,
} from "../../../../components";
import axiosCustom from "../../../../httpRequests/axiosCustom";
import showerror from "../../../../utils/errorMessage";
import { useToast } from "react-native-toast-notifications";
import Globalmodal from "../../../shared/Globalmodal/Globalmodal";
import Customstatusbar from "../../../shared/Customstatusbar";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import useAlert from "../../../../utils/useAlerts";

const { Backarrow, Successcheckanimate, Forwardarrow } = icons;
const Cancelrequest = ({ route, navigation }) => {
  const reference = route.params;
  const toast = useToast();
  const { errorAlert } = useAlert();
  const [checked, setChecked] = useState(false);
  const [activereason, setReason] = useState({ key: 0, text: "" });
  const [writeReason, setWriteReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  console.log("I see you o");
  const reasons = [
    { text: "Mistake request", key: 1 },
    { text: "The agent didn’t accept my cash request", key: 2 },
    { text: "Long cash delivery time", key: 3 },
    {
      text: "The agent seemed suspicious during the meet-up conversation",
      key: 4,
    },
    { text: "Cash presented was in bad condition", key: 5 },
  ];

  const handleCancelRequest = async () => {
    if (checked && writeReason.length < 10) {
      return errorAlert("Reason text must be greater than 10 characters");
    }
    setLoading(true);
    console.log(reference, "reference");
    try {
      await axiosCustom({
        method: "DELETE",
        url: "/request/cancel",
        data: {
          reference: reference,
          reasonForCancel: checked ? writeReason : activereason.text,
        },
      });
      setModalVisible(true);
    } catch (err) {
      errorAlert(err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <Mainwrapper>
      <Backheader title="Cancel Transaction" />
      {loading && <Loader />}

      <Globalmodal
        showState={isModalVisible}
        btnFunction={() => navigation.navigate("Home")}
      >
        <View style={{ alignItems: "center" }}>
          <LottieView
            source={Successcheckanimate}
            style={{ width: 148, height: 148, marginBottom: 10 }}
            autoPlay
            loop
          />
          <Text
            style={{
              textAlign: "center",
              marginHorizontal: 35,
              marginVertical: 40,
              ...fontsize.bsmall,
              ...FONTS.regular,
            }}
          >
            Your request has been canceled successfully and your reason
            submitted{" "}
          </Text>
        </View>
      </Globalmodal>
      {/* Back Arrow */}
      <View style={{ flex: 1, paddingHorizontal: 15 }}>
        <View>
          <Text
            style={{
              ...fontsize.bbsmall,
              ...FONTS.regular,
              lineHeight: 25,
              marginBottom: 15,
            }}
          >
            Cancel Request Feedback
          </Text>
          <Text
            style={{
              ...fontsize.smaller,
              ...FONTS.regular,
              lineHeight: 20,
              color: COLORS.grey2,
            }}
          >
            Please give us a reason why you want to cancel this transaction?
          </Text>
        </View>

        <View style={{ marginTop: 54 }}>
          {!checked &&
            reasons.map((reason) => (
              <TouchableOpacity
                onPress={() => setReason(reason)}
                activeOpacity={0.8}
              >
                <View
                  key={reason.key}
                  style={{
                    flexDirection: "row",
                    paddingVertical: 23,
                    borderBottomColor: COLORS.borderColor2,
                    borderBottomWidth: 0.5,
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor:
                      reason.key === activereason.key ? "#003AD6" : null,
                  }}
                >
                  <Text
                    style={{
                      ...fontsize.smaller,
                      ...FONTS.regular,
                      color:
                        reason.key === activereason.key ? "#fff" : COLORS.blue9,
                      flex: 0.95,
                    }}
                  >
                    {" "}
                    {reason.text}{" "}
                  </Text>
                  <Forwardarrow />
                </View>
              </TouchableOpacity>
            ))}
          <Text
            onPress={() => setChecked(!checked)}
            style={{
              ...fontsize.smaller,
              ...FONTS.regular,
              color: COLORS.purple2,
            }}
          >
            Other Reason?
          </Text>
          {/* Other reason is active */}

          {checked && (
            <TextInput
              multiline
              onChangeText={setWriteReason}
              style={{
                backgroundColor: COLORS.white,
                height: 174,
                marginVertical: 15,
                paddingVertical: 20,
                paddingHorizontal: 15,
                ...fontsize.smallest,
                ...FONTS.regular,
              }}
              placeholder="Enter your reason…"
              textAlignVertical="top"
            />
          )}
        </View>
      </View>
      <View style={{ paddingHorizontal: 15, paddingBottom: 20 }}>
        <Custombutton btntext="Submit Reason" onpress={handleCancelRequest} />
      </View>

      {/* <Bottombtn
        disabled={reason === ""}
        title="CANCEL REQUEST"
        onpress={handleCancelRequest}
      /> */}
    </Mainwrapper>
  );
};

export default Cancelrequest;
