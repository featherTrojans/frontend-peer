import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { ChoosefeatheruserScreenStyles } from "../assets/styles/screens";
import {
  FTIconwithtitleandinfo,
  FTSearchinput,
  FTTitlepagewrapper,
} from "../components";
import { COLORS, FONTS, fontsize, icons } from "../constants";
import { redirectTo } from "../utils";

const { Smallphoneicon } = icons;

const { searchContactWrap, searchContactText, listHeaderText } =
  ChoosefeatheruserScreenStyles;

const ChoosefeatheruserScreen = () => {
  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState<any>({ child: null, height: 200 });

  const ModalContent = () => {
    return (
      <View style={{ backgroundColor: "#fff" }}>
        <Text>The name one</Text>
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
    return (
      <>
        <FTSearchinput placeholder="Enter feather tag" />

        <FTIconwithtitleandinfo
          title="Stephen Kayode. J"
          info="@blvkcreator"
          onPress={() => switchModals(0)}
          bG={COLORS.Tblue4}
          Icon={Smallphoneicon}
          mB={40}
        />
        <Text style={listHeaderText}>My Beneficiaries</Text>
      </>
    );
  };

  return (
    <FTTitlepagewrapper
      title="Choose Feather User"
      childBg={COLORS.white}
      modalChildren={content.child}
      showModal={showModal}
      setShowModal={setShowModal}
      modalHeight={content.height}
    >
      <FlatList
        data={[1, 2,2,2,2,2,2,22,2]}
        showsVerticalScrollIndicator={false}
        bounces={false}
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

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => redirectTo("searchcontact_screen")}
        style={searchContactWrap}
      >
        <Smallphoneicon />
        <Text style={searchContactText}>Search Contacts</Text>
      </TouchableOpacity>
    </FTTitlepagewrapper>
  );
};

export default ChoosefeatheruserScreen;

const styles = StyleSheet.create({});
