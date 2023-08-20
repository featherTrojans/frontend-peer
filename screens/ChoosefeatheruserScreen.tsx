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
      navigation.navigate("summary");
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
  return (
    <View style={{ backgroundColor: "#fff" }}>
      <Text>User Details</Text>
      <FTIconwithtitleandinfo
        title={userinfo.fullName}
        info={userinfo.username}
        onPress={() => {}}
        bG={COLORS.Tblue4}
        Icon={Smallphoneicon}
        mB={40}
      />
      <FTCustombutton btntext="Proceed" onpress={onpress} />
    </View>
  );
};
const ChoosefeatheruserScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState<any>({ child: null, height: 200 });
  const [beneficiaries, setbeneficiaries] = useState([]);

  useEffect(() => {
    axiosCustom
      .get("/getbeneficiaries")
      .then((res) => {
        setbeneficiaries(res.data.data);
      })
      .catch((err) => {});
  }, []);

  const switchModals = (value, data) => {
    switch (value) {
      case 0:
        setContent({ child: <ModalContent userinfo={data} />, height: 276 });
        setShowModal((s) => !s);
        break;

      default:
        break;
    }
  };

  const ListHeader = () => {
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
        {userinfo.fullName && (
          <FTIconwithtitleandinfo
            title={userinfo.fullName}
            info={userinfo.username}
            onPress={() => switchModals(0, userinfo)}
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
        data={[1, 2]}
        showsVerticalScrollIndicator={false}
        bounces={false}
        ItemSeparatorComponent={() => <View style={{ height: 28 }} />}
        renderItem={({ item }) => {
          return (
            <FTIconwithtitleandinfo
              title="Stephen Kayode. J"
              info="@blvkcreator"
              onPress={() => switchModals(0, item)}
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
