import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import {
  Backheader,
  Custombutton,
  Horizontaline,
  Input,
  Mainwrapper,
} from "../../../../../components";
import { electrictystyles } from "../Electricitytype/Electricitytype.styles";
import { COLORS, FONTS, fontsize, icons } from "../../../../../constants";
import useCustomModal from "../../../../../utils/useCustomModal";

const { Forwardarrow, Lock, Briefcaseicon, Ashicon } = icons;

const Eachoption = ({ logo, type }) => {
  const { CustomModal, openModal } = useCustomModal();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={electrictystyles.eachoption}
      onPress={openModal}
    >
      <CustomModal>
        <View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 35,
            }}
          >
            <Text
              style={{
                ...fontsize.smallest,
                ...FONTS.medium,
                color: COLORS.blue9,
              }}
            >
              {type}
            </Text>
            <Image
              style={{ width: 34, height: 34, borderRadius: 34 / 2 }}
              source={{
                uri: logo,
              }}
            />
          </View>
          <View
            style={{
              justifyContent: "flex-end",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                ...fontsize.xsmallest,
                ...FONTS.medium,
                color: COLORS.grey16,
              }}
            >
              Charges
            </Text>
            <View
              style={{
                paddingVertical: 8,
                paddingHorizontal: 10,
                backgroundColor: COLORS.trasparentBlue2,
                marginLeft: 10,
                borderRadius: 18,
              }}
            >
              <Text
                style={{
                  ...fontsize.xsmallest,
                  ...FONTS.bold,
                  color: COLORS.blue6,
                }}
              >
                + N100.00
              </Text>
            </View>
          </View>

          <View style={{ marginTop: 25, marginBottom: 35 }}>
            <Input
              icon={<Ashicon />}
              placeholder="Enter meter number"
              name="meterNumber"
              inputbg={COLORS.inputBgColor}
            />
            <Input
              icon={<Briefcaseicon />}
              placeholder="Enter Amount"
              name="tokenAmount"
              inputbg={COLORS.inputBgColor}
            />
          </View>

          <Custombutton
            btntext="Yeah, Continue"
            onpress={() => console.log("hellow")}
          />
        </View>
      </CustomModal>

      <View style={electrictystyles.logoandtitlewrap}>
        <Image
          style={{ width: 34, height: 34, borderRadius: 34 / 2 }}
          source={{
            uri: logo,
          }}
        />
        <Text style={electrictystyles.optiontitle}>{type}</Text>
      </View>
      <Forwardarrow />
    </TouchableOpacity>
  );
};

const Electricitymetertype = ({ navigation, route }) => {
  const { subdata, logo } = route?.params;
  const { suboptions } = subdata;

  return (
    <Mainwrapper>
      <Backheader title="Select a Bill" />

      <View style={{ paddingHorizontal: 15 }}>
        <View style={electrictystyles.blockwrap}>
          <Text style={electrictystyles.headertext}>Select a bill</Text>

          {suboptions.map(({ type }, index) => {
            const isLast = suboptions.length === index + 1;
            return (
              <View key={index}>
                <Eachoption logo={logo} type={type} />
                {!isLast && <Horizontaline marginV={0} />}
              </View>
            );
          })}
        </View>
      </View>
    </Mainwrapper>
  );
};

export default Electricitymetertype;

const styles = StyleSheet.create({});
