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
  FTCustombutton,
  FTIconwithtitleandinfo,
  FTSearchinput,
  FTSwitchbtn,
  FTTitlepagewrapper,
} from "../components";
import { COLORS, FONTS, fontsize, icons } from "../constants";
import { navigation, redirectTo } from "../utils";
import useDebounce from "../utils/debounce";
import axiosCustom from "../httpRequests/axiosCustom";

const { Smallphoneicon } = icons;

const { searchContactWrap, searchContactText, listHeaderText } =
  ChoosefeatheruserScreenStyles;

const ModalContent = ({ userinfo, amount }) => {
  const action = async (pin) => {
    try {
      await axiosCustom.post("/transfer", {
        amount: Number(amount),
        transferTo: userinfo?.username,
        userPin: pin,
      });
      navigation.navigate("transactionsuccess_screen");
    } catch (err) {
      console.log(err.response);
      throw err;
    }
  };
  const summaryinfo = {
    amount: amount,
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
        rightSide: `N${amount}`,
      },
    ],
  };
  const onpress = () => {
    navigation.navigate("transactionsummary_screen", { action, summaryinfo });
  };

  const addtobeneficiary = async () => {
    try {
      await axiosCustom.post("beneficiary/create", {
        type: "transfer",
        data: userinfo,
      });
    } catch (err) {}
  };
  return (
    <View style={{ backgroundColor: "#fff" }}>
      <Text style={{ marginBottom: 20, ...FONTS.bold }}>User Details</Text>
      <FTIconwithtitleandinfo
        title={userinfo.fullName}
        info={userinfo.username}
        onPress={() => {}}
        bG={COLORS.Tblue4}
        Icon={Smallphoneicon}
        mB={40}
      />
      {/* beneficiary */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Text style={{ ...FONTS.regular }}>Save to beneficiaries?</Text>
        <FTSwitchbtn action={addtobeneficiary} />
      </View>

      <FTCustombutton btntext="Proceed" onpress={onpress} />
    </View>
  );
};
const ChoosefeatheruserScreen = ({ route }) => {
  const amount = route?.params?.amount;
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState<any>({ child: null, height: 200 });
  const [beneficiaries, setbeneficiaries] = useState([]);

  useEffect(() => {
    axiosCustom
      .get("/beneficiary/get")
      .then((res) => {
        setbeneficiaries(res.data.data?.beneficiaries);
      })
      .catch((err) => {});
  }, []);

  const switchModals = (value, data, amount) => {
    switch (value) {
      case 0:
        setContent({
          child: <ModalContent userinfo={data} amount={amount} />,
          height: 276,
        });
        setShowModal((s) => !s);
        break;

      default:
        break;
    }
  };

  const ListHeader = () => {
    const [searchval, setSearchval] = useState("");
    const [userinfo, getuserinfo, loadbounce, error] = useDebounce();
    const [usertosend, setusertosend] = useState({});
    useEffect(() => {
      if (userinfo?.fullName) {
        setusertosend(userinfo);
      }
    }, [userinfo]);

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
        {usertosend.fullName && (
          <FTIconwithtitleandinfo
            title={usertosend.fullName}
            info={usertosend.username}
            onPress={() => switchModals(0, usertosend, amount)}
            bG={COLORS.Tblue4}
            Icon={Smallphoneicon}
            mB={40}
          />
        )}

        <Text style={listHeaderText}>My Beneficiaries</Text>
      </>
    );
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
              title={userinfo.fullName}
              info={userinfo.username}
              onPress={() => switchModals(0, item, amount)}
              bG={COLORS.Tblue4}
              Icon={Smallphoneicon}
            />
          );
        }}
        ListHeaderComponent={ListHeader}
      />

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => redirectTo("searchcontact_screen")}
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
