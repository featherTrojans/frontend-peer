import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, FONTS, fontsize, icons } from "../../../../constants";
import { Backheader, Copyaccountinfo, Horizontaline, Mainwrapper, Tableoption, Upgrademodal } from "../../../../components";
import { walletmanangementstyles } from "./Walletmanagement.styles";
import useCustomModal from "../../../../utils/useCustomModal";

const { Memoji2, Memoji1bigicon } = icons;



const Walletmanagement = () => {
  const {CustomModal, openModal} = useCustomModal()
  const {CustomModal: UpgradeuserModal, openModal: openUpgradeModal} = useCustomModal()



  const Curvedbutton = ({ btntext, onpress }) => {
    return (
      <TouchableOpacity onPress={onpress} activeOpacity={0.8} style={walletmanangementstyles.curvedbuttonbg}>
        <Text style={walletmanangementstyles.curvedbuttontext}>{btntext}</Text>
      </TouchableOpacity>
    );
  };

  const renderUsertable = (usertype: string) => {
    switch (usertype) {
      case "newbie":
        return (
          <>
            <View style={walletmanangementstyles.memojimainwrap}>
              <View style={walletmanangementstyles.memojitextwrap}>
                <Memoji1bigicon />
                <View style={[walletmanangementstyles.typebg, {backgroundColor: COLORS.green2}]}>
                  <Text style={walletmanangementstyles.typetext}>Newbie</Text>
                </View>
              </View>
            </View>

            <View style={walletmanangementstyles.tablewrap}>
              <Tableoption title="Receive" value="Unlimited" />
              <Tableoption title="Max Cash Request" value="N5,000 per day" />

              <Tableoption title="Max Cash Deposit" value="N10,000 per day" />
              <Tableoption title="Max bank Transfers" value="Upgrade Account" />
              <Tableoption title="Wallet Funding" value="N10,000" mb={false} />
            </View>

            <View style={walletmanangementstyles.bottominfowrap}>
              <Text style={walletmanangementstyles.bottominfotext}>
                Hey 👋 Padi, upgrade your account today to enjoy more limits.{" "}
                <Text style={{ color: COLORS.yellow4 }}>#wakeup #buga</Text>{" "}
              </Text>
              <Curvedbutton btntext="Upgrade Account" onpress={openUpgradeModal} />
            </View>
          </>
        );

        break;


      case "odogwu":
          return (
            <>
              <View style={walletmanangementstyles.memojimainwrap}>
                <View style={walletmanangementstyles.memojitextwrap}>
                  <Memoji1bigicon />
                  <View style={[walletmanangementstyles.typebg, {backgroundColor: COLORS.blue6}]}>
                    <Text style={walletmanangementstyles.typetext}>Odogwu</Text>
                  </View>
                </View>
              </View>

              <View style={[walletmanangementstyles.tablewrap, { marginBottom: 20}]}>
                <View style={walletmanangementstyles.bankinfowrap}>
                  <View>
                    <Text style={walletmanangementstyles.bankinfotitle}>Your Feather Account Number</Text>
                    <Text style={walletmanangementstyles.bankinfovalue}>8903792082</Text>
                  </View>
                  <TouchableOpacity activeOpacity={0.8} onPress={openModal} style={walletmanangementstyles.copybankinfobg}>
                    <Text style={walletmanangementstyles.copybankinfotext}>Copy</Text>
                  </TouchableOpacity>
                </View>
                <View style={{marginTop: 24}}>
                    <Text style={walletmanangementstyles.bankinfotitle}>Bank Name</Text>
                    <Text style={walletmanangementstyles.bankinfovalue}>VFD Microfinance Bank</Text>
                  </View>
              </View>
  
              <View style={walletmanangementstyles.tablewrap}>
                <Tableoption title="Account Number" value="Yes" />
                <Tableoption title="Max Cash Request" value="N100,000 per day" />
  
                <Tableoption title="Max Cash Deposit" value="N200,000 per day" />
                <Tableoption title="Max bank Transfers" value="N500,000 per day" />
                <Tableoption title="Receive" value="Unlimited" mb={false} />
              </View>
  
              <View style={[walletmanangementstyles.bottominfowrap, {backgroundColor: COLORS.blue7}]}>
                <Text style={walletmanangementstyles.bottominfotext}>
                Hey 👋Odogwu, enjoy more earnings today and get better awoof as a feather agent. 
                  <Text style={{ color: COLORS.yellow4 }}> #leggo</Text>{" "}
                </Text>
                <Curvedbutton btntext="Become an Agent" onpress={() => console.log("get")} />
              </View>
            </>
          );
  
          break;

      case "agent":
            return (
              <>
                <View style={walletmanangementstyles.memojimainwrap}>
                  <View style={walletmanangementstyles.memojitextwrap}>
                    <Memoji1bigicon />
                    <View style={[walletmanangementstyles.typebg, {backgroundColor: "#7600FF"}]}>
                      <Text style={walletmanangementstyles.typetext}>Agent</Text>
                    </View>
                  </View>
                </View>
  
                <View style={[walletmanangementstyles.tablewrap, { marginBottom: 20}]}>
                  <View style={walletmanangementstyles.bankinfowrap}>
                    <View>
                      <Text style={walletmanangementstyles.bankinfotitle}>Your Feather Account Number</Text>
                      <Text style={walletmanangementstyles.bankinfovalue}>8903792082</Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.8} onPress={openModal} style={walletmanangementstyles.copybankinfobg}>
                    <Text style={walletmanangementstyles.copybankinfotext}>Copy</Text>
                  </TouchableOpacity>
                  </View>
                  <View style={{marginTop: 24}}>
                      <Text style={walletmanangementstyles.bankinfotitle}>Bank Name</Text>
                      <Text style={walletmanangementstyles.bankinfovalue}>VFD Microfinance Bank</Text>
                    </View>
                </View>
    
                <View style={walletmanangementstyles.tablewrap}>
                  <Tableoption title="Account Number" value="Yes" />
                  <Tableoption title="Max Cash Request" value="N300,000 per day" />
    
                  <Tableoption title="Max Cash Deposit" value="N1,000,000 per day" />
                  <Tableoption title="Max bank Transfers" value="N500,000 per day" />
                  <Tableoption title="Receive" value="Unlimited" mb={false} />
                </View>
    
                
              </>
            );
    
            break;
      default:
        break;
    }
  };



  return (
    <Mainwrapper>
      <Backheader title="Wallet Management" />
      <ScrollView
        style={{ flex: 1, paddingHorizontal: 15 }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <CustomModal>
          <Copyaccountinfo />
        </CustomModal>
        <UpgradeuserModal>
          <Upgrademodal />
        </UpgradeuserModal>

        {renderUsertable("newbie")}
      </ScrollView>
    </Mainwrapper>
  );
};

export default Walletmanagement;
