import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  Backheader,
  Headerandsubheader,
  Horizontaline,
  Iconandinfo,
  Mainwrapper,
} from "../../../components";
import { COLORS, FONTS, fontsize, icons } from "../../../constants";
import { profilestyles } from "./Profile.styles";
const { Profilemanageicon } = icons;

const kycoptions = [
  {
    title: "LEVEL 1 - Personal",
    value: "Verify your personal information",
    Icon: Profilemanageicon,
    action: () => console.log("Hellow"),
  },
  {
    title: "LEVEL 2 - Bank Info",
    value: "Verify your BVN",
    Icon: Profilemanageicon,
    action: () => console.log("Hellow"),
  },
  {
    title: "LEVEL 3 - Documents",
    value: "Upload your documents for verification",
    Icon: Profilemanageicon,
    action: () => console.log("Hellow"),
  },
];

const Accountlevel = () => {
  return (
    <Mainwrapper>
      <View style={profilestyles.kycSubContainer}>
        <View>
          <Backheader />
          <View style={{ paddingHorizontal: 15 }}>
            <Headerandsubheader
              header="Account KYC Level"
              subHeader="Kindly input your active phone number that you can reach."
            />
          </View>
        </View>

        <View style={profilestyles.kycOptionsWrap}>
          <Text style={profilestyles.kycOptionsText}>KYC Options</Text>

          <View style={{ marginTop: 45 }}>
            {kycoptions.map(({ title, value, Icon, action }, index) => {
              const isLast = index + 1 === kycoptions.length;
              return (
                <View key={index}>
                  <Iconandinfo
                    Icon={Icon}
                    title={title}
                    info={value}
                    action={action}
                  />
                  {!isLast && <Horizontaline marginV={20} />}
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </Mainwrapper>
  );
};

export default Accountlevel;

const styles = StyleSheet.create({});
