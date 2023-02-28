import React, { useMemo } from "react";
import { View, Text, FlatList } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { Horizontaline, Mainwrapper } from "../../../components";
import { COLORS, FONTS, fontsize, icons } from "../../../constants";
import Customstatusbar from "../../shared/Customstatusbar";
import { cardstyles } from "./Cards.styles";
import BottomSheet from "@gorhom/bottom-sheet";

const {
  Carddetailsicon,
  Cardfreezeicon,
  Cardfundicon,
  Cardlockicon,
  Cardwithdrawicon,
  Vcardicon,
  Historyicon,
} = icons;

const cardactions = [
  {
    title: "Details",
    Icon: Carddetailsicon,
  },
  {
    title: "Top-up",
    Icon: Cardfundicon,
  },
  {
    title: "Withdraw",
    Icon: Cardwithdrawicon,
  },
  {
    title: "Lock",
    Icon: Cardlockicon,
  },
];

function Cards() {
  const snapPoints = useMemo(() => ["25%", "65%", "98%"], []);

  return (
    <View
      style={[cardstyles.container, { paddingTop: getStatusBarHeight(true) }]}
    >
      <Customstatusbar />

      <View style={cardstyles.contentContainer}>
        <Text style={cardstyles.myCardsText}>My Cards</Text>
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
              {cardactions.map(({ Icon, title }, index) => {
                return (
                  <View key={index} style={cardstyles.actionIconWrap}>
                    <View style={cardstyles.actionIconBg}>
                      <Icon />
                    </View>
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
