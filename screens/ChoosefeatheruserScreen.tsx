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

const { Smallphoneicon } = icons;

const { searchContactWrap, searchContactText, listHeaderText } =
  ChoosefeatheruserScreenStyles;

const BENEFICIARY_TYPE = "transferfeather";

const ModalContent = ({ userinfo, amount, isBenficairy = false }) => {
  const navigation = useNavigation();
  const action = async (pin) => {
    try {
      await axiosCustom.post("/transfer", {
        amount: Number(amount),
        transferTo: userinfo?.username,
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
        leftSide: "Name",
        rightSide: userinfo.fullName,
      },
      {
        leftSide: "Feather Tag",
        rightSide: `${userinfo.username}`,
      },
      {
        leftSide: "Charges",
        rightSide: "Free",
      },
      {
        leftSide: "Total to be sent",
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
        title={userinfo.fullName}
        info={userinfo.username}
        onPress={onpress}
        bG={COLORS.Tblue4}
        Icon={Smallphoneicon}
        mB={40}
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
              <View style={{marginBottom: 20}}>
                <Text style={{ ...FONTS.regular, ...fontsize.smallest }}>Save to beneficiaries?</Text>
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
          title={userinfo?.fullName}
          info={userinfo?.username}
          onPress={() => switchModals(0, userinfo, amount, false)}
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
  const [beneficiaries, setbeneficiaries] = useState([]);
  console.log(beneficiaries, "here");
  useEffect(() => {
    axiosCustom
      .get(`/beneficiary/get/${BENEFICIARY_TYPE}`)
      .then((res) => {
        setbeneficiaries(res.data.data?.beneficiaries);
      })
      .catch((err) => {});
  }, []);

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
          let dataobject = {};
          if (item?.data) {
            dataobject = JSON.parse(item?.data);
          }
          return (
            <FTIconwithtitleandinfo
              title={dataobject.fullName}
              info={dataobject.username}
              onPress={() => switchModals(0, dataobject, amount, true)}
              bG={COLORS.Tblue4}
              Icon={Smallphoneicon}
              profile={true}
              userInfo={{
                imageUrl: dataobject?.imageUrl,
                memoji: dataobject?.memoji,
                fullName: dataobject?.fullName,
              }}
            />
          );
        }}
        ListHeaderComponent={
          <ListHeader amount={amount} switchModals={switchModals} />
        }
        ListEmptyComponent={
          <FTEmptycomponent
            msg="Padi, you don't have any beneficiary"
            showTransact={false}
          />
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
