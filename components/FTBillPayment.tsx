import { StyleSheet, Text, View } from "react-native";
import React from "react";
import FTIconwithtitleandinfo from "./FTIconwithtitleandinfo";
import { FTHorizontaline } from ".";
import { COLORS, FONTS, fontsize, icons } from "../constants";
import { redirectTo } from "../utils";
const { Airtimeicon, Electricityicon, Cableicon } = icons;

const closeModalAndRedirect = (redirectScreenName) => {
  redirectTo(redirectScreenName);
  // setShowTabs(true)
  // setShowModal(false)
};

const FTBillPayment = () => {
  return (
    <View>
      <Text style={styles.transferCashText}>Bill Payments</Text>

      <View style={{ marginTop: 40 }}>
        <FTIconwithtitleandinfo
          title="Mobile Airtime & Data"
          info="Airtime and data from your network."
          Icon={Airtimeicon}
          onPress={() => closeModalAndRedirect("choosenetwork_screen")}
          bG={COLORS.Tblue3}
        />
        <FTHorizontaline marginV={15} />
        <FTIconwithtitleandinfo
          title="Electricity & Utility"
          info="Pay your power bills easily"
          Icon={Electricityicon}
          onPress={() => closeModalAndRedirect("choosebiller_screen")}
          bG={COLORS.Tyellow}
        />
        <FTHorizontaline marginV={15} />
        <FTIconwithtitleandinfo
          title="Cable TV Subscriptions"
          info="Pay your cable tv subscriptions"
          Icon={Cableicon}
          onPress={() => closeModalAndRedirect("choosecable_screen")}
          bG={COLORS.Tgreen}
        />
      </View>
    </View>
  );
};

export default FTBillPayment;

const styles = StyleSheet.create({
  transferCashText: {
    ...fontsize.xsmallest,
    ...FONTS.semibold,
    color: COLORS.blue9,
  },
});
