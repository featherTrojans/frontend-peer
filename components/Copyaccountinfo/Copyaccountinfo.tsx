import { StyleSheet, Text, View, Share } from "react-native";
import React from "react";
import Mainwrapper from "../Mainwrapper/Mainwrapper";
import Custombutton from "../Custombutton/Custombutton";
import { COLORS, FONTS, fontsize, icons } from "../../constants";
import Horizontaline from "../Horizontaline/Horizontaline";



const {Purplehouseicon} =icons

const Copyaccountinfo = ({accName, accNumber}) => {




  const shareAccountDetails = async () => {
    const result = await Share.share(
      {
        title: "Feather Account Details",
        message: `${"Bank Name: VFD Microfiance Bank "} \n ${`Account Name: Feather / ${accName}` } \n ${`Account Number: ${accNumber}`}`,
        url: `${"Bank Name: VFD Microfiance Bank "} \n ${`Account Name: Feather / ${accName}` } \n ${`Account Number: ${accNumber}`}`,
      },
      {
        dialogTitle: "Feather Account Details",
        subject: "Feather Account Details",
      }
    );
  };





  return (
    <View>

    <View style={{justifyContent: "center", alignItems: "center"}}>
        <View style={{backgroundColor: COLORS.purple3, padding: 15, borderRadius: 30}}>
            <Purplehouseicon />
        </View>
    </View>
      


      <View style={{paddingHorizontal: 40, marginTop: 32, marginBottom: 44}}>
        <Text style={{textAlign: "center", ...fontsize.bbsmall,...FONTS.regular, marginTop: 32, marginBottom: 22}}>Copy, Share & Get Paid</Text>
        <Text style={{textAlign: "center", ...fontsize.smaller, lineHeight: 20, color: COLORS.grey2, ...FONTS.regular,}}>
          Money sent to this account number, will be directly funded into your
          feather primary wallet
        </Text>
        
      </View>
      <View style={{marginBottom: 52}}>
            <Text style={{textAlign: "center", ...fontsize.big, ...FONTS.bold, color: COLORS.blue9, marginBottom: 12}}>{accNumber}</Text>
            <Text style={{textAlign: "center", ...fontsize.smallest, color: COLORS.grey16, ...FONTS.regular}}>Tap to copy account number</Text>
        </View>

        <View style={{marginBottom: 40}}>
        <View style={{flexDirection: "row", justifyContent: 'space-between'}}>
            <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.grey2}}>Bank Name</Text>
            <Text style={{...fontsize.smaller, ...FONTS.medium, color: COLORS.blue9}}>VFD Microfiance Bank</Text>
        </View>
            <Horizontaline marginV={18}/>
        <View style={{flexDirection: "row", justifyContent: 'space-between'}}>
            <Text style={{...fontsize.smallest, ...FONTS.regular, color: COLORS.grey2}}>Account Name</Text>
            <Text style={{...fontsize.smaller, ...FONTS.medium, color: COLORS.blue9, textTransform: "capitalize"}}>Feather / {accName}</Text>
        </View>
        </View>

      <Custombutton
        btntext="Sure, Share Details"
        onpress={() => shareAccountDetails()}
        bg={COLORS.blue9}
      />
    </View>
  );
};

export default Copyaccountinfo;

const styles = StyleSheet.create({});
