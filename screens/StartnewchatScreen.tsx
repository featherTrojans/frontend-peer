import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { StartnewchatScreenStyles } from "../assets/styles/screens";

import {
  FTCustombutton,
  FTDetailsModal,
  FTIconwithtitleandinfo,
  FTLoader,
  FTSearchinput,
  FTSwitchbtn,
  FTTitlepagewrapper,
} from "../components";
import { COLORS, FONTS, fontsize, icons } from "../constants";
import { navigation, redirectTo } from "../utils";
import useDebounce from "../utils/debounce";
import axiosCustom from "../httpRequests/axiosCustom";
import amountFormatter from "../utils/formatMoney";
import useContact from "../hooks/useContact";

const { Smallphoneicon } = icons;

const { searchContactWrap, searchContactText, listHeaderText } =
  StartnewchatScreenStyles;

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

const StartnewchatScreen = () => {
  const [featherContacts, setFeatherContacts] = useState([]);
  const [searchval, setSearchval] = useState("");
  const { contactsResolved, loading } = useContact();

  useEffect(() => {
    setFeatherContacts(contactsResolved);
  }, [contactsResolved]);

  const handleSearch = (text) => {
    const filtercontacts = contactsResolved.filter((contact) => {
      return (
        contact.fullName.includes("text") || contact.username.includes("text")
      );
    });
    setFeatherContacts(filtercontacts);
  };
  return (
    <FTTitlepagewrapper title="Choose Feather User" childBg={COLORS.white}>
      <FTLoader loading={loading} />
      <FlatList
        data={featherContacts}
        showsVerticalScrollIndicator={false}
        bounces={false}
        ItemSeparatorComponent={() => <View style={{ height: 28 }} />}
        renderItem={({ item }) => {
          return (
            <FTIconwithtitleandinfo
              title={item.fullName}
              info={`@${item.username}`}
              onPress={() =>
                navigation.navigate("chatsdm_screen", { userInfo: item })
              }
              bG={COLORS.Tblue4}
              Icon={Smallphoneicon}
            />
          );
        }}
        ListHeaderComponent={
          <ListHeader value={searchval} onChange={handleSearch} />
        }
      />
    </FTTitlepagewrapper>
  );
};

export default StartnewchatScreen;

const styles = StyleSheet.create({});
