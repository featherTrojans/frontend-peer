import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { TransactionsummaryScreenStyles } from "../assets/styles/screens";
import {
  FTCustombutton,
  FTIconwithbg,
  FTInput,
  FTKeyboardwrapper,
  FTOtherImage,
  FTTitlepagewrapper,
} from "../components";
import { COLORS, icons } from "../constants";
import { useForm } from "react-hook-form";
import { VALIDATION } from "../utils";
import amountFormatter from "../utils/formatMoney";
import { trucateText } from "../utils/truncateText";

const { Bluecardicon, Useravatar } = icons;

const {
  amountText,
  amountValueText,
  summaryWrap,
  eachSummaryWrap,
  eachSummaryKey,
  eachSummaryValue,
  dashedLine,
} = TransactionsummaryScreenStyles;
const TransactionsummaryScreen = ({ route, navigation }) => {
  const action = route?.params?.action;
  const userInfo = route?.params?.userInfo;
  const summaryinfo = route?.params?.summaryinfo;
  const { control, handleSubmit } = useForm({ mode: "all" });

  const EachRow = ({ data }) => {
    const { leftSide, rightSide } = data;
    let isFree = rightSide?.toLowerCase() === "free";
    let isTotal = leftSide?.toLowerCase().includes("total");
    return (
      <View style={eachSummaryWrap}>
        <Text style={eachSummaryKey}>{leftSide}</Text>
        <Text
        numberOfLines={1}
          style={[
            eachSummaryValue,
            { color: isFree ? COLORS.green4 : COLORS.blue9 },
          ]}
        >
          {trucateText(rightSide, 18)}
        </Text>
      </View>
    );
  };

  return (
    <FTTitlepagewrapper
      headerBg={COLORS.white3}
      childBg={COLORS.white3}
      title="Transaction Summary"
    >
      <FTKeyboardwrapper>
        <View style={summaryWrap}>
          <View style={{ alignItems: "center" }}>
            {userInfo ? (
              <FTOtherImage
                imageurl={userInfo?.imageUrl}
                memojiImage={userInfo?.memoji}
                fullname={userInfo?.fullName}
                size={60}
              />
            ) : (
              <FTIconwithbg
                size={60}
                Icon={Useravatar}
                bG={COLORS.Tpurple2}
              />
            )}
            <Text style={amountText}>Amount</Text>
            <Text style={amountValueText}>
              N{amountFormatter(summaryinfo.amount)}
            </Text>
          </View>

          <View style={dashedLine} />

          {summaryinfo?.transactionDatas.map((summary, index) => {
            return (
              <View key={index}>
                <EachRow data={summary} />
                <View style={{ height: 18 }} />
              </View>
            );
          })}
        </View>

        <FTInput
          label="Transaction Note"
          placeholderText="Enter Note (Optional)"
          name="remarks"
          rules={VALIDATION.REMARKS_VALIDATION}
          control={control}
          mB={26}
        />

        <FTCustombutton
          btntext="Great, Proceed to pay"
          onpress={() =>
            navigation.navigate("transactionpin_screen", { action })
          }
          bg={COLORS.blue9}
        />
      </FTKeyboardwrapper>
    </FTTitlepagewrapper>
  );
};

export default TransactionsummaryScreen;

const styles = StyleSheet.create({});
