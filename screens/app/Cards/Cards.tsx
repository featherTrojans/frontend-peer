import React, { useMemo } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { Custombutton, Horizontaline, Mainwrapper } from "../../../components";
import { COLORS, FONTS, fontsize, icons } from "../../../constants";
import Customstatusbar from "../../shared/Customstatusbar";
import { cardstyles } from "./Cards.styles";
import BottomSheet from "@gorhom/bottom-sheet";
import useCustomModal from "../../../utils/useCustomModal";

const {
  Carddetailsicon,
  Cardfreezeicon,
  Cardfundicon,
  Cardlockicon,
  Cardwithdrawicon,
  Vcardicon,
  Historyicon,
  Walletblueicon,
  Bluecardicon,
  Detailcopyicon,
  Usdcardicon,
} = icons;

// Fot the card details Modal
function Carddetail() {
  function DetailInfo({ title, value }) {
    return (
      <View style={{ marginBottom: 12 }}>
        <Text style={cardstyles.detailInfoTitle}>{title}</Text>

        <View style={cardstyles.detailInfoValueWrap}>
          <Text style={cardstyles.detailInfoValueText}>{value}</Text>
          <Detailcopyicon />
        </View>
        <Horizontaline marginV={10} />
      </View>
    );
  }

  return (
    <View>
      <View style={cardstyles.cardDetailsModalHeader}>
        <View style={cardstyles.cardDetailSubHead}>
          <Bluecardicon />
          <Text style={[cardstyles.cardDetailsHeaderText, { marginLeft: 10 }]}>
            Card Details
          </Text>
        </View>
        <View style={cardstyles.cardDetailSubHead}>
          <Text style={[cardstyles.cardDetailsHeaderText, { marginRight: 6 }]}>
            USD
          </Text>
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
      <Text style={cardstyles.cardLockHeader}>Lock USD Card</Text>

      <View style={cardstyles.cardLockSvg}></View>

      <View>
        <Text style={cardstyles.cardLockConfirmtext}>
          Are you sure you want to lock this{" "}
          <Text style={{ ...FONTS.bold }}>USD Card?</Text>
        </Text>
        <Text style={cardstyles.cardLockConfirmSubtext}>
          If you proceed, this card will be inactive until you unlock it. All
          funds in the card remains untouched when the card is locked.
        </Text>
      </View>
      <Horizontaline marginV={30} />

      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 1 }}>
          <Custombutton
            onpress={() => console.log("Card about tot be locked")}
            btntext="Cancel"
            bg={COLORS.grey1}
          />
        </View>
        <View style={{ width: 10 }} />
        <View style={{ flex: 1 }}>
          <Custombutton
            onpress={() => console.log("Card about tot be locked")}
            btntext="Yeah, Proceed"
          />
        </View>
      </View>
    </View>
  );
}

function Cards({ navigation }) {
  const snapPoints = useMemo(() => ["25%", "65%", "98%"], []);
  const {
    openModal: openCardDetailsModal,
    closeModal,
    CustomModal: CardDetailsModal,
  } = useCustomModal();
  const { openModal: openCardLockModal, CustomModal: CardLockModal } =
    useCustomModal();

  const cardactions = [
    {
      title: "Details",
      Icon: Carddetailsicon,
      action: openCardDetailsModal,
    },
    {
      title: "Top-up",
      Icon: Cardfundicon,
      action: () => navigation.navigate("Cardtopup"),
    },
    {
      title: "Withdraw",
      Icon: Cardwithdrawicon,
      action: () => navigation.navigate("Cardwithdraw"),
    },
    {
      title: "Lock",
      Icon: Cardlockicon,
      action: openCardLockModal,
    },
  ];

  return (
    <View
      style={[cardstyles.container, { paddingTop: getStatusBarHeight(true) }]}
    >
      <Customstatusbar />

      <View style={cardstyles.contentContainer}>
        <Text style={cardstyles.myCardsText}>My Cards</Text>

        {/* Card Details Modal */}
        <CardDetailsModal>
          <Carddetail />
        </CardDetailsModal>

        {/* Card Lock Modal */}
        <CardLockModal>
          <Cardlock />
        </CardLockModal>

        <View>
          <FlatList
            data={[1, 2]}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={() => {
              return <View style={cardstyles.demoCard} />;
            }}
          />

          <View style={cardstyles.Vcardactionswrap}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* icons */}
              <Vcardicon />
              <Text style={cardstyles.Vcardtext}>Virtual Card Actions</Text>
            </View>
            <Horizontaline marginV={18} />

            <View style={cardstyles.actionsWrap}>
              {cardactions.map(({ Icon, title, action }, index) => {
                return (
                  <View key={index} style={cardstyles.actionIconWrap}>
                    <Pressable onPress={action} style={cardstyles.actionIconBg}>
                      <Icon />
                    </Pressable>
                    <Text style={cardstyles.actionTitle}>{title}</Text>
                  </View>
                );
              })}
            </View>
          </View>
        </View>

        <BottomSheet
          index={0}
          snapPoints={snapPoints}
          style={{
            paddingHorizontal: 24,
          }}
        >
          <View style={cardstyles.sheetHeader}>
            {/* icons */}
            <Historyicon />
            <Text style={cardstyles.sheetHeaderText}>Recents</Text>
          </View>

          <Horizontaline marginV={24} />
        </BottomSheet>
      </View>
    </View>
  );
}

export default Cards;
