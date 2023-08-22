import { Pressable, StyleSheet, Text, View, FlatList } from "react-native";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { CardScreenStyles } from "../assets/styles/screens";
import {
  FTCustombutton,
  FTHorizontaline,
  FTIconwithbg,
  FTIconwithtitleandinfo,
  FTTabWrapper,
} from "../components";
import { navigation } from "../utils";
import BottomSheet from "@gorhom/bottom-sheet";
import { COLORS, FONTS, fontsize, icons } from "../constants";
import axiosCustom from "../httpRequests/axiosCustom";
import { AuthContext } from "../context/AuthContext";
import { useAlert } from "../hooks";

const {
  Carddetailsicon,
  Cardfundicon,
  Cardlockicon,
  Cardwithdrawicon,
  Historyicon,
  Bluecardicon,
  Detailcopyicon,
  Usdcardicon,
  Emptycardicon,
  Cardcreationicon,
  Transactionfeeicon,
  Maintenancefeeicon,
} = icons;

const {
  myCardsText,
  demoCard,
  actionsWrap,
  actionIconWrap,
  actionTitle,
  sheetHeader,
  sheetHeaderText,
  cardDetailsModalHeader,
  cardDetailSubHead,
  cardDetailsHeaderText,
  detailInfoTitle,
  detailInfoValueWrap,
  detailInfoValueText,
  cardLockHeader,
  cardLockSvg,
  cardLockConfirmtext,
  cardLockConfirmSubtext,
  emptyCardsWrap,
  youHaveNoCard,
  shopAndPay,
  createVirtualCardWrap,
  createVirtualCardText,
  createVisaCardText,
  createCardSubInfo,
  rightComponentBg,
  rightComponentText,
} = CardScreenStyles;

// Fot the card details Modal
function Carddetail() {
  function DetailInfo({ title, value }) {
    return (
      <View style={{ marginBottom: 12 }}>
        <Text style={detailInfoTitle}>{title}</Text>

        <View style={detailInfoValueWrap}>
          <Text style={detailInfoValueText}>{value}</Text>
          <Detailcopyicon />
        </View>
        <FTHorizontaline marginV={10} />
      </View>
    );
  }

  return (
    <View>
      <View style={cardDetailsModalHeader}>
        <View style={cardDetailSubHead}>
          <Bluecardicon />
          <Text style={[cardDetailsHeaderText, { marginLeft: 10 }]}>
            Card Details
          </Text>
        </View>
        <View style={cardDetailSubHead}>
          <Text style={[cardDetailsHeaderText, { marginRight: 6 }]}>USD</Text>
          <Usdcardicon />
        </View>
      </View>

      <View style={{ marginTop: 50 }}>
        <DetailInfo title="Name on Card" value="Babalola Jhonson" />
        <DetailInfo title="Card Number" value="2435 3749 3728 0931" />
        <DetailInfo title="CVV" value="452" />
        <DetailInfo title="Expiry Date" value="10 / 2025" />
      </View>
    </View>
  );
}

//For the card locked modal

function Cardlock() {
  return (
    <View>
      <Text style={cardLockHeader}>Lock USD Card</Text>

      <View style={cardLockSvg}></View>

      <View>
        <Text style={cardLockConfirmtext}>
          Are you sure you want to lock this{" "}
          <Text style={{ ...FONTS.bold }}>USD Card?</Text>
        </Text>
        <Text style={cardLockConfirmSubtext}>
          If you proceed, this card will be inactive until you unlock it. All
          funds in the card remains untouched when the card is locked.
        </Text>
      </View>
      <FTHorizontaline marginV={30} />

      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <FTCustombutton
            onpress={() => console.log("Card about tot be locked")}
            btntext="Cancel"
            bg={COLORS.grey1}
          />
        </View>
        <View style={{ width: 10 }} />
        <View style={{ flex: 1 }}>
          <FTCustombutton
            onpress={() => console.log("Card about tot be locked")}
            btntext="Yeah, Proceed"
          />
        </View>
      </View>
    </View>
  );
}

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
    Icon: Transactionfeeicon,
    bG: "#F3EEFB",
    title: "Transaction fee",
    info: "Fees on card transactions",
    priceBg: "#7600FF",
    price: "$1.00",
  },
  {
    Icon: Maintenancefeeicon,
    bG: "#FEF8E7",
    title: "Maintenance fee",
    info: "Monthly fee to keep card up",
    priceBg: "#FF9D00",
    price: "$3.50",
  },
];

const RightComponent = ({ bG = "blue", amount }) => {
  return (
    <View style={[rightComponentBg, { backgroundColor: bG }]}>
      <Text style={rightComponentText}>{amount}</Text>
    </View>
  );
};

const CreateCard = () => {
  const { authdata } = useContext(AuthContext);
  const { errorAlert } = useAlert();
  return (
    <View style={{ paddingVertical: 12 }}>
      <Text style={createVisaCardText}>Create a Visa card</Text>
      <Text style={createCardSubInfo}>
        Suitable for all online shopping and subscription services.
      </Text>

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
      <FTCustombutton
        bg="#000"
        btntext="Continue"
        onpress={() => {
          if (authdata.userDetails.userLevel < 3) {
            errorAlert(
              null,
              "Padi you need to upgrade your account to create a virtual card"
            );

            setTimeout(() => {
              navigation.navigate("accountverification_screen");
            }, 500);
            return;
          }
          navigation.navigate("carddisclosure_screen");
        }}
      />
    </View>
  );
};
const CardScreen = () => {
  const snapPoints = useMemo(() => ["40%", "98%"], []);
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState<any>({ child: null });
  const [loading, setLoading] = useState(false);
  const [carddetails, setCardetails] = useState({});

  useEffect(() => {
    setLoading(true);
    axiosCustom
      .get("/user/card/get")
      .then((response) => {
        setCardetails(response?.data?.data);
      })
      .catch((err) => {
        // if(err.response){}
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const switchModals = (value) => {
    switch (value) {
      case 0:
        setContent({ child: <CreateCard /> });
        setShowModal((s) => !s);
        break;
      case 1:
        setContent({ child: <Carddetail /> });
        setShowModal((s) => !s);
        break;
      case 2:
        setContent({ child: <Cardlock /> });
        setShowModal((s) => !s);
        break;

      default:
        break;
    }
  };

  const cardactions = [
    {
      title: "Details",
      Icon: Carddetailsicon,
      action: () => switchModals(1),
    },
    {
      title: "Top-up",
      Icon: Cardfundicon,
      action: () => navigation.navigate("cardtopup_screen"),
    },
    {
      title: "Withdraw",
      Icon: Cardwithdrawicon,
      action: () => navigation.navigate("cardtopup_screen"),
    },
    {
      title: "Lock",
      Icon: Cardlockicon,
      action: () => switchModals(2),
    },
  ];

  return (
    <FTTabWrapper
      modalChildren={content.child}
      showModal={showModal}
      setShowModal={setShowModal}
      modalHeight={520}
    >
      {carddetails?.card_id ? (
        <>
          {carddetails?.is_active ? (
            <>
              <Text style={myCardsText}>My Cards</Text>
              <View style={demoCard} />
              <View style={actionsWrap}>
                {cardactions.map(({ Icon, title, action }, index) => {
                  return (
                    <Pressable
                      onPress={action}
                      key={index}
                      style={actionIconWrap}
                    >
                      <FTIconwithbg Icon={Icon} bG={COLORS.white} />
                      <Text style={actionTitle}>{title}</Text>
                    </Pressable>
                  );
                })}
              </View>

              <BottomSheet
                index={0}
                snapPoints={snapPoints}
                style={{
                  paddingHorizontal: 24,
                }}
              >
                <View style={sheetHeader}>
                  <Historyicon />
                  <Text style={sheetHeaderText}>Recents Transactions</Text>
                </View>

                <FTHorizontaline marginV={24} />
              </BottomSheet>
            </>
          ) : (
            <>
              <Text style={{ textAlign: "center" }}>Pending Verification</Text>
            </>
          )}
        </>
      ) : (
        <>
          <Text style={myCardsText}>My Cards</Text>

          <View style={emptyCardsWrap}>
            <Emptycardicon />
            <Text style={youHaveNoCard}>You have no card yet</Text>
            <Text style={shopAndPay}>
              Shop, Pay, Stream and Subscribe freely, Accepted Globally.
            </Text>
            <Pressable
              onPress={() => switchModals(0)}
              style={createVirtualCardWrap}
            >
              <Text style={createVirtualCardText}>Create Virtual Card</Text>
            </Pressable>
          </View>
        </>
      )}
    </FTTabWrapper>
  );
};

export default CardScreen;

const styles = StyleSheet.create({});
