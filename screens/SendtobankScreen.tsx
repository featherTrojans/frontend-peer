import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import {
  ChoosefeatheruserScreenStyles,
  SendtobankScreenStyles,
} from "../assets/styles/screens";
import {
  FTIconwithtitleandinfo,
  FTLoader,
  FTSearchinput,
  FTTitlepagewrapper,
} from "../components";
import { COLORS, icons } from "../constants";
import { redirectTo } from "../utils";


const { listHeaderText } = ChoosefeatheruserScreenStyles;

const { Smallphoneicon, Nigerialogoicon, Whitebankicon } = icons;

const {} = SendtobankScreenStyles;

const SendtobankScreen = () => {
  const [loading, setLoading] = useState(false)
  const ListHeader = () => {
    return (
      <>
        <FTIconwithtitleandinfo
          title="Send to a new bank"
          info="Start a new transfer to a bank"
          onPress={() => redirectTo("choosebank_screen")}
          bG={COLORS.blue16}
          Icon={Whitebankicon}
          mB={40}
          badge={<Nigerialogoicon />}
        />
        <Text style={listHeaderText}>Send Beneficiaries</Text>
      </>
    );
  };

  return (
    <FTTitlepagewrapper title="Send to bank account">
      <FTSearchinput placeholder="Enter feather tag" />
      <FTLoader loading={loading} />
      <FlatList
        data={[1, 2, 2,]}
        showsVerticalScrollIndicator={false}
        bounces={false}
        ItemSeparatorComponent={() => <View style={{ height: 28 }} />}
        renderItem={() => {
          return (
            <FTIconwithtitleandinfo
              title="Bolu Olatunji"
              info="@eagleone"
              onPress={() => console.log("Send to bank")}
              bG={COLORS.Tblue4}
              Icon={Smallphoneicon}
            />
          );
        }}
        ListHeaderComponent={ListHeader}
      />
    </FTTitlepagewrapper>
  );
};

export default SendtobankScreen;

const styles = StyleSheet.create({});
