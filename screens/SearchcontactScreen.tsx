import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import {
  ChoosefeatheruserScreenStyles,
  SearchcontactScreenStyles,
} from "../assets/styles/screens";
import {
  FTDetailsModal,
  FTIconwithtitleandinfo,
  FTLoader,
  FTSearchinput,
  FTSwitchbtn,
  FTTitlepagewrapper,
} from "../components";
import { COLORS, FONTS, fontsize, icons } from "../constants";

import useContact from "../hooks/useContact";
import amountFormatter from "../utils/formatMoney";
import axiosCustom from "../httpRequests/axiosCustom";
import { useNavigation } from "@react-navigation/native";

const { listHeaderText, addBeneficiaryWrap, saveBeneficiaryText } =
  ChoosefeatheruserScreenStyles;
const {} = SearchcontactScreenStyles;
const { Smallphoneicon } = icons;

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
        mB={0}
        profile={true}
        userInfo={{
          imageUrl: userinfo?.imageUrl,
          memoji: userinfo?.memoji,
          fullName: userinfo?.fullName,
        }}
        extraComponent={
          <View style={addBeneficiaryWrap}>
            <Text style={saveBeneficiaryText}>Save to beneficiaries?</Text>
            <FTSwitchbtn action={addtobeneficiary} />
          </View>
        }
      />
    </View>
  );
};

const ListHeader = ({ value, onchange }) => {
  return (
    <>
      <FTSearchinput
        placeholder="Enter feather tag"
        value={value}
        onChange={onchange}
      />
      <Text style={listHeaderText}>My Contacts</Text>
    </>
  );
};

const SearchcontactScreen = ({ route }) => {
  const amount = route?.params?.amount;
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState<any>({ child: null, height: 200 });
  const [featherContacts, setFeatherContacts] = useState([]);
  const [searchval, setSearchval] = useState("");
  const { contactsResolved, loading } = useContact();

  useEffect(() => {
    setFeatherContacts(contactsResolved);
  }, [contactsResolved]);

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

  const handleSearch = (text) => {
    setSearchval(text);
    const filtercontacts = contactsResolved.filter((contact) => {
      return (
        contact?.fullName?.toLowerCase()?.includes(text.toLowerCase()) ||
        contact?.username?.toLowerCase()?.includes(text.toLowerCase())
      );
    });
    setFeatherContacts(filtercontacts);
  };

  return (
    <FTTitlepagewrapper
      title="Search Contacts"
      childBg={COLORS.white}
      modalChildren={content.child}
      showModal={showModal}
      setShowModal={setShowModal}
      modalHeight={content.height}
    >
      <FTLoader loading={loading} />
      <FlatList
        data={featherContacts}
        bounces={false}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 28 }} />}
        renderItem={({ item }) => {
          return (
            <FTIconwithtitleandinfo
              title={item.fullName}
              info={`@${item.username}`}
              onPress={() => switchModals(0, item, amount)}
              bG={COLORS.Tblue4}
              Icon={Smallphoneicon}
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
          <ListHeader value={searchval} onchange={handleSearch} />
        }
      />
    </FTTitlepagewrapper>
  );
};

export default SearchcontactScreen;

const styles = StyleSheet.create({});
