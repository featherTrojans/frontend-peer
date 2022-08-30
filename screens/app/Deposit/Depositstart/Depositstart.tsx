import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import {
  Backheader,
  Custombutton,
  Horizontaline,
  Mainwrapper,
} from "../../../../components";
import { COLORS, FONTS, fontsize, icons, images } from "../../../../constants";
import useCustomModal from "../../../../utils/useCustomModal";

const { Newlogo } = icons;
const { Lagosbadge, Ogunbadge, Osunbadge, Oyobadge } = images;
const Depositstart = () => {
  const { CustomModal: PickstateModal, openModal } = useCustomModal();

  const states = [
    {
      logo: Lagosbadge,
      state: "Lagos State",
    },
    {
      logo: Oyobadge,
      state: "Oyo State",
    },
    {
      logo: Osunbadge,
      state: "Osun State",
    },
    {
      logo: Ogunbadge,
      state: "Ogun State",
    },
  ];

  return (
    <Mainwrapper>
      <Backheader title="Deposit" />

      <PickstateModal>
        <View>
          <Text
            style={{
              ...fontsize.smaller,
              ...FONTS.medium,
              color: COLORS.blue9,
            }}
          >
            Supported States
          </Text>
          <Text
            style={{
              ...fontsize.smallest,
              ...FONTS.regular,
              marginTop: 10,
              color: COLORS.grey16,
            }}
          >
            You will be notified when these features are available in your
            region
          </Text>

          <View style={{ marginTop: 30, marginBottom: 40 }}>
            {states.map(({ logo, state }, index) => {
                const isLast = states.length === index+1 
              return (
                <>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image
                      style={{ width: 35, height: 35, borderRadius: 35 / 2 }}
                      source={logo}
                    />
                    <Text
                      style={{
                        marginLeft: 12,
                        ...fontsize.smaller,
                        ...FONTS.medium,
                        lineHeight: 25,
                        color: COLORS.blue9,
                      }}
                    >
                      {state}
                    </Text>
                  </View>
                  {!isLast && <Horizontaline marginV={20} />}
                </>
              );
            })}
          </View>
            <View style={{marginBottom: 20}}>
          <Custombutton btntext="Okay, Continue" onpress={() => console.log("hellow")}/>
          </View>
        </View>

      </PickstateModal>

      <View style={{ paddingHorizontal: 15, flex: 1 }}>
        <Newlogo />

        <Text
          style={{
            marginTop: 36,
            marginBottom: 20,
            ...fontsize.bbsmall,
            ...FONTS.medium,
            color: COLORS.blue9,
          }}
        >
          Start earning today with deposits
        </Text>
        <Text
          style={{
            ...fontsize.smaller,
            ...FONTS.regular,
            lineHeight: 20,
            color: COLORS.grey2,
          }}
        >
          We take the security and safety of our customers very seriously,
          kindly ensure you adhere to the safety advices below before
          proceeding.
        </Text>
      </View>
      <View style={{ paddingHorizontal: 15 }}>
        <Custombutton btntext="Create Deposit" onpress={openModal} />
      </View>
    </Mainwrapper>
  );
};

export default Depositstart;

const styles = StyleSheet.create({});
