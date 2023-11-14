import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { StartnewchatScreenStyles } from "../assets/styles/screens";

import {
  FTIconwithtitleandinfo,
  FTLoader,
  FTSearchinput,
  FTTitlepagewrapper,
} from "../components";
import { COLORS, icons } from "../constants";
import useContact from "../hooks/useContact";
import Emptycomponent from "../components/FTEmptycomponent";

const { Smallphoneicon } = icons;

const { listHeaderText } = StartnewchatScreenStyles;

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

const StartnewchatScreen = ({ navigation }) => {
  const [featherContacts, setFeatherContacts] = useState([]);
  const [searchval, setSearchval] = useState("");
  const { contactsResolved, loading } = useContact();

  useEffect(() => {
    setFeatherContacts(contactsResolved);
  }, [contactsResolved]);

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
    <FTTitlepagewrapper title="Choose Feather User" childBg={COLORS.white}>
      <FTLoader loading={loading} />
      {/* {!loading && featherContacts?.length == 0 && (
        
      )} */}
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
              profile={true}
              userInfo={{
                imageUrl: item.imageUrl,
                memoji: item.memoji,
                fullName: item.fullName,
              }}
              bG={COLORS.Tblue4}
              Icon={Smallphoneicon}
            />
          );
        }}
        ListHeaderComponent={
          <ListHeader value={searchval} onchange={handleSearch} />
        }
        ListEmptyComponent={
          <Emptycomponent
            msg="no Feather account in your contact list"
            showTransact={false}
          />
        }
      />
    </FTTitlepagewrapper>
  );
};

export default StartnewchatScreen;

const styles = StyleSheet.create({});
