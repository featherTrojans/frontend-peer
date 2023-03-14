import React, { useMemo } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { Horizontaline, Mainwrapper } from "../../../components";
import { icons } from "../../../constants";
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
} = icons;



function Cards({navigation}) {
  const snapPoints = useMemo(() => ["25%", "65%", "98%"], []);
  const {openModal: openCardDetailsModal, closeModal, CustomModal: CardDetailsModal} = useCustomModal()
  const {openModal: openCardLockModal,  CustomModal: CardLockModal} = useCustomModal()



  const cardactions = [
    {
      title: "Details",
      Icon: Carddetailsicon,
      action: openCardDetailsModal
    },
    {
      title: "Top-up",
      Icon: Cardfundicon,
      action: () => navigation.navigate("Cardtopup")
    },
    {
      title: "Withdraw",
      Icon: Cardwithdrawicon,
      action: () => navigation.navigate("Cardwithdraw")
    },
    {
      title: "Lock",
      Icon: Cardlockicon,
      action: openCardLockModal
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

        <View>
          <Text>Card Details Modal</Text>
        </View>
      </CardDetailsModal>

      {/* Card Lock Modal */}
      <CardLockModal>
        <View>
          <Text>Card Lock Modal</Text>
        </View>
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
                    <Pressable 
                    onPress={action} 
                    style={cardstyles.actionIconBg}>
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
