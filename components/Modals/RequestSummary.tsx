import { StyleSheet, Text, View, Image } from "react-native";
import React, { useContext } from "react";
import Sendingandreceive from "../Send&Receive/Sendingandreceive";
import { COLORS, FONTS, fontsize, icons } from "../../constants";
import Horizontaline from "../Horizontaline/Horizontaline";
import Custombutton from "../Custombutton/Custombutton";
import axiosCustom from "../../httpRequests/axiosCustom";
import { LocationContext } from "../../context/LocationContext";
import useAlert from "../../utils/useAlerts";
import amountFormatter from "../../utils/formatMoney";
import {
  getFirstName,
  nameSplitter,
  nameSplitToTwo,
} from "../../utils/nameSplitter";
import { AuthContext } from "../../context/AuthContext";

const { Sendingarrow, Receivingarrow } = icons;

const RequestSummary = ({
  amount,
  withdrawInfo,
  baseCharge,
  openNextModal,
}) => {
  const { errorAlert } = useAlert();
  const { coords } = useContext(LocationContext);
  const { authdata } = useContext(AuthContext);
  const { fullName, imageUrl } = authdata?.userDetails;

  const handleCreateWithdrawal = async () => {
    const data = {
      amount: amount,
      charges: baseCharge,
      agentUsername: withdrawInfo.username,
      agent: withdrawInfo.fullName,
      statusId: withdrawInfo.reference,
      meetupPoint: coords.locationText,
      negotiatedFee: 0,
    };

    try {
      await axiosCustom.post("/request/create", data);
      openNextModal();
    } catch (err) {
      errorAlert(err);
    }
  };

  return (
    <View>
      <Text
        style={{ ...fontsize.smaller, ...FONTS.medium, color: COLORS.blue9 }}
      >
        Request Summary
      </Text>
      <Text
        style={{
          ...fontsize.smallest,
          ...FONTS.regular,
          color: COLORS.grey16,
          marginTop: 10,
        }}
      >
        Kindly confirm all your charges breakdown
      </Text>

      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 35,
          marginBottom: 40,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <View style={{ alignItems: "center" }}>
            {imageUrl ? (
              <Image
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 48 / 2,
                  marginBottom: 14,
                }}
                source={{
                  uri: imageUrl,
                }}
              />
            ) : (
              <View
                style={{
                  width: 48,
                  height: 48,
                  backgroundColor: COLORS.green3,
                  marginBottom: 14,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 48 / 2,
                }}
              >
                <Text
                  style={{
                    ...fontsize.smaller,
                    ...FONTS.medium,
                    color: COLORS.green1,
                  }}
                >
                  {nameSplitter(fullName)}
                </Text>
              </View>
            )}
            <Text
              style={{
                ...fontsize.smaller,
                ...FONTS.medium,
                textTransform: "capitalize",
                color: COLORS.blue9,
              }}
            >
              You
            </Text>
          </View>

          {/* Separator bg */}
          <View
            style={{ marginHorizontal: 32, height: 48, alignSelf: "center" }}
          >
            <Sendingarrow />
            <Receivingarrow />
          </View>

          <View style={{ alignItems: "center" }}>
            <View
              style={{
                width: 48,
                height: 48,
                backgroundColor: COLORS.purple3,
                marginBottom: 14,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 48 / 2,
              }}
            >
              <Text
                style={{
                  ...fontsize.smaller,
                  ...FONTS.medium,
                  color: COLORS.purple4,
                }}
              >
                {nameSplitter(withdrawInfo.fullName)}
              </Text>
            </View>
            <Text
              style={{
                ...fontsize.smaller,
                ...FONTS.medium,
                textTransform: "capitalize",
                color: COLORS.blue9,
              }}
            >
              {getFirstName(withdrawInfo.fullName)}
            </Text>
          </View>
        </View>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          style={{
            ...fontsize.smallest,
            ...FONTS.regular,
            color: COLORS.blue9,
          }}
        >
          Withdraw Amount
        </Text>
        <Text
          style={{ ...fontsize.smallest, ...FONTS.medium, color: COLORS.blue9 }}
        >
          N{amountFormatter(amount)}
        </Text>
      </View>

      <Horizontaline marginV={20} />

      <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
        <Text
          style={{
            ...fontsize.smallest,
            ...FONTS.regular,
            color: COLORS.blue9,
          }}
        >
          Base Charge{" "}
        </Text>
        <Text
          style={{
            ...fontsize.smallest,
            ...FONTS.medium,
            color: COLORS.purple4,
          }}
        >
          +N{amountFormatter(baseCharge)}
        </Text>
      </View>

      <Horizontaline marginV={20} />

      <Text
        style={{
          ...fontsize.smallest,
          ...FONTS.regular,
          color: COLORS.blue9,
          lineHeight: 27,
        }}
      >
        Total amount to pay on meetup
      </Text>
      <Text
        style={{
          marginBottom: 40,
          marginTop: 16,
          ...fontsize.smaller,
          ...FONTS.bold,
          color: COLORS.green1,
        }}
      >
        N{amountFormatter(`${Number(baseCharge) + Number(amount)}`)}
      </Text>

      <Custombutton btntext="Yeah, Continue" onpress={handleCreateWithdrawal} />
    </View>
  );
};

export default RequestSummary;

const styles = StyleSheet.create({});
