import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import {
  FTCustombutton,
  FTIconwithtitleandinfo,
  FTTitlepagewrapper,
} from "../components";
import { AuthContext } from "../context/AuthContext";
import { useAlert } from "../hooks";
import { COLORS, FONTS, fontsize, icons } from "../constants";
import { CardScreenStyles } from "../assets/styles/screens";
import { CreatecardScreenStyles } from "../assets/styles/screens/createcard.style";
import { Shadow } from "../constants/theme";
const { rightComponentBg, rightComponentText } = CardScreenStyles;
const {
  createBlockWrap,
  createBlockHeader,
  cardChargesInfoText,
  cardinfotableWrap,
  cardInfoKeyText,
  cardInfoValueText,
} = CreatecardScreenStyles;

const {
  Cardcreationicon,
  Transactionfeeicon,
  Maintenancefeeicon,
  Dashedlineicon,
} = icons;

const RightComponent = ({ bG = "blue", amount }) => {
  return (
    <View style={[rightComponentBg, { backgroundColor: bG }]}>
      <Text style={rightComponentText}>{amount}</Text>
    </View>
  );
};

const cardcreationinfos = [
  {
    Icon: Cardcreationicon,
    bG: "#E9F7EA",
    title: "Card creation fee",
    info: "Non-refundable fee to create card",
    priceBg: "#12AD2B",
    price: "$4.00",
  },
  {
    Icon: Maintenancefeeicon,
    bG: "#FEF8E7",
    title: "Maintenance fee",
    info: "Monthly fee to keep card up",
    priceBg: "#FF9D00",
    price: "$3.50",
  },
  {
    Icon: Transactionfeeicon,
    bG: "#F3EEFB",
    title: "Transaction fee",
    info: "Fees on card transactions",
    priceBg: "#7600FF",
    price: "%1.00",
  },
];

const CardinfoTable = ({
  color = COLORS.blue9,
  mB = 0,
  mT = 0,
  tableKey,
  tableValue,
}) => {
  return (
    <View
      style={[
        cardinfotableWrap,
        {
          marginTop: mT,
          marginBottom: mB,
        },
      ]}
    >
      <Text style={cardInfoKeyText}>{tableKey}</Text>
      <Text style={[cardInfoValueText, { color: color }]}>{tableValue}</Text>
    </View>
  );
};

const CreatecardScreen = ({ navigation }) => {
  const { authdata } = useContext(AuthContext);
  const { errorAlert } = useAlert();

  return (
    <FTTitlepagewrapper headerBg={COLORS.white3} childBg={COLORS.white3} title="Create a Visa card">
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <View style={createBlockWrap}>
          <Text style={createBlockHeader}>Fees & Charges</Text>
          {cardcreationinfos.map((cardcreationinfo, index) => {
            const { title, info, bG, Icon, priceBg, price } = cardcreationinfo;
            return (
              <FTIconwithtitleandinfo
                key={index}
                title={title}
                info={info}
                bG={bG}
                Icon={Icon}
                onPress={() => null}
                mB={25}
                rightComponent={<RightComponent amount={price} bG={priceBg} />}
              />
            );
          })}
          <View>
            <Text style={cardChargesInfoText}>
              $1.50 fee for transactions below $100
            </Text>
            <Text style={cardChargesInfoText}>
              1% capped at $5 for transactions above $100
            </Text>
          </View>
        </View>

        <View style={[createBlockWrap, { marginTop: 15, marginBottom: 20 }]}>
          <Text style={createBlockHeader}>Balances & Security</Text>
          <Dashedlineicon />
          <CardinfoTable tableKey="Minimum Card Balance" mB={18} mT={22} tableValue="$1.00" />
          <CardinfoTable tableKey="Maximum Card Balance" tableValue="$10,000.00" />
          <CardinfoTable tableKey="Daily Spending Limit" mB={18} mT={22} tableValue="$2,000.00" />
          <CardinfoTable tableKey="3D Security" color={COLORS.green4} tableValue="Yep, Padi!" />

        </View>

        <FTCustombutton
          bg={COLORS.blue9} 
          btntext="Create a Visa card"
          onpress={() => {
            if (authdata.userDetails.userLevel < 3) {
              errorAlert(
                null,
                "Padi you need to upgrade your account to create a virtual card"
              );

              setTimeout(() => {
                navigation.navigate("accountverification_screen", {
                  index: authdata.userDetails.userLevel,
                });
              }, 500);
              return;
            }
            navigation.navigate("joinwaitlist_screen");
          }}
        />
      </ScrollView>
    </FTTitlepagewrapper>
  );
};

export default CreatecardScreen;

const styles = StyleSheet.create({});
