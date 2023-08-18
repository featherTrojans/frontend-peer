import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState } from "react";
import {
  ChoosefeatheruserScreenStyles,
  SearchcontactScreenStyles,
} from "../assets/styles/screens";
import {
  FTCustombutton,
  FTIconwithtitleandinfo,
  FTSearchinput,
  FTTitlepagewrapper,
} from "../components";
import { COLORS, icons } from "../constants";
import { navigation } from "../utils";

const { listHeaderText } = ChoosefeatheruserScreenStyles;
const {} = SearchcontactScreenStyles;
const { Smallphoneicon } = icons;

const SearchcontactScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState<any>({ child: null, height: 200 });

  const ModalContent = () => {
    return (
      <View style={{ backgroundColor: "#fff" }}>
        <Text>The name one</Text>
        <FTCustombutton
          btntext="Proceed"
          onpress={() => navigation.navigate("transactionsummary_screen")}
        />
      </View>
    );
  };

  const switchModals = (value) => {
    switch (value) {
      case 0:
        setContent({ child: <ModalContent />, height: 276 });
        setShowModal((s) => !s);
        break;
      case 1:
        setContent({ child: <ModalContent /> });
        setShowModal((s) => !s);
        break;

      default:
        break;
    }
  };

  const ListHeader = () => {
    return <FTSearchinput placeholder="Enter feather tag" />;
  };

  return (
    <FTTitlepagewrapper
      title="Search Contacts"
      childBg={COLORS.white}
      modalChildren={content.child}
      showModal={showModal}
      setShowModal={setShowModal}
      modalHeight={content.height}
    >
      <FlatList
        data={[1, 2]}
        bounces={false}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ height: 28 }} />}
        renderItem={() => {
          return (
            <FTIconwithtitleandinfo
              title="Stephen Kayode. J"
              info="@blvkcreator"
              onPress={() => switchModals(0)}
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

export default SearchcontactScreen;

const styles = StyleSheet.create({});
