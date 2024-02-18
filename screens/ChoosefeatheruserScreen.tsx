import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ChoosefeatheruserScreenStyles } from "../assets/styles/screens";
import {
  FTDetailsModal,
  FTEmptycomponent,
  FTIconwithtitleandinfo,
  FTSearchinput,
  FTSwitchbtn,
  FTTitlepagewrapper,
} from "../components";
import { COLORS, FONTS, fontsize, icons } from "../constants";
import useDebounce from "../utils/debounce";
import axiosCustom from "../httpRequests/axiosCustom";
import amountFormatter from "../utils/formatMoney";
import { useNavigation } from "@react-navigation/native";
import { nameCapitalize } from "../utils/nameSplitter";
import useBeneficiary from "../hooks/useBeneficiary";

const { Smallphoneicon } = icons;

const {
  searchContactWrap,
  searchContactText,
  listHeaderText,
  addBeneficiaryWrap,
  saveBeneficiaryText,
} = ChoosefeatheruserScreenStyles;

const BENEFICIARY_TYPE = "transferfeather";

const ModalContent = ({ userinfo, amount, isBenficairy = false }) => {
  const navigation = useNavigation();
  const action = async (pin) => {
    try {
      await axiosCustom.post("/transfer", {
        amount: Number(amount),
        transferTo: userinfo?.phoneNumber,
        userPin: pin,
      });
      navigation.navigate("transactionsuccess_screen");
    } catch (err) {
      throw err;
    }
  };
  const summaryinfo = {
    amount: amountFormatter(amount),
    transactionDatas: [
      {
        leftSide: "Merchant Name",
        rightSide: userinfo?.fullName && nameCapitalize(userinfo?.fullName),
      },
      {
        leftSide: "Feather Tag",
        rightSide: `@${userinfo?.username?.toLowerCase()}`,
      },
      {
        leftSide: "Charges",
        rightSide: "Free",
      },
      {
        leftSide: "Total to be deducted",
        rightSide: `N${amountFormatter(amount)}`,
      },
    ],
  };
  const onpress = () => {
    navigation.navigate("transactionsummary_screen", {
      action,
      summaryinfo,
      userInfo: userinfo,
    });
  };

  const addtobeneficiary = async () => {
    try {
      await axiosCustom.post("beneficiary/create", {
        type: BENEFICIARY_TYPE,
        data: userinfo,
      });
    } catch (err) {}
  };
  return (
    <View style={{ backgroundColor: "#fff" }}>
      <FTDetailsModal
        modalTitle="User Details"
        title={nameCapitalize(userinfo.fullName)}
        info={`@${userinfo.username.toLowerCase()}`}
        onPress={onpress}
        bG={COLORS.Tblue4}
        Icon={Smallphoneicon}
        mB={25}
        profile={true}
        userInfo={{
          fullName: userinfo.fullName,
          memoji: userinfo.memoji,
          imageUrl: userinfo.imageUrl,
        }}
        extraComponent={
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {isBenficairy ? null : (
              <View style={addBeneficiaryWrap}>
                <Text style={saveBeneficiaryText}>Save to beneficiaries?</Text>
                <FTSwitchbtn action={addtobeneficiary} />
              </View>
            )}
          </View>
        }
      />
      {/* beneficiary */}
    </View>
  );
};

const ListHeader = ({ amount, switchModals }) => {
  const [searchval, setSearchval] = useState("");
  const [userinfo, getuserinfo, loadbounce, error] = useDebounce();

  const onchange = (val: string) => {
    setSearchval(val);
    getuserinfo(val);
  };
  return (
    <>
      <FTSearchinput
        placeholder="Enter feather tag"
        value={searchval}
        onChange={onchange}
      />
      {loadbounce && <ActivityIndicator size={"small"} />}
      {userinfo?.fullName && (
        <FTIconwithtitleandinfo
          title={nameCapitalize(userinfo?.fullName)}
          info={`@${userinfo?.username.toLowerCase()}`}
          onPress={() => switchModals(1, userinfo, amount, false)}
          bG={COLORS.Tblue4}
          Icon={Smallphoneicon}
          mB={40}
          profile={true}
          userInfo={{
            imageUrl: userinfo?.imageUrl,
            memoji: userinfo?.memoji,
            fullName: userinfo?.fullName,
          }}
        />
      )}

      <Text style={listHeaderText}>My Beneficiaries</Text>
    </>
  );
};

const ChoosefeatheruserScreen = ({ route, navigation }) => {
  const amount = route?.params?.amount;
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState<any>({ child: null, height: 200 });

  const { beneficiaries, loading } = useBeneficiary(
    BENEFICIARY_TYPE,
    "userUid"
  );

  const switchModals = (value, data, amount, isBenficairy) => {
    switch (value) {
      case 0:
        setContent({
          child: (
            <ModalContent
              userinfo={data}
              amount={amount}
              isBenficairy={isBenficairy}
            />
          ),
          height: 276,
        });
        setShowModal((s) => !s);
        break;
      case 1:
        setContent({
          child: (
            <ModalContent
              userinfo={data}
              amount={amount}
              isBenficairy={isBenficairy}
            />
          ),
          height: 320,
        });
        setShowModal((s) => !s);
        break;

      default:
        break;
    }
  };

  return (
    <FTTitlepagewrapper
      title="Choose Feather User"
      childBg={COLORS.white}
      modalChildren={content.child}
      showModal={showModal}
      setShowModal={setShowModal}
      modalHeight={content.height}
    >
      <FlatList
        data={beneficiaries}
        showsVerticalScrollIndicator={false}
        bounces={false}
        ItemSeparatorComponent={() => <View style={{ height: 28 }} />}
        renderItem={({ item }) => {
          return (
            <FTIconwithtitleandinfo
              title={nameCapitalize(item?.fullName)}
              info={`@${item?.username?.toLowerCase()}`}
              onPress={() => switchModals(0, item, amount, true)}
              bG={COLORS.Tblue4}
              // Icon={Smallphoneicon}
              profile={true}
              userInfo={{
                imageUrl: item?.imageUrl,
                memoji: item?.memoji,
                fullName: item?.fullName,
              }}
            />
          );
        }}
        ListHeaderComponent={
          <ListHeader amount={amount} switchModals={switchModals} />
        }
        ListEmptyComponent={
          !loading ? (
            <FTEmptycomponent
              msg="Padi, you don't have any beneficiary"
              showTransact={false}
            />
          ) : (
            <ActivityIndicator size="small" color={COLORS.blue9} />
          )
        }
      />

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate("searchcontact_screen", { amount })}
        style={searchContactWrap}
      >
        <Smallphoneicon />
        <Text style={searchContactText}>Search Contacts</Text>
      </TouchableOpacity>
    </FTTitlepagewrapper>
  );
};

export default ChoosefeatheruserScreen;

const styles = StyleSheet.create({});
