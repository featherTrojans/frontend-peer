import { StyleSheet, Text, View, ScrollView, StatusBar } from "react-native";
import React from "react";
import { styles } from "./Newtransactions.styles";
import { Backheader, Iconwithdatas } from "../../../../components";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import Customstatusbar from "../../../shared/Customstatusbar";
import { SafeAreaView } from "react-native-safe-area-context";
import { ifIphoneX, getStatusBarHeight } from "react-native-iphone-x-helper";

const {
  Withdrawicon,
  Depositicon,
  Eyecrossed,
  TransferIcon,
  Newtransfericon,
  Fundwalleticon,
  Paybillicon,
} = icons;

const Newtransactions = ({ navigation }: any) => {
  const actions = [
    {
      icon: <Withdrawicon />,
      iconBg: "#E0EDD8",
      title: "Withdraw",
      details: "Get cash from feather users near you.",
      route: "Withdraw",
    },
    {
      icon: <Depositicon />,
      iconBg: "#D2EAFD",
      title: "Deposit",
      details: "Supply cash and earn cashback!",
      route: "Depositupdate",
    },
    {
      icon: <Newtransfericon />,
      iconBg: "#FCF3D1",
      title: "Transfer",
      details: "Send cash to feather wallets and bank accounts.",
      route: "Transfercash",
    },
    {
      icon: <Fundwalleticon />,
      iconBg: "#DEE0E5",
      title: "Fund Wallet",
      details: "Add Cash to your wallets easily",
      route: "Addcash",
    },
    {
      icon: <Paybillicon />,
      iconBg: "#E3CCFF",
      title: "Paybills",
      details: "Purchase airtime & data, PayTV Subscriptions…",
      route: "Paybills",
    },
  ];

  return (
    <View
      style={[styles.container, { paddingTop: getStatusBarHeight(true) }]}
    >
      <Customstatusbar />
      <Backheader title="Transactions" showArrow={false} />

      <View style={{ flex: 1, paddingHorizontal: 15, }}>
        <ScrollView
          style={{ flex: 1 }}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          <View
            style={{
              backgroundColor: "white",
              paddingHorizontal: 15,
              paddingVertical: 20,
              borderRadius: 15,
            }}
          >
            <Text
              style={{
                marginBottom: 34,
                ...fontsize.smallest,
                ...FONTS.medium,
                color: COLORS.blue9,
              }}
            >
              Perform an action⚡
            </Text>

            {actions.map(({ icon, iconBg, title, details, route }, index) => {
              return (
                <View key={index}>
                  <Iconwithdatas
                    
                    icon={icon}
                    iconBg={iconBg}
                    title={title}
                    details={details}
                    onpress={() => navigation.navigate(route)}
                  />
                  {index + 1 !== actions.length && (
                    <View
                      style={{
                        marginVertical: 22,
                        backgroundColor: COLORS.grey2,
                        opacity: 0.2,
                        height: 0.5,
                      }}
                    />
                  )}
                </View>
              );
            })}
          </View>
        </ScrollView>
        {/* List of options */}
      </View>
    </View>
  );
};

export default Newtransactions;
