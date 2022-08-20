import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import {
  Backheader,
  Custombutton,
  Horizontaline,
  Input,
  Mainwrapper,
} from "../../../../../components";
import { electrictystyles } from "../../Electricity/Electricitytype/Electricitytype.styles";
import { COLORS, FONTS, fontsize, icons } from "../../../../../constants";
import useCustomModal from "../../../../../utils/useCustomModal";

const {
  Forwardarrow,
  Mtnlogo,
  Gloicon,
  Ikejaelectricityicon,
  Ashicon,
  Briefcaseicon,
  Searcontacticon,
} = icons;

const Eachoption = ({ logotype, type }) => {
  const { CustomModal, openModal } = useCustomModal();
  const showLogo = (logotype: string) => {
    switch (logotype) {
      case "mtn":
        return <Mtnlogo />;
        break;
      case "glo":
        return <Gloicon />;
        break;
      case "9mobile":
        return <Ikejaelectricityicon />;
        break;
      case "airtel":
        return <Ikejaelectricityicon />;
        break;

      default:
        break;
    }
  };
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
            }}
          >
            <Text
              style={{
                ...fontsize.smallest,
                ...FONTS.medium,
                color: COLORS.blue9,
              }}
            >
              Airtime Purchase
            </Text>
            {showLogo(logotype)}
          </View>

          <View style={{ marginTop: 25, marginBottom: 35 }}>
            <Input
              icon={<Ashicon />}
              placeholder="Enter meter number"
              name="plan"
              inputbg={COLORS.inputBgColor}
            />
            <Input
              icon={<Briefcaseicon />}
              placeholder="Network Type"
              name="network"
              inputbg={COLORS.inputBgColor}
            />
            <Input
              icon={<Briefcaseicon />}
              placeholder="Enter Amount"
              name="phone"
              inputbg={COLORS.inputBgColor}
            />
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: COLORS.trasparentPurple,
                alignSelf: "flex-start",
                paddingVertical: 9,
                paddingHorizontal: 14,
                borderRadius: 18,
              }}
            >
              <Searcontacticon />
              <Text
                style={{
                  ...fontsize.smallest,
                  ...FONTS.regular,
                  color: COLORS.purple2,
                  marginLeft: 8,
                }}
              >
                Search Contacts
              </Text>
            </View>
          </View>

          <Custombutton
            btntext="Yeah, Continue"
            onpress={() => console.log("hellow")}
          />
        </View>
      </CustomModal>

      <View style={electrictystyles.logoandtitlewrap}>
        {/* {logo} */}
        {showLogo(logotype)}
        <Text style={electrictystyles.optiontitle}>{type}</Text>
      </View>
      <Forwardarrow />
    </TouchableOpacity>
  );
};

const Airtimeprovider = ({ navigation }) => {
  const providertypes = [
    {
      title: "MTN Nigeria",
      logotype: "mtn",
    },
    {
      title: "Globacom",
      logotype: "glo",
    },
    {
      title: "9 Mobile",
      logotype: "9mobile",
    },
    {
      title: "Airtel Nigeria",
      logotype: "airtel",
    },
  ];

  return (
    <Mainwrapper>
      <Backheader title="Select Provider" />

      <View style={{ paddingHorizontal: 15 }}>
        <View style={electrictystyles.blockwrap}>
          <Text style={electrictystyles.headertext}>
            Choose your preferred provider
          </Text>

          {providertypes.map(({ title, logotype }, index) => {
            const isLast = providertypes.length === index + 1;
            return (
              <View key={index}>
                <Eachoption logotype={logotype} type={title} />
                {!isLast && <Horizontaline marginV={0} />}
              </View>
            );
          })}
        </View>
      </View>
    </Mainwrapper>
  );
};

export default Airtimeprovider;

const styles = StyleSheet.create({});
