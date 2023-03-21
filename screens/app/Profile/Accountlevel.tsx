import { StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  Backheader,
  Headerandsubheader,
  Horizontaline,
  Iconandinfo,
  Mainwrapper,
} from "../../../components";
import { icons } from "../../../constants";
import { profilestyles } from "./Profile.styles";




const { Profilemanageicon } = icons;


const Accountlevel = ({navigation}) => {

  const kycoptions = [
    {
      title: "LEVEL 1 - Personal",
      value: "Verify your personal information",
      Icon: Profilemanageicon,
      action: () => navigation.navigate("Verifypersonalinfo"),
    },
    {
      title: "LEVEL 2 - Bank Info",
      value: "Verify your BVN",
      Icon: Profilemanageicon,
      action: () => navigation.navigate("Verifybvn"),
    },
    {
      title: "LEVEL 3 - Documents",
      value: "Upload your documents for verification",
      Icon: Profilemanageicon,
      action: () => console.log("Hellow"),
    },
  ];
  

  return (
    <Mainwrapper>
      
          <Backheader />
          <View style={{ marginTop: 45, paddingHorizontal: 20 }}>
            {kycoptions.map(({ title, value, Icon, action }, index) => {
              const isLast = index + 1 === kycoptions.length;
              return (
                <View key={index}>
                  <Iconandinfo
                    Icon={Icon}
                    title={title}
                    info={value}
                    action={action}
                  />
                  {!isLast && <Horizontaline marginV={20} />}
                </View>
              );
            })}
          </View>
    </Mainwrapper>
  );
};

export default Accountlevel;

const styles = StyleSheet.create({});
