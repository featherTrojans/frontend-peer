import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Backheader, Chooseamountmodal, Custombutton, Mainwrapper } from "../../../../../components";
import { COLORS, FONTS, fontsize, icons } from "../../../../../constants";
import useCustomModal from "../../../../../utils/useCustomModal";

const { Forwardarrow, Airtimeicon, Mobiledataicon } = icons;
const Airtimeanddata = ({navigation}) => {


  const {CustomModal, openModal, closeModal} = useCustomModal()


  const typedatas = [
    {
      bg: "#D2EAFD",
      icon: <Airtimeicon />,
      title: "Airtime Purchase",
      action: () => openModal()
    },
    {
      bg: "#F1E5FF",
      icon: <Mobiledataicon />,
      title: "Mobile Data Purchase",
      action: () => navigation.navigate("Dataprovider", {billType: "data"})
    },
  ];

  return (
    <Mainwrapper>
      <Backheader title="Airtime & Data Purchase" />



    <CustomModal>
      <View>
          <Chooseamountmodal headerText="How much airtime do you want to purchase?" onpress={() => {
            closeModal()
            navigation.navigate("Airtimeprovider", {billType: "airtime"})
          }}/>
        {/* <Custombutton btntext="Continue" onpress={() => navigation.navigate("Airtimeprovider")}/> */}
      </View>
      
    </CustomModal>

      <View style={{ paddingHorizontal: 15 }}>
        <View
          style={{
            backgroundColor: COLORS.white,
            paddingHorizontal: 20,
            paddingVertical: 22,
            borderRadius: 15,
          }}
        >
          <Text
            style={{
              marginBottom: 44,
              ...fontsize.smaller,
              ...FONTS.medium,
              lineHeight: 27,
            }}
          >
            Select Type
          </Text>

          {typedatas.map(({ bg, title, icon, action }, index) => {
            const isLast = index + 1 === typedatas.length;
            return (
              <View key={index}>
                <TouchableOpacity
                onPress={action}
                activeOpacity={0.8}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View
                      style={{
                        backgroundColor: bg,
                        width: 34,
                        height: 34,
                        borderRadius: 34 / 2,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {icon}
                    </View>
                    <Text
                      style={{
                        marginLeft: 12,
                        ...fontsize.smaller,
                        ...FONTS.medium,
                        color: COLORS.blue9,
                      }}
                    >
                      {title}
                    </Text>
                  </View>
                  <Forwardarrow />
                </TouchableOpacity>

                {!isLast && (
                  <View
                    style={{
                      marginVertical: 21,
                      height: 0.5,
                      backgroundColor: COLORS.borderColor2,
                    }}
                  />
                )}
              </View>
            );
          })}
        </View>
      </View>
    </Mainwrapper>
  );
};

export default Airtimeanddata;

const styles = StyleSheet.create({});
