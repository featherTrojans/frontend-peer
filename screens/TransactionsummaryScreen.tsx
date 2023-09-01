import {
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { TransactionsummaryScreenStyles } from "../assets/styles/screens";
import {
  FTCustombutton,
  FTHorizontaline,
  FTIconwithbg,
  FTInput,
  FTKeyboardwrapper,
  FTOtherImage,
  FTTitlepagewrapper,
} from "../components";
import { COLORS, FONTS, fontsize, icons } from "../constants";
import { useForm } from "react-hook-form";
import { VALIDATION, navigation, redirectTo } from "../utils";

const { Bluecardicon } = icons;

const {
  amountText,
  amountValueText,
  summaryWrap,
  eachSummaryWrap,
  eachSummaryKey,
  eachSummaryValue,
} = TransactionsummaryScreenStyles;
const TransactionsummaryScreen = ({ route }) => {
  const action = route?.params?.action;
  const userInfo = route?.params?.userInfo;
  const summaryinfo = route?.params?.summaryinfo;
  const { control, handleSubmit } = useForm({ mode: "all" });

  const EachRow = ({ data }) => {
    const { leftSide, rightSide } = data;
    let isFree = rightSide.toLowerCase() === "free";
    let isTotal = leftSide.toLowerCase().includes("total");
    return (
      <View style={eachSummaryWrap}>
        <Text style={eachSummaryKey}>{leftSide}</Text>
        <Text
          style={[
            eachSummaryValue,
            { color: isFree ? COLORS.green4 : COLORS.blue9 },
          ]}
        >
          {rightSide}
        </Text>
      </View>
    );
  };

  return (
    <FTTitlepagewrapper childBg={COLORS.white} title="Transaction Summary">
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
                Icon={Bluecardicon}
                bG={COLORS.Tpurple2}
              />
            )}
            <Text style={amountText}>Amount</Text>
            <Text style={amountValueText}>N{summaryinfo.amount}</Text>
          </View>

          <FTHorizontaline mT={30} mB={42} />

          <FlatList
            data={summaryinfo?.transactionDatas}
            ItemSeparatorComponent={() => <View style={{ height: 18 }} />}
            renderItem={({ item }) => <EachRow data={item} />}
          />
        </View>

        <FTInput
          label="Transaction Note"
          placeholderText="Enter Note (Optional)"
          name="remarks"
          rules={VALIDATION.REMARKS_VALIDATION}
          control={control}
          mB={26}
        />
      </FTKeyboardwrapper>

      <FTCustombutton
        btntext="Great, Proceed to pay"
        onpress={() => navigation.navigate("transactionpin_screen", { action })}
        bg={COLORS.blue9}
      />
    </FTTitlepagewrapper>
  );
};

export default TransactionsummaryScreen;

const styles = StyleSheet.create({});
