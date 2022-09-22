import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  Backheader,
  Custombutton,
  Mainwrapper,
  Tableoption,
} from "../../../components";
import { COLORS, FONTS, fontsize, icons } from "../../../constants";
import { navigationRef } from "../../../utils/customNavigation";

const { Newlogo } = icons;

const Becomeanagent = ({navigation}) => {
  return (
    <Mainwrapper>
      <Backheader title="Become an agent" />


      <ScrollView style={{flex:  1}} showsVerticalScrollIndicator={false} bounces={false}>
      <View style={{ paddingHorizontal: 15, flex: 1 }}>

        <View style={{flex: 1, }}>

        
        <View>
          <Newlogo />
          <Text
            style={{
              ...fontsize.bbsmall,
              ...FONTS.medium,
              marginTop: 35,
              marginBottom: 25,
            }}
          >
            Earn More!{" "}
            <Text style={{ color: COLORS.blue6 }}>Become an Agent</Text>
          </Text>
          <Text
            style={{
              ...fontsize.smaller,
              ...FONTS.regular,
              color: COLORS.grey2,
            }}
          >
            Enjoy better withdrawal commissions today with plenty benefits and
            access to more cash transactions, wherever you are.
          </Text>
        </View>

        <View
          style={{
            marginTop: 25,
            backgroundColor: COLORS.white,
            paddingHorizontal: 21,
            paddingVertical: 30,
            borderRadius: 20,
          }}
        >
          <Tableoption
            title="Cash Transactions"
            value="Up to N1,000,000 daily"
          />
          <Tableoption title="Commissions " value="0.5% per transaction" />
          <Tableoption title="Freebies / Awoof" value="Monthly" />
          <Tableoption title="Max bank Transfers" value="N500,000 per day" />
          <Tableoption title="Receive" value="Unlimited" mb={false} />
        </View>

        
        </View>
      




      </View>
      </ScrollView>
      <View style={{marginBottom: 20, paddingHorizontal: 15 }}>
        <Custombutton
          btntext="Start Application"
          onpress={() => navigation.navigate("Agentform")}
          bg={COLORS.blue9}
        />
        </View>
    </Mainwrapper>
  );
};

export default Becomeanagent;

const styles = StyleSheet.create({});
